const toJSON = (schema) => {
  schema.options.toJSON = {
    transform(doc, result, options) {
      result.id = result._id;
      delete result._id;
      delete result.__v;
      delete result.createdAt;
      delete result.updatedAt;
      delete result.isDeleted;
      for (const key in schema.paths) {
        if (schema.paths[key].options &&
          schema.paths[key].options.customtype &&
          schema.paths[key].options.customtype === 'private' &&
          result[key]
        ) {
          delete result[key];
        } else if (
          schema.paths[key].options &&
          schema.paths[key].options.customtype &&
          schema.paths[key].options.customtype === 'static' &&
          result[key]
        ) {
          result[key] = `${process.env.SERVER_ADDRESS}/static/${result[key]}`;
        }
      }

      return result;
    },
  };
};
module.exports = toJSON;
