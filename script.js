document.addEventListener('DOMContentLoaded', (event) => {

    // --- 1. Element References (All IDs used for reliability) ---

    const mariaAudio = document.getElementById('mariaAudio');
    const speedSlider = document.getElementById('speedSlider');
    const currentSpeedSpan = document.getElementById('currentSpeed');
    const trumpetAudio = document.getElementById('trumpetSound'); 
    
    // Selector for the quiz elements
    const submitButton = document.getElementById('submitAnswersButton');
    const inputFields = document.querySelectorAll('.questions-section input[type="text"]');


    // --- 2. Audio Speed Control Logic ---

    if (mariaAudio && speedSlider && currentSpeedSpan) {
        mariaAudio.playbackRate = speedSlider.value;
        currentSpeedSpan.textContent = `${speedSlider.value}x`;

        speedSlider.addEventListener('input', () => {
            const newSpeed = speedSlider.value;
            mariaAudio.playbackRate = newSpeed;
            currentSpeedSpan.textContent = `${newSpeed}x`;
        });
    }

    // --- 3. Quiz Answer Checking Logic ---

    // Define the correct answers (UPDATE THESE IF NEEDED)
    const correctAnswers = [
        "spain",                             // 1. Where is Maria from?
        "german",                            // 2. Which foreign language is Maria learning?
        "germany",                           // 3. Where is Maria studying?
        "20, twenty",                        // 4. How old is Maria?
        "nervous, confident",                // 5. How does Maria feel about studying abroad?
    ];

    // Attach the checkAnswers function to the submit button
    if (submitButton && inputFields.length === correctAnswers.length) {
        submitButton.addEventListener('click', checkAnswers);
    }


    function checkAnswers() {
        let score = 0;
        let feedbackHTML = '<h3>✅ Quiz Results</h3>';

        // START FIX: Reliable audio playback logic
        if (trumpetAudio) {
            trumpetAudio.currentTime = 0; // Rewind to the start
            // Attempt to play and use .then() to confirm success
            trumpetAudio.play()
                .catch(e => {
                    // This block catches the common security error where audio is blocked.
                    console.error("Audio playback error: Could not play trumpet.", e);
                    // You can add an alert here for debugging if needed:
                    // alert("Audio blocked by browser. Check file path or permission settings.");
                });
        }
        // END FIX

        // Loop through all questions
        inputFields.forEach((input, index) => {
            const userAnswer = input.value.trim().toLowerCase();
            const correctKeywordString = correctAnswers[index].toLowerCase();
            const correctKeywords = correctKeywordString.split(',').map(keyword => keyword.trim());
            
            const isCorrect = userAnswer !== "" && correctKeywords.includes(userAnswer);

            // Add visual feedback
            input.style.backgroundColor = isCorrect ? '#d4edda' : '#f8d7da';
            input.style.color = isCorrect ? '#155724' : '#721c24';

            // Build the HTML feedback block
            feedbackHTML += `<div style="margin: 5px 0; padding: 5px; border-radius: 4px; background-color: ${isCorrect ? '#eaf5eb' : '#fbeaea'};">`;
            feedbackHTML += `<strong>Question ${index + 1}:</strong> ${isCorrect ? 'Correct!' : 'Incorrect.'}`;
            
            if (!isCorrect) {
                 feedbackHTML += `<br><small style="color: #c00;">Correct Answer(s): ${correctKeywords.join(' or ')}</small>`;
            }
            feedbackHTML += '</div>';

            if (isCorrect) {
                score++;
            }
        });

        // Display the final score
        feedbackHTML += `<h4 style="margin-top: 15px; color: #007bff;">Your Score: ${score} out of ${correctAnswers.length}</h4>`;
        
        displayFeedback(feedbackHTML);
    }
    
    // Function to display the results on the page
    function displayFeedback(htmlContent) {
        let resultsDiv = document.getElementById('results-feedback');
        
        if (!resultsDiv) {
            resultsDiv = document.createElement('div');
            resultsDiv.id = 'results-feedback';
            resultsDiv.style.marginTop = '20px';
            const questionsSection = document.querySelector('.questions-section');
            const submitButton = document.getElementById('submitAnswersButton');
            if (questionsSection && submitButton) {
                questionsSection.insertBefore(resultsDiv, submitButton);
            }
        }
        
        resultsDiv.innerHTML = htmlContent;
    }

});
