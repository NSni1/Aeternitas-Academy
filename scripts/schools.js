const school = document.getElementById("schools");
const backBtn = school.querySelector("#schoolsBackBtn");
const schoolsTitleDesc = school.querySelector("#schools-titledesc");
const schoolInfoContainer = school.querySelector("#sch-properties-container");
const [name, subject, description] = [... school.querySelectorAll("span[data-who='sch-property']")]
const texts = {
    '1': {
        name: "Artenitas",
        subject: "Arts",
        description: "Lorem ipsum",
        background: "url('./assets/asbg.jpg')"
    },
    '2': {
        name: "Businesitas",
        subject: "Business",
        description: "Lorem ipsum",
        background: "none"
    },
    '3': {
        name: "Aeducas",
        subject: "Education",
        description: "Lorem ipsum",
        background: "none"
    },
    '4': {
        name: "Agnertas",
        subject: "Engineering",
        description: "Lorem ipsum",
        background: "none"
    }
};
const [lButton, rButton] = [... school.getElementsByClassName("lr-button")];
let [lButtonEnabled, rButtonEnabled] = [false, true];

const schoolsContainer = school.querySelector("#schools-container");
const schoolsFrames = schoolsContainer.children;
let schoolsFramesIndex = 0;
const schoolsFramesMaxIndex = schoolsFrames.length - 1;
let schoolsFramesInnerIndex = '0';

const animateBackBtnIn = () => {
    let start;
    window.requestAnimationFrame(function callback(time) {
        if (typeof(start) === "undefined")
            start = time;
        const elapsed = time - start;

        const change = Math.min(0 + (elapsed / 500), 1);
        backBtn.style.opacity = change;
        if (change !== 1)
            window.requestAnimationFrame(callback);
    });
};

const animateBackBtnOut = () => {
    backBtn.style.opacity = 0;
};

const animateSchoolIn = () => {
    backBtn.style.opacity = 0;
    backBtn.style.backgroundPositionY = "40%";

    let start;
    window.requestAnimationFrame(function callback(time) {
        if (typeof(start) === "undefined")
            start = time;
        const elapsed = time - start;

        /*
        Linear Interpolation Formula: y1 + (x - x1) * ((y2 - y2) / (x2 - x1))
        We have the following data set: (0, 0), (500, 1)
        x as time and y as opacity value

        Applied Formula: 0 + (x - 0) * ((1 - 0)/(500 - 0))
        Simplified: x * (1/500) = x * 0.0002

        Proof:
            Let x represent time and y represent the opacity value
            We know when x = 500, y = 1
            With that, we can deduce that when x = 250 (500 / 2), y = 0.5 (1 / 2)

            The formula would be correct if and only if when x = 250, y = 0.5:
            y   = 0 + (250 - 0) * ((1 - 0) / (500 - 0))
                = 250 * (1/500)
                = 250 * (0.0002)
                = 0.5
        */
        const opacityChange = Math.min(elapsed * 0.0002, 1);
        /*
            (0, 40), (500, 50)

            40 + (x - 0) * ((50 - 40) / (500 - 0))
            40 + x * (10 / 500)
            40 + x * 0.0002
        */
        const bgPosChange = Math.min(40 + elapsed * 0.002, 50);

        school.style.opacity = opacityChange;
        school.style.backgroundPositionY = bgPosChange + '%';

        if (elapsed < 500)
            window.requestAnimationFrame(callback);
    });
};

const schoolOut = new Animation(new KeyframeEffect(school, [
    {
        opacity: 0
    },
    {
        opacity: 1
    }
], { duration: 500, easing: "ease-out", fill: "forwards" }));

const schoolInfoIn = new Animation(new KeyframeEffect(schoolInfoContainer, [
    {
        opacity: 0,
        transform: "translateY(5%)"
    },
    {
        opacity: 1,
        transform: "translateY(0%)"
    }
], { duration: 500, easing: "ease-out", fill: "forwards"}));

const schoolInfoOut = new Animation(new KeyframeEffect(schoolInfoContainer, [
    {
        opacity: 1
    },
    {
        opacity: 0
    }
], { duration: 0, fill: "forwards" }));

const schoolsTitleDescIn = new Animation(new KeyframeEffect(schoolsTitleDesc, [
    {
        opacity: 1
    },
    {
        opacity: 0
    }
], { duration: 0, easing: "ease-out", fill: "forwards" }));

const schoolsTitleDescOut = new Animation(new KeyframeEffect(schoolsTitleDesc, [
    {
        opacity: 0
    },
    {
        opacity: 1
    }
], { duration: 500, easing: "ease-out", fill: "forwards" }));

const lButtonHandler = () => {
    schoolsFrames[schoolsFramesIndex].classList.remove("active");
    schoolsFrames[--schoolsFramesIndex].classList.add("active");

    if (!schoolsFramesIndex) {
        lButton.classList.add("disabled");
        lButtonEnabled = false;
    }
    if (schoolsFramesIndex < schoolsFramesMaxIndex) {
        rButton.classList.remove("disabled");
        rButtonEnabled = true;
    }
};


const rButtonHandler = () => {
    schoolsFrames[schoolsFramesIndex].classList.remove("active");
    schoolsFrames[++schoolsFramesIndex].classList.add("active");

    if (schoolsFramesIndex > 0) {
        lButton.classList.remove("disabled");
        lButtonEnabled = true;
    }
    if (schoolsFramesIndex === schoolsFramesMaxIndex) {
        rButton.classList.add("disabled");
        rButtonEnabled = false;
    }
};

lButton.addEventListener("click", lButtonHandler);
rButton.addEventListener("click", rButtonHandler);


const triggerSchoolTransition = (state) => {
    console.log(state);
    if (state) {
        animateBackBtnIn();
        schoolsTitleDescIn.play();
        schoolInfoIn.play();
        schoolIn.play();
    }
    else {
        schoolOut.play();
        animateBackBtnOut();
        schoolInfoOut.play();
        schoolsTitleDescOut.play();

        schoolsFramesInnerIndex = '0';
        school.style.backgroundImage = "none";
    }
};

Array.from(schoolsFrames).forEach((element) => {
    Array.from(element.children).forEach((schoolBtn) => {
        const schoolIndex = schoolBtn.getAttribute("data-school-index");

        schoolBtn.addEventListener("click", () => {
            if (schoolsFramesInnerIndex === schoolIndex) {
                return;
            }
            schoolsFramesInnerIndex = schoolIndex;

            const text = texts[schoolIndex];
            name.innerText = text.name;
            subject.innerText = text.subject;
            description.innerText = text.description;

            school.style.backgroundImage = text.background;
            
            triggerSchoolTransition(1);
        });
    });
});

backBtn.addEventListener("click", () => {
    triggerSchoolTransition(0);
});

const schoolPos = {
    y: school.getBoundingClientRect().top + getScrollTop()
};
