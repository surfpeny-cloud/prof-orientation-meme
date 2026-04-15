// ========== ОСНОВНАЯ ЛОГИКА ПРИЛОЖЕНИЯ ==========

let currentQuestions = [];
let currentQuestionIndex = 0;
let userAnswers = [];
let currentResult = null;

const screens = {
    loading: document.getElementById('loading-screen'),
    welcome: document.getElementById('welcome-screen'),
    quiz: document.getElementById('quiz-screen'),
    midpoint: document.getElementById('midpoint-screen'),
    result: document.getElementById('result-screen')
};

async function init() {
    showScreen('loading');
    await new Promise(r => setTimeout(r, 800));
    
    currentQuestions = getRandomQuestions(9);
    
    const totalSpan = document.getElementById('total-q-num');
    if (totalSpan) totalSpan.textContent = currentQuestions.length;
    
    const savedProgress = loadProgress();
    const loadBtn = document.getElementById('load-saved-btn');
    if (loadBtn) {
        if (savedProgress && savedProgress.answers && savedProgress.answers.length > 0 && savedProgress.answers.length < currentQuestions.length) {
            loadBtn.style.display = 'block';
        } else {
            loadBtn.style.display = 'none';
            clearProgress();
        }
    }
    
    showScreen('welcome');
}

function showScreen(screenName) {
    for (const [name, element] of Object.entries(screens)) {
        if (element) {
            if (name === screenName) {
                element.classList.add('active');
            } else {
                element.classList.remove('active');
            }
        }
    }
}

function startTest(resumeFromSave = false) {
    if (resumeFromSave) {
        const saved = loadProgress();
        if (saved && saved.answers) {
            currentQuestionIndex = saved.questionIndex;
            userAnswers = saved.answers;
        } else {
            currentQuestionIndex = 0;
            userAnswers = [];
        }
    } else {
        currentQuestionIndex = 0;
        userAnswers = [];
        clearProgress();
    }
    
    if (!resumeFromSave) {
        currentQuestions = getRandomQuestions(9);
    }
    
    showScreen('quiz');
    displayCurrentQuestion();
}

function animateElement(element, delay = 0) {
    if (!element) return;
    element.style.opacity = '0';
    element.style.transform = 'translateY(20px)';
    element.style.transition = `all 0.5s cubic-bezier(0.2, 0.9, 0.4, 1.1) ${delay}s`;
    setTimeout(() => {
        element.style.opacity = '1';
        element.style.transform = 'translateY(0)';
    }, 10);
}

function animateOptions() {
    const options = document.querySelectorAll('.option-btn');
    options.forEach((opt, idx) => {
        animateElement(opt, idx * 0.05);
    });
}

function showConfetti() {
    const colors = ['#6C63FF', '#FF6584', '#00D2FF', '#FFD166', '#00E5A0'];
    for (let i = 0; i < 60; i++) {
        const confetti = document.createElement('div');
        confetti.className = 'confetti';
        confetti.style.left = Math.random() * 100 + '%';
        confetti.style.animationDelay = Math.random() * 0.5 + 's';
        confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        confetti.style.position = 'fixed';
        confetti.style.top = '-10px';
        confetti.style.width = Math.random() * 10 + 4 + 'px';
        confetti.style.height = Math.random() * 10 + 4 + 'px';
        confetti.style.borderRadius = Math.random() > 0.5 ? '50%' : '0';
        confetti.style.pointerEvents = 'none';
        confetti.style.zIndex = '9999';
        confetti.style.animation = `fall ${Math.random() * 1.5 + 1.5}s ease-in forwards`;
        document.body.appendChild(confetti);
        setTimeout(() => confetti.remove(), 2500);
    }
}

function displayCurrentQuestion() {
    const question = currentQuestions[currentQuestionIndex];
    if (!question) return;
    
    const currentSpan = document.getElementById('current-q-num');
    if (currentSpan) currentSpan.textContent = currentQuestionIndex + 1;
    
    const progress = ((currentQuestionIndex + 1) / currentQuestions.length) * 100;
    const progressFill = document.getElementById('progress-fill');
    if (progressFill) progressFill.style.width = `${progress}%`;
    
    const scoreValue = document.getElementById('score-value');
    if (scoreValue) scoreValue.textContent = Math.round(progress);
    
    const memeImg = document.getElementById('question-meme');
    const fallback = document.getElementById('meme-emoji-fallback');
    
    if (question.memeUrl && memeImg) {
        memeImg.src = question.memeUrl;
        memeImg.style.display = 'block';
        if (fallback) fallback.style.display = 'none';
        memeImg.onerror = () => {
            memeImg.style.display = 'none';
            if (fallback) {
                fallback.textContent = question.memeEmoji || '🤔';
                fallback.style.display = 'block';
            }
        };
    } else if (fallback) {
        if (memeImg) memeImg.style.display = 'none';
        fallback.textContent = question.memeEmoji || '🤔';
        fallback.style.display = 'block';
    }
    
    const questionText = document.getElementById('question-text');
    if (questionText) questionText.textContent = question.text;
    
    const optionsContainer = document.getElementById('options-container');
    if (optionsContainer) {
        optionsContainer.innerHTML = '';
        question.options.forEach((opt, idx) => {
            const btn = document.createElement('button');
            btn.className = 'option-btn';
            btn.innerHTML = `<span class="option-emoji">${opt.emoji || '📌'}</span> ${opt.text}`;
            btn.onclick = () => selectAnswer(idx);
            optionsContainer.appendChild(btn);
        });
    }
    
    setTimeout(() => animateOptions(), 50);
    saveProgress(currentQuestionIndex, userAnswers);
}

