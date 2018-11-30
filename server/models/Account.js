const crypto = require('crypto');
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

let AccountModel = {};
const iterations = 10000;
const saltLength = 64;
const keyLength = 64;

const SockTemplate = new mongoose.Schema({ // inventory schema
  name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  picture: {
    type: String,
    required: true,
  },
  amount: {
    type: Number,
    required: false,
    default: 0,
  },
  createdDate: {
    type: Date,
    default: Date.now,
  },
});

const AccountSchema = new mongoose.Schema({ // account schema
  username: {
    type: String,
    required: true,
    trim: true,
    unique: true,
    match: /^[A-Za-z0-9_\-.]{1,16}$/,
  },
  salt: {
    type: Buffer,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  createdDate: {
    type: Date,
    default: Date.now,
  },
  funds: {
    type: Number,
    required: false,
  },
  purchases: {
    type: Number,
    required: false,
  },
  inventory: {
    type: SockTemplate,
    required: false,
  },
});

AccountSchema.statics.toAPI = doc => ({
  // _id is built into your mongo document and is guaranteed to be unique
  username: doc.username,
  funds: doc.funds,
  purchases: doc.purchases,
  inventory: doc.inventory,
  _id: doc._id,
});

const validatePassword = (doc, password, callback) => {
  const pass = doc.password;
  return crypto.pbkdf2(password, doc.salt, iterations, keyLength, 'RSA-SHA512', (err, hash) => {
    if (hash.toString('hex') !== pass) {
      return callback(false);
    }
    return callback(true);
  });
};

AccountSchema.statics.findByUsername = (name, callback) => {
  const search = {
    username: name,
  };

  return AccountModel.findOne(search, callback);
};

AccountSchema.statics.generateHash = (password, callback) => {
  const salt = crypto.randomBytes(saltLength);

  crypto.pbkdf2(password, salt, iterations, keyLength, 'RSA-SHA512', (err, hash) =>
    callback(salt, hash.toString('hex'))
  );
};

AccountSchema.statics.getAccInfo = (doc, callback) => { // find and return account information
  const info = {
    username: doc.username,
    purchases: doc.purchases,
    funds: doc.funds,
  };
  return AccountModel.find(info, callback);
};

AccountSchema.statics.addFunds = (doc, fundsToAdd, callback) => { // return updated funds info
  const info = {
    username: doc.username,
    purchases: doc.purchases,
    funds: doc.funds,
  };
  const updatedInfo = AccountModel.findOneAndUpdate(
    info,
    { $inc: { funds: fundsToAdd } },
    { new: true, upsert: true },
    callback);
  return updatedInfo;
};

AccountSchema.statics.buySocks = (doc, socksPrice, callback) => { // return updated purchase info
  const info = {
    username: doc.username,
    purchases: doc.purchases,
    funds: doc.funds,
  };
  const updatedInfo = AccountModel.findOneAndUpdate(
    info,
    {
      $inc:
      {
        purchases: 1,
        funds: -1 * socksPrice,
      },
      // $addToSet:
      // {
        // inventory: [name, socksPrice, category, picture, 1],
      // },
    },
    { new: true, upsert: true },
    callback);
  return updatedInfo;
};

AccountSchema.statics.setPassword = (doc, newPass, callback) => { // return updated password
  const updateUser = AccountModel.findByUsername(doc.username, callback);
  updateUser.password = newPass;
  return updateUser;
};

AccountSchema.statics.authenticate = (username, password, callback) =>
AccountModel.findByUsername(username, (err, doc) => {
  if (err) {
    return callback(err);
  }

  if (!doc) {
    return callback();
  }

  return validatePassword(doc, password, (result) => {
    if (result === true) {
      return callback(null, doc);
    }
    return callback();
  });
});

AccountModel = mongoose.model('Account', AccountSchema);
module.exports.AccountModel = AccountModel;
module.exports.AccountSchema = AccountSchema;
