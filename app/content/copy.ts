// Localized site copy. `fa` must match the shape of `en` exactly (enforced by the type
// and by tests/unit/copy.test.ts). Game facts and URLs live in ./games.ts.
import type { GameSlug, Locale } from './games'

interface Chapter {
  category: string
  tagline: string
  body: string
}

interface GameStory {
  lead: string
  story: string[]
  howLabel: string
  how: string[]
  note: string
}

const en = {
  langName: 'English',
  switchTo: 'فارسی',
  switchLabel: 'Read this page in Persian',
  skip: 'Skip to content',
  brand: 'OAR NOVA',
  brandSub: 'Games Studio',
  nav: { games: 'Games', about: 'About', contact: 'Contact' },
  navLabel: 'Main',
  menuOpen: 'Open menu',
  menuClose: 'Close menu',
  menu: 'Menu',
  status: { 'in-development': 'In development', 'coming-soon': 'Coming soon' },
  officialSite: 'Official site',
  opensNewTab: 'opens in a new tab',
  footer: {
    line: 'Independent game studio.',
    games: 'Games',
    studio: 'Studio',
    write: 'Write to us',
    rights: 'OAR NOVA Games Studio',
    top: 'Back to top',
  },

  home: {
    kicker: 'OAR NOVA Games Studio',
    hero: ['Worlds', 'in', 'motion.'],
    heroLabel: 'Worlds in motion.',
    tagline: 'Different worlds. One spark.',
    lead: 'Strategy, wonder and playful learning. We build games around one idea each, and give every idea a world of its own.',
    explore: 'Explore the games',
    index: 'Project index 01—03',
    scroll: 'Scroll to the work',
    counter: ['Different worlds', 'One studio'],
    workLabel: '00 / The work',
    work: ['Not one', 'way', 'to', 'play.'],
    workBody:
      'The shape of a game should follow the idea behind it. So each project gets its own rules, its own rhythm and its own visual language — nothing is poured into a shared template.',
    chapters: {
      dooma: {
        category: 'Questions become moves',
        tagline: 'Every answer claims the board.',
        body: 'A head-to-head contest where knowledge and position collide. Answer well to take a cell; complete a line to win. The answer is only half the move.',
      },
      chista: {
        category: 'Think. React. Discover.',
        tagline: 'Wonder, under pressure.',
        body: 'A Persian-first mind game of short, sharp rounds — speed, memory, precision and nerve, set inside a night-lit world of its own.',
      },
      yarizan: {
        category: 'Learning through play',
        tagline: 'Curiosity has no age.',
        body: 'Educational mini-games for primary school children, arranged grade by grade like the pages of a book. Small discoveries, lasting confidence.',
      },
    } satisfies Record<GameSlug, Chapter>,
    discover: 'Discover',
    beliefLabel: '04 / What we believe',
    belief: ['Good games', 'make you', 'feel', 'something.'],
    beliefBody: 'A clever move. An unexpected answer. A discovery that stays with you. We build for those moments.',
    beliefNote: ['Not one formula.', 'Three identities. One studio.'],
    contactLabel: '05 / A conversation starts here',
    contactTitle: ['Let’s make', 'something', 'matter.'],
    contactBody: 'For collaboration, publishing conversations or questions about our games.',
    contactCta: 'Get in touch',
  },

  games: {
    label: 'Index / 03 worlds',
    title: ['Three games.', 'Three vocabularies', 'of play.'],
    intro:
      'Each project is built by the same studio and shares none of its look. Below is where each one stands today — stated plainly, without dates we cannot yet promise.',
    stage: 'Stage',
    read: 'Read the story',
  },

  game: {
    back: 'All games',
    factsTitle: 'At a glance',
    statusTitle: 'Where it stands',
    visit: 'Visit the official site',
    next: 'Next world',
    stories: {
      dooma: {
        lead: 'Tic-tac-toe, rewired by knowledge. In Dooma every cell has to be earned with a correct answer before it can be claimed.',
        story: [
          'Two players face the same board and the same clock. A question appears; the player who answers well earns the right to place a mark. Complete a row, a column or a diagonal and the match is yours.',
          'Strategy lives in the space between questions: which cell to take, which line to block, when to risk a bold move. Knowing the answer is not enough — you also need to know where to put it.',
        ],
        howLabel: 'How a match flows',
        how: ['A topic-based question appears.', 'Answer correctly to claim a cell.', 'Line up a row, column or diagonal to win.'],
        note: 'Dooma is in early development. Its design, topics and platforms may still change, and it is not yet available to download.',
      },
      chista: {
        lead: 'Chista is a competitive mind game built from short rounds that test speed, memory, precision and composure under pressure.',
        story: [
          'Each round is brief and decisive. Chista asks for full attention for a few seconds at a time, then rewards it — a rhythm closer to a sport than a puzzle book.',
          'The game is Persian-first in language and atmosphere. Its world is drawn from moonlit gardens, lanterns and reflecting water: calm to look at, demanding to play.',
        ],
        howLabel: 'What a round asks of you',
        how: ['Read the board in an instant.', 'Act before the moment passes.', 'Keep your nerve as the pressure builds.'],
        note: 'Chista is in active development for the web, with an Android version planned. It has not been publicly released.',
      },
      yarizan: {
        lead: 'YariZan is a collection of Persian educational mini-games for primary school, organised grade by grade like a well-loved book.',
        story: [
          'Every grade opens its own book of games. Children turn the pages, choose a game and learn by playing — reading, numbers, science and more, in their own language.',
          'The tone is warm and encouraging rather than academic. The aim is simple: small wins that add up to real confidence.',
        ],
        howLabel: 'How it is organised',
        how: ['One book per school grade.', 'Short games, each with clear instructions.', 'Designed for Windows PCs at home or school.'],
        note: 'A new edition of YariZan is in preparation. Its official site will carry availability and support details when they are ready.',
      },
    } satisfies Record<GameSlug, GameStory>,
  },

  about: {
    label: 'About the studio',
    title: ['A studio', 'for distinct', 'worlds.'],
    intro:
      'OAR NOVA Games Studio is an independent game studio. We make games that start from a single, clear idea — and we let that idea decide everything else.',
    principlesLabel: 'How we work',
    principles: [
      {
        title: 'One idea, fully followed',
        body: 'A game should be about something. We choose the idea first and let the mechanics, the art and the sound serve it.',
      },
      {
        title: 'Each world its own',
        body: 'Our games do not share a house style. Dooma is precise and strategic, Chista is atmospheric and fast, YariZan is warm and playful.',
      },
      {
        title: 'Persian at heart, open to all',
        body: 'Our first games speak Persian natively. We design for that audience with care, and for clarity anyone can read.',
      },
      {
        title: 'Honest about progress',
        body: 'We share what is real. Our games are labelled with where they actually stand, and we do not announce dates we cannot keep.',
      },
    ],
    closing: 'We are building our first worlds now. If you want to collaborate, publish or simply follow the work, we would like to hear from you.',
    closingCta: 'Contact the studio',
  },

  contact: {
    label: 'Contact',
    title: ['Write', 'to us.'],
    intro: 'There is no form and no account to create. Choose the address that fits, and your email client will open.',
    general: 'General & collaboration',
    generalBody: 'Partnerships, publishing, press and everything else about the studio.',
    support: 'Player support',
    supportBody: 'Questions about one of our games.',
    privacy: 'We only use what you send to reply to you.',
  },

  notFound: {
    code: '404',
    title: ['This world', 'does not exist', '— yet.'],
    body: 'The page you were looking for is not here. It may have moved, or the address may be mistyped.',
    home: 'Return home',
    games: 'See the games',
  },

  seo: {
    home: {
      title: 'OAR NOVA Games Studio — Worlds in Motion',
      description: 'Independent game studio behind Dooma, Chista and YariZan. Different worlds, one spark.',
    },
    games: {
      title: 'Games — OAR NOVA Games Studio',
      description: 'Dooma, Chista and YariZan: three games, three different vocabularies of play, and where each one stands today.',
    },
    about: {
      title: 'About — OAR NOVA Games Studio',
      description: 'An independent game studio building distinct worlds, each from one clear idea.',
    },
    contact: {
      title: 'Contact — OAR NOVA Games Studio',
      description: 'Write to OAR NOVA Games Studio at info@oarnova.games or support@oarnova.games.',
    },
    notFound: { title: 'Page not found — OAR NOVA Games Studio', description: 'This page does not exist.' },
    game: {
      dooma: {
        title: 'Dooma — OAR NOVA Games Studio',
        description: 'Dooma: a knowledge-based head-to-head strategy game where every correct answer claims the board. In development.',
      },
      chista: {
        title: 'Chista — OAR NOVA Games Studio',
        description: 'Chista: a Persian-first competitive mind game of short rounds of speed, memory and precision. In development.',
      },
      yarizan: {
        title: 'YariZan — OAR NOVA Games Studio',
        description: 'YariZan: Persian educational mini-games for primary school, grade by grade. Coming soon.',
      },
    } satisfies Record<GameSlug, { title: string; description: string }>,
  },
}

