// Shared facts and concise bilingual project notes.
export const projects = [
  {
    "id": "budgetanywhere",
    "url": "https://budgetanywhere.com/",
    "featured": true,
    "image": "budgetanywhere.jpg",
    "width": 1440,
    "height": 1000,
    "technologies": [
      "React",
      "TypeScript",
      "PostgreSQL"
    ],
    "en": {
      "name": "BudgetAnywhere",
      "kind": "Independent software product",
      "status": "Live application",
      "summary": "Multi-currency budgeting with a double-entry ledger.",
      "description": "An independent budgeting app for households managing accounts, transactions, and budgets across currencies.",
      "scope": [
        "Multi-currency accounts and budgets",
        "Database-enforced balanced transactions",
        "Installable web application"
      ],
      "alt": "BudgetAnywhere public welcome page",
      "link": "Explore BudgetAnywhere"
    },
    "zh-Hant": {
      "name": "BudgetAnywhere",
      "kind": "自主開發軟體產品",
      "status": "已上線應用程式",
      "summary": "以複式記帳為基礎的多幣別預算管理工具。",
      "description": "自主開發的家庭預算管理應用程式，整合不同幣別的帳戶、交易與預算。",
      "scope": [
        "多幣別帳戶與預算",
        "由資料庫確保分錄平衡",
        "可安裝的網頁應用程式"
      ],
      "alt": "BudgetAnywhere 公開歡迎頁面",
      "link": "探索 BudgetAnywhere"
    }
  },
  {
    "id": "lavarieta",
    "url": "https://lavarietasourcing.com/",
    "featured": true,
    "image": "lavarieta.jpg",
    "width": 1440,
    "height": 1000,
    "technologies": [
      "HTML",
      "CSS",
      "GitHub Pages"
    ],
    "en": {
      "name": "La Varieta Sourcing",
      "kind": "Business website",
      "status": "Published website",
      "summary": "An international sourcing business, clearly presented.",
      "description": "A focused business website introducing sourcing services and giving international buyers a clear inquiry route.",
      "scope": [
        "Service presentation",
        "Responsive development",
        "Direct inquiry journey"
      ],
      "alt": "La Varieta Sourcing homepage",
      "link": "Visit La Varieta"
    },
    "zh-Hant": {
      "name": "La Varieta Sourcing",
      "kind": "企業網站",
      "status": "已公開網站",
      "summary": "讓國際買家清楚認識台灣採購服務。",
      "description": "介紹企業與採購服務，為國際買家提供清楚的洽詢管道。",
      "scope": [
        "企業與服務呈現",
        "響應式開發",
        "直接的洽詢流程"
      ],
      "alt": "La Varieta Sourcing 網站首頁",
      "link": "瀏覽 La Varieta"
    }
  },
  {
    "id": "john-bosco",
    "url": "https://johnboscotaipei.org/en",
    "featured": true,
    "image": "john-bosco.jpg",
    "width": 1440,
    "height": 1000,
    "technologies": [
      "Next.js",
      "Payload CMS",
      "AI-assisted translation"
    ],
    "en": {
      "name": "St. John Bosco Parish",
      "kind": "Multilingual website & CMS",
      "status": "Published website",
      "summary": "Three languages. One publishing workflow.",
      "description": "A parish website in Chinese, English, and Vietnamese, with a shared CMS and reviewed AI-assisted translations.",
      "scope": [
        "Three-language website and CMS",
        "AI-assisted translation with review",
        "Announcements and Mass schedules"
      ],
      "alt": "St. John Bosco Parish English homepage",
      "link": "Visit the parish website"
    },
    "zh-Hant": {
      "name": "台北聖若望鮑思高堂",
      "kind": "多語系網站與內容管理系統",
      "status": "已公開網站",
      "summary": "三種語言，一套內容發布流程。",
      "description": "提供中、英、越三語的堂區網站，以同一套 CMS 管理內容，並審閱 AI 輔助翻譯。",
      "scope": [
        "三語網站與內容管理",
        "AI 輔助翻譯與人工審閱",
        "公告與彌撒時間管理"
      ],
      "alt": "台北聖若望鮑思高堂英文版首頁",
      "link": "瀏覽堂區網站"
    }
  },
  {
    "id": "taipei-prototype",
    "url": "https://taipeicatholic.org/en",
    "featured": false,
    "image": "taipei-prototype.jpg",
    "width": 1440,
    "height": 1000,
    "technologies": [
      "Next.js",
      "Payload CMS",
      "PostgreSQL"
    ],
    "en": {
      "name": "Taipei Archdiocese prototype",
      "kind": "Website & publishing prototype",
      "status": "Public prototype",
      "summary": "A bilingual publishing system prototype.",
      "description": "A website and CMS prototype exploring structured news, events, directories, and multilingual editorial workflows.",
      "scope": [
        "Structured content and directories",
        "Editorial roles and publishing",
        "AI-assisted translation with review"
      ],
      "disclaimer": "Public prototype; not an official deployment, endorsement, or completed paid Archdiocese engagement.",
      "alt": "English homepage of the Taipei Archdiocese website prototype",
      "link": "View the public prototype"
    },
    "zh-Hant": {
      "name": "台北總教區網站原型",
      "kind": "網站與內容發布系統原型",
      "status": "公開展示原型",
      "summary": "雙語內容發布系統原型。",
      "description": "探索如何以網站與 CMS 管理新聞、活動、名錄及多語系編輯流程。",
      "scope": [
        "結構化內容與名錄",
        "編輯權限與發布流程",
        "AI 輔助翻譯與人工審閱"
      ],
      "disclaimer": "公開展示原型；非總教區正式採用、背書或已完成的付費委託案。",
      "alt": "台北總教區網站原型的英文版首頁",
      "link": "瀏覽公開原型"
    }
  }
];

export function localizedProjects(language) {
  return projects.map(({ en, 'zh-Hant': zh, ...shared }) => ({ ...shared, ...(language === 'zh-Hant' ? zh : en) }));
}
