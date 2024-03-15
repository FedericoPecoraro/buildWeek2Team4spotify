let navbar = document.querySelector(".sticky-nav");
let main = document.querySelector(".main-content");
let library = document.querySelector(".library");
let friendBtn = document.querySelector('.users-hp');
let friendDiv = document.querySelector('.friend');

main.onscroll = function () {
    let scrolled = this.querySelector(".child-div-sroll").getBoundingClientRect().top;
    
    
    if (scrolled > -525) {
        navbar.style.backgroundColor = "transparent";
    } else {
        navbar.style.backgroundColor = "#121212";
    }
};

friendBtn.addEventListener('click', function () {
        friendDiv.classList.toggle('displayB');
        navbar.classList.toggle('widthNav');
        

});

