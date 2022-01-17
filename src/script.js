var containBurger = document.querySelector('.menu-btn');
var sideBar = document.getElementById('sidebar');
var body = document.getElementsByTagName("body")[0];
let menuOpen = false;


containBurger.addEventListener('click', showSidebar);

function showSidebar() {
    sideBar.classList.toggle('sidebar-style');
    sideBar.classList.toggle('sidebar-show');
    body.classList.toggle('body-overflow');

    if (!menuOpen) {
        containBurger.classList.add('open');
        menuOpen = true;        
    } else {
        containBurger.classList.remove('open');
        menuOpen = false;
    }
}