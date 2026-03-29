import type { FortuneCard } from '@/shared/types';

const L = (en: string, ru: string) => ({ en, ru });

export const CARDS: FortuneCard[] = [
  {
    id: 'star',
    names: L('The Star', 'Звезда'),
    imageKey: 'star',
    meanings: {
      love: L(
        'Hope returns to your heart; a gentle healing phase opens space for honest affection and renewed trust.',
        'Надежда возвращается в сердце; мягкое исцеление открывает место для искренней нежности и нового доверия.'
      ),
      daily: L(
        'A small sign or coincidence points you forward—stay open, keep routines light, and let optimism guide the day.',
        'Маленький знак или совпадение ведут вперёд — будьте открыты, не перегружайте день и дайте оптимизму направлять вас.'
      ),
      career: L(
        'Recognition is forming quietly; share your vision clearly and align work with a purpose you actually believe in.',
        'Признание зреет незаметно — ясно формулируйте видение и связывайте работу с целью, в которую верите.'
      ),
      money: L(
        'Stability improves through patient planning; avoid impulsive spending and favour steady, ethical gains.',
        'Стабильность растёт через терпеливое планирование; избегайте импульсивных трат и выбирайте ровный, честный доход.'
      ),
    },
  },
  {
    id: 'moon',
    names: L('The Moon', 'Луна'),
    imageKey: 'moon',
    meanings: {
      love: L(
        'Emotions run deep and symbols matter—clarify assumptions before you commit words you cannot take back.',
        'Чувства глубоки и символы важны — проясните догадки, прежде чем сказать то, что нельзя вернуть.'
      ),
      daily: L(
        'Your intuition is loud but facts are fuzzy; sleep on big choices and notice dreams or recurring themes.',
        'Интуиция громка, а факты размыты — отложите крупные решения и присмотритесь к снам или повторяющимся темам.'
      ),
      career: L(
        'Hidden factors affect a project; document decisions, verify rumours, and protect your reputation calmly.',
        'Скрытые факторы влияют на проект; фиксируйте решения, проверяйте слухи и спокойно берегите репутацию.'
      ),
      money: L(
        'Read the fine print; unclear offers or emotional spending can cloud judgment—seek transparency first.',
        'Читайте мелкий шрифт; неясные предложения или эмоциональные траты мутят суждение — сначала прозрачность.'
      ),
    },
  },
  {
    id: 'sun',
    names: L('The Sun', 'Солнце'),
    imageKey: 'sun',
    meanings: {
      love: L(
        'Warmth, sincerity, and playful energy—express appreciation openly and let joy be part of the bond.',
        'Тепло, искренность и игривая энергия — открыто говорите благодарность и пусть радость станет частью связи.'
      ),
      daily: L(
        'Momentum is on your side; tackle what you postponed, step outside, and share good news when it appears.',
        'Импульс на вашей стороне — сделайте отложенное, выйдите на воздух и поделитесь хорошими новостями.'
      ),
      career: L(
        'Visibility helps you now; showcase results, mentor others, and let confidence (not arrogance) lead.',
        'Сейчас важна видимость — покажите результаты, наставляйте других и ведите уверенность без высокомерия.'
      ),
      money: L(
        'A clear win or refund is possible; celebrate modestly and reinvest in skills or savings habits.',
        'Возможна ясная победа или возврат; отметьте скромно и вложитесь в навыки или привычку копить.'
      ),
    },
  },
  {
    id: 'tower',
    names: L('The Tower', 'Башня'),
    imageKey: 'tower',
    meanings: {
      love: L(
        'A truth arrives that reshapes the story—painful but clarifying; choose boundaries with compassion.',
        'Приходит правда, которая меняет историю — больно, но проясняет; выбирайте границы с состраданием.'
      ),
      daily: L(
        'Plans may shift suddenly; stay flexible, secure essentials first, and avoid dramatizing what can be fixed.',
        'Планы могут резко сдвинуться — будьте гибки, сначала базовое, и не раздувайте то, что можно поправить.'
      ),
      career: L(
        'Structures change—role, team, or strategy; adapt fast, save proof of impact, and rebuild on stronger foundations.',
        'Меняется структура — роль, команда или стратегия; адаптируйтесь быстро, сохраняйте доказательства вклада и стройте заново.'
      ),
      money: L(
        'A shock to budget or expectations; freeze non-essentials, audit subscriptions, and seek professional advice if needed.',
        'Шок бюджету или ожиданиям — заморозьте лишнее, проверьте подписки и при необходимости обратитесь к специалисту.'
      ),
    },
  },
  {
    id: 'lovers',
    names: L('The Lovers', 'Влюблённые'),
    imageKey: 'lovers',
    meanings: {
      love: L(
        'Choice and alignment—commit with integrity or redefine the relationship with mutual respect.',
        'Выбор и совпадение ценностей — обязательства с честью или переопределение отношений с уважением.'
      ),
      daily: L(
        'A values decision appears; pick the option that matches who you want to become, not only what is easy.',
        'Встаёт решение по ценностям — выберите то, что ведёт к тому, кем хотите стать, а не только к простому.'
      ),
      career: L(
        'Partnership matters—contracts, collaborators, or ethics; negotiate clearly and keep shared goals visible.',
        'Важно партнёрство — контракты, соавторы, этика; договаривайтесь ясно и держите общую цель на виду.'
      ),
      money: L(
        'Joint finances or tempting deals—compare long-term fit, not just short-term appeal.',
        'Совместные финансы или соблазнительные сделки — сравнивайте долгосрочное соответствие, не только выгоду сейчас.'
      ),
    },
  },
  {
    id: 'hermit',
    names: L('The Hermit', 'Отшельник'),
    imageKey: 'hermit',
    meanings: {
      love: L(
        'Space for reflection—quality over noise; meaningful conversation beats constant contact.',
        'Пространство для размышления — качество важнее шума; смысловой разговор лучше бесконечных сообщений.'
      ),
      daily: L(
        'Slow the pace; journaling, walking alone, or quiet work restores perspective better than scrolling.',
        'Замедлитесь — дневник, прогулка в одиночестве или тихая работа возвращают перспективу лучше ленты.'
      ),
      career: L(
        'Deep expertise pays off; mentor selectively, finish research, and avoid meetings that replace thinking.',
        'Глубокая экспертиза окупается; наставляйте выборочно, завершайте исследование и избегайте встреч вместо мысли.'
      ),
      money: L(
        'Review statements and goals in solitude; a conservative move now prevents regret later.',
        'В тишине пересмотрите выписки и цели — сейчас осторожный шаг сбережёт от сожалений потом.'
      ),
    },
  },
  {
    id: 'wheel',
    names: L('Wheel of Fortune', 'Колесо Фортуны'),
    imageKey: 'wheel',
    meanings: {
      love: L(
        'Timing shifts—what felt stuck can move; stay honest, and let synchronicity meet your effort.',
        'Меняется время — то, что казалось застоем, может сдвинуться; будьте честны и позвольте случайности встретить усилие.'
      ),
      daily: L(
        'A lucky break or reschedule changes the day; ride the wave without abandoning your priorities.',
        'Удачный перелом или перенос меняют день — катитесь на волне, не бросая приоритетов.'
      ),
      career: L(
        'Opportunity cycles—network widely, revisit old contacts, and be ready to pivot when doors open.',
        'Циклы возможностей — расширяйте сеть, возвращайтесь к старым контактам и будьте готовы к повороту.'
      ),
      money: L(
        'Fortune fluctuates; diversify sensibly and avoid betting more than you can calmly lose.',
        'Фортуна колеблется — диверсифицируйте разумно и не ставьте больше, чем спокойно можете потерять.'
      ),
    },
  },
  {
    id: 'strength',
    names: L('Strength', 'Сила'),
    imageKey: 'strength',
    meanings: {
      love: L(
        'Courage with softness—steady patience dissolves tension better than force or ultimatums.',
        'Смягчённая смелость — ровное терпение снимает напряжение лучше силы или ультиматумов.'
      ),
      daily: L(
        'Choose calm responses; physical movement or breathwork turns stress into usable energy.',
        'Выбирайте спокойные реакции — движение или дыхание превращают стресс в полезную энергию.'
      ),
      career: L(
        'Lead with empathy under pressure; persistence beats spectacle—prove reliability daily.',
        'Под давлением ведите с эмпатией; упорность важнее показухи — доказывайте надёжность каждый день.'
      ),
      money: L(
        'Discipline beats drama; automate savings and handle conflict about money with grace.',
        'Дисциплина важнее драмы — автоматизируйте сбережения и решайте конфликты о деньгах с достоинством.'
      ),
    },
  },
  {
    id: 'justice',
    names: L('Justice', 'Справедливость'),
    imageKey: 'justice',
    meanings: {
      love: L(
        'Fairness and accountability—agreements, apologies, and clarity about expectations matter now.',
        'Справедливость и ответственность — соглашения, извинения и ясность ожиданий сейчас решают.'
      ),
      daily: L(
        'Balance your schedule; if you owe someone time or honesty, settle it and lighten the load.',
        'Балансируйте расписание; если должны времени или правды — закройте вопрос и разгрузите себя.'
      ),
      career: L(
        'Contracts, reviews, or compliance—dot the i’s, keep records straight, and advocate with facts.',
        'Контракты, ревью, комплаенс — выверяйте детали, ведите записи и отстаивайте позицию фактами.'
      ),
      money: L(
        'Legal or tax details deserve attention; reconcile accounts and avoid shortcuts.',
        'Юридические или налоговые детали требуют внимания; сверяйте счета и не ищите обходных путей.'
      ),
    },
  },
  {
    id: 'world',
    names: L('The World', 'Мир'),
    imageKey: 'world',
    meanings: {
      love: L(
        'A chapter completes with integration—you understand what you needed from love and what you can give.',
        'Глава завершается целостно — вы понимаете, что искали в любви и что можете дать.'
      ),
      daily: L(
        'Closure and celebration; finish a loop, thank helpers, and set a fresh intention for what’s next.',
        'Завершение и праздник — закройте цикл, поблагодарите помощников и задайте новое намерение.'
      ),
      career: L(
        'Mastery shows; portfolio pieces, graduation, or handoff—document wins and plan the next horizon.',
        'Видно мастерство — портфолио, выпуск или передача дел; зафиксируйте победы и планируйте горизонт.'
      ),
      money: L(
        'A milestone reached—debt paid, goal met, or investment matured; consolidate gains before the next leap.',
        'Рубеж достигнут — долг закрыт, цель выполнена или вложение созрело; укрепите результат перед следующим шагом.'
      ),
    },
  },
];
