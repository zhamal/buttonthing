const { APPLE_ID, PASSWORD } = require('../config.json');
const debounce = require('lodash.debounce');
const icloud = require("find-my-iphone").findmyphone;

const DEBOUNCE_MS = 500;

// Initialize findmyphone
icloud.apple_id = APPLE_ID;
icloud.password = PASSWORD; 

const isFindMyPhoneEnabled = (device) => {
  return device && device.location && device.lostModeCapable;
}

const ring = () => {
  icloud.getDevices((err, devices) => {
    if (err) {
      console.error('Failed to get devices');
      console.error(err);
      return;
    }

    const capableDevices = devices.filter(isFindMyPhoneEnabled);

    capableDevices.forEach(device => {
      icloud.alertDevice(device.id, (err) => {
        if (err) {
          console.error('Failed to alert device ' + device.id);
          console.error(err);
        } else {
          console.log('Alerted device ' + device.id);
        }
      });
    })
  });
}

console.log("Ring initialized with apple ID " + APPLE_ID);

module.exports = debounce(ring, DEBOUNCE_MS);
