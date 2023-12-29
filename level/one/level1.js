document.addEventListener('DOMContentLoaded', function () {
    let points = 0;
    let questionsAttempted = 0;
    let timerInterval;

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
        questionElement.innerHTML = `<p class="question">${questionData.question}</p>`;

        const optionsList = document.createElement('ul');
        optionsList.className = 'options-list';

        // Display options in a vertical list
        questionData.options.forEach(option => {
            const optionItem = document.createElement('li');
            const optionButton = document.createElement('button');
            optionButton.innerText = option;
            optionButton.addEventListener('click', () => handleAnswer(option, questionData.correctAnswer));
            optionItem.appendChild(optionButton);
            optionsList.appendChild(optionItem);
        });

        questionContainer.innerHTML = '';
        questionContainer.appendChild(questionElement);
        questionContainer.appendChild(optionsList);
    }

    // Function to handle user's answer
    function handleAnswer(selectedOption, correctAnswer) {
        clearInterval(timerInterval);

        // Check if the answer is correct
        if (selectedOption === correctAnswer) {
            handleCorrectAnswer();
        } else {
            handleWrongAnswer(correctAnswer);
        }

        // Fetch and display the next question
        fetchAndDisplayNextQuestion();
    }

    // Function to handle correct answer
    function handleCorrectAnswer() {
        const timerElement = document.getElementById('timer');
        const timerSeconds = parseInt(timerElement.innerText);

        // Increment points based on timer
        const incrementPoints = timerSeconds > 30 ? 5 : 1;
        points += incrementPoints;

        // Update points
        updatePoints();

        // Show info modal for correct answer
        showInfoDialog(`Correct! You earned ${incrementPoints} points.`);
    }

    // Function to handle wrong answer
    function handleWrongAnswer(correctAnswer) {
        // Show error modal for wrong answer
        showErrorDialog(`Wrong! Correct answer is: ${correctAnswer}`);

        // Deduct points by -3
        decreasePointsByThree();
    }

    // Function to handle timeout
    function handleTimeout() {
        // Show error modal for timeout
        showErrorDialog('Time\'s up!');

        // Deduct points by -2
        decreasePointsByTwo();
    }

    // Function to decrease points by -3
    function decreasePointsByThree() {
        points -= 3;
        updatePoints();
    }

    // Function to decrease points by -2
    function decreasePointsByTwo() {
        points -= 2;
        updatePoints();
    }

    // Function to update points in local storage and header
    function updatePoints() {
        localStorage.setItem('points', points);
        updateHeader();
    }

    // Function to fetch and display the next question
    function fetchAndDisplayNextQuestion() {
        fetchQuestion().then(questionData => {
            if (questionData) {
                displayQuestion(questionData);
                startTimer();
            }
        });
    }

    // Function to start the timer
    function startTimer() {
        const timerElement = document.getElementById('timer');
        let timerSeconds = 60;
        timerInterval = setInterval(function () {
            timerElement.innerText = timerSeconds;
            if (timerSeconds === 0) {
                clearInterval(timerInterval);
                handleTimeout();
            }
            timerSeconds--;
        }, 1000);
    }

    // Function to update header with points and questions attempted
    function updateHeader() {
        const pointsElement = document.getElementById('points');
        pointsElement.innerText = `Points: ${points}`;

        const attemptedElement = document.getElementById('attempted');
        questionsAttempted++;
        attemptedElement.innerText = `Questions Attempted: ${questionsAttempted}`;
    }

    // Function to show an info modal
    function showInfoDialog(message) {
        const infoModal = createModal('info-modal', message);
        infoModal.classList.add('show');
    }

    // Function to show an error modal
    function showErrorDialog(message) {
        const errorModal = createModal('error-modal', message);
        errorModal.classList.add('show');
    }

    // Function to create a modal
    function createModal(className, message) {
        const modal = document.createElement('div');
        modal.className = `modal ${className}`;
        modal.innerHTML = `<p>${message}</p>`;
        document.body.appendChild(modal);

        // Close the modal after 3 seconds
        setTimeout(() => {
            modal.classList.remove('show');
            document.body.removeChild(modal);
        }, 3000);

        return modal;
    }

    // Handle user cheating (changing tab, opening Google Assistant, closing browser)
    window.addEventListener('blur', handleCheating);
    window.addEventListener('pagehide', handleCheating);

    function handleCheating() {
        showErrorDialog('No Cheating! Points deducted by -3');
        decreasePointsByThree();
    }

    // Fetch and display the first question to start the game
    fetchAndDisplayNextQuestion();
});
