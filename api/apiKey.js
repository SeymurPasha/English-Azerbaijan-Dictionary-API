const Users = require('./models/user');
const MAX = 25;


const genKey = () => {
    return [...Array(30)]
    .map((e) => ((Math.random()*36) | 0).toString(36))
    .join('');
};

const validateKey = (req, res, next) => {
  //Where is the API key expected to be?
  let host = req.headers.origin;
  let api_key = req.query.api_key;
  let account;
   Users.find(
{apiKey:api_key},
function(err,docs) {
  if(err) {
    console.log(err);
  }
  else {
    account = docs
    if (account) {
      //good match
      //check the usage
      let today = new Date().toISOString().split('T')[0];
      let usageIndex = account[0].usage.findIndex((day) => day.date == today);
      if (usageIndex >= 0) {
        //already used today
        if (account[0].usage[usageIndex].count >= MAX) {
          //stop and respond
          res.status(429).send({
            error: {
              code: 429,
              message: 'Max API calls exceeded.',
            },
          });
        } else {
          //have not hit todays max usage
          account[0].usage[usageIndex].count++;
          console.log('Good API call', account[0].usage[usageIndex]);
          next();
        }
      } else {
        //not today yet
        account[0].usage.push({ date: today, count: 1 });
        //ok to use again
        next();
      }
    } else {
      //stop and respond
      res.status(403).send({ error: { code: 403, message: 'You not allowed.' } });
    }
  }
})
 
};

module.exports = {genKey,validateKey};