function selectAnswer(optionIndex) {
    userAnswers[currentQuestionIndex] = optionIndex;
    
    if (currentQuestionIndex + 1 < currentQuestions.length) {
        currentQuestionIndex++;
        displayCurrentQuestion();
        
        if (currentQuestionIndex === Math.floor(currentQuestions.length / 2)) {
            showMidpointScreen();
        }
    } else {
        finishQuiz();
    }
}

function showMidpointScreen() {
    saveProgress(currentQuestionIndex, userAnswers);
    
    const scores = calculateScores(userAnswers, currentQuestions);
    const percentages = getPercentages(scores);
    
    const statsDiv = document.getElementById('midpoint-stats');
    if (statsDiv) {
        statsDiv.innerHTML = `
            <p style="margin-bottom: 16px;">✨ Ты уже прошёл ${currentQuestionIndex} вопросов из ${currentQuestions.length}!</p>
            <div class="stats-grid">
                <div class="stat-item"><div class="stat-value">${percentages.tech || 0}%</div><div class="stat-label">Технарь</div></div>
                <div class="stat-item"><div class="stat-value">${percentages.human || 0}%</div><div class="stat-label">Гуманитарий</div></div>
                <div class="stat-item"><div class="stat-value">${percentages.art || 0}%</div><div class="stat-label">Творческий</div></div>
                <div class="stat-item"><div class="stat-value">${percentages.nature || 0}%</div><div class="stat-label">Природный</div></div>
                <div class="stat-item"><div class="stat-value">${percentages.business || 0}%</div><div class="stat-label">Бизнес</div></div>
            </div>
            <p style="margin-top: 16px;">🔥 Осталось совсем немного! Продолжай в том же духе.</p>
        `;
    }
    
    showScreen('midpoint');
}

function continueQuiz() {
    showScreen('quiz');
    displayCurrentQuestion();
}

function finishQuiz() {
    const scores = calculateScores(userAnswers, currentQuestions);
    const strategy = getDominantType(scores);
    const percentages = getPercentages(scores);
    
    currentResult = {
        ...strategy,
        scores: scores,
        percentages: percentages,
        top5: strategy.top5 || [],
        roadmap: strategy.roadmap || [],
        courses: strategy.courses || []
    };
    
    saveResult(currentResult);
    incrementQuizCount();
    recordResultType(strategy.name);
    clearProgress();
    displayResults();
}

