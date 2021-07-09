let loop,
  max = 400;

function initiate() {
  media = document.getElementById('media');
  play = document.getElementById('play');
  stop = document.getElementById('stop');
  bar = document.getElementById('bar');
  progress = document.getElementById('progress');
  vol = document.getElementById('vol');
  volume = document.getElementById('volume');
  title2 = document.getElementById('title2');
  playList = document.querySelector('.playlist');
  player = document.getElementById('player');

  play.addEventListener('click', push);
  stop.addEventListener('click', push);
  vol.addEventListener('click', sound);
  bar.addEventListener('click', move);
  volume.addEventListener('change', level);
  player.addEventListener('hover', allowdrop);
}

addEventListener('load', initiate);

function push() {
  if (!media.paused && !media.ended) {
    media.pause();
    clearInterval(loop);
  } else {
    media.play();
    loop = setInterval(status, 1000);
    let song = media.innerHTML;
    console.log(song);
    title2.innerHTML = `Hey, i'm playing THIS SONG for you!`;
  }
}

function status() {
  if (!media.ended) {
    let size = parseInt((media.currentTime * max) / media.duration);
    progress.style.width = `${size}px`;
  } else {
    progress.style.width = '0';
    clearInterval(loop);
    media.currentTime = 0;
  }
}

function sound() {
  if (media.muted) {
    media.muted = false;
  } else {
    media.muted = true;
  }
}

function move(e) {
  if (!media.ended) {
    let mouseX = e.pageX - bar.offsetLeft;
    let newTime = (mouseX * media.duration) / max;
    media.currentTime = newTime;
    progress.style.width = `${mouseX}px`;
  }
}

function level() {
  media.volume = volume.value;
}
