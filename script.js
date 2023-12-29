document.addEventListener('DOMContentLoaded', function () {
    // Retrieve user data from local storage
    let points = parseInt(localStorage.getItem('points')) || 0;
    const questionsAttempted = parseInt(localStorage.getItem('questionsAttempted')) || 0;

    // Update header with user data
    document.getElementById('points').innerText = `Points: ${points}`;
    document.getElementById('attempted').innerText = `Questions Attempted: ${questionsAttempted}`;

    // Example: Populate the level timeline dynamically with buttons
    const levelTimeline = document.getElementById('levelTimeline');
    const level1Button = createLevelButton(1, '/level/one/one.html', true);
    const level2Button = createLevelButton(2, 'level/two/index.html', points > 20);
    const level3Button = createLevelButton(3, 'level/three/index.html', points > 50);

    levelTimeline.appendChild(level1Button);
    levelTimeline.appendChild(level2Button);
    levelTimeline.appendChild(level3Button);

    // Function to create level buttons
    function createLevelButton(level, link, isEnabled) {
        const button = document.createElement('button');
        button.innerText = `Level ${level}`;
        button.disabled = !isEnabled;

        // Strikeout the text for higher-level buttons until the user has enough points
        if (!isEnabled) {
            button.classList.add('strike');
        }

        // Enable the button only if the user has enough points
        if (isEnabled) {
            button.addEventListener('click', function () {
                // Play button click sound
                playButtonClickSound();

                // Redirect to the specified link
                window.location.href = link;
            });
        }

        return button;
    }

    // Function to play button click sound
    function playButtonClickSound() {
        const buttonClickSound = new Audio('tap.mp3'); 
        buttonClickSound.play();
    }
});
