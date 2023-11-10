/**
 * Create the quiz document from the JSON data provided by the user
 * @param data  {object} - The JSON data
 */
function createQuestionsDocument(data) {
  const container = document.getElementById('quiz-container');

  data.questionList.forEach((question, index) => {
    // Create the card element
    const cardEl = document.createElement('div');
    cardEl.className = 'card my-3'; // Bootstrap card with margin

    // Create the card body
    const cardBodyEl = document.createElement('div');
    cardBodyEl.className = 'card-body';

    const cardBodyEl2 = document.createElement('div');
    cardBodyEl2.className = 'card-body';

    // Add question to the card body
    cardBodyEl.innerHTML = `<h5 class="card-title">Frage ${index + 1}</h5> <p class="card-text">${formatText(question.questionText)}</p>`;

    const answersListEl = document.createElement('ul');
    answersListEl.className = 'list-group list-group-flush'; // Bootstrap list group

    question.answerOptionList.forEach((option, answerIndex) => {
      const answerEl = document.createElement('li');
      answerEl.className = 'list-group-item'; // Bootstrap list group item
      answerEl.innerHTML = formatText(option.answerText);
      // Add a class if the answer is correct
      if (option.isCorrect) answerEl.classList.add('correct-answer');
      answersListEl.appendChild(answerEl);
    });

    // Create a button to toggle correct answers
    const toggleButton = document.createElement('button');
    toggleButton.className = 'btn btn-sm btn-success';
    toggleButton.innerText = 'auflösen';
    toggleButton.onclick = function () {
      // Toggle visibility of correct answers within this card
      cardEl.querySelectorAll('.correct-answer').forEach(answer => {
        answer.style.color = '#27ae60';
        toggleButton.parentElement.style.display = 'none';
      });
    };

    cardEl.appendChild(cardBodyEl);
    cardEl.appendChild(answersListEl);
    cardBodyEl2.appendChild(toggleButton);
    cardEl.appendChild(cardBodyEl2);
    container.appendChild(cardEl);
  });

  // Call MathJax to typeset the new content
  MathJax.typesetPromise();
}

/**
 * Format the text to replace '**text**' with '<b>text</b>'
 * @param text {string} - The text to format
 * @returns {*} - The formatted text
 */
function formatText(text) {
  // replace '\n' with '<br>'
  text = text.replace(/\n/g, '<br>');
  return text.replace(/\*\*(.*?)\*\*/g, '<b>$1</b>');
}

// Add an event listener to the upload button
document.getElementById("upload-btn").addEventListener("click", () => {
  try {
    // Get the JSON data from the textarea and parse it
    const data = JSON.parse(document.getElementById('json-value').value);

    // hide the upload button and the textarea
    document.getElementById('upload-container').style.display = 'none';

    // Call the function to create the quiz document
    createQuestionsDocument(data);
  } catch (error) {
    // Handle parsing error
    alert('Hm, diese Sprache wird nicht akzeptiert :(', error.message);
  }
});