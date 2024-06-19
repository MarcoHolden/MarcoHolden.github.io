// const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

// let interval = null;

// const screens = document.querySelectorAll(".screen");

// screens.forEach(screen => {
//   const name = screen.querySelector(".name");

//   screen.onmouseenter = event => {  
//     let iteration = 0;

//     clearInterval(interval);

//     interval = setInterval(() => {
//       name.innerText = name.innerText
//         .split("")
//         .map((letter, index) => {
//           if (index < iteration) {
//             return name.dataset.value[index];
//           }

//           return letters[Math.floor(Math.random() * 26)];
//         })
//         .join("");

//       if (iteration >= name.dataset.value.length) { 
//         clearInterval(interval);
//       }

//       iteration += 1 / 3;
//     }, 30);
//   };
// });


document.addEventListener("DOMContentLoaded", function() {
    const projects = [
        {
            image: "project1.png",
            name: "Project 1",
            link: "https://github.com/MarcoHolden/FinalGame",
            linkText: "Platformer",
            primaryRgb: "222 49 99", // Example color for Project 1
            backRgb: "255 192 203",
            photo: "pinkbackground.jpg"
        },
        {
            image: "twitter-project2.png",
            name: "Project 2",
            link: "https://github.com/MarcoHolden/twitter-cloneTwo",
            linkText: "Twitter-Clone",
            primaryRgb: "30 187 215",
            backRgb: "173 216 230",
            // backRgb: "113 199 236",
            photo: "twitterbackground.jpg",
        },
        {
            image: "project3.png",
            name: "Project 3",
            link: "https://github.com/MarcoHolden/HooHacks-2024",
            linkText: "Community Builder",
            primaryRgb: "119 248 134", // Example color for Project 2
            backRgb: "212 253 217",
            photo: "greenBackground.jpg",
        },
        {
            image: "project4.jpeg",
            name: "Project 4",
            link: "https://github.com/MarcoHolden/PicassoProject",
            linkText: "Picasso",
            primaryRgb: "87 89 91", 
            backRgb: "207 208 209",
            photo: "grayBackground.jpg",
        },
        {
            image: "project5.png",
            name: "Project 5",
            link: "https://github.com/MarcoHolden/StableDiffusionApp/tree/main",
            linkText: "AI App",
            primaryRgb: "56 100 29", 
            backRgb: "159, 226, 191",
            photo: "lightGreenBackground.jpg",
        },
        {
            image: "project6.png",
            name: "Project 6",
            link: "https://github.com/MarcoHolden/PersonalWebsite",
            linkText: "This Website",
            primaryRgb: "139 0 0", 
            backRgb: "255 71 76",
            photo: "redBackGround.jpg",
        },
        // Add more projects as needed
    ];

    let currentProjectIndex = 0;

    const screenImage = document.querySelector(".screen-image");
    const screenshot = document.querySelector(".screenshot");
    const projectName = document.querySelector(".screen-user .name");
    const projectLink = document.querySelector(".screen-user .link");
    const backgroundphoto = document.querySelector(".screen > .screen-image");
    const rootStyles = document.documentElement.style;

    function updateScreen() {
        const project = projects[currentProjectIndex];
        screenshot.src = project.image;
        projectName.textContent = project.name;
        projectLink.href = project.link;
        projectLink.textContent = project.linkText;
        rootStyles.setProperty("--primary-rgb", project.primaryRgb);
        rootStyles.setProperty("--background-rgb", project.backRgb);
        screenImage.style.backgroundImage = `url(${project.photo})`;
    }

    document.getElementById("nextBtn").addEventListener("click", function() {
        currentProjectIndex = (currentProjectIndex + 1) % projects.length;
        updateScreen();
    });

    document.getElementById("backBtn").addEventListener("click", function() {
        currentProjectIndex = (currentProjectIndex - 1 + projects.length) % projects.length;
        updateScreen();
    });

    updateScreen();
});
