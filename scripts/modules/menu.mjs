const menu = document.getElementById("menu");
const openButton = document.getElementById("openMenu");
const closeButton = menu.firstElementChild;

const openHandler = () => {
    menu.classList.replace("menu-hide", "menu-show");
}

const closeHandler = () => {
    menu.classList.replace("menu-show", "menu-hide");
}

openButton.addEventListener(openHandler);
closeButton.addEventListener(closeHandler);
