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
    
    currentQuestions = getRandomQuestions(18);
    
    const totalSpan = document.getElementById('total-q-num');
    if (totalSpan) totalSpan.textContent = currentQuestions.length;
    const totalSpanWelcome = document.getElementById('total-questions-count');
    if (totalSpanWelcome) totalSpanWelcome.textContent = currentQuestions.length;
    
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
        currentQuestions = getRandomQuestions(18);
    }
    
    showScreen('quiz');
    displayCurrentQuestion();
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
                <div class="stat-item"><div class="stat-value">${percentages.researcher || 0}%</div><div class="stat-label">Исследователь</div></div>
                <div class="stat-item"><div class="stat-value">${percentages.organizer || 0}%</div><div class="stat-label">Организатор</div></div>
                <div class="stat-item"><div class="stat-value">${percentages.communicator || 0}%</div><div class="stat-label">Коммуникатор</div></div>
            </div>
            <p style="margin-top: 16px;">🔥 Осталось совсем немного! Продолжай!</p>
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
            <div class="stat-item"><div class="stat-value">${currentResult.percentages.researcher || 0}%</div><div class="stat-label">Исследователь</div></div>
            <div class="stat-item"><div class="stat-value">${currentResult.percentages.organizer || 0}%</div><div class="stat-label">Организатор</div></div>
            <div class="stat-item"><div class="stat-value">${currentResult.percentages.communicator || 0}%</div><div class="stat-label">Коммуникатор</div></div>
        `;
    }
    
    // Рейтинг
    const ratingContainer = document.getElementById('rating-container');
    if (ratingContainer) {
        const stats = getTypeStats();
        const total = getTotalParticipants();
        if (total > 0) {
            const sorted = Object.entries(stats).sort((a,b) => b[1] - a[1]);
            let html = '<div class="rating-list">';
            for (let [type, count] of sorted.slice(0,3)) {
                const percent = Math.round((count / total) * 100);
                html += `<div class="rating-item">
                    <span>${STRATEGIES[type]?.emoji || '📌'} ${STRATEGIES[type]?.name || type}</span>
                    <span>${percent}% (${count} чел.)</span>
                </div>`;
            }
            html += '</div>';
            ratingContainer.innerHTML = html;
        } else {
            ratingContainer.innerHTML = '<p>Пока нет данных. Будь первым!</p>';
        }
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
        navigator.share({ title: 'Мой результат', text: text, url: window.location.href }).catch(() => copyToClipboard(text));
    } else {
        copyToClipboard(text);
    }
}

function copyToClipboard(text) {
    navigator.clipboard.writeText(text);
    alert('📋 Результат скопирован!');
}

function downloadPDF() {
    const element = document.getElementById('result-screen');
    if (element) generatePDF('result-screen', `профориентация_${Date.now()}.pdf`);
}

// Сертификат
function generateCertificate(userName, resultType) {
    const certHTML = `<!DOCTYPE html><html><head><meta charset="UTF-8"><title>Сертификат</title><style>
        body { margin:0; background:linear-gradient(135deg,#1a1a2e,#16213e); display:flex; justify-content:center; align-items:center; min-height:100vh; font-family:'Inter',sans-serif; }
        .certificate { width:800px; height:600px; background:linear-gradient(135deg,#fff8e7,#fff); border:20px solid #6C63FF; border-radius:20px; text-align:center; padding:40px; position:relative; }
        .certificate h1 { font-size:48px; color:#6C63FF; margin-top:60px; }
        .certificate .name { font-size:36px; font-weight:bold; color:#FF6584; border-bottom:2px solid #FF6584; display:inline-block; padding:0 20px; margin:20px 0; }
        .certificate .date { position:absolute; bottom:40px; right:40px; font-size:12px; color:#999; }
        .certificate .seal { position:absolute; bottom:40px; left:40px; font-size:50px; }
    </style></head><body>
    <div class="certificate"><div class="seal">🎓</div><h1>СЕРТИФИКАТ</h1><p>Настоящим подтверждается, что</p><div class="name">${userName}</div><h2>${resultType.name}</h2><p>Успешно прошёл(а) тест по профориентации</p><div class="date">${new Date().toLocaleDateString('ru-RU')}</div></div>
    </body></html>`;
    const blob = new Blob([certHTML], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `сертификат_${userName}.html`;
    a.click();
    URL.revokeObjectURL(url);
}

// Telegram
document.getElementById('telegram-btn')?.addEventListener('click', () => {
    if (!currentResult) return;
    const text = `🧠 Результат профориентации!\n\n🎯 Мой тип: ${currentResult.diagnosis}\n✨ Суперсила: ${currentResult.superpower}\n\n🏆 ТОП-3 профессии:\n${currentResult.top5.slice(0,3).map(p => `• ${p.name}`).join('\n')}`;
    window.open(`https://t.me/share/url?url=${encodeURIComponent(window.location.href)}&text=${encodeURIComponent(text)}`, '_blank');
});

// Тёмная/светлая тема
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

// Навешиваем обработчики
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
        alert('💾 Прогресс сохранён!');
    });
}

// Сертификат модальное окно
const certBtn = document.getElementById('cert-btn');
if (certBtn) {
    certBtn.addEventListener('click', () => {
        const modal = document.getElementById('name-modal');
        if (modal) modal.style.display = 'flex';
    });
}

document.getElementById('generate-cert-btn')?.addEventListener('click', () => {
    const userName = document.getElementById('user-name').value.trim();
    if (userName && currentResult) {
        generateCertificate(userName, currentResult);
        document.getElementById('name-modal').style.display = 'none';
    } else {
        alert('Пожалуйста, введите ваше имя');
    }
});

document.getElementById('close-modal-btn')?.addEventListener('click', () => {
    document.getElementById('name-modal').style.display = 'none';
});

// ========== ЧАТ-БОТ С DEEPSEEK ==========
function createChatUI() {
    const toggleBtn = document.createElement('button');
    toggleBtn.id = 'chat-toggle';
    toggleBtn.className = 'chat-toggle';
    toggleBtn.innerHTML = '<i class="fas fa-comment-dots"></i>';
    document.body.appendChild(toggleBtn);
    
    const chatWindow = document.createElement('div');
    chatWindow.id = 'chat-window';
    chatWindow.className = 'chat-window';
    chatWindow.style.display = 'none';
    chatWindow.innerHTML = `
        <div class="chat-header">
            <span><i class="fas fa-robot"></i> DeepSeek — Карьерный консультант</span>
            <button id="chat-close" class="chat-close">✕</button>
        </div>
        <div id="chat-messages" class="chat-messages">
            <div class="chat-message bot">🤖 Привет! Я ИИ-консультант по карьере. Задавай любые вопросы о профессиях, образовании, зарплатах — я помогу!</div>
        </div>
        <div class="chat-input">
            <input type="text" id="chat-input" placeholder="Напиши свой вопрос...">
            <button id="chat-send"><i class="fas fa-paper-plane"></i></button>
        </div>
    `;
    document.body.appendChild(chatWindow);
    return { toggleBtn, chatWindow };
}

const { toggleBtn, chatWindow } = createChatUI();
const chatClose = document.getElementById('chat-close');
const chatSend = document.getElementById('chat-send');
const chatInput = document.getElementById('chat-input');
const chatMessages = document.getElementById('chat-messages');

let isTyping = false;

function addChatMessage(text, isUser = false) {
    const msg = document.createElement('div');
    msg.className = `chat-message ${isUser ? 'user' : 'bot'}`;
    msg.textContent = text;
    chatMessages.appendChild(msg);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

function showTyping() {
    if (isTyping) return;
    isTyping = true;
    const typing = document.createElement('div');
    typing.className = 'chat-message bot typing-indicator';
    typing.id = 'typing-indicator';
    typing.innerHTML = '<span>.</span><span>.</span><span>.</span>';
    chatMessages.appendChild(typing);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

function hideTyping() {
    isTyping = false;
    const el = document.getElementById('typing-indicator');
    if (el) el.remove();
}

async function sendChatMessage() {
    const message = chatInput.value.trim();
    if (!message) return;
    
    chatInput.value = '';
    addChatMessage(message, true);
    showTyping();
    
    try {
        // ВАЖНО: теперь запрос идёт на YandexGPT, а не на DeepSeek
        const response = await fetch('/api/gemini', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ message, history: [] })
        });
        
        const data = await response.json();
        hideTyping();
        
        if (data.reply) {
            addChatMessage(data.reply, false);
        } else if (data.error) {
            addChatMessage(`😔 Ошибка: ${data.error}. Попробуй позже.`, false);
        } else {
            addChatMessage('😔 Неизвестная ошибка. Попробуй ещё раз.', false);
        }
    } catch (err) {
        hideTyping();
        addChatMessage('🔌 Ошибка соединения. Проверь интернет и попробуй позже.', false);
        console.error('Chat error:', err);
    }
}

toggleBtn?.addEventListener('click', () => {
    const isVisible = chatWindow.style.display === 'flex';
    chatWindow.style.display = isVisible ? 'none' : 'flex';
});

chatClose?.addEventListener('click', () => {
    chatWindow.style.display = 'none';
});

chatSend?.addEventListener('click', sendChatMessage);
chatInput?.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') sendChatMessage();
});

init();
