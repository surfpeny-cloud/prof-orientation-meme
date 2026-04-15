// ========== ВСПОМОГАТЕЛЬНЫЕ ФУНКЦИИ ==========

function saveProgress(questionIndex, answers) {
    const progress = {
        questionIndex: questionIndex,
        answers: answers,
        timestamp: Date.now()
    };
    localStorage.setItem('prof_quiz_progress', JSON.stringify(progress));
}

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

function clearProgress() {
    localStorage.removeItem('prof_quiz_progress');
}

function saveResult(result) {
    localStorage.setItem('prof_quiz_result', JSON.stringify(result));
    const history = getResultHistory();
    history.unshift({
        ...result,
        date: new Date().toISOString()
    });
    localStorage.setItem('prof_quiz_history', JSON.stringify(history.slice(0, 10)));
}

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

function incrementQuizCount() {
    let count = parseInt(localStorage.getItem('prof_quiz_count') || '0');
    count++;
    localStorage.setItem('prof_quiz_count', count);
    return count;
}

function getQuizCount() {
    return parseInt(localStorage.getItem('prof_quiz_count') || '0');
}

function calculateScores(answers, questions) {
    const scores = { tech: 0, human: 0, art: 0, nature: 0, business: 0 };
    
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

function getPercentages(scores) {
    const total = Object.values(scores).reduce((a, b) => a + b, 0);
    if (total === 0) return {};
    const percentages = {};
    for (const [key, value] of Object.entries(scores)) {
        percentages[key] = Math.round((value / total) * 100);
    }
    return percentages;
}

function formatPercentage(percent) {
    if (!percent && percent !== 0) return '';
    return `${percent}%`;
}

function generateShareText(result) {
    const text = `🧠 Я прошёл тест по профориентации!\n\n🎯 Мой тип: ${result.diagnosis}\n✨ Суперсила: ${result.superpower}\n\n🏆 ТОП-3 профессии:\n${result.top5.slice(0,3).map(p => `• ${p.name}`).join('\n')}\n\n🔗 Пройди тест и ты: `;
    return encodeURIComponent(text);
}

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

function recordResultType(typeName) {
    const stats = JSON.parse(localStorage.getItem('prof_stats') || '{}');
    stats[typeName] = (stats[typeName] || 0) + 1;
    localStorage.setItem('prof_stats', JSON.stringify(stats));
}

function getStats() {
    return JSON.parse(localStorage.getItem('prof_stats') || '{}');
}
