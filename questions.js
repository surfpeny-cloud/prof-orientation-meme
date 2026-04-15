// ========== БАЗА ВОПРОСОВ (30+ штук) ==========
const QUESTIONS_DB = [
    // Вопрос 1
    {
        id: 1,
        text: "🤖 Что ты делаешь, когда видишь сломанный автомат с кофе?",
        memeEmoji: "☕🔧",
        category: "reaction",
        options: [
            { text: "Пытаюсь починить, пока никто не видит", emoji: "🔧", scores: { tech: 3, human: 0, art: 0, nature: 0, business: 0 } },
            { text: "Зову администратора и объясняю проблему", emoji: "🗣️", scores: { tech: 0, human: 3, art: 0, nature: 0, business: 1 } },
            { text: "Фоткаю и выкладываю в TikTok с мемом", emoji: "📸", scores: { tech: 0, human: 1, art: 3, nature: 0, business: 2 } },
            { text: "Ухожу в другой автомат, не парюсь", emoji: "🚶", scores: { tech: 0, human: 0, art: 0, nature: 2, business: 0 } }
        ]
    },
    // Вопрос 2
    {
        id: 2,
        text: "💭 Твой идеальный рабочий день — это...",
        memeEmoji: "💭✨",
        category: "preference",
        options: [
            { text: "Сижу в наушниках, пишу код/текст, никто не трогает", emoji: "💻", scores: { tech: 3, human: 0, art: 1, nature: 0, business: 0 } },
            { text: "Общаюсь с людьми, решаю их проблемы", emoji: "🤝", scores: { tech: 0, human: 3, art: 0, nature: 0, business: 2 } },
            { text: "Рисую/создаю что-то красивое", emoji: "🎨", scores: { tech: 0, human: 0, art: 3, nature: 1, business: 0 } },
            { text: "Работаю на свежем воздухе", emoji: "🌿", scores: { tech: 0, human: 0, art: 1, nature: 3, business: 0 } },
            { text: "Управляю проектами и командой", emoji: "📊", scores: { tech: 0, human: 2, art: 0, nature: 0, business: 3 } }
        ]
    },
    // Вопрос 3
    {
        id: 3,
        text: "⚡ Как ты реагируешь на сложную задачу?",
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
    // Вопрос 4
    {
        id: 4,
        text: "💰 Что для тебя важнее всего в работе?",
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
    // Вопрос 5
    {
        id: 5,
        text: "🎮 В какую игру ты бы поиграл прямо сейчас?",
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
    // Вопрос 6
    {
        id: 6,
        text: "📚 Какую книгу ты выберешь?",
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
    // Вопрос 7
    {
        id: 7,
        text: "🏢 В какой компании ты хотел бы работать?",
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
    // Вопрос 8
    {
        id: 8,
        text: "🧠 Какая задача тебя заводит?",
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
    // Вопрос 9
    {
        id: 9,
        text: "🎬 Какой жанр фильма ты выберешь?",
        memeEmoji: "🎬🍿",
        category: "hobby",
        options: [
            { text: "Детектив или триллер", emoji: "🕵️", scores: { tech: 2, human: 1, art: 0, nature: 0, business: 1 } },
            { text: "Комедия", emoji: "😂", scores: { tech: 0, human: 2, art: 2, nature: 0, business: 0 } },
            { text: "Документальный (про науку/бизнес)", emoji: "📽️", scores: { tech: 2, human: 0, art: 0, nature: 0, business: 2 } },
            { text: "Фантастика", emoji: "👽", scores: { tech: 3, human: 0, art: 2, nature: 0, business: 0 } },
            { text: "Драма (про людей и чувства)", emoji: "🎭", scores: { tech: 0, human: 3, art: 1, nature: 0, business: 0 } }
        ]
    },
    // Вопрос 10
    {
        id: 10,
        text: "🛠️ Что ты делаешь в свободное время?",
        memeEmoji: "🛠️🎨",
        category: "hobby",
        options: [
            { text: "Учусь новому (курсы, статьи)", emoji: "📖", scores: { tech: 2, human: 0, art: 1, nature: 0, business: 2 } },
            { text: "Мастерю/чиню/собираю", emoji: "🔨", scores: { tech: 3, human: 0, art: 1, nature: 0, business: 0 } },
            { text: "Встречаюсь с друзьями", emoji: "👯", scores: { tech: 0, human: 3, art: 0, nature: 1, business: 0 } },
            { text: "Рисую/фотографирую/творю", emoji: "🎨", scores: { tech: 0, human: 0, art: 3, nature: 1, business: 0 } },
            { text: "Гуляю на природе", emoji: "🌲", scores: { tech: 0, human: 0, art: 1, nature: 3, business: 0 } }
        ]
    }
];

// Дополнительные вопросы (для расширения до 30)
const MORE_QUESTIONS = [
    {
        id: 11,
        text: "🧩 Что тебе нравится собирать?",
        memeEmoji: "🧩",
        category: "hobby",
        options: [
            { text: "Пазлы или конструкторы", emoji: "🧩", scores: { tech: 2, human: 0, art: 2, nature: 0, business: 0 } },
            { text: "Команду на мероприятие", emoji: "👥", scores: { tech: 0, human: 3, art: 0, nature: 0, business: 1 } },
            { text: "Бизнес-модель", emoji: "📈", scores: { tech: 0, human: 0, art: 0, nature: 0, business: 3 } },
            { text: "Гербарий или коллекции", emoji: "🍂", scores: { tech: 0, human: 0, art: 1, nature: 3, business: 0 } }
        ]
    },
    {
        id: 12,
        text: "💬 Какую соцсеть ты любишь больше всего?",
        memeEmoji: "📱",
        category: "hobby",
        options: [
            { text: "GitHub / StackOverflow", emoji: "🐙", scores: { tech: 3, human: 0, art: 0, nature: 0, business: 1 } },
            { text: "Instagram / Pinterest", emoji: "📸", scores: { tech: 0, human: 1, art: 3, nature: 1, business: 1 } },
            { text: "Telegram (чаты и каналы)", emoji: "✈️", scores: { tech: 1, human: 2, art: 0, nature: 0, business: 2 } },
            { text: "YouTube (обучение)", emoji: "▶️", scores: { tech: 2, human: 1, art: 2, nature: 0, business: 1 } },
            { text: "Reddit / Twitter", emoji: "🐦", scores: { tech: 1, human: 2, art: 1, nature: 0, business: 1 } }
        ]
    },
    {
        id: 13,
        text: "🧘 Как ты справляешься со стрессом?",
        memeEmoji: "🧘",
        category: "reaction",
        options: [
            { text: "Ухожу в работу/учёбу", emoji: "💻", scores: { tech: 2, human: 0, art: 0, nature: 0, business: 2 } },
            { text: "Говорю с друзьями", emoji: "🗣️", scores: { tech: 0, human: 3, art: 0, nature: 0, business: 0 } },
            { text: "Творю (рисую, музыка)", emoji: "🎨", scores: { tech: 0, human: 0, art: 3, nature: 1, business: 0 } },
            { text: "Иду на природу", emoji: "🌲", scores: { tech: 0, human: 0, art: 0, nature: 3, business: 0 } },
            { text: "Планирую и структурирую", emoji: "📋", scores: { tech: 1, human: 0, art: 0, nature: 0, business: 2 } }
        ]
    }
];

// Объединяем все вопросы
const ALL_QUESTIONS = [...QUESTIONS_DB, ...MORE_QUESTIONS];

// Функция для получения рандомных N вопросов
function getRandomQuestions(count = 15) {
    const shuffled = [...ALL_QUESTIONS];
    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled.slice(0, count);
}
