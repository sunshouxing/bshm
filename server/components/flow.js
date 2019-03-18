'use strict';

const fs = require('fs');
const path = require('path');

const UPLOAD_DIR = 'client/assets/uploads';

function cleanIdentifier(identifier) {
  return identifier.replace(/[^0-9A-Za-z_-]/g, '');
}

function getChunkFileName(chunkNumber, identifier) {
  // Clean up the identifier
  identifier = cleanIdentifier(identifier);
  // What would the file name be?
  return path.resolve(UPLOAD_DIR, `./flow-${identifier}.${chunkNumber}`);
}

function validateRequest(chunkNumber, chunkSize, totalSize, identifier, filename, fileSize, maxFileSize) {
  // Clean up the identifier
  identifier = cleanIdentifier(identifier);

  // Check if the request is sane
  if (chunkNumber == 0 || chunkSize == 0 || totalSize == 0 || identifier.length == 0 || filename.length == 0) {
    return 'non_flow_request';
  }

  // Check the number of chunks
  var numberOfChunks = Math.max(Math.floor(totalSize / (chunkSize * 1.0)), 1);
  if (chunkNumber > numberOfChunks) {
    return 'invalid_flow_request1';
  }

  // Is the file too big?
  if (maxFileSize && totalSize > maxFileSize) {
    return 'invalid_flow_request2';
  }

  if (typeof fileSize != 'undefined') {
    if (chunkNumber < numberOfChunks && fileSize != chunkSize) {
      // The chunk in the POST request isn't the correct size
      return 'invalid_flow_request3';
    }

    if (numberOfChunks > 1 && chunkNumber == numberOfChunks && fileSize != (totalSize % chunkSize + parseInt(chunkSize))) {
      // The chunks in the POST is the last one, and the file is not the correct size
      return 'invalid_flow_request4';
    }

    if (numberOfChunks == 1 && fileSize != totalSize) {
      // The file is only a single chunk, and the data size does not fit
      return 'invalid_flow_request5';
    }
  }

  return 'valid';
}

/**
 * Checks if the file chunk already existed, then invoke {hanle} callback
 * with the check result(found, not_found).
 *
 * @param {Object} req
 * @param {Function} handle
 */
export function get(req, handle) {
  var chunkNumber = req.query.flowChunkNumber;
  var chunkSize = req.query.flowChunkSize;
  var totalSize = req.query.flowTotalSize;
  var identifier = req.query.flowIdentifier;
  var filename = req.query.flowFilename;

  if (validateRequest(chunkNumber, chunkSize, totalSize, identifier, filename) == 'valid') {
    var chunkFilename = getChunkFileName(chunkNumber, identifier);
    fs.exists(chunkFilename, function(exists) {
      if (exists) {
        handle('found');
      } else {
        handle('not_found');
      }
    });
  } else {
    handle('not_found');
  }
}

/**
 * Uploads the file chunk, then invoke {handle} callback with
 * the upload results(done, partly_done, invalid_flow_request, non_flow_request).
 *
 * @param {Object} req
 * @param {Function} handle
 */
export function post(req, handle) {
  var file = req.files.file;
  var options = req.body;

  var chunkNumber = options.flowChunkNumber;
  var chunkSize = options.flowChunkSize;
  var totalSize = options.flowTotalSize;
  var identifier = cleanIdentifier(options.flowIdentifier);
  var filename = options.flowFilename;

  if (!file || !file.size) {
    handle('invalid_flow_request');
    return;
  }

  var validation = validateRequest(chunkNumber, chunkSize, totalSize, identifier, filename, file.size);
  if (validation == 'valid') {
    var chunkFilename = getChunkFileName(chunkNumber, identifier);

    // Save the chunk (TODO: OVERWRITE)
    fs.rename(file.path, chunkFilename, function() {
      // Do we have all the chunks?
      var currentTestChunk = 1;
      var numberOfChunks = Math.max(Math.floor(totalSize / (chunkSize * 1.0)), 1);
      var testChunkExists = function() {
        fs.exists(getChunkFileName(currentTestChunk, identifier), function(exists) {
          if (exists) {
            currentTestChunk++;
            if (currentTestChunk > numberOfChunks) {
              handle('done');
            } else {
              // Recursion
              testChunkExists();
            }
          } else {
            handle('partly_done');
          }
        });
      };
      testChunkExists();
    });
  } else {
    handle(validation);
  }
}

// Pipe chunks directly in to an existsing WritableStream
//   r.write(identifier, response);
//   r.write(identifier, response, {end:false});
//
//   var stream = fs.createWriteStream(filename);
//   r.write(identifier, stream);
//   stream.on('data', function(data){...});
//   stream.on('finish', function(){...});
export function write(identifier, writableStream, options) {
  options = options || {};
  options.end = typeof options.end == 'undefined' ? true : options.end;

  // Iterate over each chunk
  var pipeChunk = function(number) {
    var chunkFilename = getChunkFileName(number, identifier);
    fs.exists(chunkFilename, function(exists) {
      if (exists) {
        // If the chunk with the current number exists,
        // then create a ReadStream from the file
        // and pipe it to the specified writableStream.
        var sourceStream = fs.createReadStream(chunkFilename);
        sourceStream.pipe(writableStream, {
          end: false
        });
        sourceStream.on('end', function() {
          // When the chunk is fully streamed, jump to the next one
          pipeChunk(number + 1);
        });
      } else {
        // When all the chunks have been piped, end the stream
        if (options.end) writableStream.end();
        if (options.onDone) options.onDone();
      }
    });
  };

  pipeChunk(1);
}

export function clean(identifier, options) {
  options = options || {};

  // Iterate over each chunk
  var pipeChunkRm = function(number) {
    var chunkFilename = getChunkFileName(number, identifier);

    //console.log('removing pipeChunkRm ', number, 'chunkFilename', chunkFilename);
    fs.exists(chunkFilename, function(exists) {
      if (exists) {
        console.log('exist removing ', chunkFilename);
        fs.unlink(chunkFilename, function(err) {
          if (err && options.onError) options.onError(err);
        });

        pipeChunkRm(number + 1);
      } else if (options.onDone) {
        options.onDone();
      }
    });
  };
  pipeChunkRm(1);
}
