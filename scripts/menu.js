const menu = document.getElementById("menu");
const menuChildren = document.get
const openButton = document.getElementById("openMenu");
const closeButton = menu.firstElementChild;

const menuAnimation = new Animation(new KeyframeEffect(menu, [
    {
        top: "-100vh"
    },
    {
        top: "0vh"
    }
], { duration: 500, easing: "ease-out", fill: "forwards" }), document.timeline);

const menuChildrenAnimation = new Animation(new KeyframeEffect(menuChildren, [
    {

    }
]))

const openHandler = () => {
    console.log("Hello, World!");
    menuAnimation.updatePlaybackRate(1);
    menuAnimation.play();
}

const closeHandler = () => {
    menuAnimation.updatePlaybackRate(-1);
    menuAnimation.play();
}

openButton.addEventListener("click", openHandler);
closeButton.addEventListener("click", closeHandler);
