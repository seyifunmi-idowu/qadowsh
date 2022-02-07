console.log('Glory To God')
const tracks = [
    {
        title: "Mo Ju'ba Re",
        artist: "Qadowsh x Someone else",
        cover: "assets/img/IMG_1936.jpg",
        file: "assets/track/mojubare.mp3"
    }, 
    {
        title: "Olusomi",
        artist: "Qadowsh",
        cover: "assets/img/cover-olusomi.jpg",
        file: "assets/track/olusomi.mp3"
    },
    {
        title: "Temidire",
        artist: "Qadowsh",
        cover: "assets/img/IMG_1951.jpg",
        file: "assets/track/temidire.mp3"
    }, 
]

const tracksEl = document.querySelectorAll('.track');
const ham = document.getElementById('ham-wrapper')
// audio
const audio = document.getElementById('audio')
const playBtn = document.getElementById('audio-play-btn')
const pauseBtn = document.getElementById('audio-pause-btn')
const forwardBtn = document.getElementById('audio-forward-btn')
const backwardBtn = document.getElementById('audio-backward-btn')


//onclick
ham.addEventListener('click', () => {
    const menu = document.getElementById('menu-mobile');
    menu.classList.toggle('active')
})

tracksEl.forEach(trackEl => {
    trackEl.addEventListener('click', switchTrack)
})

playBtn.onclick = () => {
    setAudioState('play')
}

pauseBtn.onclick = () => {
    setAudioState('pause')
}

forwardBtn.onclick = () => {
    audio.currentTime += 10
}

backwardBtn.onclick = () => {
    audio.currentTime -= 10
}


// function
const setAudioState = (state) => {
    if (state == 'play') {
        audio.play()
        playBtn.hidden = true
        pauseBtn.hidden = false
    }

    if (state == 'pause') {
        audio.pause()
        pauseBtn.hidden = true
        playBtn.hidden = false
    }

    if (state == 'reset') {
        audio.pause
        pauseBtn.hidden = true
        playBtn.hidden = false
        audio.currentTime = 0
        seek.value = 0
    }
}

audio.ontimeupdate = () => {
    let played = 100 * audio.currentTime / audio.duration
    if (played == 100) {
        setAudioState('reset')
    }

}

function switchTrack(e) {
    const section = document.getElementById('tracks-section');
    const num = e.currentTarget.querySelector('.track-num').textContent.replace('#','')
    const cover = document.getElementById('cover')
    const title = document.getElementById('title')
    const artist = document.getElementById('artist')

    // add class 'active' to track
    tracksEl.forEach(trackEl => {
        if (trackEl.classList.contains('active')) {
            trackEl.classList.remove('active')
        }
    })
    e.currentTarget.classList.add('active')
    //change bg
    section.style.backgroundImage = `linear-gradient(rgba(0, 0, 0, 0.5),rgba(0, 0, 0, 1.3)), url(../${tracks[num-1].cover})`
    // change cover
    cover.src = tracks[num-1].cover
    console.log(cover.src)
    //change track info
    title.textContent = tracks[num-1].title;
    artist.textContent = tracks[num-1].artist;
}

