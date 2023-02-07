// const homepage = document.getElementById("home");
const scrollButton = document.getElementById("home-scroll");

const scrollBtnHandler = () => {
    contentScroll(0, schoolPos.y);
};

scrollButton.addEventListener("click", scrollBtnHandler);
