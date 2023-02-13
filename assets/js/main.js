document.querySelectorAll('.carousel-item')[0].classList.add("active");
// ajout de la classe "active" au premier élément du carroussel


var burgerMenu = document.getElementById('burger-menu');
var overlay = document.getElementById('menu');
burgerMenu.addEventListener('click', function () {
    this.classList.toggle("close");
    overlay.classList.toggle("overlay");
})
// pour activer le menu burger

let scrollTopButton = document.getElementById('scrollTop')
scrollTopButton.addEventListener('click', scrollTop)
function scrollTop() {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
}
// bouton pour revenir en haut de la page


