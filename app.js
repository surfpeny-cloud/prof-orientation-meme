// ========== ОСНОВНАЯ ЛОГИКА ПРИЛОЖЕНИЯ ==========

// Состояние
let currentQuestions = [];
let currentQuestionIndex = 0;
let userAnswers = [];
let currentResult = null;

// DOM элементы
const screens = {
    loading: document.getElementById('loading-screen'),
    welcome: document.getElementById('welcome-screen'),
    quiz: document.getElementById('quiz-screen'),
    midpoint: document.getElementById('midpoint-screen'),
    result: document.getElementById('result-screen')
};

// Инициализация
async function init() {
    // Показываем загрузку
    showScreen('loading');
    
    // Имитация загрузки (для красоты)
    await new Promise(r => setTimeout(r, 800));
    
    // Получаем случайные вопросы
    currentQuestions = getRandomQuestions(12); // 12 вопросов для теста
    
    // Обновляем общее количество в приветствии
    const totalSpan = document.getElementById('total-questions');
    if (totalSpan) totalSpan.textContent = currentQuestions.length;
    
    // Проверяем сохранённый прогресс
    const savedProgress = loadProgress();
    if (savedProgress && savedProgress.answers && savedProgress.answers.length > 0 && savedProgress.answers.length < currentQuestions.length) {
        // Показываем кнопку "Продолжить"
        const loadBtn = document.getElementById('load-saved-btn');
        if (loadBtn) loadBtn.style.display = 'block';
    } else {
        const loadBtn = document.getElementById('load-saved-btn');
        if (loadBtn) loadBtn.style.display = 'none';
        clearProgress();
    }
    
    // Показываем приветствие
    showScreen('welcome');
}

// Переключение экранов
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

// Старт теста
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
    
    // Перемешиваем вопросы для разнообразия
    if (!resumeFromSave) {
        currentQuestions = getRandomQuestions(12);
    }
    
    showScreen('quiz');
    displayCurrentQuestion();
}

// Отображение текущего вопроса (с поддержкой мемов-картинок)
function displayCurrentQuestion() {
    const question = currentQuestions[currentQuestionIndex];
    if (!question) return;
    
    // Обновляем счётчик
    const counterSpan = document.getElementById('question-counter');
    if (counterSpan) counterSpan.textContent = `${currentQuestionIndex + 1} / ${currentQuestions.length}`;
    
    // Обновляем прогресс-бар
    const progress = ((currentQuestionIndex + 1) / currentQuestions.length) * 100;
    const progressFill = document.getElementById('progress-fill');
    if (progressFill) progressFill.style.width = `${progress}%`;
    
    // Показываем мем-картинку (если есть)
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
        memeImg.style.display = 'none';
        fallback.textContent = question.memeEmoji || '🤔';
        fallback.style.display = 'block';
    }
    
    // Обновляем текст вопроса
    const questionText = document.getElementById('question-text');
    if (questionText) questionText.textContent = question.text;
    
    // Генерируем кнопки ответов
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
    
    // Сохраняем прогресс
    saveProgress(currentQuestionIndex, userAnswers);
}

// Выбор ответа
function selectAnswer(optionIndex) {
    // Сохраняем ответ
    userAnswers[currentQuestionIndex] = optionIndex;
    
    // Переход к следующему вопросу
    if (currentQuestionIndex + 1 < currentQuestions.length) {
        currentQuestionIndex++;
        displayCurrentQuestion();
        
        // Показываем промежуточный результат на полпути
        if (currentQuestionIndex === Math.floor(currentQuestions.length / 2)) {
            showMidpointScreen();
        }
    } else {
        // Тест завершён
        finishQuiz();
    }
}

