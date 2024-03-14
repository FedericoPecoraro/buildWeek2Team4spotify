class Player {
    constructor() {
      this.heart = document.getElementById("heart");
      this.audioPlayer = document.getElementById('audioPlayer');
      this.progressElement = document.getElementById('progress');
      this.timerElement = document.querySelector('.timer');
      this.durationElement = document.querySelector('.duration');
      this.playIcon = document.getElementById('play-icon');
      this.stopIcon = document.getElementById('stop-icon');
      this.backBtn = document.getElementById('backbtn');
      this.upbtn = document.getElementById("upbtn");
      this.progressContainer = document.querySelector('.progress-bar');
      this.progress = document.getElementById('progress');
      this.shuffle = document.getElementById("shuffle");
      this.repeater = document.getElementById("repeater");
      this.rightProgressContainer = document.querySelector('.rightDiv .progress-bar');
      this.rightProgress = document.querySelector('.rightDiv #progress');
      this.volumeUp = document.getElementById("volume-up");
      this.volumeMute = document.getElementById("volume-mute");
  
      this.currentTime = 0;
      this.duration = 30;
      this.isPlaying = true;
      this.interval = null;
      this.isDragging = false;
      this.isGreen = false;
      this.clickCount = 0;
      this.isRightDragging = false;
  
      this.init();
    }
  
    init() {
      this.durationElement.innerHTML = this.getFormattedDuration();
      this.togglePlayback();
      this.playIcon.addEventListener('click', () => this.togglePlayback());
      this.stopIcon.addEventListener('click', () => this.togglePlayback());
      this.backBtn.addEventListener('click', () => this.resetTimer());
      this.upbtn.addEventListener('click', () => this.endTimer());
      this.progressContainer.addEventListener('mousedown', (e) => this.handleProgressMouseDown(e));
      document.addEventListener('mousemove', (e) => this.handleProgressMouseMove(e));
      document.addEventListener('mouseup', () => this.handleProgressMouseUp());
      this.shuffle.addEventListener('click', () => this.shuffleBtn());
      this.repeater.addEventListener('click', () => this.repeaterBtn());
      this.volumeUp.addEventListener('click', () => this.volumeUpBtn());
      this.volumeMute.addEventListener('click', () => this.volumeMuteBtn());
      this.rightProgressContainer.addEventListener('mousedown', (e) => this.handleRightProgressMouseDown(e));
      document.addEventListener('mousemove', (e) => this.handleRightProgressMouseMove(e));
      document.addEventListener('mouseup', () => this.handleRightProgressMouseUp());
    }
  
    toggleHeartColor() {
      this.heart.classList.toggle("heart-active");
    }
  
    togglePlayback() {
      if (this.isPlaying) {
        clearInterval(this.interval);
        this.isPlaying = false;
        this.playIcon.style.display = 'block';
        this.stopIcon.style.display = 'none';
        this.audioPlayer.pause();
      } else {
        this.interval = setInterval(() => this.advanceProgressBar(), 1000);
        this.isPlaying = true;
        this.playIcon.style.display = 'none';
        this.stopIcon.style.display = 'block';
        this.audioPlayer.play();
      }
    }
  
    advanceProgressBar() {
      this.currentTime += 1;
  
      if (this.currentTime <= this.duration) {
        const progressWidth = (this.currentTime / this.duration) * 100;
        this.progressElement.style.width = `${progressWidth}%`;
  
        const minutes = Math.floor(this.currentTime / 60);
        const seconds = this.currentTime % 60;
        const formattedTime = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
        this.timerElement.textContent = formattedTime;
      } else {
        clearInterval(this.interval);
        this.isPlaying = false;
        this.playIcon.style.display = 'block';
        this.stopIcon.style.display = 'none';
        this.audioPlayer.pause();
      }
    }
  
    resetTimer() {
      this.currentTime = 0;
      const minutes = Math.floor(this.currentTime / 60);
      const seconds = this.currentTime % 60;
      const formattedTime = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
      this.timerElement.textContent = formattedTime;
      this.progress.style.width = '0%';
      this.audioPlayer.currentTime = 0;
    }
  
    endTimer() {
      this.currentTime = this.duration;
      const minutes = Math.floor(this.currentTime / 60);
      const seconds = this.currentTime % 60;
      const formattedTime = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
      this.timerElement.textContent = formattedTime;
      this.progress.style.width = '100%';
      this.audioPlayer.currentTime = 0;
    }
  
    handleProgressMouseDown(event) {
      this.isDragging = true;
      this.updateProgress(event);
    }
  
    handleProgressMouseMove(event) {
      if (this.isDragging) {
        this.updateProgress(event);
      }
    }
  
    handleProgressMouseUp() {
      this.isDragging = false;
    }
  
    updateProgress(event) {
      const rect = this.progressContainer.getBoundingClientRect();
      const offsetX = event.clientX - rect.left;
      const containerWidth = rect.width;
  
      let newWidth = (offsetX / containerWidth) * 100;
      newWidth = Math.max(0, Math.min(100, newWidth));
  
      this.progress.style.width = `${newWidth}%`;
  
      const newTime = (newWidth / 100) * this.duration;
      this.currentTime = Math.floor(newTime);
  
      const minutes = Math.floor(this.currentTime / 60);
      const seconds = this.currentTime % 60;
      const formattedTime = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  
      this.timerElement.textContent = formattedTime;
      this.audioPlayer.currentTime = this.currentTime;
    }
  
    shuffleBtn() {
      if (!this.isGreen) {
        this.shuffle.classList.add("shuffle-active");
        this.isGreen = true;
      } else {
        this.shuffle.classList.remove("shuffle-active");
        this.isGreen = false;
      }
    }
  
    repeaterBtn() {
      this.clickCount++;
  
      if (this.clickCount === 1) {
        this.repeater.classList.add("repeater-active");
      } else if (this.clickCount === 2) {
        this.repeater.innerHTML = "";
        this.repeater.classList.remove("repeater-active");
        this.repeater.classList.add("repeater-1-active");
      } else if (this.clickCount === 3) {
        this.repeater.classList.remove("repeater-1-active");
        this.clickCount = 0;
      }
    }
  
    handleRightProgressMouseDown(event) {
      this.isRightDragging = true;
      this.updateRightProgress(event);
      this.volumeUp.style.display = 'block';
      this.volumeMute.style.display = 'none';
    }
  
    handleRightProgressMouseMove(event) {
      if (this.isRightDragging) {
        this.updateRightProgress(event);
      }
    }
  
    handleRightProgressMouseUp() {
      this.isRightDragging = false;
    }
  
    updateRightProgress(event) {
      const rightRect = this.rightProgressContainer.getBoundingClientRect();
      const rightOffsetX = event.clientX - rightRect.left;
      const rightContainerWidth = rightRect.width;
  
      let newRightWidth = (rightOffsetX / rightContainerWidth) * 100;
      newRightWidth = Math.max(0, Math.min(100, newRightWidth));
  
      this.rightProgress.style.width = `${newRightWidth}%`;
  
      const newVolume = newRightWidth / 100;
      this.audioPlayer.volume = newVolume;
    }
  
    volumeUpBtn() {
      this.volumeUp.style.display = 'none';
      this.volumeMute.style.display = 'block';
      this.rightProgress.style.width = "0%";
      this.audioPlayer.volume = 0;
    }
  
    volumeMuteBtn() {
      this.volumeUp.style.display = 'block';
      this.volumeMute.style.display = 'none';
      this.rightProgress.style.width = '10%';
      this.audioPlayer.volume = 0.1;
    }
  
    getFormattedDuration() {
      const totalMinutes = Math.floor(this.duration / 60);
      const totalSeconds = this.duration % 60;
      return `${totalMinutes}:${totalSeconds < 10 ? '0' : ''}${totalSeconds}`;
    }
  }
  
  const player = new Player();
  
  const homePageAlbum = [
    301797, 401371, 508448701, 392863987, 309377597, 262561252,
  ]
  const homePageAlbum2 = [ 314982747, 90302, 544889292, 119420782, 87420682,]

  const homePageAlbum3 = [288437072, 420621057, 75621062, 491005205, 445615925]

  const div1 = document.querySelector('.card-container')

  const div2 = document.querySelector('.card-container2')

  const apiUrl = "https://striveschool-api.herokuapp.com/api/deezer/album/";
  
  function albumCicle(album, container) {
    album.forEach(albumId => {
  fetch(apiUrl + albumId) 
    .then(response => {
      if (!response.ok) {
        throw new Error('error request');
      }
      return response.json();
    })
    .then(albumData => {
      const albumTemplate = document.querySelector('#albumTemplate').content.cloneNode(true);
      const albumContainer = container
      
      albumTemplate.querySelector('.card-title').textContent = albumData.title;
      albumTemplate.querySelector('.card-img').src = albumData.cover;
      
      //albumTemplate.querySelector('').textContent = albumData.release_date;

      albumContainer.appendChild(albumTemplate);
    })
  })
  addCardContainers();
}

//function addCardContainers(clonesCount) {
//  const cardTemplate = document.querySelector('#cardTemplate')
//  
//  for (let i = 0; i < 5; i++) {
//    const clonedCard = cardTemplate.content.cloneNode(true);
//    container.appendChild(clonedCard);
//  }
//}
//  
  
    const album = [homePageAlbum,homePageAlbum2,homePageAlbum3]

    albumCicle(homePageAlbum, div1)

    albumCicle(homePageAlbum2,div2)

  






  
//<div id="albumContainer"></div>
//  <template id="albumTemplate">
//  <div class="card">
//      <img src="" class="card-img" alt="" />
//      <p class="card-title"></p>
//      <p class="card-info"></
//  </div>
//</template>
//<template id="cardTemplate">
//  <div class="card">
//  </div>
//</template>