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