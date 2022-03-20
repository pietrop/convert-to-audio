// originally from https://github.com/OpenNewsLabs/autoEdit_2/blob/master/lib/interactive_transcription_generator/transcriber/convert_to_audio.js
// https://github.com/bbc/digital-paper-edit-audio-converter/blob/master/lib/convert-to-audio/index.js

/**
 * @module convertToAudio
 * @description Converts video or audio file into `.wav` (or any ffmpeg supported input)
 * takes in input file, output destination file, and returns a promise.
 * It converts into an audio file that meets the specs for STT services
 * @requires fluent-ffmpeg
 * @requires ffmpeg-static-electron
 */

const path = require("path");
const ffmpegBin = require("ffmpeg-static-electron");
const ffmpeg = require("fluent-ffmpeg");

const ffmpegBinPath = ffmpegBin.path;
ffmpeg.setFfmpegPath(ffmpegBinPath);

/**
 * Adding an helper function to force the file extension to be `.wav`
 * this also allows the file extension in output file name/path to be optional
 * @param {string} path - path to an audio file
 */
function wavFileExtension(filePath) {
  let audioFileOutputPath = filePath;
  // https://nodejs.org/api/path.html#path_path_parse_path
  const pathParsed = path.parse(audioFileOutputPath);
  if (pathParsed.ext !== ".wav") {
    audioFileOutputPath = path.join(
      pathParsed.root,
      pathParsed.dir,
      `${pathParsed.name}.wav`
    );
  }
  return audioFileOutputPath;
}

/**
 * @function convertToAudio
 * @param {string} file -  path to audio or viceo file to convert to wav
 * @param {string} audioFileOutput - path to output wav audio file - needs to have .wav extension
 * @returns {callback} callback - callback to return audio file path as string.
 */
function convertToAudio(file, audioFileOutput) {
  const audioFileOutputPath = wavFileExtension(audioFileOutput);

  return new Promise((resolve, reject) => {
    ffmpeg(file)
      .noVideo()
      // .audioCodec('libopus')
      .audioCodec("pcm_s16le")
      .audioChannels(1)
      .audioFrequency(16000)
      .output(audioFileOutputPath)
      .on("end", () => {
        resolve(audioFileOutputPath);
      })
      .on("error", err => {
        reject(err);
      })
      .run();
  });
}

// Will NOT work for MP4 Streams
// https://stackoverflow.com/questions/23002316/ffmpeg-pipe0-could-not-find-codec-parameters/40028894#40028894
function convertStreamToAudio(inputStream, outputStream) {
  return new Promise((resolve, reject) => {
    ffmpeg(inputStream)
      .noVideo()
      .audioCodec("pcm_s16le")
      .audioChannels(1)
      .toFormat("wav")
      .audioFrequency(16000)
      .on("start", cmd => {
        console.log("Started " + cmd);
      })
      .on("codecData", function(data) {
        console.log(
          "Input is " + data.audio + " audio " + "with " + data.video + " video"
        );
      })
      .on("error", function(err, stdout, stderr) {
        console.log(err.message); //this will likely return "code=1" not really useful
        console.log("stdout:\n" + stdout);
        console.log("stderr:\n" + stderr); //this will contain more detailed debugging info
        reject(err);
      })
      .on("progress", function(progress) {
        console.log(progress);
        console.log("Processing: " + progress.percent + "% done");
      })
      .on("end", function(stdout, stderr) {
        console.log(stdout, stderr);
        console.log("Transcoding succeeded !");
        resolve();
      })
      .pipe(outputStream, { end: true });
  });
}

module.exports = {
  convertToAudio,
  convertStreamToAudio
};
