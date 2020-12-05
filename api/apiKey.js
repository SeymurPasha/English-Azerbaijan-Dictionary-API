const Users = require('./models/user');
const MAX = 10;


const genKey = () => {
    return [...Array(30)]
    .map((e) => ((Math.random()*36) | 0).toString(36))
    .join('');
};

const validateKey = (req, res, next) => {
  let host = req.headers.origin;
  let api_key = req.query.api_key;
  let account = [];
  

   Users.find(
{apiKey:api_key, host:host},
function(err,docs) {
  if(err) {
  console.log(err);
  }
  else {
    account = docs
    if (account.length>0) {
    
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
          let countNumber = account[0].usage[0].count
          Users.findOneAndUpdate({apiKey:api_key}, {usage:[{date:today, count:countNumber+1}]}, {new: true}, (err, updatedDoc) => {
            if(err) return console.log(err);
          })
          console.log('Good API call', account[0].usage[usageIndex]);
          next();
        }
      } else {
        //not today yet
        Users.findOneAndUpdate({apiKey:api_key}, {usage:[{date:today, count:1}]}, {new: true}, (err, updatedDoc) => {
          if(err) return console.log(err);
        })
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
