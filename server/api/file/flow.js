'use strict';

const fs = require('fs');
const path = require('path');

const FILE_PARAM_NAME = 'file';
const TMP_DIR = 'tmp';

function cleanIdentifier(identifier) {
  return identifier.replace(/[^0-9A-Za-z_-]/g, '');
}

function getChunkFileName(chunkNumber, identifier) {
  // Clean up the identifier
  identifier = cleanIdentifier(identifier);
  // What would the file name be?
  return path.resolve(TMP_DIR, `./flow-${identifier}.${chunkNumber}`);
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

//'found', filename, originalFilename, identifier
//'not_found', null, null, null
export function get(req, callback) {
  var chunkNumber = req.query.flowChunkNumber;
  var chunkSize = req.query.flowChunkSize;
  var totalSize = req.query.flowTotalSize;
  var identifier = req.query.flowIdentifier;
  var filename = req.query.flowFilename;

  if (validateRequest(chunkNumber, chunkSize, totalSize, identifier, filename) == 'valid') {
    var chunkFilename = getChunkFileName(chunkNumber, identifier);
    fs.exists(chunkFilename, function(exists) {
      if (exists) {
        callback('found', chunkFilename, filename, identifier);
      } else {
        callback('not_found', null, null, null);
      }
    });
  } else {
    callback('not_found', null, null, null);
  }
}

//'partly_done', filename, originalFilename, identifier
//'done', filename, originalFilename, identifier
//'invalid_flow_request', null, null, null
//'non_flow_request', null, null, null
export function post(req, callback) {
  var fields = req.body;
  var files = req.files;

  var chunkNumber = fields.flowChunkNumber;
  var chunkSize = fields.flowChunkSize;
  var totalSize = fields.flowTotalSize;
  var identifier = cleanIdentifier(fields.flowIdentifier);
  var filename = fields.flowFilename;

  if (!files[FILE_PARAM_NAME] || !files[FILE_PARAM_NAME].size) {
    callback('invalid_flow_request', null, null, null);
    return;
  }

  var originalFilename = files[FILE_PARAM_NAME].originalFilename;
  var validation = validateRequest(chunkNumber, chunkSize, totalSize, identifier, filename, files[FILE_PARAM_NAME].size);
  if (validation == 'valid') {
    var chunkFilename = getChunkFileName(chunkNumber, identifier);

    // Save the chunk (TODO: OVERWRITE)
    fs.rename(files[FILE_PARAM_NAME].path, chunkFilename, function() {
      // Do we have all the chunks?
      var currentTestChunk = 1;
      var numberOfChunks = Math.max(Math.floor(totalSize / (chunkSize * 1.0)), 1);
      var testChunkExists = function() {
        fs.exists(getChunkFileName(currentTestChunk, identifier), function(exists) {
          if (exists) {
            currentTestChunk++;
            if (currentTestChunk > numberOfChunks) {
              callback('done', filename, originalFilename, identifier);
            } else {
              // Recursion
              testChunkExists();
            }
          } else {
            callback('partly_done', filename, originalFilename, identifier);
          }
        });
      };
      testChunkExists();
    });
  } else {
    callback(validation, filename, originalFilename, identifier);
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
  options.end = (typeof options.end == 'undefined' ? true : options.end);

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
