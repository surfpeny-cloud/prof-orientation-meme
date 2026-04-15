// ========== НОВЫЕ ВОПРОСЫ (30+ штук) ==========
// Вопросы построены на ситуациях, а не прямых вопросах о профессии

const QUESTIONS_DB = [
    // БЛОК 1: ПОВСЕДНЕВНЫЕ СИТУАЦИИ
    {
        id: 1,
        text: "📱 Ты залипаешь в телефоне. Что ты чаще всего смотришь?",
        memeUrl: "memes/phone-meme.jpg",
        memeEmoji: "📱",
        category: "hobby",
        options: [
            { text: "Разборки техники, обзоры гаджетов", emoji: "🔧", scores: { tech: 3, business: 1 } },
            { text: "ТикТок с приколами и мемами", emoji: "😂", scores: { art: 2, human: 1 } },
            { text: "Обучение, курсы, лекции", emoji: "📚", scores: { tech: 2, sign: 2 } },
            { text: "Путешествия, природа, животные", emoji: "🌍", scores: { nature: 3 } },
            { text: "Бизнес-каналы, успешный успех", emoji: "💼", scores: { business: 3 } }
        ]
    },
    {
        id: 2,
        text: "🧩 Ты застрял в лифте один на час. Что ты будешь делать?",
        memeUrl: "memes/elevator-meme.jpg",
        memeEmoji: "🛗",
        category: "reaction",
        options: [
            { text: "Попытаюсь открыть двери или вызвать помощь по кнопке", emoji: "🔧", scores: { tech: 2 } },
            { text: "Позвоню другу, чтобы скоротать время", emoji: "📞", scores: { human: 3 } },
            { text: "Придумаю историю или стих", emoji: "✍️", scores: { art: 3 } },
            { text: "Сяду в угол и подышу (медитация)", emoji: "🧘", scores: { nature: 2 } },
            { text: "Сразу позвоню диспетчеру и объясню ситуацию", emoji: "📊", scores: { business: 2 } }
        ]
    },
    {
        id: 3,
        text: "🎁 Тебе подарили 10 000 ₽ на саморазвитие. Куда потратишь?",
        memeUrl: "memes/gift-meme.jpg",
        memeEmoji: "🎁",
        category: "values",
        options: [
            { text: "Курс по Python или Data Science", emoji: "💻", scores: { tech: 3 } },
            { text: "Курс по ораторскому мастерству", emoji: "🎤", scores: { human: 3 } },
            { text: "Набор для рисования или фотоаппарат", emoji: "🎨", scores: { art: 3 } },
            { text: "Поездку на природу или в заповедник", emoji: "🏕️", scores: { nature: 3 } },
            { text: "Курс по управлению проектами", emoji: "📈", scores: { business: 3 } }
        ]
    },
    // БЛОК 2: РАБОЧИЕ СИТУАЦИИ
    {
        id: 4,
        text: "💼 Твой начальник даёт задачу без чёткого ТЗ. Твои действия?",
        memeUrl: "memes/boss-meme.jpg",
        memeEmoji: "👔",
        category: "work",
        options: [
            { text: "Задаю уточняющие вопросы, чтобы всё расписать", emoji: "📋", scores: { tech: 2, sign: 2 } },
            { text: "Собираю команду и обсуждаем", emoji: "👥", scores: { human: 3 } },
            { text: "Делаю как понял, потом переделаю", emoji: "🎨", scores: { art: 2 } },
            { text: "Иду искать в интернете похожие задачи", emoji: "🔍", scores: { tech: 2 } },
            { text: "Беру инициативу и предлагаю свой план", emoji: "🚀", scores: { business: 3 } }
        ]
    },
    {
        id: 5,
        text: "🔄 Ты нашёл способ автоматизировать свою работу. Что чувствуешь?",
        memeUrl: "memes/auto-meme.jpg",
        memeEmoji: "🤖",
        category: "emotion",
        options: [
            { text: "Эйфорию! Буду оптимизировать всё вокруг", emoji: "🤩", scores: { tech: 3, business: 2 } },
            { text: "Радость — теперь можно заняться творчеством", emoji: "🎉", scores: { art: 3 } },
            { text: "Спокойствие — меньше ошибок и стресса", emoji: "😌", scores: { nature: 2 } },
            { text: "Поделюсь с коллегами, пусть тоже экономят время", emoji: "🤝", scores: { human: 3 } }
        ]
    },
    {
        id: 6,
        text: "🗣️ Коллега ошибся в отчёте, из-за чего ты получил замечание. Твой шаг?",
        memeUrl: "memes/error-meme.jpg",
        memeEmoji: "😤",
        category: "conflict",
        options: [
            { text: "Молча исправлю, чтобы не подставлять", emoji: "🤐", scores: { human: 2 } },
            { text: "Поговорю с коллегой, объясню ситуацию", emoji: "💬", scores: { human: 3, business: 1 } },
            { text: "Внедрю систему проверки отчётов", emoji: "⚙️", scores: { tech: 3 } },
            { text: "Напишу памятку для всех", emoji: "📝", scores: { sign: 3 } },
            { text: "Предложу провести тренинг по работе с отчётами", emoji: "🎓", scores: { business: 2 } }
        ]
    },
    // БЛОК 3: КРЕАТИВ И ТВОРЧЕСТВО
    {
        id: 7,
        text: "🎨 Ты увидел пустую стену в офисе. Что сделаешь?",
        memeUrl: "memes/wall-meme.jpg",
        memeEmoji: "🖌️",
        category: "creative",
        options: [
            { text: "Предложу повесить доску для заметок и KPI", emoji: "📊", scores: { business: 2, tech: 1 } },
            { text: "Нарисую граффити или мем", emoji: "🎨", scores: { art: 3 } },
            { text: "Оставлю как есть — минимализм", emoji: "😐", scores: { nature: 1 } },
            { text: "Повешу карту мира и буду отмечать поездки", emoji: "🌍", scores: { nature: 2, human: 1 } },
            { text: "Сделаю стену для стикеров с идеями", emoji: "💡", scores: { tech: 2, business: 1 } }
        ]
    },
    {
        id: 8,
        text: "🎵 Какую музыку ты включишь для фона во время работы?",
        memeUrl: "memes/music-meme.jpg",
        memeEmoji: "🎧",
        category: "hobby",
        options: [
            { text: "Lofi hip-hop или инструментал", emoji: "🎹", scores: { tech: 1, art: 2 } },
            { text: "Подкасты про бизнес и IT", emoji: "🎙️", scores: { business: 2, tech: 1 } },
            { text: "Классику или джаз", emoji: "🎻", scores: { art: 2, nature: 1 } },
            { text: "Попсу или рок, чтобы подпевать", emoji: "🎤", scores: { human: 2 } },
            { text: "Тишина — ничего не включаю", emoji: "🤫", scores: { nature: 2, tech: 1 } }
        ]
    },
    // БЛОК 4: ОБЩЕНИЕ И ЛЮДИ
    {
        id: 9,
        text: "👥 Какую роль ты чаще всего берёшь в групповом проекте?",
        memeUrl: "memes/team-meme.jpg",
        memeEmoji: "🤝",
        category: "teamwork",
        options: [
            { text: "Генератор идей и креатива", emoji: "💡", scores: { art: 3 } },
            { text: "Организатор и тайм-менеджер", emoji: "📅", scores: { business: 3 } },
            { text: "Технический исполнитель", emoji: "💻", scores: { tech: 3 } },
            { text: "Тот, кто ищет информацию", emoji: "🔍", scores: { sign: 2 } },
            { text: "Миротворец и дипломат", emoji: "🕊️", scores: { human: 3 } }
        ]
    },
    {
        id: 10,
        text: "📝 Тебе нужно объяснить сложную тему новичку. Как объяснишь?",
        memeUrl: "memes/explain-meme.jpg",
        memeEmoji: "🗣️",
        category: "communication",
        options: [
            { text: "Нарисую схему или мем", emoji: "🎨", scores: { art: 2 } },
            { text: "Составлю пошаговую инструкцию", emoji: "📝", scores: { sign: 3 } },
            { text: "Покажу на примере из жизни", emoji: "🌍", scores: { human: 2, nature: 1 } },
            { text: "Сделаю презентацию с цифрами", emoji: "📊", scores: { business: 2 } },
            { text: "Запишу видео с экраном", emoji: "📹", scores: { tech: 2 } }
        ]
    },
    // БЛОК 5: СТРЕСС И ВОССТАНОВЛЕНИЕ
    {
        id: 11,
        text: "😤 Как ты справляешься с выгоранием?",
        memeUrl: "memes/burnout-meme.jpg",
        memeEmoji: "😫",
        category: "stress",
        options: [
            { text: "Ухожу в работу с головой — помогает отвлечься", emoji: "💻", scores: { tech: 1, business: 1 } },
            { text: "Иду гулять в парк или в лес", emoji: "🌲", scores: { nature: 3 } },
            { text: "Встречаюсь с друзьями", emoji: "👯", scores: { human: 3 } },
            { text: "Начинаю новый творческий проект", emoji: "🎨", scores: { art: 2 } },
            { text: "Делаю план и структурирую задачи", emoji: "📋", scores: { sign: 2, business: 1 } }
        ]
    },
    {
        id: 12,
        text: "🏆 Что для тебя главный признак успеха?",
        memeUrl: "memes/success-meme.jpg",
        memeEmoji: "🏆",
        category: "values",
        options: [
            { text: "Высокая зарплата и финансовая свобода", emoji: "💰", scores: { business: 3 } },
            { text: "Признание и уважение коллег", emoji: "👏", scores: { human: 2 } },
            { text: "Созданный продукт, которым пользуются люди", emoji: "🚀", scores: { tech: 2, art: 1 } },
            { text: "Гармония и баланс с природой", emoji: "🌿", scores: { nature: 3 } },
            { text: "Возможность творить и самовыражаться", emoji: "🎨", scores: { art: 3 } }
        ]
    },
    // БЛОК 6: ТЕХНОЛОГИИ И ИННОВАЦИИ
    {
        id: 13,
        text: "🤖 Как ты относишься к ИИ (нейросетям)?",
        memeUrl: "memes/ai-meme.jpg",
        memeEmoji: "🤖",
        category: "tech",
        options: [
            { text: "Обожаю! Это инструмент для творчества", emoji: "❤️", scores: { art: 2, tech: 2 } },
            { text: "Использую для работы — ускоряет процессы", emoji: "⚡", scores: { tech: 3, business: 1 } },
            { text: "Нейтрально, но слежу за развитием", emoji: "😐", scores: { sign: 2 } },
            { text: "Боюсь, что заменит людей", emoji: "😨", scores: { human: 2 } },
            { text: "Не доверяю, лучше сделать самому", emoji: "🔧", scores: { tech: 1, nature: 1 } }
        ]
    },
    {
        id: 14,
        text: "📊 Какую соцсеть ты используешь для работы/развития?",
        memeUrl: "memes/social-meme.jpg",
        memeEmoji: "📱",
        category: "social",
        options: [
            { text: "Telegram-каналы по профессии", emoji: "✈️", scores: { tech: 2, business: 1 } },
            { text: "YouTube с обучением", emoji: "▶️", scores: { tech: 2, art: 1 } },
            { text: "LinkedIn или Хабр Карьера", emoji: "💼", scores: { business: 3 } },
            { text: "Pinterest или Behance", emoji: "🎨", scores: { art: 3 } },
            { text: "Не использую для работы", emoji: "🙅", scores: { nature: 2 } }
        ]
    },
    // БЛОК 7: БУДУЩЕЕ И АМБИЦИИ
    {
        id: 15,
        text: "🚀 Какая фраза лучше всего описывает твои амбиции?",
        memeUrl: "memes/ambition-meme.jpg",
        memeEmoji: "⭐",
        category: "ambition",
        options: [
            { text: "Хочу стать экспертом в своём деле", emoji: "🧠", scores: { tech: 2, sign: 2 } },
            { text: "Хочу открыть свой бизнес", emoji: "🏢", scores: { business: 3 } },
            { text: "Хочу помогать людям", emoji: "🤲", scores: { human: 3 } },
            { text: "Хочу создавать искусство", emoji: "🎨", scores: { art: 3 } },
            { text: "Хочу жить в гармонии с природой", emoji: "🌍", scores: { nature: 3 } }
        ]
    }
];

