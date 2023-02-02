import { contentScroll } from "./content.mjs";
import { schoolPos as pos } from "./schools.mjs";

// const homepage = document.getElementById("home");
const scrollButton = document.getElementById("home-scroll");

const scrollBtnHandler = () => {
    contentScroll(y = pos.y);
}

scrollButton.addEventListener("click", scrollBtnHandler);
