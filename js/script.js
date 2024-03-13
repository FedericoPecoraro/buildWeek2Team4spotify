// Seleziona l'elemento del dropdown e il menu dropdown
const dropdown = document.querySelector('.dropdown')
const dropdownMenu = document.querySelector('.dropdownMenu')

// Variabile per tenere traccia della visibilità del dropdown
let isDropdownVisible = 'hidden'

// Gestisce il click sul dropdown per mostrare/nascondere il menu dropdown
dropdown.addEventListener('click', () => {
    if (isDropdownVisible === 'hidden') {
        dropdownMenu.classList.add('show')
        isDropdownVisible = 'visible'
    } else {
        dropdownMenu.classList.remove('show')
        isDropdownVisible = 'hidden'
    }
})

// Gestisce i click al di fuori del dropdown per nascondere il menu dropdown
document.addEventListener('click', (event) => {
    const isClickInsideDrowdown = dropdown.contains(event.target);

    if (!isClickInsideDrowdown) {
        dropdownMenu.classList.remove('show')
        isDropdownVisible = 'hidden'
    }
})

// Seleziona il pulsante per tornare indietro nella cronologia del browser
const buttonBack = document.querySelector('.backwardForwardBtns .backward')
// Aggiunge un evento al click per tornare indietro nella cronologia del browser
buttonBack.addEventListener('click', () => history.back())

// Seleziona il pulsante per andare avanti nella cronologia del browser
const buttonForward = document.querySelector('.backwardForwardBtns .forward')
// Aggiunge un evento al click per andare avanti nella cronologia del browser
buttonForward.addEventListener('click', () => history.forward())

// Aggiunge un event listener al caricamento del documento per espandere/schiudere la finestra
document.addEventListener('DOMContentLoaded', function() {
    // Seleziona l'elemento per espandere/schiudere la finestra
    const expandWindow = document.querySelector('.bi-arrows-angle-expand');

    // Aggiunge un evento al click per gestire l'espansione/schiudere della finestra
    expandWindow.addEventListener('click', function() {
        if (!document.fullscreenElement &&
            !document.mozFullScreenElement && 
            !document.webkitFullscreenElement && 
            !document.msFullscreenElement) {
                // Se non è in modalità a schermo intero, richiedi la modalità a schermo intero
            const docElm = document.documentElement;
            if (docElm.requestFullscreen) {
                docElm.requestFullscreen()
            } else if (docElm.mozRequestFullScreen) {
                docElm.mozRequestFullScreen()
            } else if (docElm.webkitRequestFullScreen) {
                docElm.webkitRequestFullScreen()
            } else if (docElm.msRequestFullscreen) {
                docElm.msRequestFullscreen()
            }
        } else {
            // Altrimenti, esci dalla modalità a schermo intero
            if (document.exitFullscreen) {
                document.exitFullscreen()
            } else if (document.mozCancelFullScreen) {
                document.mozCancelFullScreen()
            } else if (document.webkitExitFullscreen) {
                document.webkitExitFullscreen()
            } else if (document.msExitFullscreen) {
                document.msExitFullscreen()
            }
        }
    })
})

// Importa l'array di playlist da un modulo esterno
import { playlists } from " ";

// Funzione di passaggio vuota, non fa nulla
function pass() {
  return;
}

// Funzione per generare caselle di playlist casuali
function generatePlaylists() {
    // Seleziona il contenitore delle playlist
  const playlistBox = document.querySelector(".auto-playlists");
    // Seleziona il contenitore delle playlist
  for (let i = 0; i < 60; i++) {
    // Ottiene una playlist casuale dall'array
    let playlist = playlists[random(7100)];

    // Aggiunge la playlist al contenitore
    playlistBox.innerHTML += `
    
    <div><li><a href="https://open.spotify.com/search/${playlist}" target="blank" title="${playlist}">${playlist}</a></li></div>
    `;
  }
}

// Funzione per aggiungere puntini alle playlist con titolo troppo lungo
function dots() {
  // Seleziona tutti i link alle playlist
  const playlistLinks = document.querySelectorAll(".auto-playlists a");
  // Itera su ogni link
  for (let elem of playlistLinks) {
    // Se il testo del link è più lungo di 270 pixel
    if (elem.scrollWidth > 270) {
      // Crea un elemento SVG per i puntini
      const dot = document.createElement("svg");
      dot.innerHTML += `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-three-dots" viewBox="0 0 16 16">
      <path d="M3 9.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3m5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3m5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3"/>
    </svg>`;

    // Aggiunge eventi per mostrare/nascondere i puntini al passaggio del mouse
    elem.addEventListener('mouseover', () => {
      dot.classList.toggle('playlist-dots-vanish')
    })
    elem.addEventListener('mouseleave', () => {
      dot.classList.toggle('playlist-dots-vanish')
    })

    // Aggiunge classi e inserisce il puntino dopo il link
    elem.classList.add('playlist-hover')
    elem.parentElement.after(dot)
    }
  }
}

