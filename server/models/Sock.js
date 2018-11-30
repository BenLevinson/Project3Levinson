const mongoose = require('mongoose');

mongoose.Promise = global.Promise;
const _ = require('underscore');

let SockModel = {};

// mongoose.Types.ObjectId is a function that
// converts string ID to a real mongo ID

// const convertId = mongoose.Types.ObjectId;
const setName = (name) => _.escape(name).trim();

const SockSchema = new mongoose.Schema({ // sock schema
  name: {
    type: String,
    required: true,
    trim: true,
    set: setName,
  },

  category: {
    type: String,
    required: true,
    trim: true,
    set: setName,
  },

  price: {
    type: Number,
    required: true,
  },

  picture: {
    type: String,
    required: true,
  },

  type: {
    type: String,
    required: true,
  },

  owner: {
    type: mongoose.Schema.ObjectId,
    required: false,
    ref: 'Account',
  },

  createdData: {
    type: Date,
    default: Date.now,
  },
});

SockSchema.statics.toAPI = (doc) => ({
  type: doc.type,
});

SockSchema.statics.addSock = (n, c, pr, pi, t) => { // add sock to database
  const sockData = {
    name: n,
    category: c,
    price: pr,
    picture: pi,
    type: t,
  };
  return SockModel.create(sockData);
};

SockSchema.statics.findSocks = (callback) => { // find and return sock
  SockModel.find({ type: 'sock' }).exec(callback);
};

SockModel = mongoose.model('Sock', SockSchema);

// add socks to database

SockModel.addSock('Alien Socks', 'Scary', 10.99, 'assets/img/alienSock.jpg', 'sock');
SockModel.addSock('Baseball Socks', 'Cool', 13.99, 'assets/img/baseballSock.jpg', 'sock');
SockModel.addSock('Black Socks', 'Normal', 9.99, 'assets/img/blackSock.jpg', 'sock');
SockModel.addSock('Bob Ross Socks', 'Funny', 11.99, 'assets/img/bobSock.jpg', 'sock');
SockModel.addSock('Caution Socks', 'Crazy', 9.99, 'assets/img/cautionSock.jpg', 'sock');
SockModel.addSock('Checkered Socks', 'Crazy', 9.99, 'assets/img/checkerSock.jpg', 'sock');
SockModel.addSock('Really Cool Socks', 'Cool', 12.99, 'assets/img/coolSock.jpg', 'sock');
SockModel.addSock('Couch Socks', 'Funny', 11.99, 'assets/img/couchSock.jpg', 'sock');
SockModel.addSock('Dog Socks', 'Funny', 14.99, 'assets/img/dogSock.jpg', 'sock');
SockModel.addSock('Duck Socks', 'Funny', 13.99, 'assets/img/duckSock.jpg', 'sock');
SockModel.addSock('Elf Socks', 'Super', 9.99, 'assets/img/elfSock.jpg', 'sock');
SockModel.addSock('Fox Socks', 'Funny', 9.99, 'assets/img/foxSock.jpg', 'sock');
SockModel.addSock('Funny Socks', 'Funny', 10.99, 'assets/img/funnySock.jpg', 'sock');
SockModel.addSock('Space Jam Socks', 'Super', 12.99, 'assets/img/jamSock.jpg', 'sock');
SockModel.addSock('Koala Socks', 'Funny', 10.99, 'assets/img/koalaSock.jpg', 'sock');
SockModel.addSock('Lightning Socks', 'Scary', 12.99, 'assets/img/lightningSock.jpg', 'sock');
SockModel.addSock('Night Socks', 'Scary', 12.99, 'assets/img/nightSock.jpg', 'sock');
SockModel.addSock('Socks', 'Normal', 8.99, 'assets/img/normalSock.jpg', 'sock');
SockModel.addSock('Penguin Socks', 'Funny', 13.99, 'assets/img/penguinSock.jpg', 'sock');
SockModel.addSock('Pig Socks', 'Funny', 11.99, 'assets/img/pigSock.jpg', 'sock');
SockModel.addSock('Pow Socks', 'Super', 13.99, 'assets/img/powSock.jpg', 'sock');
SockModel.addSock('Pringle Socks', 'Crazy', 12.99, 'assets/img/pringleSock.jpg', 'sock');
SockModel.addSock('Red Socks', 'Normal', 10.99, 'assets/img/redSock.jpg', 'sock');
SockModel.addSock('Scary Socks', 'Scary', 10.99, 'assets/img/scarySock.jpg', 'sock');
SockModel.addSock('Scarier Socks', 'Scary', 11.99, 'assets/img/abstractSock.jpg', 'sock');
SockModel.addSock('Hero Socks', 'Super', 29.99, 'assets/img/superSock.jpg', 'sock');
SockModel.addSock('Sushi Socks', 'Crazy', 13.99, 'assets/img/sushiSock.jpg', 'sock');
SockModel.addSock('Tool Socks', 'Cool', 11.99, 'assets/img/toolSock.jpg', 'sock');
SockModel.addSock('USA Socks', 'Cool', 13.99, 'assets/img/usaSock.jpg', 'sock');
SockModel.addSock('White Socks', 'Normal', 9.99, 'assets/img/whiteSock.jpg', 'sock');

module.exports.SockModel = SockModel;
module.exports.SockSchema = SockSchema;
