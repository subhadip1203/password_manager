const mongoose = require('mongoose');
const toJSON = require('./plugins/toJson');
const {PublicError, PrivateError} = require("../utils/error")

const contentSchema = mongoose.Schema({
  mainContent: {
    type: String,
    trim: true,
    required: true,
  },

  meta: {
    type: Array,             
    default: [],
  },

  userId: {
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User'
  },

  isDeleted : {
    type: Boolean,
    default: false
  }
});

contentSchema.plugin(toJSON);

const Content = mongoose.model('Content', contentSchema);

const findContent = async (filter) => {
  try {
    const contentDetails = await Content.findOne({...filter, isDeleted: false}).exec();
    return contentDetails.toJSON();
  } catch (err) {
    if (err instanceof PublicError) {
      throw new PublicError(err.message);
    } else {
      throw new PrivateError(" contentModel => findContent || "+err.message);
    }
  }
};

module.exports = {Content, findContent}