
  //ALBUM
  const homePageAlbum = [ 544889292,401371]

  const homePageAlbum2 = [301797, 90302, 87420682, 119420782, 314982747,]

  const homePageAlbum3 = [288437072, 420621057, 75621062, 491005205, 445615925]

  const homePageAlbum4 = [508448701, 392863987, 309377597, 262561252, 72470162]

  const homePageAlbum5 = [506656591, 90799, 443350855, 212377, 662259]

  const div1 = document.querySelector('.card-container')

  const div2 = document.querySelector('#container2')

  const div3 = document.querySelector('#container3')

  const div4 = document.querySelector('#container4')

  const div5 = document.querySelector('#container5')

  const apiUrl = "https://striveschool-api.herokuapp.com/api/deezer/album/";

  const apiUrl2 = "https://striveschool-api.herokuapp.com/api/deezer/artist/";
  
  function albumCicle(album, container, url) {
    album.forEach(albumId => {
  fetch(url + albumId) 
    .then(response => {
      if (!response.ok) {
        throw new Error('error request');
      }
      return response.json();
    })
    .then(albumData => {
      const albumTemplate = document.querySelector('#albumTemplate').content.cloneNode(true);
      const albumContainer = container
      
      albumTemplate.querySelector('.card-title').textContent = albumData.title || albumData.name ;
      albumTemplate.querySelector('.card-img').src = albumData.cover || albumData.picture;
      albumTemplate.querySelector('.card-info').textContent = albumData.nb_fan || albumData.artist.name 

      albumTemplate.querySelector('.ref').href = `albumPage.html?id=${albumData.id}`;
      albumTemplate.querySelector('.art-det').href = `artistPage.html?id=${albumData.artist.id}`;
      albumContainer.appendChild(albumTemplate);
    })
  })
  
}  
    albumCicle(homePageAlbum, div1, apiUrl)

    albumCicle(homePageAlbum2,div2, apiUrl)

    albumCicle(homePageAlbum3,div3, apiUrl)
    
    albumCicle(homePageAlbum4,div4, apiUrl)

    albumCicle(homePageAlbum5,div5, apiUrl)

  

//ARTIST
const homeArtistPage = [10346, 11503771, 409, 705, 404]
const div6 = document.querySelector('#card-container6')


albumCicle(homeArtistPage, div6, apiUrl2 )



