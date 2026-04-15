// ========== ВСПОМОГАТЕЛЬНЫЕ ФУНКЦИИ ==========

// Сохранение прогресса в localStorage
function saveProgress(questionIndex, answers) {
    const progress = {
        questionIndex: questionIndex,
        answers: answers,
        timestamp: Date.now()
    };
    localStorage.setItem('prof_quiz_progress', JSON.stringify(progress));
}

// Загрузка сохранённого прогресса
function loadProgress() {
    const saved = localStorage.getItem('prof_quiz_progress');
    if (saved) {
        try {
            return JSON.parse(saved);
        } catch(e) {
            return null;
        }
    }
    return null;
}

// Очистка прогресса
function clearProgress() {
    localStorage.removeItem('prof_quiz_progress');
}

// Сохранение финального результата
function saveResult(result) {
    localStorage.setItem('prof_quiz_result', JSON.stringify(result));
    // Сохраняем историю результатов
    const history = getResultHistory();
    history.unshift({
        ...result,
        date: new Date().toISOString()
    });
    localStorage.setItem('prof_quiz_history', JSON.stringify(history.slice(0, 10)));
}

// Получить историю результатов
function getResultHistory() {
    const history = localStorage.getItem('prof_quiz_history');
    if (history) {
        try {
            return JSON.parse(history);
        } catch(e) {
            return [];
        }
    }
    return [];
}

// Статистика (сколько раз проходили)
function incrementQuizCount() {
    let count = parseInt(localStorage.getItem('prof_quiz_count') || '0');
    count++;
    localStorage.setItem('prof_quiz_count', count);
    return count;
}

function getQuizCount() {
    return parseInt(localStorage.getItem('prof_quiz_count') || '0');
}

// Подсчёт результатов теста
function calculateScores(answers, questions) {
    const scores = {
        tech: 0,
        human: 0,
        art: 0,
        nature: 0,
        business: 0
    };
    
    answers.forEach((answerIndex, questionIdx) => {
        const question = questions[questionIdx];
        if (question && question.options[answerIndex]) {
            const optionScores = question.options[answerIndex].scores;
            for (const [category, points] of Object.entries(optionScores)) {
                if (scores[category] !== undefined) {
                    scores[category] += points;
                }
            }
        }
    });
    
    return scores;
}

// Получить процентное распределение
function getPercentages(scores) {
    const total = Object.values(scores).reduce((a, b) => a + b, 0);
    if (total === 0) return {};
    const percentages = {};
    for (const [key, value] of Object.entries(scores)) {
        percentages[key] = Math.round((value / total) * 100);
    }
    return percentages;
}

// Форматирование для отображения
function formatPercentage(percent) {
    if (!percent && percent !== 0) return '';
    return `${percent}%`;
}

// Функция для создания текста для поделиться
function generateShareText(result) {
    const text = `🧠 Я прошёл тест по профориентации!\n\n🎯 Мой тип: ${result.diagnosis}\n✨ Суперсила: ${result.superpower}\n\n🏆 ТОП-3 профессии:\n${result.top5.slice(0,3).map(p => `• ${p.name}`).join('\n')}\n\n🔗 Пройди тест и ты: `;
    return encodeURIComponent(text);
}

// Создать PDF отчёт
function generatePDF(elementId, filename = 'профориентация_результат.pdf') {
    const element = document.getElementById(elementId);
    if (!element) return;
    
    const opt = {
        margin: [0.5, 0.5, 0.5, 0.5],
        filename: filename,
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 2, letterRendering: true },
        jsPDF: { unit: 'in', format: 'a4', orientation: 'portrait' }
    };
    
    html2pdf().set(opt).from(element).save();
}
