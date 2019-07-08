// Create a middleware controller for OAuth
const request = require('request');
const qs = require('querystring');

const oAuthController = {
  // method for getting authorization code from GitHub oAuth server
  getoAuthCode: (req, res, next) => {
    const { code } = req.query;
    // take code and put it into res.locals
    // this allows subsequent middlewares to have access to access to it
    res.locals.code = code;
    next();
  },
  // method for getting access token after we get authorization code
  getAccessToken: (req, res, next) => {
    // We will need to send a post request to the access token url
    // It will need to include the authorization code and the client secret and client include
    // Import request module to make HTTP request from server
    request.post({
      url: 'https://github.com/login/oauth/access_token?' + qs.stringify({
        client_id: '13defefbd00cf6ce9fbf',
        client_secret: '723abe897e915346e2832e9ac3c0a47e25f583a4',
        code: res.locals.code
      })
    }, (err, result, body) => {
        if (err) console.error(err);
        // console.log(qs.parse(body), 'Eric!!!');
        req.session.access_token = qs.parse(body).access_token;
        next();
      });
  },
  // method will use access token to check out the api and what it there
  getAPI: (req, res) => {
    console.log(res.locals.accessToken, '***');
    request.get({
      url: 'https://api.github.com/user/public_emails',
      headers: {
        Authorization: `token ${req.session.access_token}`,
        'User-Agent': 'Login-App'
      }
    }, (err, response) => {
      if (err) console.log('You are fucking up!');
      else console.log(response);
    })
    res.send('Uhhh');
  }
};

module.exports = oAuthController;
