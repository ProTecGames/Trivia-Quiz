document.addEventListener('DOMContentLoaded', function () {
    // Question data (Replace this with actual data from OpenTrivia DB)
    const questionData = {
        question: "What is the capital of India?",
        options: ["Uttar Pradesh", "Delhi", "Kerala", "Etawah"],
        correctAnswer: "Delhi"
    };

    // Display question and options
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

    questionContainer.appendChild(questionElement);

    // Increment 'Questions Attempted' count
    const attemptedElement = document.getElementById('attempted');
    const currentAttempted = parseInt(attemptedElement.innerText.split(": ")[1]);
    attemptedElement.innerText = `Questions Attempted: ${currentAttempted + 1}`;

    // Timer
    const timerElement = document.getElementById('timer');
    let timerSeconds = 60;
    let timerInterval = setInterval(function () {
        timerElement.innerText = timerSeconds;
        if (timerSeconds === 0) {
            clearInterval(timerInterval);
            handleTimeout(questionData.correctAnswer);
        }
        timerSeconds--;
    }, 1000);

    // Handle user's answer
    function handleAnswer(selectedOption, correctAnswer) {
        clearInterval(timerInterval);

        // Check if the answer is correct
        if (selectedOption === correctAnswer) {
            handleCorrectAnswer();
        } else {
            handleWrongAnswer(correctAnswer);
        }
    }

    // Handle correct answer
    function handleCorrectAnswer() {
        const pointsElement = document.getElementById('points');
        const currentPoints = parseInt(pointsElement.innerText.split(": ")[1]);
        const newPoints = timerSeconds > 30 ? currentPoints + 5 : currentPoints + 1;

        // Update points
        pointsElement.innerText = `Points: ${newPoints}`;

        // Update local storage with new points
        localStorage.setItem('points', newPoints);

        // Check if points are enough to go to the next level (e.g., 30 points)
        if (newPoints >= 30) {
            redirectToNextLevel();
        } else {
            // Display next question or redirect to the next level
            // (You can implement this logic based on your game flow)
        }
    }

    // Handle wrong answer
    function handleWrongAnswer(correctAnswer) {
        const alertDialog = createAlertDialog(`Wrong! Correct answer is: ${correctAnswer}`);
        document.body.appendChild(alertDialog);

        // Deduct points by -3
        decreasePointsByThree();

        // Display next question or redirect to the next level
        // (You can implement this logic based on your game flow)
    }

    // Handle timeout
    function handleTimeout(correctAnswer) {
        const alertDialog = createAlertDialog(`Time's up! Correct answer is: ${correctAnswer}`);
        document.body.appendChild(alertDialog);

        // Deduct points by -3
        decreasePointsByThree();

        // Display next question or redirect to the next level
        // (You can implement this logic based on your game flow)
    }

    // Deduct points by -3
    function decreasePointsByThree() {
        const pointsElement = document.getElementById('points');
        const currentPoints = parseInt(pointsElement.innerText.split(": ")[1]);
        const newPoints = currentPoints - 3;

        // Update points
        pointsElement.innerText = `Points: ${newPoints}`;

        // Update local storage with new points
        localStorage.setItem('points', newPoints);
    }

    // Redirect to the next level
    function redirectToNextLevel() {
        // You can implement the logic to determine the next level's URL
        const nextLevelURL = '../../level/two/two.html';
        window.location.href = nextLevelURL;
    }

    // Handle user cheating (changing tab, opening Google Assistant, closing browser)
    window.addEventListener('blur', handleCheating);
    window.addEventListener('focus', handleFocus);
    window.addEventListener('pagehide', handleCheating);

    function handleCheating() {
        const alertDialog = createAlertDialog('No Cheating! Points deducted by -3');
        document.body.appendChild(alertDialog);

        // Deduct points by -3
        decreasePointsByThree();
    }

    function handleFocus() {
        // Clear the alert dialog when focus is back on the window
        const alertDialog = document.querySelector('.alert-dialog');
        if (alertDialog) {
            alertDialog.style.display = 'none';
            document.body.removeChild(alertDialog);
        }
    }

    // Create an alert dialog
    function createAlertDialog(message) {
document.addEventListener('DOMContentLoaded', function () {
    // Function to fetch question data from Open Trivia DB API
    function fetchQuestion() {
        return fetch('https://opentdb.com/api.php?amount=1&difficulty=easy&type=multiple')
            .then(response => response.json())
            .then(data => {
                return {
                    question: data.results[0].question,
                    options: data.results[0].incorrect_answers.concat(data.results[0].correct_answer),
                    correctAnswer: data.results[0].correct_answer
                };
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

    // Function to handle user's answer
    function handleAnswer(selectedOption, correctAnswer) {
        clearInterval(timerInterval);

        // Check if the answer is correct
        if (selectedOption === correctAnswer) {
            handleCorrectAnswer();
        } else {
            handleWrongAnswer(correctAnswer);
        }
    }

    // Function to handle correct answer
    function handleCorrectAnswer() {
        const pointsElement = document.getElementById('points');
        const currentPoints = parseInt(pointsElement.innerText.split(": ")[1]);
        const newPoints = timerSeconds > 30 ? currentPoints + 5 : currentPoints + 1;

        // Update points
        pointsElement.innerText = `Points: ${newPoints}`;

        // Update local storage with new points
        localStorage.setItem('points', newPoints);

        // Check if points are enough to go to the next level (e.g., 30 points)
        if (newPoints >= 30) {
            redirectToNextLevel();
        } else {
            // Display next question or redirect to the next level
            // (You can implement this logic based on your game flow)
            fetchAndDisplayNextQuestion();
        }
    }

    // Function to handle wrong answer
    function handleWrongAnswer(correctAnswer) {
        const alertDialog = createAlertDialog(`Wrong! Correct answer is: ${correctAnswer}`);
        document.body.appendChild(alertDialog);

        // Deduct points by -3
        decreasePointsByThree();

        // Display next question or redirect to the next level
        // (You can implement this logic based on your game flow)
        fetchAndDisplayNextQuestion();
    }

    // Function to handle timeout
    function handleTimeout(correctAnswer) {
        const alertDialog = createAlertDialog(`Time's up! Correct answer is: ${correctAnswer}`);
        document.body.appendChild(alertDialog);

        // Deduct points by -3
        decreasePointsByThree();

        // Display next question or redirect to the next level
        // (You can implement this logic based on your game flow)
        fetchAndDisplayNextQuestion();
    }

    // Function to deduct points by -3
    function decreasePointsByThree() {
        const pointsElement = document.getElementById('points');
        const currentPoints = parseInt(pointsElement.innerText.split(": ")[1]);
        const newPoints = currentPoints - 3;

        // Update points
        pointsElement.innerText = `Points: ${newPoints}`;

        // Update local storage with new points
        localStorage.setItem('points', newPoints);
    }

    // Function to redirect to the next level
    function redirectToNextLevel() {
        // You can implement the logic to determine the next level's URL
        const nextLevelURL = '../../level/two/two.html';
        window.location.href = nextLevelURL;
    }

    // Function to handle user cheating (changing tab, opening Google Assistant, closing browser)
    window.addEventListener('blur', handleCheating);
    window.addEventListener('focus', handleFocus);
    window.addEventListener('pagehide', handleCheating);

    function handleCheating() {
        const alertDialog = createAlertDialog('No Cheating! Points deducted by -3');
        document.body.appendChild(alertDialog);

        // Deduct points by -3
        decreasePointsByThree();
    }

    function handleFocus() {
        // Clear the alert dialog when focus is back on the window
        const alertDialog = document.querySelector('.alert-dialog');
        if (alertDialog) {
            alertDialog.style.display = 'none';
            document.body.removeChild(alertDialog);
        }
    }

    // Function to create an alert dialog
    function createAlertDialog(message) {
        const alertDialog = document.createElement('div');
        alertDialog.className = 'alert-dialog';
        alertDialog.innerText = message;

        // Close the alert dialog after 3 seconds
        setTimeout(() => {
            alertDialog.style.display = 'none';
            document.body.removeChild(alertDialog);
            // Display next question or redirect to the next level
            // (You can implement this logic based on your game flow)
            fetchAndDisplayNextQuestion();
        }, 3000);

        return alertDialog;
    }

    // Timer (example)
    const timerElement = document.getElementById('timer');
    let timerSeconds = 60;
    let timerInterval = setInterval(function () {
        timerElement.innerText = timerSeconds;
        if (timerSeconds === 0) {
            clearInterval(timerInterval);
            handleTimeout(questionData.correctAnswer);
        }
        timerSeconds--;
    }, 1000);

    // Function to fetch and display the next question
    function fetchAndDisplayNextQuestion() {
        fetchQuestion().then(questionData => {
            if (questionData) {
                displayQuestion(questionData);
            }
        });
        
        // Reset timer for the next question (example)
        timerSeconds = 60;
        timerInterval = setInterval(function () {
            timerElement.innerText = timerSeconds;
            if (timerSeconds === 0) {
                clearInterval(timerInterval);
                handleTimeout(questionData.correctAnswer);
            }
            timerSeconds--;
        }, 1000);
    }

    // Fetch and display the first question
    fetchAndDisplayNextQuestion();
});
