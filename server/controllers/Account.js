const models = require('../models');

const Account = models.Account;

const getAccInfo = (request, response) => { // get information of user account
  const req = request;
  const res = response;
  Account.AccountModel.getAccInfo(req.session.account, (err, docs) => {
    if (err) {
      return res.status(400).json({ error: 'An error has occurred.' });
    }
    return res.json({ info: docs });
  });
};

const addFunds = (request, response) => { // add funds to user account
  const req = request;
  const res = response;
  const fundsToAdd = `${req.body.fundsToAdd}`;
  if (!fundsToAdd) {
    return res.status(400).json({ error: 'All fields are required.' });
  }
  return Account.AccountModel.addFunds(req.session.account, fundsToAdd, (err, docs) => {
    if (err) {
      return res.status(400).json({ error: 'An error has occurred.' });
    }
    req.session.account = Account.AccountModel.toAPI(docs);
    return res.json({ updateInfo: docs });
  });
};

const buySocks = (request, response) => { // buy socks for user account
  const req = request;
  const res = response;
  const socksToBuy = `${req.body.socksBought}`;
  const socksPrice = `${req.body.socksPrice}`;
  // const socksCategory = `${req.body.socksCategory}`;
  // const socksPicture = `${req.body.socksPicture}`;
  const currFunds = `${req.body.currFunds}`;
  const socksPriceInt = 1 + parseInt(socksPrice, 10);
  const currFundsInt = parseInt(currFunds, 10);

  if (!socksToBuy) {
    return res.status(400).json({ error: 'All fields are required.' });
  } if (currFundsInt - socksPriceInt < 0) {
    return res.status(400).json({ error: 'Not enough funds to buy.' });
  }
  return Account.AccountModel.buySocks(req.session.account, socksPriceInt, (err, docs) => {
    if (err) {
      return res.status(400).json({ error: 'An error has occurred.' });
    }
    req.session.account = Account.AccountModel.toAPI(docs);
    return res.json({ updateInfo: docs });
  });
};

const loginPage = (req, res) => {
  res.render('login', { csrfToken: req.csrfToken() });
};

const logout = (req, res) => {
  req.session.destroy();
  res.redirect('/');
};

const login = (request, response) => {
  const req = request;
  const res = response;
  // force cast to strings to cover some security flaws
  const username = `${req.body.username}`;
  const password = `${req.body.pass}`;

  if (!username || !password) {
    return res.status(400).json({ error: 'All fields are required.' });
  }
  return Account.AccountModel.authenticate(username, password, (err, account) => {
    if (err || !account) {
      return res.status(401).json({ error: 'Wrong username or password' });
    }
    req.session.account = Account.AccountModel.toAPI(account);
    return res.json({ redirect: '/home' });
  });
};

const signup = (request, response) => {
  const req = request;
  const res = response;

  req.body.username = `${req.body.username}`;
  req.body.pass = `${req.body.pass}`;
  req.body.pass2 = `${req.body.pass2}`;

  if (!req.body.username || !req.body.pass || !req.body.pass2) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  if (req.body.pass !== req.body.pass2) {
    return res.status(400).json({ error: 'Passwords do not match' });
  }

  return Account.AccountModel.generateHash(req.body.pass, (salt, hash) => {
    const accountData = {
      username: req.body.username,
      salt,
      password: hash,
      purchases: 0,
      funds: 100,
    };
    const newAccount = new Account.AccountModel(accountData);
    const savePromise = newAccount.save();

    savePromise.then(() => {
      req.session.account = Account.AccountModel.toAPI(newAccount);
      res.json({ redirect: '/home' });
    });

    savePromise.catch((err) => {
      if (err.code === 11000) {
        return res.status(400).json({ error: 'Username already in use.' });
      }
      return res.status(400).json({ error: 'An unexpected error occurred.' });
    });
  });
};

const changePassword = (request, response) => {
  const req = request;
  const res = response;
  const username = `${req.body.username}`;
  req.body.oldPass = `${req.body.oldPass}`;
  req.body.newPass = `${req.body.newPass}`;

  if (!req.body.newPass || !req.body.oldPass) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  return Account.AccountModel.authenticate(username, req.body.oldPass, (err, account) => {
    if (err || !account) {
      return res.status(401).json({ error: 'An error has occurrred' });
    }
    const updatedAccount = account;
    return Account.AccountModel.generateHash(req.body.newPass, (salt, hash) => {
      updatedAccount.password = hash;
      updatedAccount.salt = salt;
      const savePromise = updatedAccount.save();

      savePromise.then(() => res.json({
        password: updatedAccount.password,
      }));

      savePromise.catch((err2) => {
        if (err2.code === 11000) {
          return res.status(400).json({ error: 'Duplicate key error.' });
        }
        return res.status(400).json({ error: 'An unexpected error occurred.' });
      });
    });
  });
};

const getToken = (request, response) => {
  const req = request;
  const res = response;
  const csrfJSON = {
    csrfToken: req.csrfToken(),
  };
  res.json(csrfJSON);
};

module.exports.loginPage = loginPage;
module.exports.login = login;
module.exports.logout = logout;
module.exports.signup = signup;
module.exports.getToken = getToken;
module.exports.getAccInfo = getAccInfo;
module.exports.addFunds = addFunds;
module.exports.buySocks = buySocks;
module.exports.changePassword = changePassword;
