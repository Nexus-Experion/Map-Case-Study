let questions = new Map([
    [1, "Which continent is India part of?"],

    [2, "Which is the largest continent in area?"],

    [3, "Which is the smallest continent in area?"],

    [4, "Which continent is also called as an 'Island-Continent'?"],

    [
        5,
        "The largest mountain in the world, Mount Everest is situated in which continent?",
    ],

    [6, "On Which Continent Is Egypt?"],

    [7, "On which continent can you find France?"],

    [8, "Which is the Second biggest continent of the world?"],

    [9, "Columbus found which continent?"],

    [10, "Where is Amazon River?"],
]);
let answers = new Map([
    [1, "Asia"],
    [2, "Asia"],
    [3, "Australia"],
    [4, "Australia"],
    [5, "Asia"],
    [6, "Africa"],
    [7, "Europe"],
    [8, "Africa"],
    [9, "North America"],
    [10, "South America"],
]);

const selectedQuestions = [];
let counter = 0;
let scoreCount = 0;

//condition checker
let moveToNextPage = () => {
    var nameInputValue = document.getElementById("firstName").value;
    var selectFieldValue = document.getElementById("number").value;
    if (nameInputValue !== "" && selectFieldValue !== "") {
        window.location.href = 'map.html';
    } else {
        alert("Please fill out all fields before moving to the next page.");
    }
}

//Adding name and question number to Local Storage
const setLocalStorage = () => {
    let name = document.getElementById("firstName").value;
    let noOfQuestions = document.getElementById("number").value;
    localStorage.setItem("name", name);
    localStorage.setItem("questions", noOfQuestions);
};

//get name from Local Storage
const getLocalStorageName = () => {
    let name = localStorage.getItem("name");
    console.log(name);
    return name;
};

//get number of questions from Local Storage
const getLocalStorageQuestions = () => {
    let questions = localStorage.getItem("questions");
    return questions;
};

//generate random questions with answers on an object array
const getRandomQuestions = (questionsMap, answersMap, noOfQuestions) => {
    const questionsArray = Array.from(questionsMap.values());
    const answersArray = Array.from(answersMap.values());

    while (selectedQuestions.length < noOfQuestions && questionsArray.length > 0) {
        let object = {};
        let randomIndex = Math.floor(Math.random() * questionsArray.length);
        let randomQuestion = questionsArray.splice(randomIndex, 1)[0];
        let answer = answersArray.splice(randomIndex, 1)[0];

        object["question"] = randomQuestion;
        object["answer"] = answer;
        selectedQuestions.push(object);
    }

    return selectedQuestions;
};

//call random questions into an array and show first question
const initializeFirstQuestion = () => {
    getRandomQuestions(questions, answers, getLocalStorageQuestions());
    setNextQuestion(new Event("window"));
};


// Show the Next question to the user
const setNextQuestion = (event) => {
    event.preventDefault();
    let question = document.getElementById("question-header")
    question.classList.remove('animate')
    void question.offsetWidth  // Trigger reflow to restart the animation
    question.classList.add('animate')
    question.textContent = selectedQuestions[counter]["question"];
    document.getElementById("answer-status").classList.add("invisible");
    document.getElementById("next-question-button").classList.add("disabled");
    counter++;
    enableMap()
};


//Check if the user's Answer is right or wrong
const checkAnswer = (event, continentId) => {
    event.preventDefault();

    document.getElementById("next-question-button").classList.remove("disabled");
    // change button attributes on last question
    if (counter == getLocalStorageQuestions()) {
        document
            .getElementById("next-question-button")
            .setAttribute("onclick", "showResults(event);");
        document.getElementById("next-question-button").setAttribute("data-bs-toggle", "modal");
        document.getElementById("next-question-button").setAttribute("data-bs-target", "#resultModal");
        document
            .getElementById("next-question-button").textContent = "Show Results"
    }
    let answer = document.getElementById("answer-status")
    answer.classList.remove('animate')
    answer.classList.remove('invisible')
    void answer.offsetWidth
    if (continentId == selectedQuestions[counter - 1]["answer"]) {
        answer.textContent = "Correct";
        answer.setAttribute("class", "card-text text-success fw-bold animate");
        scoreCount++;
        correctSound.play();
    } else {
        answer.textContent = "Wrong!";
        answer.setAttribute("class", "card-text text-danger fw-bold animate");
        wrongSound.play();
    }
    disableMap() // Prevent multiple clicks to avoid spam.
};
// Functions for playing sound.
const correctSound = new Audio('./audios/correct.wav');
const wrongSound = new Audio('./audios/wrong.wav');
const hundredSound = new Audio('./audios/100sound.mp3');
function playCorrectSound() {
    correctSound.play();
}
function playWrongSound() {
    wrongSound.play();
}
function play100Sound() {
    hundredSound.play();
}

