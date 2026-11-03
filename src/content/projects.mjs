// Shared project facts; each entry has equivalent English and Traditional Chinese copy.
// Screenshots are of public pages, never private dashboards or CMS accounts.
export const projects = [
  {
    id: 'budgetanywhere', url: 'https://budgetanywhere.com/', featured: true,
    image: 'budgetanywhere.jpg', width: 1440, height: 1000,
    technologies: ['React', 'TypeScript', 'PostgreSQL'],
    en: {
      name: 'BudgetAnywhere', kind: 'Independent software product', status: 'Live application',
      summary: 'A budgeting application for households managing money across currencies.',
      description: 'An independent product built around the challenge of budgeting across currencies. It brings accounts, transactions, and household budgets into one application, with a double-entry ledger underneath.',
      scope: ['Multi-currency accounts and household budgeting', 'Database-enforced balanced transactions and access controls', 'Responsive, installable web application'],
      alt: 'BudgetAnywhere public welcome page', link: 'Explore BudgetAnywhere',
    },
    'zh-Hant': {
      name: 'BudgetAnywhere', kind: '自主開發軟體產品', status: '已上線應用程式',
      summary: '為需要管理不同幣別的家庭打造的預算管理應用程式。',
      description: '以跨幣別的家庭理財需求為出發點，自主開發的預算管理工具。將帳戶、交易與家庭預算整合在同一個應用程式中，並以複式記帳作為資料基礎。',
      scope: ['多幣別帳戶與家庭預算管理', '由資料庫確保分錄平衡，並控管資料存取權限', '支援手機操作與安裝的網頁應用程式'],
      alt: 'BudgetAnywhere 公開歡迎頁面', link: '探索 BudgetAnywhere',
    },
  },
  {
    id: 'lavarieta', url: 'https://lavarietasourcing.com/', featured: true,
    image: 'lavarieta.jpg', width: 1440, height: 1000,
    technologies: ['HTML', 'CSS', 'GitHub Pages'],
    en: {
      name: 'La Varieta Sourcing', kind: 'Business website', status: 'Published website',
      summary: 'A clear introduction to a Taiwan-based sourcing business for international buyers.',
      description: 'A public website that introduces the business, explains its sourcing services, and gives prospective buyers a straightforward way to make an inquiry. A focused static site keeps hosting and ongoing maintenance simple.',
      scope: ['Business and service presentation for international buyers', 'Responsive website design and development', 'Direct inquiry and contact journeys'],
      alt: 'La Varieta Sourcing homepage', link: 'Visit La Varieta',
    },
    'zh-Hant': {
      name: 'La Varieta Sourcing', kind: '企業網站', status: '已公開網站',
      summary: '向國際買家清楚介紹台灣採購服務企業的專業與服務。',
      description: '讓海外買家快速認識企業與採購服務，並提供直接的洽詢管道。採用精簡的靜態網站架構，讓主機託管與日常維護更單純。',
      scope: ['面向國際買家的企業與服務資訊', '響應式網站設計與開發', '清楚的詢價與聯絡流程'],
      alt: 'La Varieta Sourcing 網站首頁', link: '瀏覽 La Varieta',
    },
  },
  {
    id: 'john-bosco', url: 'https://johnboscotaipei.org/en', featured: true,
    image: 'john-bosco.jpg', width: 1440, height: 1000,
    technologies: ['Next.js', 'Payload CMS', 'AI-assisted translation'],
    en: {
      name: 'St. John Bosco Parish', kind: 'Multilingual website & CMS', status: 'Published website',
      summary: 'Parish information in three languages, supported by a shared editorial workflow.',
      description: 'A Traditional Chinese, English, and Vietnamese website with a content management system for announcements, parish information, and Mass schedules. Editors can work in their own language and review AI-assisted translations before publication.',
      scope: ['Three-language public website and content management', 'AI-assisted translation with an editorial review workflow', 'Structured announcements, schedules, and parish information'],
      alt: 'St. John Bosco Parish English homepage', link: 'Visit the parish website',
    },
    'zh-Hant': {
      name: '台北聖若望鮑思高堂', kind: '多語系網站與內容管理系統', status: '已公開網站',
      summary: '以三種語言提供堂區資訊，透過同一套編輯流程維護內容。',
      description: '提供繁體中文、英文與越南文的堂區網站，並以內容管理系統維護公告、堂區介紹與彌撒時間。編輯人員可使用自己熟悉的語言撰寫內容，再審閱 AI 輔助翻譯的版本後發布。',
      scope: ['三語公開網站與內容管理系統', '結合人工審閱的 AI 輔助翻譯流程', '結構化的公告、時間表與堂區資訊'],
      alt: '台北聖若望鮑思高堂英文版首頁', link: '瀏覽堂區網站',
    },
  },
  {
    id: 'taipei-prototype', url: 'https://taipeicatholic.org/en', featured: false,
    image: 'taipei-prototype.jpg', width: 1440, height: 1000,
    technologies: ['Next.js', 'Payload CMS', 'PostgreSQL'],
    en: {
      name: 'Taipei Archdiocese prototype', kind: 'Website & publishing prototype', status: 'Public prototype',
      summary: 'Exploring multilingual publishing and structured information for a complex organization.',
      description: 'A website and CMS prototype built around the Catholic Archdiocese of Taipei context. It explores how news, events, a parish directory, and documents can share a structured publishing system, with AI-assisted translation and human review.',
      scope: ['Bilingual website with structured news, events, and directories', 'Content roles and editorial publishing workflows', 'AI-assisted translation with human review'],
      disclaimer: 'Presented as a prototype. Public availability does not imply an official Archdiocese deployment, endorsement, or a completed paid engagement.',
      alt: 'English homepage of the Taipei Archdiocese website prototype', link: 'View the public prototype',
    },
    'zh-Hant': {
      name: '台北總教區網站原型', kind: '網站與內容發布系統原型', status: '公開展示原型',
      summary: '探索大型組織如何管理多語系內容與結構化資訊。',
      description: '以天主教台北總教區的資訊需求為情境，開發網站與 CMS 原型。探索如何透過同一套結構化系統管理新聞、活動、堂區名錄與文件，並結合 AI 輔助翻譯與人工審閱。',
      scope: ['雙語網站與結構化的新聞、活動及名錄', '內容編輯權限與發布流程', '結合人工審閱的 AI 輔助翻譯'],
      disclaimer: '本作品以原型形式展示。公開瀏覽不代表已獲總教區正式採用或背書，也不表示這是已完成的付費委託案。',
      alt: '台北總教區網站原型的英文版首頁', link: '瀏覽公開原型',
    },
  },
];

export function localizedProjects(language) {
  return projects.map(({ en, 'zh-Hant': zh, ...shared }) => ({ ...shared, ...(language === 'zh-Hant' ? zh : en) }));
}