// Промежуточный экран (полпути)
function showMidpointScreen() {
    // Сохраняем прогресс
    saveProgress(currentQuestionIndex, userAnswers);
    
    // Показываем небольшую статистику
    const scores = calculateScores(userAnswers, currentQuestions);
    const percentages = getPercentages(scores);
    
    const statsDiv = document.getElementById('midpoint-stats');
    if (statsDiv) {
        statsDiv.innerHTML = `
            <p>Ты уже прошёл ${currentQuestionIndex} вопросов!</p>
            <div class="stats-grid">
                <div class="stat-item"><div class="stat-value">${percentages.tech || 0}%</div><div class="stat-label">Технарь</div></div>
                <div class="stat-item"><div class="stat-value">${percentages.human || 0}%</div><div class="stat-label">Гуманитарий</div></div>
                <div class="stat-item"><div class="stat-value">${percentages.art || 0}%</div><div class="stat-label">Творческий</div></div>
                <div class="stat-item"><div class="stat-value">${percentages.nature || 0}%</div><div class="stat-label">Природный</div></div>
            </div>
            <p>Продолжай — осталось совсем немного!</p>
        `;
    }
    
    showScreen('midpoint');
}

// Продолжить после промежуточного экрана
function continueQuiz() {
    showScreen('quiz');
    displayCurrentQuestion();
}

// Завершение теста
function finishQuiz() {
    // Подсчитываем результаты
    const scores = calculateScores(userAnswers, currentQuestions);
    const strategy = getDominantType(scores);
    const percentages = getPercentages(scores);
    
    // Формируем результат
    currentResult = {
        ...strategy,
        scores: scores,
        percentages: percentages,
        top5: strategy.top5 || [],
        roadmap: strategy.roadmap || [],
        courses: strategy.courses || []
    };
    
    // Сохраняем результат
    saveResult(currentResult);
    incrementQuizCount();
    clearProgress();
    
    // Отображаем результат
    displayResults();
}

// Отображение финальных результатов
function displayResults() {
    if (!currentResult) return;
    
    // Эмодзи и диагноз
    const resultEmoji = document.getElementById('result-emoji');
    if (resultEmoji) resultEmoji.textContent = currentResult.emoji;
    
    const diagnosisEl = document.getElementById('meme-diagnosis');
    if (diagnosisEl) diagnosisEl.textContent = currentResult.diagnosis;
    
    const superpowerEl = document.getElementById('superpower');
    if (superpowerEl) superpowerEl.textContent = currentResult.superpower;
    
    // Статистика
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
    
    // ТОП-5 профессий
    const top5Container = document.getElementById('top5-list');
    if (top5Container && currentResult.top5) {
        top5Container.innerHTML = '';
        currentResult.top5.forEach(prof => {
            top5Container.innerHTML += `
                <div class="profession-card">
                    <div class="profession-level">${prof.level}</div>
                    <div class="profession-name">${prof.name}</div>
                    <div class="profession-desc">${prof.desc}</div>
                    <div class="profession-salary">💰 ${prof.salary}</div>
                </div>
            `;
        });
    }
    
    // Стратегия
    const roadmapContainer = document.getElementById('roadmap-list');
    if (roadmapContainer && currentResult.roadmap) {
        roadmapContainer.innerHTML = '';
        currentResult.roadmap.forEach(step => {
            roadmapContainer.innerHTML += `
                <div class="roadmap-step">
                    <div class="roadmap-time">${step.time}</div>
                    <ul class="roadmap-steps">
                        ${step.steps.map(s => `<li>✅ ${s}</li>`).join('')}
                    </ul>
                </div>
            `;
        });
    }
    
    // Курсы
    const coursesContainer = document.getElementById('courses-list');
    if (coursesContainer && currentResult.courses) {
        coursesContainer.innerHTML = '';
        currentResult.courses.forEach(course => {
            coursesContainer.innerHTML += `
                <div class="course-card">
                    <span class="course-name">📚 ${course.name}</span>
                    <a href="${course.url}" target="_blank" class="course-link">Перейти →</a>
                </div>
            `;
        });
    }
    
    showScreen('result');
}

