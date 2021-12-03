const { fetchMyIP, fetchCoordsByIP, fetchISSFlyOverTimes, nextISSTimesForMyLocation } = require('./iss');

// // Makes a single API request to retrieve IPv4 address.
// fetchMyIP((error, ip) => {
//   if (error) {
//     console.log("It didn't work!" , error);
//     return;
//   }

//   console.log('It worked! Returned IP:' , ip);
// });


// // // Makes a single API request to retrieve the lat/lng for a given IPv4 address.
// fetchCoordsByIP('70.31.47.171', (error, coordinates) => {
//   if (error) {
//     console.log("It didn't work!" , error);
//     return;
//   }

//   console.log('It worked! Returned coordinates:' , coordinates);
// });



// const exampleCoords = { latitude: '49.27670', longitude: '-123.13000' };

// fetchISSFlyOverTimes(exampleCoords, (error, passTimes) => {
//   if (error) {
//     console.log("It didn't work!" , error);
//     return;
//   }

//   console.log('It worked! Returned flyover times:' , passTimes);
// });



nextISSTimesForMyLocation((error, passTimes) => {
  if (error) {
    return console.log("It didn't work!", error);
  }


  // success, print out the deets!
  console.log(passTimes);
});


// my written code
// const ip = '70.31.47.171'
// fetchCoordsByIP(ip, (error, data, data2) => {

//   if (error) {
//     console.log("Much error", error);
//     return;
//   }

//   const obj = {};

//   obj["latitude"] = data;
//   obj["longtitude"] = data2;
//   console.log(obj);
// });


// fetchCoordsByIP('70.31.47.171') // this will call the fx twice