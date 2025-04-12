const quizData = [
    {
        question: "Which anime does this character belong to?",
        image: "https://th.bing.com/th/id/OIP.po9L4LWai3bF78hZndCx5wHaFY?rs=1&pid=ImgDetMain",
        options: ["Naruto", "Bleach", "One Piece", "Dragon Ball"],
        correct: 0
    },
    {
        question: "What is the name of this titan?",
        image: "https://th.bing.com/th/id/OIP.Xw1y9oLcf-mjT55FDACHoQHaEb?rs=1&pid=ImgDetMain",
        options: ["Armored Titan", "Colossal Titan", "Female Titan", "Beast Titan"],
        correct: 1
    },
    {
        question: "Which anime features this famous mask?",
        image: "https://www.hdwallpapers.in/download/tokyo_ghoul_mask_4k_hd-2560x1440.jpg",
        options: ["Demon Slayer", "Tokyo Ghoul", "Death Note", "Jujutsu Kaisen"],
        correct: 1
    },
    {
        question: "What ability does this character possess?",
        image: "https://th.bing.com/th/id/OIP.O3Cq6WfqfvztgcqAOOztIQHaHa?rs=1&pid=ImgDetMain",
        options: ["One For All", "Explosion", "Half-Cold Half-Hot", "Eraser"],
        correct: 0
    },
    {
        question: "Which anime features this character with a straw hat?",
        image: "https://th.bing.com/th/id/OIP.efednBbddmeAU4Uv13e5bQHaFe?rs=1&pid=ImgDetMain",
        options: ["Fairy Tail", "One Piece", "Black Clover", "Hunter x Hunter"],
        correct: 1
    },
    {
        question: "What is the name of this demon slayer breathing technique?",
        image: "https://static0.gamerantimages.com/wordpress/wp-content/uploads/2022/09/Collage-Maker-04-Sep-2022-0205-PM.jpg",
        options: ["Water Breathing", "Thunder Breathing", "Flame Breathing", "Beast Breathing"],
        correct: 2
    },
    {
        question: "Which anime features this notebook?",
        image: "https://wallpaperbat.com/img/128174500-death-notebook-wallpaper.jpg",
        options: ["Death Note", "Steins;Gate", "Code Geass", "Psycho-Pass"],
        correct: 0
    },
    {
        question: "What is the name of this powerful curse?",
        image: "https://media.sketchfab.com/models/0094c76440e3447a900797ede9bad5bf/thumbnails/ade787fc61cf471d8d5b4f751e4cdbb5/ebc879b9b4b34475843cdee0a8904ab7.jpeg",
        options: ["Mahito", "Hanami", "Sukuna", "Jogo"],
        correct: 2
    },
    {
        question: "Which anime features this robot?",
        image: "https://th.bing.com/th/id/R.acc7e2ee50e6b129bf584bb24a2480ca?rik=IgqGbwCMvqGfgw&pid=ImgRaw&r=0",
        options: ["Gurren Lagann", "Darling in the Franxx", "Neon Genesis Evangelion", "Mobile Suit Gundam"],
        correct: 2
    },
    {
        question: "What's the name of this famous anime movie director?",
        image: "https://media.invisioncic.com/y329496/monthly_2025_04/HayaoMiyazaki-StudioGhibli.thumb.jpg.4c33a648745797f1fff719956967a9e9.jpg",
        options: ["Makoto Shinkai", "Hayao Miyazaki", "Satoshi Kon", "Mamoru Hosoda"],
        correct: 1
    }
];

// DOM Elements
const startScreen = document.getElementById('startScreen');
const quizContainer = document.getElementById('quizContainer');
const results = document.getElementById('results');
const startButton = document.getElementById('startButton');
const questionEl = document.getElementById('question');
const questionImageEl = document.getElementById('questionImage');
const optionsContainer = document.getElementById('options');
const questionCounterEl = document.getElementById('questionCounter');
const scoreCounterEl = document.getElementById('scoreCounter');
const questionNumberEl = document.getElementById('questionNumber');
const progressBarEl = document.getElementById('progressBar');
const prevButton = document.getElementById('prevButton');
const nextButton = document.getElementById('nextButton');
const finalScoreEl = document.getElementById('finalScore');
const totalQuestionsEl = document.getElementById('totalQuestions');
const resultMessageEl = document.getElementById('resultMessage');
const restartButton = document.getElementById('restartButton');

// Quiz State
let currentQuestion = 0;
let score = 0;
let selectedOption = -1;
let quizCompleted = false;
let answeredQuestions = Array(quizData.length).fill(false);

// Initialize
totalQuestionsEl.textContent = quizData.length;

// Event Listeners
startButton.addEventListener('click', startQuiz);
prevButton.addEventListener('click', showPreviousQuestion);
nextButton.addEventListener('click', showNextQuestion);
restartButton.addEventListener('click', restartQuiz);

function startQuiz() {
    startScreen.style.display = 'none';
    quizContainer.style.display = 'block';
    loadQuestion();
}

