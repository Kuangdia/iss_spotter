const request = require('request');

// // Makes a single API request to retrieve the user's IP address.
const fetchMyIP = function(callback) {
  request('https://api.ipify.org?format=json', (error, response, body) => {
    if (error) return callback(error, null);

    if (response.statusCode !== 200) {
      callback(Error(`Status Code ${response.statusCode} when fetching IP: ${body}`), null);
      return;
    }

    const ip = JSON.parse(body).ip;
    callback(null, ip);
  });
};

const fetchCoordsByIP = function(ip, callback) {
  request(`https://freegeoip.app/json/${ip}`, (error, response, body) => {
    if (error) {
      callback(error, null);
      return;
    }

    if (response.statusCode !== 200) {
      callback(Error(`Status Code ${response.statusCode} when fetching Coordinates for IP: ${body}`), null);
      return;
    }

    const { latitude, longitude } = JSON.parse(body);
    callback(null, { latitude, longitude });
  });
};

// Makes a single API request to retrieve upcoming ISS fly over times the for the given lat/lng coordinates.
const fetchISSFlyOverTimes = function(coords, callback) {
  const url = `https://iss-pass.herokuapp.com/json/?lat=${coords.latitude}&lon=${coords.longitude}`;

  request(url, (error, response, body) => {
    if (error) {
      callback(error, null);
      return;
    }

    if (response.statusCode !== 200) {
      callback(Error(`Status Code ${response.statusCode} when fetching ISS pass times: ${body}`), null);
      return;
    }

    const passes = JSON.parse(body).response;
    callback(null, passes);
  });
};



// Orchestrates multiple API requests in order to determine the next 5 upcoming ISS fly overs for the user's current location.
 const nextISSTimesForMyLocation = function(callback) {

  fetchMyIP((error, ip) => {
    if (error) {
      // remember this callback is always referring to index.js callback
      return callback(error, null);
    }

    fetchCoordsByIP(ip, (error, coordinates) => {
      if (error) {
        return callback(error, null);
      }

      fetchISSFlyOverTimes(coordinates, (error, nextPasses) => {
        if (error) {
          return callback(error, null);
        }

        callback(null, nextPasses)
      });
    });
  });
};


// my written code
// const fetchCoordsByIP = function(ip, callback) {
//   const URL = `http://ip-api.com/json/${ip}`;

//   request(URL, (error, response, body) => {
//     if (error) return callback(error, null);

//     if (response.statusCode !== 200) {
//       callback(Error(`Status Code ${response.statusCode} when fetching coordinates for IP. Response: ${body}`), null);
//       return;
//     }

//     const geoLat = JSON.parse(body).lat;
//     const geoLong = JSON.parse(body).lon;
//     callback(null, geoLat, geoLong);

//   });

// };

module.exports = {
  fetchMyIP,
  fetchCoordsByIP,
  fetchISSFlyOverTimes, 
  nextISSTimesForMyLocation
};