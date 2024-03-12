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
