/* eslint-disable no-invalid-this */

export default function(schema, options) {
  schema.add({
    created: 'date',
    updated: 'date'
  });

  schema.pre('save', function(next) {
    this.created = new Date();
    this.updated = this.created;
    next();
  });

  schema.pre('findOneAndUpdate', function(next) {
    let document = this._update;
    document.updated = new Date();
    next();
  });

  if (options && options.index) {
    schema.path('created').index(options.index);
    schema.path('updated').index(options.index);
  }
}

/* vim:set sw=2 ts=2 sts=2: */
