class Menu {
    #Object;
    #clsButton;
    #opnButton;

    constructor(id) {
        this.#Object = document.getElementById(id);
        this.#opnButton = document.getElementById("openMenu");
        this.#clsButton = this.#Object.firstElementChild;

        this.#clsButton.addEventListener("click", () => {
            this.#Object.classList.replace("menu-show", "menu-hide");
        });

        this.#opnButton.addEventListener("click", () => {
            this.#Object.classList.add("menu-show");
            this.#opnButton.removeEventListener("click", this);
            this.#opnButton.addEventListener("click", () => {
                this.#Object.classList.replace("menu-hide", "menu-show");
            });
        });
    }
};

class Content {
    #Object;

    constructor(id) {
        this.#Object = document.getElementById(id);
    }

    scrollTo(x = 0, y = 0) {
        this.#Object.scrollTo({top: x, left: y, behavior: "smooth"});
    }
};

class HomePage {
    #Object;
    #scrollButton;

    constructor(id, contentInstance, schoolsPageTop) {
        this.#Object = document.getElementById(id);
        this.#scrollButton = this.#Object.querySelector("button[data-desc=\"navTo#schools\"]");

        this.#scrollButton.addEventListener("click", () => {
            contentInstance.scrollTo(schoolsPageTop);
        });
    }
};

class SchoolsPage {
    // Page containing information related to school
    #Object;

    // Name of school
    #name;

    // Subject of school
    #subject;

    // Description of school
    #desc;

    // Pre-made texts for title and description
    #texts;

    // Hides current school frame and shows the previous one
    #lButton;

    // Keep track of whether lButton is enabled or not
    #lButtonOn;

    // Hides current school frame and shows the next one
    #rButton;

    // Keep track of whether rButton is enabled or not
    #rButtonOn

    // Navigation grid (TODO: rename)
    #grid;

    // Elements containing buttons representing each school
    #gridFrames;

    // Index for the currently shown school frame
    #gridIndex;

    // Bookkeeping variable equivalent to ((amount of grid frames) - 1)
    #gridMaxIndex;

    // Bookkeeping variable to keep track of the currently active school page
    #gridState;

    constructor(id) {
        /* BEGIN [Definition of Properties] */
        this.#Object = document.getElementById(id);
        
        [this.#name, this.#subject, this.#desc] = [... this.#Object.querySelectorAll("span[data-who='sch-property']")]; // This is called "spread syntax"

        this.#texts = [
            ["Artenitas", "Arts", "Lorem ipsum dolor sit amet"],
            ["Businesitas", "Business", "Lorem ipsum dolor sit amet"],
            ["Aeducas", "Education", "Lorem ipsum dolor sit amet"],
            ["Agnertas", "Engineering", "Lorem ipsum dolor sit amet"]
        ]; // 2D Array

        [this.#lButton, this.#rButton] = [... this.#Object.getElementsByClassName("lr-button")];

        this.#lButtonOn = false;
        this.#rButtonOn = true; // There is more than one frame, so initially, there is a "next" frame

        this.#grid = this.#Object.querySelector("#schoolsGrid");
        this.#gridFrames = this.#grid.children;
        this.#gridIndex = 0;
        this.#gridMaxIndex = this.#gridFrames.length - 1;
        this.#gridState = 0; // No active school page

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

        for (let frameIndex = 0; frameIndex < this.#gridFrames.length; ++frameIndex) {
            const buttons = this.#gridFrames[frameIndex].children;
            for (let buttonIndex = 0; buttonIndex < buttons.length; ++buttonIndex) {
                const button = buttons[buttonIndex];
                // '+' is a unary operator that converts its sole argument to a number if possible
                const schoolIndex = +(button.getAttribute("data-school-index"));
                
                button.addEventListener("click", () => {
                    if (this.#gridState > 0) {
                        if (this.#gridState === schoolIndex)
                            return;
                        this.#Object.removeAttribute("data-school");
                        console.log("Unit Test #1: Object's attribute, data-school, removed.");
                    }
                    else
                        this.#gridState = schoolIndex;
                    
                    this.#Object.setAttribute("data-school", button.getAttribute("data-school-subject"));
                });
            }
        }

        // this.#clsButton.addEventListener("click", () => {
        //     this.#Object.removeAttribute("data-school");
        //     this.#title.innerHTML = "Schools";
        //     this.#desc.innerText = "Pick the right choice to pursue your dreams";
        //     this.#clsButton.classList.add("hidden");
        // });
        /* END -- EVENT LISTENERS */
    }

    get top() {
        return this.#Object.getBoundingClientRect().top + window.scrollY;
    }
};

const contentInstance = new Content("content");
const schoolsPageInstance = new SchoolsPage("schools");
const homePageInstance = new HomePage("home", contentInstance, schoolsPageInstance.top);
const menuInstance = new Menu("menu");
