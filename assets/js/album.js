//VERSIONE 2
const apiUrl = "https://striveschool-api.herokuapp.com/api/deezer/album/";

let homeAlbums = [];

    function getAlbumIdFromUrlAndRedirect(){
        const url = new URL(window.location.href);
        const idIndex = url.searchParams.get('id');
        if (idIndex) {
            const albumId = parseInt(idIndex);
            homeAlbums.push(albumId);
            fetchAlbumData(albumId);
        } else {
            console.error('Album ID not found in url.');
        }
    }

    function fetchAlbumData(albumId) {
        const apiUrl = "https://striveschool-api.herokuapp.com/api/deezer/album/";
        console.log('fetching data', albumId);
        fetch(apiUrl + albumId)
        .then((res) => {
            if (!res.ok){
                throw new Error("network not ok");
            }
            return res.json();
        })
        .then ((data) => {
            console.log('received album data', data);
            displayAlbumData(data);
        })
        .catch((error) => {
            console.error("fetch error", error);
        });
    }

    function displayAlbumData(albumData){
        let title = document.querySelector('#title');
        let img = document.querySelector('#img');
        let artist = document.querySelector('#artist-des')
        let span = document.querySelector('#span')
        let song = document.querySelector('#song-t')
        let song2 = document.querySelector('#song-a')

        title.textContent = albumData.title;
        img.src = albumData.cover;
        artist.textContent = albumData.artist.name 
        span.textContent= ' • ' + albumData.release_date + ' • ' + albumData.nb_tracks +' Brani '
        
        song.textContent = albumData.tracks.data[0].title
        song2.textContent = albumData.artist.name 
    }

document.addEventListener("DOMContentLoaded", function() {
    getAlbumIdFromUrlAndRedirect();
    console.log(homeAlbums)
});


    //VERSIONE ALPHA
   /* const apiUrl = "https://striveschool-api.herokuapp.com/api/deezer/album/";

let homeAlbums = [
    544889292
];
    fetch(apiUrl + homeAlbums, {
    method: "GET",
    headers: {
        "Content-type": "application/json",
    },
    })
    .then((res) => res.json())
    .then(dati=> {
        let title = document.querySelector('#title')
        let img = document.querySelector('#img')

        title.innerHTML = dati.title
        img.src = dati.cover

    })

    function getAlbumIdFromUrl(){
        const url = window.location.href;
        const idIndex = url.indexOf('?')+1;
        const id = url.substring(idIndex)
    }*/

