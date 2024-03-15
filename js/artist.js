
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
        const apiUrl = "https://striveschool-api.herokuapp.com/api/deezer/artist/";
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
        let img = document.querySelector('.hero-ar');
        let artist = document.querySelector('.title-album-al')
        let span = document.querySelector('#asc-mens')

        artist.textContent = albumData.name
        
        img.style.backgroundImage = `url(${albumData.picture_xl})`

        //song.textContent = albumData.tracks.data[0].title
        //song2.textContent = albumData.artist.name 
    }
    document.addEventListener("DOMContentLoaded", function() {
                getAlbumIdFromUrlAndRedirect();
                console.log(homeAlbums)
            });
