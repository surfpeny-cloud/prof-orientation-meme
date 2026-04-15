// ========== БАЗА ВОПРОСОВ С МЕМАМИ ==========
const QUESTIONS_DB = [
    {
        id: 1,
        text: "🤖 Что ты делаешь, когда видишь сломанный автомат с кофе?",
        memeUrl: "memes/coffee-meme.jpg",
        memeEmoji: "☕🔧",
        category: "reaction",
        options: [
            { text: "Пытаюсь починить, пока никто не видит", emoji: "🔧", scores: { tech: 3, human: 0, art: 0, nature: 0, business: 0 } },
            { text: "Зову администратора и объясняю проблему", emoji: "🗣️", scores: { tech: 0, human: 3, art: 0, nature: 0, business: 1 } },
            { text: "Фоткаю и выкладываю в TikTok с мемом", emoji: "📸", scores: { tech: 0, human: 1, art: 3, nature: 0, business: 2 } },
            { text: "Ухожу в другой автомат, не парюсь", emoji: "🚶", scores: { tech: 0, human: 0, art: 0, nature: 2, business: 0 } }
        ]
    },
    {
        id: 2,
        text: "💭 Твой идеальный рабочий день — это...",
        memeUrl: "memes/perfect-day.jpg",
        memeEmoji: "💭✨",
        category: "preference",
        options: [
            { text: "Сижу в наушниках, пишу код, никто не трогает", emoji: "💻", scores: { tech: 3, human: 0, art: 1, nature: 0, business: 0 } },
            { text: "Общаюсь с людьми, решаю их проблемы", emoji: "🤝", scores: { tech: 0, human: 3, art: 0, nature: 0, business: 2 } },
            { text: "Рисую/создаю что-то красивое", emoji: "🎨", scores: { tech: 0, human: 0, art: 3, nature: 1, business: 0 } },
            { text: "Работаю на свежем воздухе", emoji: "🌿", scores: { tech: 0, human: 0, art: 1, nature: 3, business: 0 } },
            { text: "Управляю проектами и командой", emoji: "📊", scores: { tech: 0, human: 2, art: 0, nature: 0, business: 3 } }
        ]
    },
    {
        id: 3,
        text: "⚡ Как ты реагируешь на сложную задачу?",
        memeUrl: "memes/drake-meme.jpg",
        memeEmoji: "⚡🤔",
        category: "problem_solving",
        options: [
            { text: "Составляю план, разбиваю на шаги", emoji: "📋", scores: { tech: 2, human: 0, art: 0, nature: 0, business: 2 } },
            { text: "Зову команду, вместе решаем", emoji: "👥", scores: { tech: 0, human: 3, art: 0, nature: 0, business: 1 } },
            { text: "Ищу креативный нестандартный подход", emoji: "💡", scores: { tech: 0, human: 0, art: 3, nature: 0, business: 1 } },
            { text: "Гуглю и разбираюсь сам", emoji: "🔍", scores: { tech: 3, human: 0, art: 0, nature: 0, business: 0 } },
            { text: "Забиваю, откладываю на потом", emoji: "😴", scores: { tech: 0, human: 0, art: 0, nature: 0, business: 0 } }
        ]
    },
    {
        id: 4,
        text: "💰 Что для тебя важнее всего в работе?",
        memeUrl: "memes/money-meme.jpg",
        memeEmoji: "💰💎",
        category: "values",
        options: [
            { text: "Высокая зарплата и бонусы", emoji: "💵", scores: { tech: 0, human: 0, art: 0, nature: 0, business: 3 } },
            { text: "Интересные задачи и развитие", emoji: "🧠", scores: { tech: 2, human: 0, art: 2, nature: 0, business: 1 } },
            { text: "Комфортный коллектив и атмосфера", emoji: "🤗", scores: { tech: 0, human: 3, art: 0, nature: 1, business: 0 } },
            { text: "Свободный график и удалёнка", emoji: "🏠", scores: { tech: 1, human: 0, art: 2, nature: 2, business: 0 } },
            { text: "Помощь людям и польза обществу", emoji: "❤️", scores: { tech: 0, human: 3, art: 0, nature: 2, business: 0 } }
        ]
    },
    {
        id: 5,
        text: "🎮 В какую игру ты бы поиграл прямо сейчас?",
        memeUrl: "memes/gaming-meme.jpg",
        memeEmoji: "🎮🕹️",
        category: "hobby",
        options: [
            { text: "Стратегия (Civilization, Age of Empires)", emoji: "♟️", scores: { tech: 2, human: 0, art: 0, nature: 0, business: 2 } },
            { text: "Шутер или экшен (CS, Valorant)", emoji: "🔫", scores: { tech: 2, human: 1, art: 0, nature: 0, business: 1 } },
            { text: "Симулятор жизни или RPG (Sims, Skyrim)", emoji: "🏰", scores: { tech: 0, human: 2, art: 2, nature: 0, business: 0 } },
            { text: "Головоломки (Portal, The Witness)", emoji: "🧩", scores: { tech: 3, human: 0, art: 1, nature: 0, business: 0 } },
            { text: "Спортивные или гонки (FIFA, Forza)", emoji: "⚽", scores: { tech: 0, human: 2, art: 0, nature: 1, business: 1 } }
        ]
    },
    {
        id: 6,
        text: "📚 Какую книгу ты выберешь?",
        memeUrl: "memes/books-meme.jpg",
        memeEmoji: "📚🤓",
        category: "hobby",
        options: [
            { text: "Бизнес-литературу (как заработать)", emoji: "💼", scores: { tech: 0, human: 1, art: 0, nature: 0, business: 3 } },
            { text: "Научпоп (физика, IT, психология)", emoji: "🔬", scores: { tech: 3, human: 1, art: 0, nature: 0, business: 0 } },
            { text: "Фантастику или фэнтези", emoji: "🐉", scores: { tech: 0, human: 1, art: 3, nature: 0, business: 0 } },
            { text: "Саморазвитие и мотивацию", emoji: "📈", scores: { tech: 0, human: 2, art: 0, nature: 0, business: 2 } },
            { text: "Художественную классику", emoji: "🎭", scores: { tech: 0, human: 2, art: 2, nature: 1, business: 0 } }
        ]
    },
    {
        id: 7,
        text: "🏢 В какой компании ты хотел бы работать?",
        memeUrl: "memes/office-meme.jpg",
        memeEmoji: "🏢⭐",
        category: "preference",
        options: [
            { text: "В крупной корпорации (стабильность)", emoji: "🏛️", scores: { tech: 0, human: 1, art: 0, nature: 0, business: 3 } },
            { text: "В стартапе (быстрый рост)", emoji: "🚀", scores: { tech: 2, human: 1, art: 1, nature: 0, business: 2 } },
            { text: "На фрилансе (свобода)", emoji: "🏠", scores: { tech: 2, human: 0, art: 3, nature: 1, business: 1 } },
            { text: "В своей компании (свой бизнес)", emoji: "👑", scores: { tech: 0, human: 2, art: 1, nature: 0, business: 3 } },
            { text: "В НКО или госсекторе (помощь людям)", emoji: "🤲", scores: { tech: 0, human: 3, art: 0, nature: 2, business: 0 } }
        ]
    },
    {
        id: 8,
        text: "🧠 Какая задача тебя заводит?",
        memeUrl: "memes/brain-meme.jpg",
        memeEmoji: "🧠⚡",
        category: "motivation",
        options: [
            { text: "Оптимизировать и автоматизировать", emoji: "🤖", scores: { tech: 3, human: 0, art: 0, nature: 0, business: 1 } },
            { text: "Придумать креативную концепцию", emoji: "💡", scores: { tech: 0, human: 0, art: 3, nature: 0, business: 1 } },
            { text: "Организовать процесс и людей", emoji: "📊", scores: { tech: 0, human: 2, art: 0, nature: 0, business: 2 } },
            { text: "Разобраться в сложной логике", emoji: "🔍", scores: { tech: 3, human: 0, art: 0, nature: 0, business: 0 } },
            { text: "Помочь кому-то решить проблему", emoji: "🫂", scores: { tech: 0, human: 3, art: 0, nature: 1, business: 0 } }
        ]
    },
    {
        id: 9,
        text: "🎬 Какой жанр фильма ты выберешь?",
        memeUrl: "memes/movies-meme.jpg",
        memeEmoji: "🎬🍿",
        category: "hobby",
        options: [
            { text: "Детектив или триллер", emoji: "🕵️", scores: { tech: 2, human: 1, art: 0, nature: 0, business: 1 } },
            { text: "Комедия", emoji: "😂", scores: { tech: 0, human: 2, art: 2, nature: 0, business: 0 } },
            { text: "Документальный (про науку/бизнес)", emoji: "📽️", scores: { tech: 2, human: 0, art: 0, nature: 0, business: 2 } },
            { text: "Фантастика", emoji: "👽", scores: { tech: 3, human: 0, art: 2, nature: 0, business: 0 } },
            { text: "Драма (про людей и чувства)", emoji: "🎭", scores: { tech: 0, human: 3, art: 1, nature: 0, business: 0 } }
        ]
    }
];

// Функция для получения рандомных N вопросов
function getRandomQuestions(count = 9) {
    const shuffled = [...QUESTIONS_DB];
    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled.slice(0, count);
}