export type Copy = typeof en

const fa: Copy = {
  langName: 'فارسی',
  switchTo: 'English',
  switchLabel: 'خواندن این صفحه به انگلیسی',
  skip: 'پرش به محتوای اصلی',
  brand: 'اوآر نوا',
  brandSub: 'استودیو بازی‌سازی',
  nav: { games: 'بازی‌ها', about: 'دربارهٔ ما', contact: 'تماس' },
  navLabel: 'اصلی',
  menuOpen: 'باز کردن منو',
  menuClose: 'بستن منو',
  menu: 'منو',
  status: { 'in-development': 'در دست ساخت', 'coming-soon': 'به‌زودی' },
  officialSite: 'وب‌سایت رسمی',
  opensNewTab: 'در زبانه‌ای تازه باز می‌شود',
  footer: {
    line: 'استودیوی مستقل بازی‌سازی.',
    games: 'بازی‌ها',
    studio: 'استودیو',
    write: 'تماس با ما',
    rights: 'استودیو بازی‌سازی اوآر نوا',
    top: 'برگشت به بالا',
  },

  home: {
    kicker: 'استودیو بازی‌سازی اوآر نوا',
    hero: ['جهان‌هایی', 'در', 'حرکت.'],
    heroLabel: 'جهان‌هایی در حرکت.',
    tagline: 'جهان‌ها گوناگون‌اند؛ جرقه یکی است.',
    lead: 'از رقابت فکری تا شگفتی و یادگیری با بازی. هر بازی ما از یک ایده متولد می‌شود و همان ایده، جهان خودش را می‌سازد.',
    explore: 'سری به بازی‌ها بزنید',
    index: 'فهرست پروژه‌ها ۰۱ تا ۰۳',
    scroll: 'آثار را ببینید',
    counter: ['سه جهان متفاوت', 'یک استودیو'],
    workLabel: '۰۰ / آثار',
    work: ['بازی کردن', 'فقط یک راه', '', 'ندارد.'],
    workBody:
      'به نظر ما شکل هر بازی را باید ایده‌اش تعیین کند. برای همین هر پروژه قاعده‌ها، ریتم و زبان تصویری خودش را دارد و هیچ‌کدام در قالبی آماده ریخته نمی‌شود.',
    chapters: {
      dooma: {
        category: 'وقتی جواب، حرکت می‌شود',
        tagline: 'هر جواب درست، یک خانه از صفحه.',
        body: 'رقابتی دونفره که دانستن و جای‌گیری را کنار هم می‌نشاند. درست جواب بدهید تا خانه را بگیرید و یک خط را کامل کنید تا ببرید. دانستن جواب، تازه نیمی از حرکت است.',
      },
      chista: {
        category: 'فکر کن، واکنش نشان بده، کشف کن.',
        tagline: 'شگفتی، در تنگنای زمان.',
        body: 'بازی فکری با دورهای کوتاه و نفس‌گیر؛ سرعت، حافظه، دقت و خونسردی، در جهانی شبانه با حال‌وهوای ایرانی.',
      },
      yarizan: {
        category: 'یاد گرفتن با بازی',
        tagline: 'کنجکاوی سن نمی‌شناسد.',
        body: 'بازی‌های آموزشی کوتاه برای بچه‌های دبستان که پایه به پایه، مثل صفحه‌های یک کتاب، کنار هم چیده شده‌اند. کشف‌های کوچک، اعتمادبه‌نفس ماندگار.',
      },
    },
    discover: 'آشنایی با',
    beliefLabel: '۰۴ / باور ما',
    belief: ['بازی خوب', 'حسی', 'ماندگار', 'به جا می‌گذارد.'],
    beliefBody: 'یک حرکت زیرکانه، یک جواب غافلگیرکننده، کشفی که از ذهن بیرون نمی‌رود. ما برای همین لحظه‌ها بازی می‌سازیم.',
    beliefNote: ['فرمول تکراری نداریم.', 'سه هویت مستقل، یک استودیو.'],
    contactLabel: '۰۵ / شروع یک گفت‌وگو',
    contactTitle: ['بیایید', 'چیزی ماندنی', 'بسازیم.'],
    contactBody: 'برای همکاری، نشر بازی یا هر پرسشی دربارهٔ بازی‌هایمان، با ما در تماس باشید.',
    contactCta: 'تماس با ما',
  },

  games: {
    label: 'فهرست / سه جهان',
    title: ['سه بازی،', 'سه جهان', 'متفاوت.'],
    intro:
      'هر سه را یک استودیو می‌سازد، اما هیچ‌کدام شبیه دیگری نیست. اینجا می‌بینید هر بازی امروز به کجا رسیده است؛ بی‌پرده و بی‌آنکه تاریخی وعده بدهیم که هنوز از آن مطمئن نیستیم.',
    stage: 'مرحله',
    read: 'بیشتر بخوانید',
  },

  game: {
    back: 'همهٔ بازی‌ها',
    factsTitle: 'در یک نگاه',
    statusTitle: 'به کجا رسیده‌ایم',
    visit: 'رفتن به وب‌سایت رسمی',
    next: 'جهان بعدی',
    stories: {
      dooma: {
        lead: 'همان دوز آشنا، این بار با چاشنی دانش. در دوما هیچ خانه‌ای را بدون جواب درست نمی‌شود گرفت.',
        story: [
          'دو بازیکن رودرروی هم، با یک صفحه و یک زمان مشترک. سؤالی می‌آید و هر کس درست جواب بدهد، اجازه دارد مهره‌اش را بگذارد. ردیف، ستون یا قطری را کامل کنید تا برنده شوید.',
          'راهبرد در فاصلهٔ میان سؤال‌ها شکل می‌گیرد: کدام خانه را بگیرید، راه کدام خط را ببندید و کی دل به دریا بزنید. دانستن جواب کافی نیست؛ باید بدانید آن را کجا خرج کنید.',
        ],
        howLabel: 'یک مسابقه چطور پیش می‌رود',
        how: ['سؤالی از یک موضوع می‌آید.', 'با جواب درست، خانه‌ای را بگیرید.', 'ردیف، ستون یا قطری را کامل کنید و ببرید.'],
        note: 'دوما هنوز در مراحل ابتدایی ساخت است. ممکن است طراحی، موضوع‌ها و سکوهایش تغییر کند و فعلاً برای دانلود در دسترس نیست.',
      },
      chista: {
        lead: 'چیستا یک بازی فکری رقابتی است؛ دورهای کوتاهی که سرعت، حافظه، دقت و خونسردی‌تان را زیر فشار محک می‌زند.',
        story: [
          'هر دور کوتاه است و سرنوشت‌ساز. چیستا فقط چند ثانیه تمام حواستان را می‌خواهد و بعد جوابش را می‌دهد؛ ریتمی که بیشتر به ورزش شبیه است تا جدول و معما.',
          'زبان و حال‌وهوای چیستا ایرانی است. جهانش را باغ‌های مهتابی، فانوس‌ها و آب‌های آینه‌گون ساخته‌اند: دیدنش آرامتان می‌کند و بازی‌کردنش به چالشتان می‌کشد.',
        ],
        howLabel: 'هر دور از شما چه می‌خواهد',
        how: ['صفحه را در یک نگاه بخوانید.', 'پیش از آنکه فرصت بگذرد، دست به کار شوید.', 'وقتی فشار بالا می‌رود، خونسرد بمانید.'],
        note: 'نسخهٔ وب چیستا در دست ساخت است و نسخهٔ اندروید هم در برنامه قرار دارد. این بازی هنوز به‌طور عمومی منتشر نشده است.',
      },
      yarizan: {
        lead: 'یاریزان مجموعه‌ای از بازی‌های آموزشی فارسی برای دورهٔ دبستان است که پایه به پایه، مثل یک کتاب دوست‌داشتنی، کنار هم آمده‌اند.',
        story: [
          'هر پایه کتاب بازی خودش را دارد. بچه‌ها ورق می‌زنند، بازی دلخواهشان را انتخاب می‌کنند و با بازی یاد می‌گیرند؛ فارسی، ریاضی، علوم و درس‌های دیگر، به زبان خودشان.',
          'لحن یاریزان گرم و دلگرم‌کننده است، نه خشک و کتابی. هدفش ساده است: موفقیت‌های کوچکی که کم‌کم به اعتمادبه‌نفس واقعی می‌رسند.',
        ],
        howLabel: 'چطور چیده شده',
        how: ['برای هر پایه، یک کتاب.', 'بازی‌های کوتاه با راهنمای ساده.', 'مناسب رایانه‌های ویندوزی، در خانه یا مدرسه.'],
        note: 'نسخهٔ تازهٔ یاریزان در حال آماده‌سازی است. اطلاعات دسترسی و پشتیبانی، هر وقت آماده شود، در وب‌سایت رسمی آن اعلام می‌شود.',
      },
    },
  },

  about: {
    label: 'دربارهٔ استودیو',
    title: ['استودیویی', 'برای جهان‌های', 'گوناگون.'],
    intro: 'اوآر نوا یک استودیوی مستقل بازی‌سازی است. هر بازی را از یک ایدهٔ روشن شروع می‌کنیم و می‌گذاریم همان ایده دربارهٔ همه‌چیز تصمیم بگیرد.',
    principlesLabel: 'شیوهٔ کار ما',
    principles: [
      {
        title: 'یک ایده، تا آخر',
        body: 'هر بازی باید حرفی برای گفتن داشته باشد. اول ایده را انتخاب می‌کنیم و بعد سازوکار، تصویر و صدا را در خدمتش می‌گذاریم.',
      },
      {
        title: 'هر جهان، مستقل',
        body: 'بازی‌های ما قرار نیست شبیه هم باشند. دوما دقیق و راهبردی است، چیستا رازآلود و سریع، و یاریزان گرم و بازیگوش.',
      },
      {
        title: 'ریشه در فارسی، روشن برای همه',
        body: 'نخستین بازی‌های ما به زبان فارسی ساخته شده‌اند. برای مخاطب فارسی‌زبان با دقت طراحی می‌کنیم، طوری که برای همه خوانا و روشن باشد.',
      },
      {
        title: 'روراست دربارهٔ مسیر',
        body: 'فقط از آنچه واقعی است حرف می‌زنیم. وضعیت هر بازی را همان‌طور که هست می‌گوییم و تاریخی اعلام نمی‌کنیم که از آن مطمئن نباشیم.',
      },
    ],
    closing: 'نخستین جهان‌هایمان را همین حالا می‌سازیم. اگر برای همکاری، نشر یا فقط دنبال‌کردن کارهایمان مشتاقید، خوشحال می‌شویم با ما در تماس باشید.',
    closingCta: 'تماس با استودیو',
  },

  contact: {
    label: 'تماس با ما',
    title: ['با ما', 'در تماس باشید.'],
    intro: 'فرم یا ثبت‌نامی در کار نیست. نشانی مناسب را انتخاب کنید تا برنامهٔ ایمیلتان باز شود.',
    general: 'ارتباط عمومی و همکاری',
    generalBody: 'همکاری، نشر، رسانه و هر موضوع دیگری دربارهٔ استودیو.',
    support: 'پشتیبانی بازیکنان',
    supportBody: 'هر پرسشی دربارهٔ بازی‌هایمان.',
    privacy: 'آنچه برایمان می‌فرستید فقط برای پاسخ دادن به خودتان به کار می‌رود.',
  },

  notFound: {
    code: '۴۰۴',
    title: ['این جهان', 'هنوز', 'ساخته نشده.'],
    body: 'صفحه‌ای که دنبالش هستید اینجا نیست. شاید جابه‌جا شده باشد یا نشانی را اشتباه وارد کرده باشید.',
    home: 'برگشت به صفحهٔ اصلی',
    games: 'دیدن بازی‌ها',
  },

  seo: {
    home: {
      title: 'استودیو بازی‌سازی اوآر نوا — جهان‌هایی در حرکت',
      description: 'اوآر نوا، استودیوی مستقل سازندهٔ دوما، چیستا و یاریزان. جهان‌ها گوناگون‌اند؛ جرقه یکی است.',
    },
    games: {
      title: 'بازی‌ها — استودیو بازی‌سازی اوآر نوا',
      description: 'دوما، چیستا و یاریزان: سه بازی با سه حال‌وهوای متفاوت، و اینکه هر کدام امروز به کجا رسیده است.',
    },
    about: {
      title: 'دربارهٔ ما — استودیو بازی‌سازی اوآر نوا',
      description: 'استودیویی مستقل که هر بازی‌اش را از یک ایدهٔ روشن می‌سازد.',
    },
    contact: {
      title: 'تماس با ما — استودیو بازی‌سازی اوآر نوا',
      description: 'برای تماس با استودیو بازی‌سازی اوآر نوا به info@oarnova.games یا support@oarnova.games ایمیل بزنید.',
    },
    notFound: { title: 'صفحه پیدا نشد — استودیو بازی‌سازی اوآر نوا', description: 'این صفحه وجود ندارد.' },
    game: {
      dooma: {
        title: 'دوما — استودیو بازی‌سازی اوآر نوا',
        description: 'دوما: بازی راهبردی و دانشی دونفره که در آن هر جواب درست، یک خانه از صفحه را به شما می‌دهد. در دست ساخت.',
      },
      chista: {
        title: 'چیستا — استودیو بازی‌سازی اوآر نوا',
        description: 'چیستا: بازی فکری رقابتی با دورهای کوتاه برای سنجش سرعت، حافظه و دقت. در دست ساخت.',
      },
      yarizan: {
        title: 'یاریزان — استودیو بازی‌سازی اوآر نوا',
        description: 'یاریزان: بازی‌های آموزشی فارسی برای دورهٔ دبستان، پایه به پایه. به‌زودی.',
      },
    },
  },
}

export const copy: Record<Locale, Copy> = { en, fa }
