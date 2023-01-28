const homeBtn = document.querySelector("button[data-desc=\"navTo#schools\"]");
const schoolsPage = document.getElementById("schools");
const title = schoolsPage.querySelector(".text-9xl");
const desc = schoolsPage.querySelector(".text-7xl");
homeBtn.addEventListener("click", () => {
    window.scrollTo({top: schoolsPage.getBoundingClientRect().top, behavior: "smooth"});
}); // Manual implementation of smooth scrolling because scroll-behavior: smooth doesn't work (in Firefox, at least)

const lbutton = document.querySelector(".lr-button");
const rbutton = lbutton.nextElementSibling.nextElementSibling;

const schoolsGrid = document.getElementById("schoolsGrid");

const schoolFrames = schoolsGrid.children;
let currentSchoolIndex = 0;

const schoolFramesMaxIndex = schoolFrames.length - 1;

lbutton.addEventListener("click", () => {
    if (!lbutton.classList.contains("disabled")) {
        schoolFrames[currentSchoolIndex--].classList.remove("active");
        schoolFrames[currentSchoolIndex].classList.add("active");

        if (!currentSchool)
            lbutton.classList.add("disabled");
        if (currentSchool < schoolFramesMaxIndex)
            rbutton.classList.remove("disabled");
    }
});

rbutton.addEventListener("click", () => {
    if (!rbutton.classList.contains("disabled")) {
        schoolFrames[currentSchoolIndex++].classList.remove("active");
        schoolFrames[currentSchoolIndex].classList.add("active");

        if (currentSchoolIndex == schoolFramesMaxIndex)
            rbutton.classList.add("disabled");
        if (currentSchoolIndex > 0)
            lbutton.classList.remove("disabled");
    }
});

/* Registering all school buttons */
(() => {
    for (let idx = schoolFramesMaxIndex; idx >= 0; --idx) {
        const schoolFrameChildren = schoolFrames[idx].children;
        for (let idx2 = schoolFrameChildren.length - 1; idx2 >= 0; --idx2) {
            const schoolFrameChild = schoolFrameChildren[idx2];
            schoolFrameChild.addEventListener("click", () => {
                schoolsPage.setAttribute("data-school", schoolFrameChild.innerText);
                title.innerHTML = schoolFrameChild.getAttribute("data-school-name");
                desc.innerText = schoolFrameChild.getAttribute("data-school-desc");
            });
        }
    }
})();
