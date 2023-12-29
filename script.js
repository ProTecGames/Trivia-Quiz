document.addEventListener('DOMContentLoaded', function () {
    
    let points = parseInt(localStorage.getItem('points')) || 0;
    const questionsAttempted = parseInt(localStorage.getItem('questionsAttempted')) || 0;

    
    document.getElementById('points').innerText = `Points: ${points}`;
    document.getElementById('attempted').innerText = `Questions Attempted: ${questionsAttempted}`;


  
    const levelTimeline = document.getElementById('levelTimeline');
    const level1Button = createLevelButton(1, 'one/one.html', points > 20);
    const level2Button = createLevelButton(2, 'two/two.html', points > 50);
    const level3Button = createLevelButton(3, 'three/three.html', points > 100);

    levelTimeline.appendChild(level1Button);
    levelTimeline.appendChild(level2Button);
    levelTimeline.appendChild(level3Button);

    
    function createLevelButton(level, link, isEnabled) {
        const button = document.createElement('button');
        button.innerText = `Level ${level}`;
        button.disabled = !isEnabled;

        
        if (isEnabled) {
            button.addEventListener('click', function () {
                
                playButtonClickSound();
                
                
                window.location.href = link;
            });
        }

        return button;
    }

    
    function playButtonClickSound() {
        const buttonClickSound = new Audio('button-click.mp3'); // Replace with your sound file
        buttonClickSound.play();
    }
});