// Function to handle score display, check highscore 
const showResults = (event) => {
    event.preventDefault();

    let userName = getLocalStorageName();
    let percentage = Math.floor((scoreCount / getLocalStorageQuestions()) * 100)

    if (percentage == 100) {
        let modalHeader = document.getElementById('resultModalLabel');
        modalHeader.textContent = `Amazing ${userName}`;
        modalHeader.setAttribute("class", "text-success");
        let modalBody = document.getElementById('modal-body');
        modalBody.textContent = `You got ${percentage}%`;
        let resultGif = document.createElement("img");
        resultGif.setAttribute("src", "./images/pass100.gif");
        modalBody.appendChild(resultGif);
        hundredSound.play();
        //particles trial
        tsParticles
        .load({
            id: "resultModalLabel",
            url: "./js/particlesFireworks.json",
        })
        .then(container => {
            console.log("callback - tsparticles config loaded");
        })
        .catch(error => {
            console.error(error);
        })

    }
    //Display medium-result in modal
    else if (percentage >= 50) {
        let modalHeader = document.getElementById('resultModalLabel');
        modalHeader.textContent = `Congrats ${userName}`;
        modalHeader.setAttribute("class", "text-success");
        let modalBody = document.getElementById('modal-body');
        modalBody.textContent = `You got ${percentage}%`;
        let resultGif = document.createElement("img");
        resultGif.height = 350;
        resultGif.setAttribute("src", "./images/50pass.gif");
        modalBody.appendChild(resultGif);
        //particles trial
        tsParticles
            .load({
                id: "resultModalLabel",
                url: "./js/particles.json",
            })
            .then(container => {
                console.log("callback - tsparticles config loaded");
            })
            .catch(error => {
                console.error(error);
            });

    }
    // Display  low-result in modal
    else {
        let modalHeader = document.getElementById('resultModalLabel');
        modalHeader.textContent = `BadLuck ${userName}`;
        modalHeader.setAttribute("class", "text-danger");
        let modalBody = document.getElementById('modal-body');
        modalBody.textContent = `You got ${percentage}%`;
        let resultGif = document.createElement("img");
        resultGif.setAttribute("src", "./images/fail.gif");
        modalBody.appendChild(resultGif);
    }
    checkHighScore(percentage);




}

//Helper function to disable clicking, once an answer is selected
const disableMap = () => {
    let areaList = document.querySelector("map").querySelectorAll("area")
    areaList.forEach(area => area.removeAttribute("href"))
    areaList.forEach(area => area.removeAttribute("onclick"))
}

//Helper function to re-enable the disabled clickings
const enableMap = () => {
    let areaList = document.querySelector("map").querySelectorAll("area")
    areaList.forEach(area => area.setAttribute("href", ""))
    areaList.forEach(area => area.setAttribute("onclick", "checkAnswer(event,this.id);"))
}

//Function to get the High Score from the Local Storage
const getHighScoreLocal = () => {
    let highScore = localStorage.getItem("highScore");
    return highScore;
}
//get the local highscore username
const getHighScoreLocalUser = () => {
    let highScoreUser = localStorage.getItem("highScoreUser");
    return highScoreUser;
}

//Function to Set or Update the High Score in the Local Storage
const updateHighScoreLocal = (score, highScoreUser) => {
    localStorage.setItem("highScore", score);
    localStorage.setItem("highScoreUser", highScoreUser);
}

//Function used to check if Current percentage is new highscore
const checkHighScore = (percentage) => {
    let modalHighScore = document.getElementById('modal-highScore');
    modalHighScore.textContent="";
    if(getHighScoreLocal() == null){
        updateHighScoreLocal(percentage, getLocalStorageName());
        
        modalHighScore.append("You have the New High Score!!!");
    }

    else if (percentage > getHighScoreLocal()) {
        modalHighScore.append(`You beat ${getHighScoreLocalUser()}'s High Score!!!`);
        modalHighScore.setAttribute("class", "text-success");
        updateHighScoreLocal(percentage, getLocalStorageName());
    }
    else{
        modalHighScore.append(getHighScoreLocalUser() + " has the Current HighScore: " + getHighScoreLocal() + "%");
    }
}

