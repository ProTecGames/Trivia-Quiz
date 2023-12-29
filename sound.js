
const audioContext = new (window.AudioContext || window.webkitAudioContext)();

function playSound(soundUrl) {
    const request = new XMLHttpRequest();
    request.open('GET', soundUrl, true);
    request.responseType = 'arraybuffer';

    
    request.onload = function () {
        audioContext.decodeAudioData(request.response, function (buffer) {
            const source = audioContext.createBufferSource();
            source.buffer = buffer;
            source.connect(audioContext.destination);
            source.start(0);
        });
    };

    request.send();
}


playSound('tap.mp3');
