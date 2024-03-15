// Gestione del cuore e del cuore pieno per aggiungere/rimuovere un brano ai preferiti
const heart = document.getElementById("heart");

function toggleHeartColor() {
  heart.classList.toggle("heart-active"); // da inserire in css alla classe heart-active il colore verde
}

heart.addEventListener("click", toggleHeartColor);

// Lettore audio centrale
const audioPlayer = document.getElementById('audioPlayer');
const progressElement = document.getElementById('progress')
const timerElement = document.querySelector('.timer')
const durationElement = document.querySelector('.duration')
const playIcon = document.getElementById('play-icon')
const stopIcon = document.getElementById('stop-icon')


let currentTime = 0
let duration = 30 //DURATION DEL TIMER IN SECONDS
let isPlaying = true //FALSE PER FARLO INZIARE DA SUBITO TRUE PER L INVERSO
let interval

const totalMinutes = Math.floor(duration / 60)
const totalSeconds = duration % 60
const formattedDuration = `${totalMinutes}:${totalSeconds < 10 ? '0' : ''}${totalSeconds}`

durationElement.innerHTML = (formattedDuration)

// Barra di avanzamento con timer
function advanceProgressBar() {
  currentTime += 1
  
  if (currentTime <= duration) {

    const progressWidth = (currentTime / duration) * 100
    progressElement.style.width = `${progressWidth}%`

    const minutes = Math.floor(currentTime / 60)
    const seconds = currentTime % 60
    const formattedTime = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`
    timerElement.textContent = formattedTime

  } else {
    clearInterval(interval)
    isPlaying = false
    playIcon.style.display = 'block'
    stopIcon.style.display = 'none'
    audioPlayer.pause()
  }
}

// Gestione della riproduzione
function togglePlayback() {
  if (isPlaying) {
    clearInterval(interval)
    isPlaying = false
    playIcon.style.display = 'block'
    stopIcon.style.display = 'none'
    audioPlayer.pause()
  } else {
  
    interval = setInterval(advanceProgressBar, 1000)
    isPlaying = true
    playIcon.style.display = 'none'
    stopIcon.style.display = 'block'
    audioPlayer.play()
    
  }
}

togglePlayback() // Inizia la riproduzione all'avvio

playIcon.addEventListener('click', togglePlayback)
stopIcon.addEventListener('click', togglePlayback)

// Bottone "Indietro" e "Sopra"
const backBtn = document.getElementById('backbtn')
const upbtn = document.getElementById("upbtn")

function resetTimer() {
  currentTime = 0
  const minutes = Math.floor(currentTime / 60)
  const seconds = currentTime % 60
  const formattedTime = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`
  timerElement.textContent = formattedTime
  progress.style.width = '0%'
  audioPlayer.currentTime = 0
}

backBtn.addEventListener('click', resetTimer)

function endTimer() {
  currentTime = duration
  const minutes = Math.floor(currentTime / 60)
  const seconds = currentTime % 60
  const formattedTime = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`
  timerElement.textContent = formattedTime
  progress.style.width = '100%'
  audioPlayer.currentTime = 0
}
upbtn.addEventListener('click', endTimer)

//Barra di avanzamento centrale per il trascinamento
const progressContainer = document.querySelector('.progress-bar');
const progress = document.getElementById('progress');

let isDragging = false

progressContainer.addEventListener('mousedown', (e) => {
  isDragging = true
  updateProgress(e)
});

document.addEventListener('mousemove', (e) => {
  if (isDragging) {
    updateProgress(e)
  }
});

document.addEventListener('mouseup', () => {
  isDragging = false
});

function updateProgress(event) {
  const rect = progressContainer.getBoundingClientRect()
  const offsetX = event.clientX - rect.left
  const containerWidth = rect.width
  
  let newWidth = (offsetX / containerWidth) * 100
  newWidth = Math.max(0, Math.min(100, newWidth))
  
  progress.style.width = `${newWidth}%`

  const newTime = (newWidth / 100) * duration
  currentTime = Math.floor(newTime)

  const minutes = Math.floor(currentTime / 60)
  const seconds = currentTime % 60
  const formattedTime = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`

  timerElement.textContent = formattedTime
  audioPlayer.currentTime = currentTime
}

//Pulsante e funzionalità del ripetitore e dello shuffle
const shuffle = document.getElementById("shuffle");
let isGreen = false;

function shuffleBtn() {
  if (!isGreen) {
    shuffle.classList.add("shuffle-active"); // da inserire in css alla classe shuffle-active il colore verde 
    isGreen = true;
  } else {
    shuffle.classList.remove("shuffle-active");
    isGreen = false;
  }
}

shuffle.addEventListener('click', shuffleBtn());

const repeater = document.getElementById("repeater");
let clickCount = 0;

function repeaterBtn() {
  clickCount++;
  
  if (clickCount === 1) {
    repeater.classList.add("repeater-active"); // da inserire in css alla classe repeater-active il colore verde  
  } else if (clickCount === 2) {
    repeater.innerHTML = "";
    repeater.classList.remove("repeater-active");
    repeater.classList.add("repeater-1-active");
  } else if (clickCount === 3) {
    repeater.classList.remove("repeater-1-active");
    clickCount = 0;
  }
}

repeater.addEventListener('click', repeaterBtn());


//RIGHT VOLUME PROGRESS BAR
let rightProgress; 

document.addEventListener("DOMContentLoaded", function() {
  const rightProgressContainer = document.querySelector('.rightDiv .progress-bar')
  rightProgress = document.querySelector('.rightDiv #progress')

  const randomWidth = Math.floor(Math.random() * 51) + 20
  rightProgress.style.width = `${randomWidth}%`
  audioPlayer.volume = randomWidth/100

  let isRightDragging = false;

  rightProgressContainer.addEventListener('mousedown', (e) => {
    isRightDragging = true;
    updateRightProgress(e);
    volumeUp.style.display = 'block'
    volumeMute.style.display = 'none'
  });

  document.addEventListener('mousemove', (e) => {
    if (isRightDragging) {
      updateRightProgress(e);
    }
  });

  document.addEventListener('mouseup', () => {
    isRightDragging = false;
  });

  function updateRightProgress(event) {
    const rightRect = rightProgressContainer.getBoundingClientRect()
    const rightOffsetX = event.clientX - rightRect.left
    const rightContainerWidth = rightRect.width
  
    let newRightWidth = (rightOffsetX / rightContainerWidth) * 100
    newRightWidth = Math.max(0, Math.min(100, newRightWidth))
  
    rightProgress.style.width = `${newRightWidth}%`
  
    const newVolume = newRightWidth / 100
    audioPlayer.volume = newVolume
  }
});

//RIGHT VOLUME BAR BUTTON
const volumeUp = document.getElementById("volume-up")
const volumeMute = document.getElementById("volume-mute")

function VolumeUpBtn() {
  volumeUp.style.display = 'none'
  volumeMute.style.display = 'block'
  rightProgress.style.width = "0%"
  audioPlayer.volume = 0
}

function VolumeMuteBtn() {
  volumeUp.style.display = 'block'
  volumeMute.style.display = 'none'
  rightProgress.style.width = '10%'
  audioPlayer.volume = 0.1
}

volumeUp.addEventListener('click', VolumeUpBtn)
volumeMute.addEventListener('click', VolumeMuteBtn)



  