// Добавляем вопросы из реальных профориентационных методик
const MORE_QUESTIONS = [
    {
        id: 16,
        text: "🧪 Ты в лаборатории. Что тебе интереснее?",
        memeUrl: "memes/lab-meme.jpg",
        memeEmoji: "🔬",
        category: "science",
        options: [
            { text: "Ставить опыты и анализировать", emoji: "📊", scores: { tech: 2, sign: 2 } },
            { text: "Изучать живые организмы", emoji: "🐛", scores: { nature: 3 } },
            { text: "Создавать новые материалы", emoji: "⚗️", scores: { tech: 3 } },
            { text: "Документировать результаты", emoji: "📝", scores: { sign: 3 } },
            { text: "Рассказывать о научных открытиях", emoji: "🎙️", scores: { human: 2 } }
        ]
    },
    {
        id: 17,
        text: "🏥 Ты в больнице. Какую роль выберешь?",
        memeUrl: "memes/doctor-meme.jpg",
        memeEmoji: "🩺",
        category: "help",
        options: [
            { text: "Врач — лечить людей", emoji: "👨‍⚕️", scores: { human: 3, nature: 1 } },
            { text: "Медсестра/брат — ухаживать", emoji: "🤲", scores: { human: 2 } },
            { text: "Администратор — организовывать", emoji: "📋", scores: { business: 2 } },
            { text: "Разработчик медоборудования", emoji: "🔧", scores: { tech: 3 } },
            { text: "Волонтёр — поддерживать морально", emoji: "❤️", scores: { human: 2, nature: 1 } }
        ]
    },
    {
        id: 18,
        text: "📈 Твой друг хочет открыть бизнес. Что посоветуешь?",
        memeUrl: "memes/business-meme.jpg",
        memeEmoji: "💡",
        category: "advice",
        options: [
            { text: "Составь бизнес-план и проанализируй рынок", emoji: "📊", scores: { business: 3 } },
            { text: "Найди крутого технаря в команду", emoji: "🤖", scores: { tech: 2 } },
            { text: "Сделай крутой дизайн и упаковку", emoji: "🎨", scores: { art: 2 } },
            { text: "Построй систему с заботой о сотрудниках", emoji: "🤝", scores: { human: 2 } },
            { text: "Подумай об экологичности", emoji: "🌿", scores: { nature: 2 } }
        ]
    }
];

const ALL_QUESTIONS = [...QUESTIONS_DB, ...MORE_QUESTIONS];

function getRandomQuestions(count = 12) {
    const shuffled = [...ALL_QUESTIONS];
    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled.slice(0, count);
}
