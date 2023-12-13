let questions = new Map([

    [1, "Which continent is India part of?"],

    [2, "Which is the largest continent in area?"],

    [3, "Which is the smallest continent in area?"],

    [4, "Which continent is also called as an 'Island-Continent'?"],

    [5, "The largest mountain in the world, Mount Everest is situated in which continent?"],

    [6, "On Which Continent Is Egypt?"],

    [7, "On which continent can you find France?"],

    [8, "Which is the Second biggest continent of the world?"],

    [9, "Columbus found which continent?"],

    [10, "Where is Amazon River?"]

]);

//Adding name and question number to Local Storage
const setLocalStorage=()=>{
        let name=document.getElementById('firstName').value;
        let noOfQuestions=document.getElementById('number').value;
        localStorage.setItem("name", name);
        localStorage.setItem("questions",noOfQuestions)

}
//get name from Local Storage

const getLocalStorageName=()=>{
        let name=localStorage.getItem('name');
        console.log(name);
        return name;
}
//get number of questions from Local Storage

const getLocalStorageQuestions=()=>{
    let questions=localStorage.getItem('questions');
    console.log(questions);
    return questions;
}

//sample console printing of name and questions from local storage
getLocalStorageName();
getLocalStorageQuestions();

//generate random questions 

const generateRandomQuestion=()=>{
    function getRandomQuestions(questionsMap, n) {
        const questionsArray = Array.from(questionsMap.values());
        const selectedQuestions = [];

        while (selectedQuestions.length < n && questionsArray.length > 0) {
            const randomIndex = Math.floor(Math.random() * questionsArray.length);
            const randomQuestion = questionsArray.splice(randomIndex, 1)[0];
            selectedQuestions.push(randomQuestion);
        }

        return selectedQuestions;
    }

// Example: Display 5 random questions
    let numberOfQuestions = getLocalStorageQuestions();
    const randomQuestions = getRandomQuestions(questions, numberOfQuestions);

    randomQuestions.forEach((question, index) => {
        console.log(`Question ${index + 1}: ${question}`);
    });
}