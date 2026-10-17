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
  skip: 'رفتن به محتوا',
  brand: 'اوآر نوا',
  brandSub: 'استودیو بازی‌سازی',
  nav: { games: 'بازی‌ها', about: 'دربارهٔ ما', contact: 'ارتباط' },
  navLabel: 'اصلی',
  menuOpen: 'باز کردن منو',
  menuClose: 'بستن منو',
  menu: 'منو',
  status: { 'in-development': 'در حال توسعه', 'coming-soon': 'به‌زودی' },
  officialSite: 'سایت رسمی',
  opensNewTab: 'در زبانهٔ تازه باز می‌شود',
  footer: {
    line: 'استودیوی مستقل بازی‌سازی.',
    games: 'بازی‌ها',
    studio: 'استودیو',
    write: 'تماس با ما',
    rights: 'استودیو بازی‌سازی اوآر نوا',
    top: 'بازگشت به بالا',
  },

  home: {
    kicker: 'استودیو بازی‌سازی اوآر نوا',
    hero: ['جهان‌هایی', 'در', 'حرکت.'],
    heroLabel: 'جهان‌هایی در حرکت.',
    tagline: 'جهان‌های متفاوت، یک جرقهٔ مشترک.',
    lead: 'رقابت، شگفتی و یادگیری بازی‌محور. هر بازی ما از یک ایده می‌آید و هر ایده، جهان خودش را می‌سازد.',
    explore: 'بازی‌ها را ببینید',
    index: 'فهرست پروژه‌ها ۰۱—۰۳',
    scroll: 'رفتن به آثار',
    counter: ['جهان‌های متفاوت', 'یک استودیو'],
    workLabel: '۰۰ / آثار ما',
    work: ['برای بازی', 'فقط یک راه', '', 'وجود ندارد.'],
    workBody: 'شکل هر بازی را ایدهٔ پشت آن تعیین می‌کند. برای همین هر پروژه قواعد، ریتم و زبان بصری خودش را دارد؛ هیچ‌کدام در قالبی مشترک ریخته نمی‌شوند.',
    chapters: {
      dooma: {
        category: 'وقتی پاسخ، حرکت می‌شود',
        tagline: 'هر پاسخ درست، یک خانه از صفحه.',
        body: 'رقابتی دونفره، جایی که دانش و جای‌گیری در صفحه به هم گره می‌خورند. درست جواب بده تا خانه را بگیری؛ یک خط کامل یعنی پیروزی. پاسخ درست فقط نیمی از حرکت است.',
      },
      chista: {
        category: 'فکر کن. واکنش نشان بده. کشف کن.',
        tagline: 'شگفتی، زیر فشار زمان.',
        body: 'بازی فکری فارسی با دورهای کوتاه و نفس‌گیر؛ سرعت، حافظه، دقت و خونسردی، در جهانی شبانه و رازآلود.',
      },
      yarizan: {
        category: 'یادگیری در دل بازی',
        tagline: 'کنجکاوی سن نمی‌شناسد.',
        body: 'بازی‌های آموزشی کوتاه برای کودکان دبستانی، پایه به پایه و ورق به ورق مثل یک کتاب. کشف‌های کوچک، اعتمادبه‌نفس ماندگار.',
      },
    },
    discover: 'آشنایی با',
    beliefLabel: '۰۴ / باور ما',
    belief: ['بازی خوب', 'یک حس', 'ماندگار', 'می‌سازد.'],
    beliefBody: 'یک حرکت هوشمندانه. پاسخی غیرمنتظره. کشفی که در ذهن می‌ماند. ما برای همین لحظه‌ها بازی می‌سازیم.',
    beliefNote: ['نه یک فرمول تکراری.', 'سه هویت مستقل، یک استودیو.'],
    contactLabel: '۰۵ / آغاز یک گفت‌وگو',
    contactTitle: ['بیایید', 'چیزی ماندگار', 'بسازیم.'],
    contactBody: 'برای همکاری، گفت‌وگو دربارهٔ نشر بازی یا پرسش دربارهٔ بازی‌های ما.',
    contactCta: 'با ما در تماس باشید',
  },

  games: {
    label: 'فهرست / ۰۳ جهان',
    title: ['سه بازی.', 'سه زبان متفاوت', 'برای بازی‌کردن.'],
    intro:
      'هر سه پروژه را یک استودیو می‌سازد، اما هیچ‌کدام ظاهر دیگری را ندارد. اینجا می‌بینید هر کدام امروز در چه مرحله‌ای است؛ ساده و روشن، بدون وعدهٔ تاریخی که هنوز نمی‌توانیم بدهیم.',
    stage: 'مرحله',
    read: 'خواندن داستان',
  },

  game: {
    back: 'همهٔ بازی‌ها',
    factsTitle: 'در یک نگاه',
    statusTitle: 'کجای راهیم',
    visit: 'رفتن به سایت رسمی',
    next: 'جهان بعدی',
    stories: {
      dooma: {
        lead: 'دوز، این بار با دانش. در دوما هر خانه را باید با یک پاسخ درست به دست آورد.',
        story: [
          'دو بازیکن، یک صفحه و یک زمان مشترک. پرسشی ظاهر می‌شود و کسی که درست پاسخ دهد، حق گذاشتن مهره را به دست می‌آورد. یک ردیف، ستون یا قطر کامل کنید تا بازی را ببرید.',
          'راهبرد در فاصلهٔ میان پرسش‌ها شکل می‌گیرد: کدام خانه را بگیری، کدام خط را ببندی و کی ریسک کنی. دانستن پاسخ کافی نیست؛ باید بدانی آن را کجا بگذاری.',
        ],
        howLabel: 'جریان یک مسابقه',
        how: ['پرسشی از یک موضوع ظاهر می‌شود.', 'با پاسخ درست، یک خانه را بگیرید.', 'یک ردیف، ستون یا قطر کامل کنید و ببرید.'],
        note: 'دوما در مراحل آغازین توسعه است. طراحی، موضوع‌ها و سکوهای آن ممکن است تغییر کند و هنوز برای دریافت در دسترس نیست.',
      },
      chista: {
        lead: 'چیستا بازی فکری رقابتی است؛ دورهای کوتاهی که سرعت، حافظه، دقت و خونسردی شما را زیر فشار می‌سنجند.',
        story: [
          'هر دور کوتاه و تعیین‌کننده است. چیستا برای چند ثانیه تمام توجه شما را می‌خواهد و بعد پاداشش را می‌دهد؛ ریتمی نزدیک‌تر به ورزش تا کتاب معما.',
          'چیستا در زبان و حال‌وهوا فارسی است. جهانش از باغ‌های مهتابی، فانوس‌ها و آب‌های آینه‌وار ساخته شده: آرام برای دیدن، چالش‌برانگیز برای بازی‌کردن.',
        ],
        howLabel: 'هر دور از شما چه می‌خواهد',
        how: ['صفحه را در یک لحظه بخوانید.', 'پیش از گذشتن فرصت، عمل کنید.', 'با بالا رفتن فشار، خونسرد بمانید.'],
        note: 'چیستا برای وب در حال توسعه است و نسخهٔ اندروید آن در برنامه قرار دارد. این بازی هنوز به‌صورت عمومی منتشر نشده است.',
      },
      yarizan: {
        lead: 'یاریزان مجموعه‌ای از بازی‌های آموزشی فارسی برای دورهٔ دبستان است که پایه به پایه، مثل یک کتاب محبوب، چیده شده.',
        story: [
          'هر پایه کتاب بازی خودش را دارد. کودک ورق می‌زند، بازی را انتخاب می‌کند و با بازی یاد می‌گیرد؛ فارسی، ریاضی، علوم و بیشتر، به زبان خودش.',
          'لحن یاریزان گرم و دلگرم‌کننده است، نه درسی و خشک. هدف ساده است: پیروزی‌های کوچکی که به اعتمادبه‌نفس واقعی می‌رسند.',
        ],
        howLabel: 'چگونه چیده شده',
        how: ['برای هر پایهٔ تحصیلی، یک کتاب.', 'بازی‌های کوتاه با راهنمای روشن.', 'برای رایانه‌های ویندوزی در خانه یا مدرسه.'],
        note: 'نسخهٔ تازهٔ یاریزان در حال آماده‌سازی است. جزئیات دسترسی و پشتیبانی در زمان مناسب در سایت رسمی آن اعلام می‌شود.',
      },
    },
  },

  about: {
    label: 'دربارهٔ استودیو',
    title: ['استودیویی', 'برای جهان‌های', 'متفاوت.'],
    intro: 'استودیو بازی‌سازی اوآر نوا یک استودیوی مستقل است. بازی‌های ما از یک ایدهٔ روشن شروع می‌شوند و همان ایده دربارهٔ همه‌چیز تصمیم می‌گیرد.',
    principlesLabel: 'چگونه کار می‌کنیم',
    principles: [
      { title: 'یک ایده، تا انتها', body: 'بازی باید دربارهٔ چیزی باشد. اول ایده را انتخاب می‌کنیم؛ سازوکار، تصویر و صدا در خدمت آن قرار می‌گیرند.' },
      { title: 'هر جهان، مستقل', body: 'بازی‌های ما سبک مشترکی ندارند. دوما دقیق و راهبردی است، چیستا رازآلود و سریع، و یاریزان گرم و بازیگوش.' },
      { title: 'فارسی در دل، روشن برای همه', body: 'نخستین بازی‌های ما به فارسی فکر می‌کنند. برای این مخاطب با دقت طراحی می‌کنیم و برای خوانایی همه.' },
      {
        title: 'صادق دربارهٔ مسیر',
        body: 'فقط آنچه واقعی است را می‌گوییم. وضعیت هر بازی همان است که هست و تاریخی را که نتوانیم پایبندش باشیم، اعلام نمی‌کنیم.',
      },
    ],
    closing: 'نخستین جهان‌هایمان را همین حالا می‌سازیم. اگر به همکاری، نشر یا دنبال‌کردن کارهایمان علاقه دارید، خوشحال می‌شویم از شما بشنویم.',
    closingCta: 'تماس با استودیو',
  },

  contact: {
    label: 'ارتباط',
    title: ['برای ما', 'بنویسید.'],
    intro: 'فرم یا حساب کاربری لازم نیست. نشانی مناسب را انتخاب کنید تا برنامهٔ ایمیل شما باز شود.',
    general: 'عمومی و همکاری',
    generalBody: 'همکاری، نشر، رسانه و هر موضوع دیگری دربارهٔ استودیو.',
    support: 'پشتیبانی بازیکنان',
    supportBody: 'پرسش دربارهٔ یکی از بازی‌های ما.',
    privacy: 'از آنچه می‌فرستید فقط برای پاسخ به شما استفاده می‌کنیم.',
  },

  notFound: {
    code: '۴۰۴',
    title: ['این جهان', 'هنوز', 'ساخته نشده.'],
    body: 'صفحه‌ای که دنبالش بودید اینجا نیست. ممکن است جابه‌جا شده باشد یا نشانی را اشتباه وارد کرده باشید.',
    home: 'بازگشت به خانه',
    games: 'دیدن بازی‌ها',
  },

  seo: {
    home: {
      title: 'استودیو بازی‌سازی اوآر نوا — جهان‌هایی در حرکت',
      description: 'استودیوی مستقل سازندهٔ دوما، چیستا و یاریزان. جهان‌های متفاوت، یک جرقهٔ مشترک.',
    },
    games: {
      title: 'بازی‌ها — استودیو بازی‌سازی اوآر نوا',
      description: 'دوما، چیستا و یاریزان: سه بازی، سه زبان متفاوت برای بازی‌کردن، و وضعیت امروز هر کدام.',
    },
    about: {
      title: 'دربارهٔ ما — استودیو بازی‌سازی اوآر نوا',
      description: 'استودیوی مستقلی که هر جهانش را از یک ایدهٔ روشن می‌سازد.',
    },
    contact: {
      title: 'ارتباط — استودیو بازی‌سازی اوآر نوا',
      description: 'با استودیو بازی‌سازی اوآر نوا از طریق info@oarnova.games یا support@oarnova.games در ارتباط باشید.',
    },
    notFound: { title: 'صفحه پیدا نشد — استودیو بازی‌سازی اوآر نوا', description: 'این صفحه وجود ندارد.' },
    game: {
      dooma: {
        title: 'دوما — استودیو بازی‌سازی اوآر نوا',
        description: 'دوما: بازی راهبردی دانشی و دونفره که در آن هر پاسخ درست یک خانه از صفحه را می‌گیرد. در حال توسعه.',
      },
      chista: { title: 'چیستا — استودیو بازی‌سازی اوآر نوا', description: 'چیستا: بازی فکری رقابتی فارسی با دورهای کوتاه سرعت، حافظه و دقت. در حال توسعه.' },
      yarizan: { title: 'یاریزان — استودیو بازی‌سازی اوآر نوا', description: 'یاریزان: بازی‌های آموزشی فارسی برای دبستان، پایه به پایه. به‌زودی.' },
    },
  },
}

export const copy: Record<Locale, Copy> = { en, fa }
