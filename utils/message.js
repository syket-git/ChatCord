const moment = require('moment');

const formatMessage = (name, text) => {
  const message = {
    name,
    text,
    time: moment().format('h:mm a'),
  };
  return message;
};

module.exports = { formatMessage };