function displayResults() {
    if (!currentResult) return;
    
    const resultEmoji = document.getElementById('result-emoji-fallback');
    if (resultEmoji) resultEmoji.textContent = currentResult.emoji;
    
    const diagnosisEl = document.getElementById('meme-diagnosis');
    if (diagnosisEl) diagnosisEl.textContent = currentResult.diagnosis;
    
    const superpowerEl = document.getElementById('superpower');
    if (superpowerEl) superpowerEl.textContent = currentResult.superpower;
    
    const statsGrid = document.getElementById('stats-grid');
    if (statsGrid && currentResult.percentages) {
        statsGrid.innerHTML = `
            <div class="stat-item"><div class="stat-value">${currentResult.percentages.tech || 0}%</div><div class="stat-label">Технарь</div></div>
            <div class="stat-item"><div class="stat-value">${currentResult.percentages.human || 0}%</div><div class="stat-label">Гуманитарий</div></div>
            <div class="stat-item"><div class="stat-value">${currentResult.percentages.art || 0}%</div><div class="stat-label">Творческий</div></div>
            <div class="stat-item"><div class="stat-value">${currentResult.percentages.nature || 0}%</div><div class="stat-label">Природный</div></div>
            <div class="stat-item"><div class="stat-value">${currentResult.percentages.business || 0}%</div><div class="stat-label">Бизнес</div></div>
        `;
    }
    
    const top5Container = document.getElementById('top5-list');
    if (top5Container && currentResult.top5) {
        top5Container.innerHTML = '';
        currentResult.top5.forEach(prof => {
            top5Container.innerHTML += `
                <div class="profession-card">
                    <div class="profession-level">${prof.level}</div>
                    <div class="profession-name">${prof.name}</div>
                    <div class="profession-desc">${prof.desc}</div>
                    <div class="profession-salary"><i class="fas fa-ruble-sign"></i> ${prof.salary}</div>
                </div>
            `;
        });
    }
    
    const roadmapContainer = document.getElementById('roadmap-list');
    if (roadmapContainer && currentResult.roadmap) {
        roadmapContainer.innerHTML = '';
        currentResult.roadmap.forEach(step => {
            roadmapContainer.innerHTML += `
                <div class="roadmap-step">
                    <div class="roadmap-time">${step.time}</div>
                    <ul class="roadmap-steps">
                        ${step.steps.map(s => `<li>${s}</li>`).join('')}
                    </ul>
                </div>
            `;
        });
    }
    
    const coursesContainer = document.getElementById('courses-list');
    if (coursesContainer && currentResult.courses) {
        coursesContainer.innerHTML = '';
        currentResult.courses.forEach(course => {
            coursesContainer.innerHTML += `
                <div class="course-card">
                    <span class="course-name"><i class="fas fa-book-open"></i> ${course.name}</span>
                    <a href="${course.url}" target="_blank" class="course-link">Перейти <i class="fas fa-arrow-right"></i></a>
                </div>
            `;
        });
    }
    
    showConfetti();
    showScreen('result');
}

function restartQuiz() {
    currentQuestionIndex = 0;
    userAnswers = [];
    currentResult = null;
    clearProgress();
    startTest(false);
}

function shareResult() {
    if (!currentResult) return;
    
    const text = `🧠 Я прошёл тест по профориентации!\n\n🎯 Мой тип: ${currentResult.diagnosis}\n✨ Суперсила: ${currentResult.superpower}\n\n🏆 ТОП-3 профессии:\n${currentResult.top5.slice(0,3).map(p => `• ${p.name}`).join('\n')}\n\n🔗 Пройди тест и ты: ${window.location.href}`;
    
    if (navigator.share) {
        navigator.share({
            title: 'Мой результат профориентации',
            text: text,
            url: window.location.href
        }).catch(() => {
            copyToClipboard(text);
        });
    } else {
        copyToClipboard(text);
        alert('📋 Текст скопирован! Поделись им с друзьями.');
    }
}

function copyToClipboard(text) {
    navigator.clipboard.writeText(text).then(() => {
        alert('📋 Результат скопирован! Можешь вставить его в чат.');
    });
}

function downloadPDF() {
    const resultElement = document.getElementById('result-screen');
    if (resultElement) {
        generatePDF('result-screen', `профориентация_${Date.now()}.pdf`);
    }
}

document.getElementById('start-btn')?.addEventListener('click', () => startTest(false));
document.getElementById('load-saved-btn')?.addEventListener('click', () => startTest(true));
document.getElementById('continue-btn')?.addEventListener('click', () => continueQuiz());
document.getElementById('restart-btn')?.addEventListener('click', () => restartQuiz());
document.getElementById('share-btn')?.addEventListener('click', () => shareResult());
document.getElementById('pdf-btn')?.addEventListener('click', () => downloadPDF());

const saveBtn = document.getElementById('save-progress-btn');
if (saveBtn) {
    saveBtn.addEventListener('click', () => {
        saveProgress(currentQuestionIndex, userAnswers);
        alert('💾 Прогресс сохранён! Ты можешь вернуться к тесту позже.');
    });
}
// Переключение темы
const themeToggle = document.getElementById('theme-toggle');
const moonIcon = themeToggle?.querySelector('.fa-moon');
const sunIcon = themeToggle?.querySelector('.fa-sun');

function setTheme(theme) {
    if (theme === 'light') {
        document.body.classList.add('light-theme');
        if (moonIcon) moonIcon.style.display = 'block';
        if (sunIcon) sunIcon.style.display = 'none';
        localStorage.setItem('theme', 'light');
    } else {
        document.body.classList.remove('light-theme');
        if (moonIcon) moonIcon.style.display = 'none';
        if (sunIcon) sunIcon.style.display = 'block';
        localStorage.setItem('theme', 'dark');
    }
}

const savedTheme = localStorage.getItem('theme');
if (savedTheme === 'light') setTheme('light');
else setTheme('dark');

themeToggle?.addEventListener('click', () => {
    const isLight = document.body.classList.contains('light-theme');
    setTheme(isLight ? 'dark' : 'light');
});
init();
