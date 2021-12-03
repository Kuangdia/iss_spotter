const { nextISSTimesForMyLocation } = require('./iss_promised');

// const { printPassTimes } = require('./index');

// see index.js for printPassTimes 

// Call 
nextISSTimesForMyLocation()
  .then((passTimes) => {
    console.log(passTimes);
  })
  .catch((error) => {
    console.log("It didn't work: ", error.message);
  });