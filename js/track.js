const tracks = [
    {
        title: "Mo Ju'ba Re",
        artist: "Qadowsh x Someone else",
        cover: "assets/img/IMG_1936.jpg",
        file: "assets/track/mojubare.mp3"
    }, 
    {
        title: "Olusomi (My Shepherd)",
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
const ham = document.getElementById('ham-wrapper')

const openPlayerBtn = document.getElementById('open-player-btn')
const previewBox = document.querySelectorAll('.preview-box')
//player screen elements
const allTracksBtn = document.getElementById('all-tracks-btn')
const player = document.getElementById('player')
const playerBg = document.getElementById('player-bg')
const coverImg = document.getElementById('cover-img')
const trackName = document.getElementById('track-name')
const artist = document.getElementById('artist')
// audio
const audio = document.getElementById('audio')
const playBtn = document.getElementById('audio-play-btn')
const pauseBtn = document.getElementById('audio-pause-btn')
const forwardBtn = document.getElementById('audio-forward-btn')
const backwardBtn = document.getElementById('audio-backward-btn')
const currentTimee = document.getElementById('current-time')
const totalTime = document.getElementById('total-time')
const seek = document.getElementById('seek')
seek.value = 0;



/* on clicks */
ham.addEventListener('click', () => {
    const menu = document.getElementById('menu-mobile');
    menu.classList.toggle('active')
})

openPlayerBtn.onclick = (e) => {
    e.preventDefault();
    openPlayer()
}

allTracksBtn.onclick = (e) => {
    e.preventDefault();
    openPlayer(false)
}

previewBox.forEach(box => {
    box.onclick = (e) => {
        let id = e.currentTarget.id
        if (id == 'one') {
            openPlayer(true);
            updatePlayer(1)
        } else if (id == 'two') {
            openPlayer(true);
            updatePlayer(2)
        } else if (id == 'three') {
            openPlayer(true);
            updatePlayer(3)
        }
    }
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

/* Function */
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

const openPlayer = (action) => {
    if (action == undefined) {
        player.toggleAttribute('hidden');
    } else if (action == true || action == false) {
        player.hidden = !action
    }
}

const updatePlayer = (track) => {
    coverImg.src = `../${tracks[track - 1].cover}`
    trackName.textContent = tracks[track - 1].title
    artist.textContent = tracks[track - 1].artist
    playerBg.style.backgroundImage = `linear-gradient(rgba(0, 0, 0, 0.7),rgba(0, 0, 0, 1.5)), url(../${tracks[track-1].cover})`
    audio.src = tracks[track - 1].file
    seek.value = 0
    audio.load()
    audio.addEventListener("loadeddata", function() {
        totalTime.textContent = getAudioTime(this.duration)
    });
}

audio.ontimeupdate = () => {
    currentTimee.textContent = getAudioTime(audio.currentTime)
    let played = 100 * audio.currentTime / audio.duration
    if (played !== played) {
        seek.value = 0
    } else if (played == 100) {
        setAudioState('reset')
    } else {
        seek.value = played
    }
}

seek.oninput = () => {
    setAudioState('pause')
    let now = (seek.value / 100) * audio.duration
    currentTimee.textContent = getAudioTime(now)
}

seek.onchange = () => {
    let now = (seek.value / 100) * audio.duration
    if (seek.value == 1) {
        audio.currentTime = 0
    } else {
        audio.currentTime = now
    }
    setAudioState('play')
}

const getAudioTime = (time) => {
    let min = '0' + Math.floor(time / 60)
    let secs = Math.floor(time - min * 60)
    if (secs.toString().length  < 2) {
        secs = '0' + secs
    }
    let dur = min + ':' + secs;
    return dur
}


