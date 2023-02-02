import { getScrollTop as gST } from "./content.mjs";

const school = document.getElementById("schools");
const [name, subject, description] = [... school.querySelectorAll("span[data-who='sch-property']")]
const texts = {
    '1': {
        name: "Artenitas",
        subject: "Arts",
        description: "Lorem ipsum"
    },
    '2': {
        name: "Businesitas",
        subject: "Business",
        description: "Lorem ipsum"
    },
    '3': {
        name: "Aeducas",
        subject: "Education",
        description: "Lorem ipsum"
    },
    '4': {
        name: "Agnertas",
        subject: "Engineering",
        description: "Lorem ipsum"
    }
};
const [lButton, rButton] = [... school.getElementsByClassName("lr-button")];
const [lButtonEnabled, rButtonEnabled] = [false, true];

const schoolsContainer = school.querySelector("#schools-container");
const schoolsContainerIndex = 0;
const schoolsContainerMaxIndex = schoolsContainer.length - 1;
const schoolsFramesInnerIndex = '0';
const schoolsFrames = schoolsContainer.children;

const lButtonHandler = () => {
    schoolsContainer[schoolsContainerIndex].classList.remove("active");
    schoolsContainerIndex -= 1;
    schoolsContainer[schoolsContainerIndex].classList.add("active");

    if (!schoolsContainerIndex) {
        lButton.classList.add("disabled");
        lButtonEnabled = false;
    }
    if (schoolsContainerIndex < schoolsContainerMaxIndex) {
        rButton.classList.remove("disabled");
        rButtonEnabled = true;
    }
};

const rButtonHandler = () => {
    schoolsContainer[schoolsContainerIndex].classList.remove("active");
    schoolsContainerIndex += 1;
    schoolsContainer[schoolsContainerIndex].classList.add("active");

    if (schoolsContainerIndex > 0) {
        lButton.classList.remove("disabled");
        lButtonEnabled = true;
    }
    if (schoolsContainerIndex === schoolsContainerMaxIndex) {
        rButton.classList.add("disabled");
        rButtonEnabled = false;
    }
};

Array.from(schoolsFrames).forEach((element) => {
    Array.from(element.children).forEach((school) => {
        const schoolIndex = school.getAttribute("data-school-index");

        school.addEventListener("click", () => {
            if (schoolsFramesInnerIndex === schoolIndex)
                return;
            schoolsFramesInnerIndex = schoolIndex;
            school.removeAttribute("data-school");

            const text = texts[schoolIndex];
            name.innerText = text.name;
            subject.innerText = text.subject;
            description.innerText = text.description;

            school.setAttribute("data-school", text.subject);
        });
    });
});

export const schoolPos = {
    y: school.getBoundingClientRect().top + gST()
};