// Перезапуск теста
function restartQuiz() {
    currentQuestionIndex = 0;
    userAnswers = [];
    currentResult = null;
    clearProgress();
    startTest(false);
}

// Поделиться результатом
function shareResult() {
    if (!currentResult) return;
    
    const text = `🧠 Я прошёл тест по профориентации!\n\n🎯 Мой тип: ${currentResult.diagnosis}\n✨ Суперсила: ${currentResult.superpower}\n\n🏆 ТОП-3 профессии:\n${currentResult.top5.slice(0,3).map(p => `• ${p.name}`).join('\n')}`;
    
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
        alert('Текст скопирован в буфер обмена! Поделись им с друзьями.');
    }
}

// Копирование в буфер
function copyToClipboard(text) {
    navigator.clipboard.writeText(text).then(() => {
        alert('Результат скопирован! Можешь вставить его в чат.');
    });
}

// Скачать PDF
function downloadPDF() {
    const resultElement = document.getElementById('result-screen');
    if (resultElement) {
        generatePDF('result-screen', `профориентация_${Date.now()}.pdf`);
    }
}

// Навешиваем обработчики
document.getElementById('start-btn')?.addEventListener('click', () => startTest(false));
document.getElementById('load-saved-btn')?.addEventListener('click', () => startTest(true));
document.getElementById('continue-btn')?.addEventListener('click', () => continueQuiz());
document.getElementById('restart-btn')?.addEventListener('click', () => restartQuiz());
document.getElementById('share-btn')?.addEventListener('click', () => shareResult());
document.getElementById('pdf-btn')?.addEventListener('click', () => downloadPDF());

// Кнопка "Назад" (если нужна)
const prevBtn = document.getElementById('prev-btn');
if (prevBtn) {
    prevBtn.addEventListener('click', () => {
        if (currentQuestionIndex > 0) {
            currentQuestionIndex--;
            displayCurrentQuestion();
        }
    });
}

// Сохранение прогресса вручную
const saveBtn = document.getElementById('save-progress-btn');
if (saveBtn) {
    saveBtn.addEventListener('click', () => {
        saveProgress(currentQuestionIndex, userAnswers);
        alert('Прогресс сохранён! Ты можешь вернуться к тесту позже.');
    });
}

// Запуск приложения
// Плавное появление элементов
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

// Анимация для опций при появлении
function animateOptions() {
    const options = document.querySelectorAll('.option-btn');
    options.forEach((opt, idx) => {
        animateElement(opt, idx * 0.05);
    });
}

// Эффект конфетти при завершении
function showConfetti() {
    const colors = ['#6C63FF', '#FF6584', '#00D2FF', '#FFD166'];
    for (let i = 0; i < 50; i++) {
        const confetti = document.createElement('div');
        confetti.className = 'confetti';
        confetti.style.left = Math.random() * 100 + '%';
        confetti.style.animationDelay = Math.random() * 0.5 + 's';
        confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        confetti.style.position = 'fixed';
        confetti.style.top = '-10px';
        confetti.style.width = '8px';
        confetti.style.height = '8px';
        confetti.style.borderRadius = '50%';
        confetti.style.pointerEvents = 'none';
        confetti.style.zIndex = '9999';
        confetti.style.animation = 'fall 2s ease-in forwards';
        document.body.appendChild(confetti);
        setTimeout(() => confetti.remove(), 2000);
    }
}

// Добавим CSS для конфетти
const confettiStyle = document.createElement('style');
confettiStyle.textContent = `
    @keyframes fall {
        0% { transform: translateY(0) rotate(0deg); opacity: 1; }
        100% { transform: translateY(100vh) rotate(360deg); opacity: 0; }
    }
`;
document.head.appendChild(confettiStyle);
init();

// Поделиться результатом (обновлённая версия)
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
        alert('Текст скопирован в буфер обмена! Поделись им с друзьями.');
    }
}