function loadQuestion() {
    const question = quizData[currentQuestion];
    
    // Update question text and image
    questionEl.textContent = question.question;
    questionImageEl.src = question.image;
    questionNumberEl.textContent = currentQuestion + 1;
    
    // Update progress
    questionCounterEl.textContent = `Question ${currentQuestion + 1}/${quizData.length}`;
    progressBarEl.style.width = `${((currentQuestion + 1) / quizData.length) * 100}%`;
    
    // Clear previous options
    optionsContainer.innerHTML = '';
    
    // Create new option elements
    question.options.forEach((option, index) => {
        const optionEl = document.createElement('div');
        optionEl.classList.add('option');
        optionEl.innerHTML = `<div class="option-text">${option}</div>`;
        
        // Check if this question has been answered before
        if (answeredQuestions[currentQuestion]) {
            if (index === question.correct) {
                optionEl.classList.add('correct');
            } else if (index === selectedOption && index !== question.correct) {
                optionEl.classList.add('wrong');
            }
            optionEl.style.pointerEvents = 'none';
        } else {
            optionEl.addEventListener('click', () => selectOption(index));
        }
        
        optionsContainer.appendChild(optionEl);
    });
    
    // Update button states
    prevButton.disabled = currentQuestion === 0;
    nextButton.disabled = !answeredQuestions[currentQuestion];
    
    // If this is the last question and it's been answered, change Next to Finish
    if (currentQuestion === quizData.length - 1 && answeredQuestions[currentQuestion]) {
        nextButton.textContent = 'Finish';
    } else {
        nextButton.textContent = 'Next';
    }
}

function selectOption(index) {
    const question = quizData[currentQuestion];
    const options = document.querySelectorAll('.option');
    
    // Store the selected option
    selectedOption = index;
    
    // Mark this question as answered
    answeredQuestions[currentQuestion] = true;
    
    // Disable all options
    options.forEach(option => {
        option.style.pointerEvents = 'none';
    });
    
    // Check if answer is correct
    if (index === question.correct) {
        options[index].classList.add('correct');
        score++;
        scoreCounterEl.textContent = `Score: ${score}`;
        
        // Add confetti effect for correct answer
        createConfetti();
    } else {
        options[index].classList.add('wrong');
        options[question.correct].classList.add('correct');
    }
    
    // Enable next button
    nextButton.disabled = false;
    
    // If this is the last question, change Next to Finish
    if (currentQuestion === quizData.length - 1) {
        nextButton.textContent = 'Finish';
    }
}

function showNextQuestion() {
    if (currentQuestion < quizData.length - 1) {
        currentQuestion++;
        loadQuestion();
    } else {
        showResults();
    }
}

function showPreviousQuestion() {
    if (currentQuestion > 0) {
        currentQuestion--;
        loadQuestion();
    }
}

function showResults() {
    quizContainer.style.display = 'none';
    results.style.display = 'block';
    
    // Update final score
    finalScoreEl.textContent = score;
    
    // Generate result message based on score
    const percentage = (score / quizData.length) * 100;
    
    if (percentage >= 90) {
        resultMessageEl.textContent = "Anime Master! Your knowledge is legendary!";
    } else if (percentage >= 70) {
        resultMessageEl.textContent = "Great job! You're a true anime fan!";
    } else if (percentage >= 50) {
        resultMessageEl.textContent = "Not bad! You know your anime pretty well.";
    } else {
        resultMessageEl.textContent = "Time to binge some more anime series!";
    }
    
    // Create confetti for celebration
    for (let i = 0; i < 50; i++) {
        createResultConfetti();
    }
}

function restartQuiz() {
    // Reset quiz state
    currentQuestion = 0;
    score = 0;
    selectedOption = -1;
    answeredQuestions = Array(quizData.length).fill(false);
    
    // Reset display
    scoreCounterEl.textContent = 'Score: 0';
    
    // Switch back to quiz
    results.style.display = 'none';
    quizContainer.style.display = 'block';
    
    // Load first question
    loadQuestion();
}

function createConfetti() {
    const colors = ['#6a3de8', '#ff4ecd', '#4caf50', '#ff9800', '#2196f3'];
    
    for (let i = 0; i < 30; i++) {
        const confetti = document.createElement('div');
        confetti.classList.add('confetti');
        confetti.style.left = `${Math.random() * 100}%`;
        confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        confetti.style.width = `${Math.random() * 10 + 5}px`;
        confetti.style.height = `${Math.random() * 10 + 5}px`;
        confetti.style.animationDuration = `${Math.random() * 3 + 2}s`;
        confetti.style.animationDelay = `${Math.random() * 0.5}s`;
        
        document.body.appendChild(confetti);
        
        // Remove confetti after animation
        setTimeout(() => {
            confetti.remove();
        }, 5000);
    }
}

function createResultConfetti() {
    const colors = ['#6a3de8', '#ff4ecd', '#4caf50', '#ff9800', '#2196f3'];
    
    const confetti = document.createElement('div');
    confetti.classList.add('confetti');
    confetti.style.left = `${Math.random() * 100}%`;
    confetti.style.top = `-20px`;
    confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
    confetti.style.width = `${Math.random() * 10 + 5}px`;
    confetti.style.height = `${Math.random() * 10 + 5}px`;
    confetti.style.animationDuration = `${Math.random() * 3 + 2}s`;
    confetti.style.animationDelay = `${Math.random() * 2}s`;
    
    document.body.appendChild(confetti);
    
    // Remove confetti after animation
    setTimeout(() => {
        confetti.remove();
    }, 5000);
}

// Create initial confetti on the start screen for visual appeal
for (let i = 0; i < 20; i++) {
    const colors = ['#6a3de8', '#ff4ecd'];
    const confetti = document.createElement('div');
    confetti.classList.add('confetti');
    confetti.style.left = `${Math.random() * 100}%`;
    confetti.style.top = `${Math.random() * 100}%`;
    confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
    confetti.style.width = `${Math.random() * 8 + 5}px`;
    confetti.style.height = `${Math.random() * 8 + 5}px`;
    confetti.style.animationDuration = `${Math.random() * 3 + 5}s`;
    confetti.style.animationDelay = `${Math.random() * 5}s`;
    
    document.body.appendChild(confetti);
}