// Funzione per generare un numero casuale fino a n
function random(n) {
  return Math.round(Math.random() * n) + 1;
}

// Chiama le funzioni per generare e decorare le playlist
generatePlaylists();
dots();

// Gestione del cuore e del cuore pieno per aggiungere/rimuovere un brano ai preferiti
const heart = document.getElementById("heart");
const heartFill = document.getElementById("heart-fill");

function heartBtn() {
  heart.style.display = 'none'; 
  heartFill.style.display = 'block';
}

function heartFillBtn() {
  heart.style.display = 'block'; 
  heartFill.style.display = 'none';
}

heart.addEventListener('click', heartBtn)
heartFill.addEventListener('click', heartFillBtn)



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
    shuffle.style.fill = "#1db954";
    shuffle.style.borderBottom = "1px solid #1db954"
    isGreen = true;
  } else {
    shuffle.style.fill = "";
    shuffle.style.borderBottom = ""
    isGreen = false;
  }
}

shuffle.addEventListener('click', shuffleBtn);


const repeater = document.getElementById("repeater");
let clickCount = 0;

function repeaterBtn() {
  clickCount++;
  
  if (clickCount === 1) {
    repeater.style.fill = "#1db954";
    repeater.style.borderBottom = "1px solid #1db954"
  } else if (clickCount === 2) {
    repeater.innerHTML= `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#1db954" class="bi bi-repeat-1" viewBox="0 0 16 16">
    <path d="M11 4v1.466a.25.25 0 0 0 .41.192l2.36-1.966a.25.25 0 0 0 0-.384l-2.36-1.966a.25.25 0 0 0-.41.192V3H5a5 5 0 0 0-4.48 7.223.5.5 0 0 0 .896-.446A4 4 0 0 1 5 4zm4.48 1.777a.5.5 0 0 0-.896.446A4 4 0 0 1 11 12H5.001v-1.466a.25.25 0 0 0-.41-.192l-2.36 1.966a.25.25 0 0 0 0 .384l2.36 1.966a.25.25 0 0 0 .41-.192V13h6a5 5 0 0 0 4.48-7.223Z"/>
    <path d="M9 5.5a.5.5 0 0 0-.854-.354l-1.75 1.75a.5.5 0 1 0 .708.708L8 6.707V10.5a.5.5 0 0 0 1 0z"/>
  </svg>`


    repeater.appendChild(number);
  } else if (clickCount === 3) {
    repeater.style.fill = ""; 
    repeater.style.borderBottom = ""
    const number = repeater.querySelector("p");
    repeater.innerHTML = `<svg id="repeater" xmlns="http://www.w3.org/2000/svg"  fill="white" class="bi bi-repeat" viewBox="0 0 16 16">
    <path d="M11 5.466V4H5a4 4 0 0 0-3.584 5.777.5.5 0 1 1-.896.446A5 5 0 0 1 5 3h6V1.534a.25.25 0 0 1 .41-.192l2.36 1.966c.12.1.12.284 0 .384l-2.36 1.966a.25.25 0 0 1-.41-.192Zm3.81.086a.5.5 0 0 1 .67.225A5 5 0 0 1 11 13H5v1.466a.25.25 0 0 1-.41.192l-2.36-1.966a.25.25 0 0 1 0-.384l2.36-1.966a.25.25 0 0 1 .41.192V12h6a4 4 0 0 0 3.585-5.777.5.5 0 0 1 .225-.67Z"/>
  </svg>`
    if (number) {
      repeater.removeChild(number);
    }
    clickCount = 0;
  }
}

repeater.addEventListener('click', repeaterBtn);




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


// Definizione dell'endpoint e delle opzioni per la richiesta di ricerca
const endpoint = "https://deezerdevs-deezer.p.rapidapi.com/search?q=";
const searchOptions = {
  method: "GET",
  headers: {
    "X-RapidAPI-Key": "8b36f7f0e4msh713a7788113b5dfp1c91f9jsna6e735e2137f",
    "X-RapidAPI-Host": "deezerdevs-deezer.p.rapidapi.com",
  },
};

// Selezionamento degli elementi del DOM
const container = document.querySelector(".placeholder-categories");
const searchForm = document.querySelector("form");
const searchBar = document.querySelector("input");
const showMoreContainer = document.querySelector(".show-more");

// Variabile globale per il controllo della paginazione
let globalIndex = 0;

// Funzione per rimuovere tutti gli elementi dall'elemento container
function removeAllElements() {
  while (container.firstChild) {
    container.firstChild.remove();
  }
}

// Selezione degli elementi del modal per i messaggi di errore
const modal = document.querySelector(".search-modal");
const modalText = document.querySelector(".search-modal p");

