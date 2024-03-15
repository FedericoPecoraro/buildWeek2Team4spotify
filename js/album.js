//VERSIONE 2
const apiUrl = "https://striveschool-api.herokuapp.com/api/deezer/album/";

let homeAlbums = [];


function getAlbumIdFromUrlAndRedirect() {
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
            if (!res.ok) {
                throw new Error("network not ok");
            }
            return res.json();
        })
        .then((data) => {
            console.log('received album data', data);
            displayAlbumData(data);
        })
        .catch((error) => {
            console.error("fetch error", error);
        });
}

function displayAlbumData(albumData) {
    let title = document.querySelector('#title');
    let img = document.querySelector('#img');
    let artist = document.querySelector('#artist-des')
    let span = document.querySelector('#span')

    artist.textContent = albumData.artist.name
    span.textContent = ' • ' + albumData.release_date + ' • ' + albumData.nb_tracks + ' Brani '
    title.textContent = albumData.title;
    img.src = albumData.cover;


    //song.textContent = albumData.tracks.data[0].title
    //song2.textContent = albumData.artist.name 
}
document.addEventListener("DOMContentLoaded", function () {
    getAlbumIdFromUrlAndRedirect();
    console.log(homeAlbums)
});
function fetchTracks(albumId) {
    const url = new URL(window.location.href);
    const idIndex = url.searchParams.get('id');
    const apiUrl2 = `https://striveschool-api.herokuapp.com/api/deezer/album/${idIndex}`;
    fetch(apiUrl2)
        .then((response) => {
            if (!response.ok) {
                throw new Error("error request");
            }
            return response.json();
        })
        .then((Data) => {
            albumCicleTrack(Data.tracks.data);
        });
}
function albumCicleTrack(tracksData) {
    const albumContainer = document.querySelector("#container-tracks");
    tracksData.forEach((track) => {
        const albumTemplate = document
            .querySelector("#tracksTemplate")
            .content.cloneNode(true);
        albumTemplate.querySelector("#song-t").textContent =
            track.title;
        albumTemplate.querySelector("#song-a").textContent =
            track.artist.name;
        albumContainer.appendChild(albumTemplate);
    });
}

fetchTracks(homeAlbums);








































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

