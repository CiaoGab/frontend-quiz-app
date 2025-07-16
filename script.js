//Header Elements
const toggle = document.getElementById('darkmode-toggle');
const headerSubjectElement = document.querySelector('.subject-list')
const headerSubjectElementBackground = document.getElementById('header-icon');
const headerSubjectImage = document.getElementById('icon-image');
const headerSubjectText = document.getElementById('header-subject-name');

//Question Area elements
const questionArea = document.querySelector('.title-container');
const questionBox = document.getElementById('question-box');
const questionTracker = document.getElementById('question-tracker')

//Options area elements
const optionsList = document.getElementById('options-list');
const optionElement = document.getElementsByClassName('subject-item');

//Submit, next button
const submitBtn = document.getElementById('submit-answer-btn');

//dynamic elements, score container
const errorContainer = document.querySelector('.error-container');
const resultsContainer = document.querySelector('.results-container');
const totalScore = document.getElementById('score-amount');
const playAgainBtn = document.querySelector('.play-again-btn') ;

let currentQuestionIndex = 0;
let score = 0;
let currentQuiz;
// fetch quiz data from JSON file
let allQuizData;

async function fetchQuizData() {
    try {
        const response = await fetch('./data.json');
        const myData = await response.json();

        allQuizData = myData.quizzes;
        
    } catch (error) {
        console.error('Error fetching quiz data:', error);
    }
}
fetchQuizData()

//loop to add event listener to each option
Array.from(optionElement).forEach(subject => {
    subject.addEventListener('click', () => {
       let subjectName = subject.textContent.trim();
        startQuiz(subjectName)
    })
});

//Start quiz function
const startQuiz = (name) => {
    currentQuiz = allQuizData.find(quiz => quiz.title === name);
    
    // Hide the initial "Pick a subject" paragraph
    questionArea.querySelector('p:last-of-type').style.display = 'none';

    questionTracker.style.visibility = 'visible';
    headerSubjectElement.style.visibility= 'visible';
    headerSubjectImage.src = currentQuiz.icon;
    headerSubjectText.textContent = currentQuiz.title;
    displayQuestion();
}


const displayQuestion = () => {
    let questionData = currentQuiz.questions[currentQuestionIndex];
    questionBox.textContent = questionData.question;
    questionTracker.textContent = `Question ${currentQuestionIndex + 1} of ${currentQuiz.questions.length}`;
    optionsList.innerHTML = '';
    questionData.options.forEach((option, index) => {
        let newAnswer = document.createElement('li');
        newAnswer.classList.add('subject-item', 'answer-option');
        
        const letters = ['A', 'B', 'C', 'D'];

        // Create the letter span
        const letterSpan = document.createElement('span');
        letterSpan.classList.add('option-letter');
        letterSpan.textContent = letters[index];

        // Create the option text paragraph
        const optionText = document.createElement('p');
        optionText.classList.add('option-text');
        optionText.textContent = option; // Use .textContent to safely display the text

        // Add the new elements to the list item
        newAnswer.appendChild(letterSpan);
        newAnswer.appendChild(optionText);

        optionsList.appendChild(newAnswer);

        // Your existing event listener for selecting an answer goes here
        newAnswer.addEventListener('click', () => {
            let findSelected = document.querySelector('.answer-option.selected');
            if (findSelected) {
                findSelected.classList.remove('selected');
            }
            newAnswer.classList.add('selected');
        });
    });
    submitBtn.style.visibility = 'visible';
    submitBtn.textContent = 'Submit Answer';
}


//correct and incorrect logic
const checkAnswer = () => {
    if (submitBtn.textContent === 'Submit Answer') {
        let selectedAnswer = document.querySelector('.selected')
        if (selectedAnswer === null) {
            let errorMessage = document.createElement('p');
            errorMessage.textContent = 'Please select an answer';
            errorMessage.classList.add('no-choice-error');
            errorContainer.appendChild(errorMessage);
            return
        } else {
            const userAnswer = selectedAnswer.querySelector('.option-text').textContent;
            if (userAnswer === currentQuiz.questions[currentQuestionIndex].answer) {
                selectedAnswer.classList.add('correct');
                score ++;
            } else {
                // If the answer is incorrect, mark the user's selection as 'incorrect'
                selectedAnswer.classList.add('incorrect');

                
                const correctAnswerText = currentQuiz.questions[currentQuestionIndex].answer;
                const allOptions = optionsList.querySelectorAll('.answer-option');
                
                // Loop through all the options to find the correct one
                allOptions.forEach(optionElement => {
                    const optionText = optionElement.querySelector('.option-text').textContent;
                    if (optionText === correctAnswerText) {
                        // Apply the 'correct' class to the right answer
                        optionElement.classList.add('correct');
                    }
                });
               
            }
            submitBtn.textContent = 'Next Question';
            optionsList.classList.add('disabled');
        }
        
    } else {
        currentQuestionIndex++;
        if (currentQuestionIndex < currentQuiz.questions.length) {
            displayQuestion();
            optionsList.classList.remove('disabled');
            submitBtn.textContent = 'Submit Answer';
            let existingError = document.querySelector('.no-choice-error');
            if (existingError) {
                existingError.remove();
            }
            
        } else {
            showResults();
        }
    }
}

//event listener for button click
submitBtn.addEventListener('click', checkAnswer)

const showResults = () => {
    questionArea.style.display = 'none';
    optionsList.style.display = 'none';
    submitBtn.style.display = 'none';
    resultsContainer.style.display = 'block';
    
  
    let subjectImage = resultsContainer.querySelector('img');
    subjectImage.src = currentQuiz.icon;
    let subjectText = resultsContainer.querySelector('p');
    subjectText.textContent = currentQuiz.title;
    
  
    totalScore.innerHTML = score;
    
    
    playAgainBtn.addEventListener('click', () => {
        location.reload();
    });
}

const applySavedTheme = () => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        document.body.classList.add('dark-mode');
        toggle.checked = true;
    } else {
        document.body.classList.remove('dark-mode');
        toggle.checked = false;
    }
};

// Event listener for the toggle switch
toggle.addEventListener('change', () => {
  document.body.classList.toggle('dark-mode');

  if (document.body.classList.contains('dark-mode')) {
    localStorage.setItem('theme', 'dark');
  } else {
    localStorage.setItem('theme', 'light');
  }
});
applySavedTheme();