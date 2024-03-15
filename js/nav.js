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
