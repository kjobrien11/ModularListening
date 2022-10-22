
// const AudioContext = window.AudioContext || window.webkitAudioContext;

// let audioContext;

// try {
//   audioContext =
//     new (window.AudioContext || window.webkitAudioContext)();
// } catch (error) {
//   window.alert(
//     `Sorry, but your browser doesn't support the Web Audio API!`
//   );
// }


// let oscillator = audioContext.createOscillator();
// oscillator.connect(audioContext.destination);

// const gainNode = audioContext.createGain();


// function start(){
//     oscillator = audioContext.createOscillator();
//     oscillator.connect(audioContext.destination);
//     oscillator.start();
// }
// function stop(){
//     oscillator.stop();
//     oscillator = null;
// }


function start() {
    'use strict';
  
    const URL = 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/123941/Yodel_Sound_Effect.mp3';
      
    const context = new AudioContext();
    const playButton = document.querySelector('#play');
      
    let yodelBuffer;
  
    window.fetch(URL)
      .then(response => response.arrayBuffer())
      .then(arrayBuffer => context.decodeAudioData(arrayBuffer))
      .then(audioBuffer => {
        playButton.disabled = false;
        yodelBuffer = audioBuffer;
      });
      
      playButton.onclick = () => play(yodelBuffer);
  
    function play(audioBuffer) {
      const source = context.createBufferSource();
      source.buffer = audioBuffer;
      source.connect(context.destination);
      source.start();
    }
  };

  function dropHandler(ev) {
    console.log('File(s) dropped');
  
    // Prevent default behavior (Prevent file from being opened)
    ev.preventDefault();
  
    if (ev.dataTransfer.items) {
      // Use DataTransferItemList interface to access the file(s)
      [...ev.dataTransfer.items].forEach((item, i) => {
        // If dropped items aren't files, reject them
        if (item.kind === 'file') {
          const file = item.getAsFile();
          console.log(`… file[${i}].name = ${file.name}`);
        }
      });
    } else {
      // Use DataTransfer interface to access the file(s)
      [...ev.dataTransfer.files].forEach((file, i) => {
        console.log(`… file[${i}].name = ${file.name}`);
      });
    }
  }
  function dragOverHandler(ev) {
    console.log('File(s) in drop zone');
  
    // Prevent default behavior (Prevent file from being opened)
    ev.preventDefault();
  }
  