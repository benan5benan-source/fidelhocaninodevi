document.addEventListener('DOMContentLoaded', (event) => {

    // --- 1. Element References and Audio Control Logic ---

    const mariaAudio = document.getElementById('mariaAudio');
    const speedSlider = document.getElementById('speedSlider');
    const currentSpeedSpan = document.getElementById('currentSpeed');
    
    // REFERENCE THE TRUMPET AUDIO ELEMENT
    const trumpetAudio = document.getElementById('trumpetSound'); 
    

    // Basic error check for speed control elements
    if (mariaAudio && speedSlider && currentSpeedSpan) {
        // Set initial speed
        mariaAudio.playbackRate = speedSlider.value;
        currentSpeedSpan.textContent = `${speedSlider.value}x`;

        // Event listener for the slider input
        speedSlider.addEventListener('input', () => {
            const newSpeed = speedSlider.value;
            mariaAudio.playbackRate = newSpeed;
            currentSpeedSpan.textContent = `${newSpeed}x`;
        });
    }


    // --- 2. Quiz Answer Checking Logic ---

    // Define the correct answers 
    const correctAnswers = [
        "spain",                             // 1. Where is Maria from?
        "german",                            // 2. Which foreign language is Maria learning?
        "germany",                           // 3. Where is Maria studying?
        "20, twenty",                        // 4. How old is Maria?
        "nervous, confident",                // 5. How does Maria feel about studying abroad?
    ];

    // FIX: Use the specific ID selector to target the Submit button reliably
    const submitButton = document.getElementById('submitAnswersButton');
    const inputFields = document.querySelectorAll('.questions-section input[type="text"]');

    // Attach the checkAnswers function to the submit button
    if (submitButton && inputFields.length === correctAnswers.length) {
        submitButton.addEventListener('click', checkAnswers);
    }


    function checkAnswers() {
        let score = 0;
        let feedbackHTML = '<h3>✅ Quiz Results</h3>';

        // Play the trumpet sound FIRST, so it starts immediately on click
        if (trumpetAudio) {
            trumpetAudio.currentTime = 0; // Rewind to the start
            trumpetAudio.play().catch(e => {
                console.error("Audio playback error:", e);
            });
        }
        
        // Loop through all questions
        inputFields.forEach((input, index) => {
            const userAnswer = input.value.trim().toLowerCase();
            const correctKeywordString = correctAnswers[index].toLowerCase();
            const correctKeywords = correctKeywordString.split(',').map(keyword => keyword.trim());
            
            // Check if the user's answer exactly matches one of the correct keywords
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
            const submitButton = document.getElementById('submitAnswersButton'); // Use ID here too
            if (questionsSection && submitButton) {
                questionsSection.insertBefore(resultsDiv, submitButton);
            }
        }
        
        resultsDiv.innerHTML = htmlContent;
    }

});
        
        resultsDiv.innerHTML = htmlContent;
    }


}); // <-- This closing bracket was missing from your previous code!
