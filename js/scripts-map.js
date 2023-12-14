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
    console.log(questions);
    return questions;
};

//sample console printing of name and questions from local storage
// getLocalStorageName();
// getLocalStorageQuestions();

//generate random questions with answers on an object array
const selectedQuestions = [];
let counter = 0;
let scoreCount = 0;

let getRandomQuestions = (questionsMap, answersMap, n) => {
    const questionsArray = Array.from(questionsMap.values());
    const answersArray = Array.from(answersMap.values());

    while (selectedQuestions.length < n && questionsArray.length > 0) {
        let object = {};
        let randomIndex = Math.floor(Math.random() * questionsArray.length);
        // console.log(randomIndex);
        let randomQuestion = questionsArray.splice(randomIndex, 1)[0];
        let answer = answersArray.splice(randomIndex, 1)[0];

        object["question"] = randomQuestion;
        object["answer"] = answer;
        selectedQuestions.push(object);
        // console.log(selectedQuestions)
        // console.log(object)
    }

    return selectedQuestions;
};

//call random questions into an array
const generateRandomQuestion = () => {
    getRandomQuestions(questions, answers, getLocalStorageQuestions());
    setNextQuestion(new Event("dummy"));
};

const setNextQuestion = (event) => {
    event.preventDefault();
    document.getElementById("question-header").textContent =
        selectedQuestions[counter]["question"];
    document.getElementById("answer-status").textContent = "";
    document.getElementById("next-question-button").classList.add("disabled");
    counter++;
};
const checkAnswer = (event, continentId) => {
    event.preventDefault();
    document.getElementById("next-question-button").classList.remove("disabled");
    if (counter == getLocalStorageQuestions()) {
        document
            .getElementById("next-question-button")
            .setAttribute("onclick", "showResults(event);");
        document
            .getElementById("next-question-button").textContent="Show Results"
    }

    if (continentId == selectedQuestions[counter - 1]["answer"]) {
        document.getElementById("answer-status").textContent = "Success";
        document
            .getElementById("answer-status")
            .setAttribute("class", "card-text text-success mb-4");
        scoreCount++;
    } else {
        document.getElementById("answer-status").textContent = "Wrong!";
        document
            .getElementById("answer-status")
            .setAttribute("class", "card-text text-danger mb-4");
    }
};

const showResults = (event) => {
    event.preventDefault();
    console.log("Do score printing here");
}