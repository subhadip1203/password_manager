/* eslint-disable no-use-before-define */
/* eslint-disable max-classes-per-file */
class GeneralError extends Error {
  constructor(message) {
    super();
    this.message = message;
  }
}

class PublicError extends GeneralError {}
class PrivateError extends GeneralError {}

module.exports = {
  GeneralError,
  PublicError,
  PrivateError
};
