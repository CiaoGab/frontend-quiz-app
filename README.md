# Frontend Mentor - Frontend quiz app

![Design preview for the Frontend quiz app coding challenge](./preview.jpg)

# Frontend Mentor - Frontend Quiz App Solution

This is a solution to the [Frontend quiz app challenge on Frontend Mentor](https://www.frontendmentor.io/challenges/frontend-quiz-app-BE7xkzXQnU). Frontend Mentor challenges help you improve your coding skills by building realistic projects.

## Table of contents

- [Overview](#overview)
  - [The challenge](#the-challenge)
  - [Screenshot](#screenshot)
  - [Links](#links)
- [My process](#my-process)
  - [Built with](#built-with)
  - [What I learned](#what-i-learned)
  - [Continued development](#continued-development)
  - [Useful resources](#useful-resources)
- [Author](#author)
- [Acknowledgments](#acknowledgments)

## Overview

### The challenge

Users should be able to:

- Select a quiz subject
- Select a single answer from each question from a choice of four
- See an error message when trying to submit an answer without making a selection
- See if they have made a correct or incorrect choice when they submit an answer
- Move on to the next question after seeing the question result
- See a completed state with the score after the final question
- Play again to choose another subject
- View the optimal layout for the interface depending on their device's screen size
- See hover and focus states for all interactive elements on the page
- Navigate the entire app only using their keyboard
- **Bonus**: Change the app's theme between light and dark

### Screenshot

![Screenshot of the quiz app](./preview.jpg)

### Links

- Solution URL: [https://github.com/yourusername/frontend-quiz-app](https://github.com/yourusername/frontend-quiz-app)
- Live Site URL: [https://yourusername.github.io/frontend-quiz-app/](https://yourusername.github.io/frontend-quiz-app/)

## My process

### Built with

- Semantic HTML5 markup
- CSS custom properties
- Flexbox
- CSS Grid
- Mobile-first workflow
- Vanilla JavaScript

### What I learned

- How to dynamically load quiz data from a JSON file and render questions/options.
- Handling user interactions and feedback for correct/incorrect answers.
- Managing application state for quiz progress and score.
- Implementing a dark/light theme toggle using localStorage.
- Ensuring accessibility and keyboard navigation for all interactive elements.

```js
// Example: Handling answer selection
newAnswer.addEventListener("click", () => {
  let findSelected = document.querySelector(".answer-option.selected");
  if (findSelected) {
    findSelected.classList.remove("selected");
  }
  newAnswer.classList.add("selected");
});
```

### Continued development

- Improve accessibility for screen readers.
- Add more quiz subjects and questions.
- Enhance mobile responsiveness and animations.
- Refactor code for better modularity and maintainability.

### Useful resources

- [MDN Web Docs](https://developer.mozilla.org/en-US/) - For JavaScript and CSS reference.
- [Frontend Mentor](https://www.frontendmentor.io/) - For project inspiration and challenges.
- [The Markdown Guide](https://www.markdownguide.org/) - For writing better documentation.

## Author

- Frontend Mentor - [@Ciaogab](https://www.frontendmentor.io/profile/CiaoGab)

## Acknowledgments

Thanks to the Frontend Mentor community for feedback and support during development.
