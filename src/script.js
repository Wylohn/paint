var menuWrapper = document.getElementById('menu');
var sideBar = document.getElementById('sidebar');
var body = document.getElementsByTagName("body")[0];

menuWrapper.addEventListener('click', showSidebar);

function showSidebar() {
    sideBar.classList.toggle('sidebar-style');
    sideBar.classList.toggle('sidebar-show');
    body.classList.toggle('body-overflow')
}