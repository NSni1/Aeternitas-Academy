class HomePage {
    #Object;
    #scrollButton;

    constructor(id, schoolsPageTop) {
        this.#Object = document.getElementById(id);
        this.#scrollButton = this.#Object.querySelector("button[data-desc=\"navTo#schools\"]");
        this.#scrollButton.addEventListener("click", () => {
            window.scrollTo({top: schoolsPageTop, behavior: "smooth"});
        });
    }
};

class SchoolsPage {
    #Object;
    #title;
    #desc;
    #clsButton;
    #lButton;
    #lButtonOn;
    #rButton;
    #rButtonOn;
    #grid;
    #gridFrames;
    #gridIndex;
    #gridMaxIndex;

    constructor(id) {
        /* BEGIN -- DEFINITION OF PROPERTIES */
        // HTML Object
        this.#Object = document.getElementById(id);
        const mainProperties = this.#Object.querySelectorAll("*[data-who='schoolsMainProps']");
        this.#clsButton = mainProperties[0];
        this.#title = mainProperties[1];
        this.#desc = mainProperties[2];

        const buttons = this.#Object.getElementsByClassName("lr-button");
        this.#lButton = buttons[0];
        this.#lButtonOn = false;
        this.#rButton = buttons[1];
        this.#rButtonOn = true; // The schools grid is initially max-scrolled to the left, so naturally the right navigation button should be on (since there are frames on the right)

        // Schools Navigation Grid
        this.#grid = this.#Object.querySelector("#schoolsGrid");
        this.#gridFrames = this.#grid.children;
        this.#gridIndex = 0;
        this.#gridMaxIndex = this.#gridFrames.length - 1;

        /* END -- DEFINITION OF PROPERTIES */

        /* BEGIN -- EVENT LISTENERS */
        this.#lButton.addEventListener("click", () => {
            if (this.#lButtonOn) {
                this.#gridFrames[this.#gridIndex].classList.remove("active");
                this.#gridFrames[--this.#gridIndex].classList.add("active");

                if (this.#gridIndex === 0) {
                    this.#lButton.classList.add("disabled");
                    this.#lButtonOn = false;
                }
                if (this.#gridIndex < this.#gridMaxIndex) {
                    this.#rButton.classList.remove("disabled");
                    this.#rButtonOn = true;
                }
            }
        });

        this.#rButton.addEventListener("click", () => {
            if (this.#rButtonOn) {
                this.#gridFrames[this.#gridIndex].classList.remove("active");
                this.#gridFrames[++this.#gridIndex].classList.add("active");

                if (this.#gridIndex === this.#gridMaxIndex) {
                    this.#rButton.classList.add("disabled");
                    this.#rButtonOn = false;
                }
                if (this.#gridIndex > 0) {
                    this.#lButton.classList.remove("disabled");
                    this.#lButtonOn = true;
                }
            }
        });

        Array.from(this.#gridFrames).forEach((element) => {
            Array.from(element.children).forEach((schoolButton) => {
                schoolButton.addEventListener("click", () => {
                    this.#Object.setAttribute("data-school", schoolButton.innerText);
                    this.#title.innerHTML = 
                        schoolButton.getAttribute("data-school-name")
                        .concat(`<br>${schoolButton.getAttribute("data-school-subject")}`);
                    this.#desc.innerText = schoolButton.getAttribute("data-school-desc");
                    this.#clsButton.classList.remove("hidden");
                });
            });
        });

        this.#clsButton.addEventListener("click", () => {
            this.#Object.setAttribute("data-school", "\\change\\");
            this.#title.innerHTML = "Schools";
            this.#desc.innerText = "Pick the right choice to pursue your dreams";
            this.#clsButton.classList.add("hidden");
        });
        /* END -- EVENT LISTENERS */
    }

    get top() {
        return this.#Object.getBoundingClientRect().top + window.scrollY;
    }
};

const schoolsPageInstance = new SchoolsPage("schools");
const homePageInstance = new HomePage("home", schoolsPageInstance.top);
