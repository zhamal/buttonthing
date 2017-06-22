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

    // Of all devices, only consider ones that have "find my phone" enabled
    const capableDevices = devices.filter(isFindMyPhoneEnabled);

    // For each of these devices, sound an alert
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

module.exports = debounce(ring, DEBOUNCE_MS);
