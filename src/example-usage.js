const { convertToAudio, convertStreamToAudio } = require("./index.js");
const fs = require("fs");
const url = "https://download.ted.com/talks/KateDarling_2018S-950k.mp4";
const audioFileOutput = "./ted-talk.wav";

convertToAudio(url, audioFileOutput)
  .then(newFile => {
    console.log(newFile);
  })
  .catch(err => {
    console.error(err);
  });

const writeStream = fs.createWriteStream(audioFileOutput);
convertStreamToAudio(url, writeStream)
  .then(() => {
    console.log(audioFileOutput);
  })
  .catch(err => {
    console.error(err);
  });
