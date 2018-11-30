const controllers = require('./controllers');
const mid = require('./middleware');

const router = (app) => {
  app.post('/login', mid.requiresSecure, mid.requiresLogout, controllers.Account.login);
  app.post('/signup', mid.requiresSecure, mid.requiresLogout, controllers.Account.signup);
  app.post('/passChange', mid.requiresLogin, controllers.Account.changePassword);
  app.post('/addFunds', mid.requiresLogin, controllers.Account.addFunds);
  app.post('/buySocks', mid.requiresLogin, controllers.Account.buySocks);
  app.get('/getToken', mid.requiresSecure, controllers.Account.getToken);
  app.get('/getSocks', mid.requiresSecure, controllers.Sock.getSocks);
  app.get('/getAccInfo', mid.requiresLogin, controllers.Account.getAccInfo);
  app.get('/login', mid.requiresSecure, mid.requiresLogout, controllers.Account.loginPage);
  app.get('/logout', mid.requiresLogin, controllers.Account.logout);
  app.get('/home', mid.requiresLogin, controllers.Home.homePage);
  app.get('/account', mid.requiresLogin, controllers.Home.accountPage);
  app.get('/search', mid.requiresLogin, controllers.Home.searchPage);
  app.get('/signupPage', mid.requiresLogin, controllers.Home.signupPage);
  app.get('/buy', mid.requiresLogin, controllers.Home.buyPage);
  app.get('/confirmation', mid.requiresLogin, controllers.Home.confirmationPage);
  app.get('/collection', mid.requiresLogin, controllers.Home.collectionPage);
  app.get('/notFound', mid.requiresSecure, controllers.Home.notFoundPage);
  app.get('/', mid.requiresSecure, mid.requiresLogout, controllers.Account.loginPage);
  app.get('*', mid.requiresSecure, controllers.Home.notFoundPage);
};

module.exports = router;
