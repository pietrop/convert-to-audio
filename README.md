## Convert To Audio

<!-- _One liner + link to confluence page_
_Screenshot of UI - optional_ -->

Node ffmpeg wrapper to convert audio or video file to an audio file that meets STT specs

Originally from [autoEdit2](https://github.com/OpenNewsLabs/autoEdit_2/blob/master/lib/interactive_transcription_generator/transcriber/convert_to_audio.js) and [DPE](https://github.com/bbc/digital-paper-edit-audio-converter/blob/master/lib/convert-to-audio/index.js)

On npm [`convert-to-audio`](https://www.npmjs.com/package/convert-to-audio)

## Setup

<!-- _stack - optional_
_How to build and run the code/app_ -->

```
git clone git@github.com:bbc/convert-to-audio.git
```

```
cd convert-to-audio
```

```
npm install
```

## Usage

```
npm install @bbc/convert-to-wav
```

```js
const convertToAudio = require("@bbc/convert-to-wav");

const url = "https://download.ted.com/talks/KateDarling_2018S-950k.mp4";
const audioFileOutput = "./ted-talk.wav";

convertToAudio(url, audioFileOutput)
  .then(newFile => {
    console.log(newFile);
  })
  .catch(err => {
    console.error(err);
  });
```

Or with async await, inside an async block

```js
const convertToAudio = require("@bbc/convert-to-wav");

const url = "https://download.ted.com/talks/KateDarling_2018S-950k.mp4";
const audioFileOutput = "./ted-talk.wav";
// inside an async function
const newFile = await convertToAudio(url, audioFileOutput);
```

## System Architecture

<!-- _High level overview of system architecture_ -->

Uses ffmpeg binary, and fluent ffmpeg to convert to audio, wav.

<!-- ## Documentation

There's a [docs](./docs) folder in this repository.

[docs/notes](./docs/notes) contains dev draft notes on various aspects of the project. This would generally be converted either into ADRs or guides when ready.

[docs/adr](./docs/adr) contains [Architecture Decision Record](https://github.com/joelparkerhenderson/architecture_decision_record).

> An architectural decision record (ADR) is a document that captures an important architectural decision made along with its context and consequences.

We are using [this template for ADR](https://gist.github.com/iaincollins/92923cc2c309c2751aea6f1b34b31d95) -->

## Development env

 <!-- _How to run the development environment_ -->

- npm > `6.1.0`
- [Node 10 - dubnium](https://scotch.io/tutorials/whats-new-in-node-10-dubnium)

Node version is set in node version manager [`.nvmrc`](https://github.com/creationix/nvm#nvmrc)

<!-- _Coding style convention ref optional, eg which linter to use_ -->

<!-- _Linting, github pre-push hook - optional_ -->

## Build

<!-- _How to run build_ -->

_NA_

## Tests

<!-- _How to carry out tests_ -->

_NA_

## Deployment

<!-- _How to deploy the code/app into test/staging/production_ -->

```
npm run publish:public
```
