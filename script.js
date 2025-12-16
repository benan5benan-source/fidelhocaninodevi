document.addEventListener('DOMContentLoaded', (event) => {

    // --- 1. Audio Speed Control Logic (Unified) ---

    const audio = document.getElementById('mariaAudio');
    const speedSlider = document.getElementById('speedSlider');
    const currentSpeedSpan = document.getElementById('currentSpeed');

    // Basic error check for speed control elements
    if (audio && speedSlider && currentSpeedSpan) {
        // Set initial speed
        audio.playbackRate = speedSlider.value;
        currentSpeedSpan.textContent = `${speedSlider.value}x`;

        // Event listener for the slider input
        speedSlider.addEventListener('input', () => {
            const newSpeed = speedSlider.value;
            
            // Update the audio playback rate and the displayed text
            audio.playbackRate = newSpeed;
            currentSpeedSpan.textContent = `${newSpeed}x`;
        });
    }


    // --- 2. Quiz Answer Checking Logic ---

    // Define the correct answers (adjust these if your audio content is different)
    const correctAnswers = [
        "spain",                  // 1. Where is Maria from?
        "german",                 // 2. Which foreign language is Maria learning?
        "germany",                // 3. Where is Maria studying?
        "20, twenty",                     // 4. How old is Maria?
        "nervous, confident",     // 5. How does Maria feel about studying abroad?
    ];

    const submitButton = document.querySelector('button');
    const inputFields = document.querySelectorAll('.questions-section input[type="text"]');

    // Attach the checkAnswers function to the submit button
    if (submitButton && inputFields.length === correctAnswers.length) {
        submitButton.addEventListener('click', checkAnswers);
    }


    function checkAnswers() {
        let score = 0;
        let feedbackHTML = '<h3>✅ Quiz Results</h3>';

        inputFields.forEach((input, index) => {
            const userAnswer = input.value.trim().toLowerCase();
            const correctAnswer = correctAnswers[index].toLowerCase();
            
            // Simple check: user's answer must be a non-empty string and included in the correct answer keywords
            const isCorrect = userAnswer !== "" && correctAnswer.includes(userAnswer);

            // Add visual feedback to the input field
            input.style.backgroundColor = isCorrect ? '#d4edda' : '#f8d7da'; 
            input.style.color = isCorrect ? '#155724' : '#721c24';

            feedbackHTML += `<div style="margin: 5px 0; padding: 5px; border-radius: 4px; background-color: ${isCorrect ? '#eaf5eb' : '#fbeaea'};">`;
            feedbackHTML += `<strong>Question ${index + 1}:</strong> ${isCorrect ? 'Correct!' : 'Incorrect.'}`;
            
            if (!isCorrect) {
                 feedbackHTML += `<br><small style="color: #c00;">Correct Answer: ${correctAnswers[index]}</small>`;
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
        
        // If the results div doesn't exist yet, create it
        if (!resultsDiv) {
            resultsDiv = document.createElement('div');
            resultsDiv.id = 'results-feedback';
            resultsDiv.style.marginTop = '20px';
            const questionsSection = document.querySelector('.questions-section');
            // Insert the feedback above the submit button
            const submitButton = document.querySelector('button');
            if (questionsSection && submitButton) {
                questionsSection.insertBefore(resultsDiv, submitButton);
            }
        }
        
        resultsDiv.innerHTML = htmlContent;
    }

}); // <-- This closing bracket was missing from your previous code!