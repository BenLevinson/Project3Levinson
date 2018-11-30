// display different pages on website

const homePage = (req, res) => res.render('app', { csrfToken: req.csrfToken() });

const accountPage = (req, res) => res.render('account', { csrfToken: req.csrfToken() });

const searchPage = (req, res) => res.render('search', { csrfToken: req.csrfToken() });

const buyPage = (req, res) => res.render('buy', { csrfToken: req.csrfToken() });

const confirmationPage = (req, res) => res.render('confirmation', { csrfToken: req.csrfToken() });

const collectionPage = (req, res) => res.render('collection', { csrfToken: req.csrfToken() });

const signupPage = (req, res) => res.render('signupPage', { csrfToken: req.csrfToken() });

const notFoundPage = (req, res) => res.render('notFound', { csrfToken: req.csrfToken() });

module.exports.homePage = homePage;
module.exports.accountPage = accountPage;
module.exports.searchPage = searchPage;
module.exports.signupPage = signupPage;
module.exports.buyPage = buyPage;
module.exports.confirmationPage = confirmationPage;
module.exports.collectionPage = collectionPage;
module.exports.notFoundPage = notFoundPage;
