const models = require('../models');

const Sock = models.Sock;

const getSocks = (request, response) => { // get sock from database and return it
  // const req = request;
  const res = response;

  return Sock.SockModel.findSocks((err, docs) => {
    if (err) {
      console.log(err);
      return res.status(400).json({ error: 'An error occurred' });
    }
    return res.json({ socks: docs });
  });
};

module.exports.getSocks = getSocks;
