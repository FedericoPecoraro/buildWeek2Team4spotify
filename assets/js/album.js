//VERSIONE 2
const apiUrl = "https://striveschool-api.herokuapp.com/api/deezer/album/";


let homeAlbums = [];
    fetch(apiUrl + homeAlbums, {
    method: "GET",
    headers: {
        "Content-type": "application/json",
    },
    })

    /*
    .then((res) => res.json())
    .then(dati=> {
        let title = document.querySelector('#title')
        let img = document.querySelector('#img')

        title.innerHTML = dati.title
        img.src = dati.cover

    })
    */
    function getAlbumIdFromUrlAndRedirect(){
        const url = new URL(window.location.href);
        const idIndex = url.searchParams.get('id');
        if (idIndex) {
            const albumId = parseInt(idIndex);
            homeAlbums.push(albumId);
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

        title.textContent = albumData.title;
        img.src = albumData.cover;
    }

document.addEventListener("DOMContentLoaded", function() {
    getAlbumIdFromUrlAndRedirect();
        if(homeAlbums.length > 0) {
            fetchAlbumData(homeAlbums[0]);
        }else{
            console.log('no album id')
            }
});
    console.log(homeAlbums)

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

