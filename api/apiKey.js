const Users = require('./models/user');
const MAX = process.env.API_MAX || 25;


const genKey = () => {
    return [...Array(30)]
    .map((e) => ((Math.random()*36) | 0).toString(36))
    .join('');
};

const validateKey = (req, res, next) => {

    let host = req.headers.origin;
    let api_key = req.query.api_key;
    let account = Users.find(
      (user) => user.host == host && user.api_key == api_key
    );
    console.log(account);
    // find() returns an object or undefined
    if (account) {
      //good match
      //check the usage
      let today = new Date().toISOString().split('T')[0];
      let usageIndex = account.usage.findIndex((day) => day.date == today);
      if (usageIndex >= 0) {
        //already used today
        if (account.usage[usageIndex].count >= MAX) {
          //stop and respond
          res.status(429).send({
            error: {
              code: 429,
              message: 'Max API calls exceeded.',
            },
          });
        } else {
          //have not hit todays max usage
          account.usage[usageIndex].count++;
          console.log('Good API call', account.usage[usageIndex]);
          next();
        }
      } else {
        //not today yet
        account.usage.push({ date: today, count: 1 });
        //ok to use again
        next();
      }
    } else {
      //stop and respond
      res.status(403).send({ error: { code: 403, message: 'You not allowed.' } });
    }
  };
  

module.exports = {genKey,validateKey};
