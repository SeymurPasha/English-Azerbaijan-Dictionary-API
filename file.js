const data = () => {
  const fs = require('fs');
  const fetch = require('node-fetch')
  const Word = require('./api/models/Word');
const eng  = fs.readFileSync('./wordsEng.js','utf-8').split('\r\n')
const az  = fs.readFileSync('./wordsAzeri.js','utf-8').split('\r\n')
const bgnr  = fs.readFileSync('./beginnerWords.js','utf-8').split('\r\n').map(beg => beg.trim())
const advncd  = fs.readFileSync('./advanced.js','utf-8').split('\r\n').map(adv => adv.trim())
const restOf = bgnr.concat(advncd);
const dictionary = eng.map((res,i) => res +  ' ' + az[i] )
const intermediate = dictionary.filter(word => restOf.indexOf(word.split(' ')[0]) === -1)
const advanced = dictionary.filter(word => advncd.indexOf(word.split(' ')[0]) !== -1)
const beginner = dictionary.filter(word => bgnr.indexOf(word.split(' ')[0]) !== -1)


for(let i=0;i<beginner.length;i++) {
  fetch(`https://pixabay.com/api/?key=17244600-fbf402d1996aa90a6382bacde&q=${beginner[i].split(' ')[0]}&image_type=photo&pretty=true&per_page=3`)
  .then(res => res.json())
  .then(images => {
   beginner[2] = beginner[2] + ' ' +  images.hits.slice(1,2)[0].largeImageURL
  })
}

for(let i=0;i<beginner.length;i++) {
  Word.insertMany([ 
    { eng: beginner[i].split(' ')[0], 
    az: beginner[i].split(' ')[2],
    image: beginner[i].split(' ')[3]}
])
  .then(() => {
    console.log('Inserted');
  })
  .catch((error) => {
    console.log(error);
  })
  
// }

}

exports.data = data