document.addEventListener('DOMContentLoaded', function () {
    // Function to fetch question data from Open Trivia DB API
    function fetchQuestion() {
        return fetch('https://opentdb.com/api.php?amount=1&difficulty=easy&type=multiple')
            .then(response => response.json())
            .then(data => {
                if (data.results && data.results.length > 0) {
                    return {
                        question: data.results[0].question,
                        options: data.results[0].incorrect_answers.concat(data.results[0].correct_answer),
                        correctAnswer: data.results[0].correct_answer
                    };
                } else {
                    throw new Error('Invalid response from the API');
                }
            })
            .catch(error => {
                console.error('Error fetching question:', error);
                return null;
            });
    }

    // Function to display question and options
    function displayQuestion(questionData) {
        const questionContainer = document.getElementById('questionContainer');
        const questionElement = document.createElement('div');
        questionElement.innerHTML = `<p>${questionData.question}</p>`;

        // Display options
        questionData.options.forEach((option, index) => {
            const optionButton = document.createElement('button');
            optionButton.innerText = option;
            optionButton.addEventListener('click', () => handleAnswer(option, questionData.correctAnswer));
            questionElement.appendChild(optionButton);
        });

        questionContainer.innerHTML = '';
        questionContainer.appendChild(questionElement);
    }

    // Fetch and display the first question
    function startGame() {
        fetchQuestion().then(questionData => {
            if (questionData) {
                displayQuestion(questionData);
                // Start the timer or any other game logic here
            }
        });
    }

    // Call the startGame function to initiate the game
    startGame();

    // Timer (example)
    const timerElement = document.getElementById('timer');
    let timerSeconds = 60;
    let timerInterval = setInterval(function () {
        timerElement.innerText = timerSeconds;
        if (timerSeconds === 0) {
            clearInterval(timerInterval);
            // Handle timeout (example)
            alert('Time is up!');
        }
        timerSeconds--;
    }, 1000);
});