// Funzione per gestire i risultati della ricerca
function searchResults(index = "") {
  const searchText = searchBar.value.trim().toLowerCase();

    // Richiesta di ricerca tramite fetch
  fetch(`${endpoint}${searchText}${index}`, searchOptions)
    .then((response) => response.json())
    .then((data) => {
      if (data.hasOwnProperty("error")) {
        modalText.innerText = "Invalid search query";
        modal.classList.toggle("modal-active");
        setTimeout(() => {
          modal.classList.toggle("modal-active");
        }, 1000);

        searchForm.reset();

        return;
      }

      if (data.data.length === 0) {
        modalText.innerText = "Nothing was found";
        modal.classList.toggle("modal-active");
        setTimeout(() => {
          modal.classList.toggle("modal-active");
        }, 1000);

        return;
      }

      // Rimozione degli elementi precedenti se siamo nella prima pagina di risultati
      if (globalIndex === 0) {
        removeAllElements();
      }

      // Nascondi il titolo principale e mostra il pulsante "Show More"
      document.querySelector("h2").style.display = "none";
      showMoreContainer.style.display = "block";

      // Iterazione sui risultati e creazione degli elementi della lista
      for (i = 0; i < data.data.length; i++) {
        let content = data.data[i];
        const card = document.createElement("div");
        card.classList.add("searchResultBox");
        card.innerHTML = `
            <div class="imgContainer">
                <img src="${content.album.cover}"></img>
            </div>
            <div class="searchText">
            <h3><a href="album.html?id=${data.data[i].id}">${content.title}</a></h3>
            <p><a href="artistPage.html?id=${content.artist.id}">${content.artist.name}</a><p>
            </div>
            `;
        container.appendChild(card);
      }

      // let pepe = data.data;
      // let relevant = {};
      // pepe.map((elem) => {
      //   Object.assign(relevant, {
      //     [elem.artist.name]: pepe.filter(
      //       (a) => a.artist.name === elem.artist.name
      //     ).length,
      //   });
      // });

      if (data.data.length < 25) {
        moreButton.disabled = true;
      } else {
        moreButton.disabled = false;
      }
    });
}

// Event listener per il pulsante "Show More"
const moreButton = showMoreContainer.querySelector("button");
moreButton.addEventListener("click", () => {
  globalIndex += 25;
  searchResults(`&index=${globalIndex}`);
});
// searchForm.addEventListener("submit", removeAllElements);
// searchForm.addEventListener("submit", () => {
// });

// Event listener per il form di ricerca per reimpostare l'indice globale a zero
searchForm.addEventListener("submit", () => (globalIndex = 0));

// Event listener per la sottomissione del form di ricerca
searchForm.addEventListener("submit", (e) => {
  e.preventDefault();
  searchResults();
});

// Fetch iniziale per ottenere informazioni su una traccia specifica e popolare l'elemento del giocatore audio
fetch(`https://deezerdevs-deezer.p.rapidapi.com/track/1963530567`, searchOptions)
.then((response) => response.json())
.then((datas)  => {
  
  
  playerApi(datas)
  audioElem.src = datas.preview
})

const audioElem = document.querySelector('audio')
let playerInfo = document.querySelector('.leftDiv')

function playerApi(results){

  const leftDivSongImg = playerInfo.querySelector("img")
  const LeftDivArtistName =  playerInfo.querySelector("h4")
  const LeftDivTrackName =  playerInfo.querySelector("h2")

  leftDivSongImg.src = results.album.cover
  LeftDivArtistName.innerHTML = results.artist.name
  LeftDivTrackName.innerHTML = results.title

  }

  //Selezione degli elementi necessari
const minimizeFriends = document.querySelector(".bi-x-lg");
const friends = document.querySelector("#friends");
const activityItems = document.querySelectorAll(".activityItem");
const openFriends = document.querySelector(".openFriends");

// Funzione per chiudere la sezione degli amici
function closeFriendsSide() {
  // Ridimensionamento della barra laterale e nascondimento della sezione degli amici
  let sidebar = document.querySelector(".activitySection");
  sidebar.style.minWidth = "50px";
  sidebar.style.maxWidth = "50px";
  friends.style.display = "none";
  openFriends.style.display = "block";

  // Nascondimento degli elementi dell'attività
  activityItems.forEach((content) => {
    content.style.display = "none";
  });
}

// Funzione per aprire la sezione degli amici
function openFriendsSide() {
    // Ridimensionamento della barra laterale e visualizzazione della sezione degli amici
  let sidebar = document.querySelector(".activitySection");
  sidebar.style.minWidth = "250px";
  sidebar.style.maxWidth = "250px";
  friends.style.display = "flex";
  openFriends.style.display = "none";

  // Visualizzazione graduale degli elementi dell'attività
  activityItems.forEach((content) => {
    setTimeout(() => {
      content.style.display = "flex";
    }, 150);
  });
}
// Aggiunta degli eventi per aprire e chiudere la sezione degli amici
openFriends.addEventListener("click", openFriendsSide);
minimizeFriends.addEventListener("click", closeFriendsSide);



  