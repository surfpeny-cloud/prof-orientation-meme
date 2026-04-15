// ========== 18 НОВЫХ КОСВЕННЫХ ВОПРОСОВ ==========

const QUESTIONS_DB = [
    {
        id: 1,
        text: "📱 Ты залипаешь в телефоне. Что ты чаще всего смотришь?",
        memeUrl: "memes/phone-meme.jpg",
        memeEmoji: "📱",
        options: [
            { text: "Разборки техники, обзоры гаджетов", emoji: "🔧", scores: { tech: 3 } },
            { text: "ТикТок с приколами и мемами", emoji: "😂", scores: { art: 2, human: 1 } },
            { text: "Обучение, курсы, лекции", emoji: "📚", scores: { tech: 2, sign: 1 } },
            { text: "Путешествия, природа, животные", emoji: "🌍", scores: { nature: 3 } },
            { text: "Бизнес-каналы, успешный успех", emoji: "💼", scores: { business: 3 } }
        ]
    },
    {
        id: 2,
        text: "🧩 Ты застрял в лифте один на час. Что будешь делать?",
        memeUrl: "memes/elevator-meme.jpg",
        memeEmoji: "🛗",
        options: [
            { text: "Попытаюсь открыть двери или вызвать помощь", emoji: "🔧", scores: { tech: 2 } },
            { text: "Позвоню другу, чтобы скоротать время", emoji: "📞", scores: { human: 3 } },
            { text: "Придумаю историю или стих", emoji: "✍️", scores: { art: 3 } },
            { text: "Сяду в угол и подышу (медитация)", emoji: "🧘", scores: { nature: 2 } },
            { text: "Сразу позвоню диспетчеру", emoji: "📊", scores: { business: 2 } }
        ]
    },
    {
        id: 3,
        text: "🎁 Тебе подарили 10 000 ₽ на саморазвитие. Куда потратишь?",
        memeUrl: "memes/gift-meme.jpg",
        memeEmoji: "🎁",
        options: [
            { text: "Курс по Python или Data Science", emoji: "💻", scores: { tech: 3 } },
            { text: "Курс по ораторскому мастерству", emoji: "🎤", scores: { human: 3 } },
            { text: "Набор для рисования или фотоаппарат", emoji: "🎨", scores: { art: 3 } },
            { text: "Поездку на природу", emoji: "🏕️", scores: { nature: 3 } },
            { text: "Курс по управлению проектами", emoji: "📈", scores: { business: 3 } }
        ]
    },
    {
        id: 4,
        text: "💼 Начальник даёт задачу без чёткого ТЗ. Твои действия?",
        memeUrl: "memes/boss-meme.jpg",
        memeEmoji: "👔",
        options: [
            { text: "Задаю уточняющие вопросы", emoji: "📋", scores: { tech: 2, sign: 1 } },
            { text: "Собираю команду и обсуждаем", emoji: "👥", scores: { human: 3 } },
            { text: "Делаю как понял, потом переделаю", emoji: "🎨", scores: { art: 2 } },
            { text: "Ищу похожие задачи в интернете", emoji: "🔍", scores: { tech: 2 } },
            { text: "Беру инициативу и предлагаю план", emoji: "🚀", scores: { business: 3 } }
        ]
    },
    {
        id: 5,
        text: "🔄 Ты нашёл способ автоматизировать работу. Что чувствуешь?",
        memeUrl: "memes/auto-meme.jpg",
        memeEmoji: "🤖",
        options: [
            { text: "Эйфорию! Буду оптимизировать всё", emoji: "🤩", scores: { tech: 3, business: 1 } },
            { text: "Радость — можно заняться творчеством", emoji: "🎉", scores: { art: 3 } },
            { text: "Спокойствие — меньше ошибок", emoji: "😌", scores: { nature: 2 } },
            { text: "Поделюсь с коллегами", emoji: "🤝", scores: { human: 3 } }
        ]
    },
    {
        id: 6,
        text: "🎨 Ты увидел пустую стену в офисе. Что сделаешь?",
        memeUrl: "memes/wall-meme.jpg",
        memeEmoji: "🖌️",
        options: [
            { text: "Повешу доску для заметок и KPI", emoji: "📊", scores: { business: 2 } },
            { text: "Нарисую граффити или мем", emoji: "🎨", scores: { art: 3 } },
            { text: "Оставлю как есть — минимализм", emoji: "😐", scores: { nature: 1 } },
            { text: "Повешу карту мира", emoji: "🌍", scores: { nature: 2, human: 1 } },
            { text: "Сделаю стену для стикеров с идеями", emoji: "💡", scores: { tech: 2 } }
        ]
    },
    {
        id: 7,
        text: "🎵 Какую музыку включишь для фона во время работы?",
        memeUrl: "memes/music-meme.jpg",
        memeEmoji: "🎧",
        options: [
            { text: "Lofi hip-hop или инструментал", emoji: "🎹", scores: { tech: 1, art: 2 } },
            { text: "Подкасты про бизнес и IT", emoji: "🎙️", scores: { business: 2, tech: 1 } },
            { text: "Классику или джаз", emoji: "🎻", scores: { art: 2, nature: 1 } },
            { text: "Попсу или рок, чтобы подпевать", emoji: "🎤", scores: { human: 2 } },
            { text: "Тишина", emoji: "🤫", scores: { nature: 2 } }
        ]
    },
    {
        id: 8,
        text: "👥 Какую роль ты чаще берёшь в групповом проекте?",
        memeUrl: "memes/team-meme.jpg",
        memeEmoji: "🤝",
        options: [
            { text: "Генератор идей и креатива", emoji: "💡", scores: { art: 3 } },
            { text: "Организатор и тайм-менеджер", emoji: "📅", scores: { business: 3 } },
            { text: "Технический исполнитель", emoji: "💻", scores: { tech: 3 } },
            { text: "Тот, кто ищет информацию", emoji: "🔍", scores: { sign: 2 } },
            { text: "Миротворец и дипломат", emoji: "🕊️", scores: { human: 3 } }
        ]
    },
    {
        id: 9,
        text: "😤 Как ты справляешься с выгоранием?",
        memeUrl: "memes/burnout-meme.jpg",
        memeEmoji: "😫",
        options: [
            { text: "Ухожу в работу с головой", emoji: "💻", scores: { tech: 1, business: 1 } },
            { text: "Иду гулять в парк или лес", emoji: "🌲", scores: { nature: 3 } },
            { text: "Встречаюсь с друзьями", emoji: "👯", scores: { human: 3 } },
            { text: "Начинаю новый творческий проект", emoji: "🎨", scores: { art: 2 } },
            { text: "Делаю план и структурирую", emoji: "📋", scores: { sign: 2 } }
        ]
    },
    {
        id: 10,
        text: "🏆 Что для тебя главный признак успеха?",
        memeUrl: "memes/success-meme.jpg",
        memeEmoji: "🏆",
        options: [
            { text: "Высокая зарплата", emoji: "💰", scores: { business: 3 } },
            { text: "Признание коллег", emoji: "👏", scores: { human: 2 } },
            { text: "Созданный продукт", emoji: "🚀", scores: { tech: 2, art: 1 } },
            { text: "Гармония с природой", emoji: "🌿", scores: { nature: 3 } },
            { text: "Возможность творить", emoji: "🎨", scores: { art: 3 } }
        ]
    },
    {
        id: 11,
        text: "🤖 Как ты относишься к нейросетям?",
        memeUrl: "memes/ai-meme.jpg",
        memeEmoji: "🤖",
        options: [
            { text: "Обожаю! Инструмент для творчества", emoji: "❤️", scores: { art: 2, tech: 2 } },
            { text: "Использую для работы", emoji: "⚡", scores: { tech: 3, business: 1 } },
            { text: "Нейтрально, слежу за развитием", emoji: "😐", scores: { sign: 2 } },
            { text: "Боюсь, что заменят людей", emoji: "😨", scores: { human: 2 } },
            { text: "Не доверяю, лучше самому", emoji: "🔧", scores: { tech: 1 } }
        ]
    },
    {
        id: 12,
        text: "🚀 Какая фраза лучше описывает твои амбиции?",
        memeUrl: "memes/ambition-meme.jpg",
        memeEmoji: "⭐",
        options: [
            { text: "Хочу стать экспертом в своём деле", emoji: "🧠", scores: { tech: 2, sign: 2 } },
            { text: "Хочу открыть свой бизнес", emoji: "🏢", scores: { business: 3 } },
            { text: "Хочу помогать людям", emoji: "🤲", scores: { human: 3 } },
            { text: "Хочу создавать искусство", emoji: "🎨", scores: { art: 3 } },
            { text: "Хочу жить в гармонии с природой", emoji: "🌍", scores: { nature: 3 } }
        ]
    },
    {
        id: 13,
        text: "🧪 Ты в лаборатории. Что тебе интереснее?",
        memeUrl: "memes/lab-meme.jpg",
        memeEmoji: "🔬",
        options: [
            { text: "Ставить опыты и анализировать", emoji: "📊", scores: { tech: 2, sign: 2 } },
            { text: "Изучать живые организмы", emoji: "🐛", scores: { nature: 3 } },
            { text: "Создавать новые материалы", emoji: "⚗️", scores: { tech: 3 } },
            { text: "Документировать результаты", emoji: "📝", scores: { sign: 3 } },
            { text: "Рассказывать о научных открытиях", emoji: "🎙️", scores: { human: 2 } }
        ]
    },
    {
        id: 14,
        text: "🏥 Ты в больнице. Какую роль выберешь?",
        memeUrl: "memes/doctor-meme.jpg",
        memeEmoji: "🩺",
        options: [
            { text: "Врач — лечить людей", emoji: "👨‍⚕️", scores: { human: 3, nature: 1 } },
            { text: "Медсестра/брат — ухаживать", emoji: "🤲", scores: { human: 2 } },
            { text: "Администратор — организовывать", emoji: "📋", scores: { business: 2 } },
            { text: "Разработчик медоборудования", emoji: "🔧", scores: { tech: 3 } },
            { text: "Волонтёр — поддерживать морально", emoji: "❤️", scores: { human: 2, nature: 1 } }
        ]
    },
    {
        id: 15,
        text: "📈 Твой друг хочет открыть бизнес. Что посоветуешь?",
        memeUrl: "memes/business-meme.jpg",
        memeEmoji: "💡",
        options: [
            { text: "Составь бизнес-план и проанализируй рынок", emoji: "📊", scores: { business: 3 } },
            { text: "Найди крутого технаря в команду", emoji: "🤖", scores: { tech: 2 } },
            { text: "Сделай крутой дизайн и упаковку", emoji: "🎨", scores: { art: 2 } },
            { text: "Построй систему с заботой о сотрудниках", emoji: "🤝", scores: { human: 2 } },
            { text: "Подумай об экологичности", emoji: "🌿", scores: { nature: 2 } }
        ]
    },
    {
        id: 16,
        text: "🌍 Что тебя больше всего волнует в мире?",
        memeUrl: "memes/planet-meme.jpg",
        memeEmoji: "🌍",
        options: [
            { text: "Технологическое развитие", emoji: "🤖", scores: { tech: 3 } },
            { text: "Социальное неравенство", emoji: "🤝", scores: { human: 3 } },
            { text: "Экология и природа", emoji: "🌿", scores: { nature: 3 } },
            { text: "Экономика и бизнес", emoji: "📈", scores: { business: 3 } },
            { text: "Культура и искусство", emoji: "🎨", scores: { art: 3 } }
        ]
    },
    {
        id: 17,
        text: "🧘 Что ты делаешь для восстановления сил?",
        memeUrl: "memes/rest-meme.jpg",
        memeEmoji: "😴",
        options: [
            { text: "Изучаю что-то новое", emoji: "📚", scores: { tech: 2, sign: 1 } },
            { text: "Встречаюсь с близкими", emoji: "👨‍👩‍👧", scores: { human: 3 } },
            { text: "Творю (рисую, музыка)", emoji: "🎨", scores: { art: 3 } },
            { text: "Сплю или гуляю", emoji: "😴", scores: { nature: 2 } },
            { text: "Планирую будущее", emoji: "📊", scores: { business: 2 } }
        ]
    },
    {
        id: 18,
        text: "🎯 Какую цель ты ставишь на ближайший год?",
        memeUrl: "memes/goal-meme.jpg",
        memeEmoji: "🎯",
        options: [
            { text: "Научиться программировать", emoji: "💻", scores: { tech: 3 } },
            { text: "Найти работу мечты", emoji: "💼", scores: { business: 2, human: 1 } },
            { text: "Создать творческий проект", emoji: "🎨", scores: { art: 3 } },
            { text: "Путешествовать и исследовать", emoji: "🌍", scores: { nature: 2 } },
            { text: "Помочь другим людям", emoji: "🤝", scores: { human: 3 } }
        ]
    }
];

const ALL_QUESTIONS = QUESTIONS_DB;

function getRandomQuestions(count = 12) {
    const shuffled = [...ALL_QUESTIONS];
    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled.slice(0, count);
}
