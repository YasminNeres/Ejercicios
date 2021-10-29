const songs = [
 'media/AC-DC.mp3','media/Aretha.mp3','media/Bob Marley.mp3'

];

const audioEl = document.querySelector('#audio');
let current = 0;

const playAudio = (id) =>{
    current = id;
    audioEl.querySelector('source').src = songs[current];
    audioEl.load();
    audioEl.play();
    console.log(current);
}



document.querySelector('#control-previous').addEventListener('click',(ev) => {
     ev.preventDefault();
    playAudio(current === 0 ? 2 : current - 1 );
});

document.querySelector('#control-next').addEventListener('click',(ev) => {
    ev.preventDefault();
    playAudio(current === 2 ? 0 : current + 1 );

});

document.querySelector('#control-play').addEventListener('click',(ev) =>{
    ev.preventDefault();
    console.log('pausado ?',audioEl.paused);
    if(audioEl.paused){
      audioEl.play();
    }else{
        audioEl.pause();
    }
});

audioEl.addEventListener('play',(ev) => {
    console.log('playing',ev.target);
    document.querySelector('#control-play').textContent= 'pause';

});

audioEl.addEventListener('pause',(ev) => {
    console.log('pausing',ev.target);
    document.querySelector('#control-play').textContent= 'play_arrow';

});


const neatTime = (time) => {
    // const hours = Math.floor((time % 86400) / 3600)
    const minutes = Math.floor((time % 3600) / 60);
    let seconds = Math.floor(time % 60);
    seconds = seconds > 9 ? seconds : `0${seconds}`;

    return `${minutes}:${seconds}`;
};

const progressFill = document.querySelector('.progress-filled');
const textCurrent = document.querySelector('.time-current');

audioEl.addEventListener('timeupdate', (ev) => {
    progressFill.style.width = `${audioEl.currentTime / audioEl.duration * 100}%`;
    textCurrent.textContent = `${neatTime(audioEl.currentTime)} / ${neatTime(audioEl.duration)}`;
});

const progressSlider = document.querySelector('.progress');
progressSlider.addEventListener('click', (ev) => {
    const newTime = ev.offsetX / progressSlider.offsetWidth;
    progressFill.style.width =`${newTime * 100}%`;
    audioEl.currentTime = newTime * audioEl.duration;
});


/*document.querySelector('#audio').addEventListener('play', (ev) => {
    console.log('playing', ev.target);
});*/