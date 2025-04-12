# quiz-app
an anime based quiz app
# Anime Quiz App


## Description

Anime Quiz App is an interactive web application that tests users' knowledge of popular anime series, characters, and creators. This visually appealing quiz features multiple-choice questions with images, dynamic scoring, and engaging animations.

## Features

- **Interactive Quiz Experience**: Test your anime knowledge with 10 carefully crafted questions
- **Visual Design**: Modern UI with anime-themed gradient colors and animations
- **Image-Based Questions**: Each question includes a relevant image
- **Real-Time Feedback**: Instant visual feedback for correct and incorrect answers
- **Score Tracking**: Dynamic score counter and progress bar
- **Confetti Animations**: Celebration effects for correct answers
- **Responsive Design**: Works well on both desktop and mobile devices
- **Results Analysis**: Personalized message based on final score
- **Navigation Controls**: Ability to move between questions

## Technologies Used

- HTML5
- CSS3 (with modern features like CSS variables, flexbox, grid, animations)
- JavaScript (ES6+)
- Responsive Design Principles

## Installation

1. Clone the repository:


3. Open `index.html` in your preferred browser.

## Usage

1. Click the "Start Quiz" button on the welcome screen to begin.
2. Read each question and select one of the multiple-choice options.
3. Receive immediate feedback on your answer choice.
4. Navigate through questions using the "Previous" and "Next" buttons.
5. View your final score and performance analysis at the end of the quiz.
6. Click "Restart Quiz" to play again.

## Customization

You can easily customize this quiz by modifying the `quizData` array in the `script.js` file:

```javascript
const quizData = [
 {
     question: "Your Question Here",
     image: "path/to/your/image.jpg",
     options: ["Option 1", "Option 2", "Option 3", "Option 4"],
     correct: 0 // Index of the correct answer (0-based)
 },
 // Add more questions here
];