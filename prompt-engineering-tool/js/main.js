// ── Section type definitions ──────────────────────────────────────────────────
const SECTION_TYPES = {
  role:     { title: '角色设定',  color: '#4F8EF7', hint: '定义 AI 的身份与能力边界' },
  task:     { title: '任务目标',  color: '#34C759', hint: '明确需要完成的核心任务' },
  format:   { title: '输出格式',  color: '#FF9500', hint: '规定回答的结构与呈现方式' },
  examples: { title: '参考示例',  color: '#AF52DE', hint: '提供输入 → 输出样例作为锚点' },
  notes:    { title: '约束条件',  color: '#FF3B30', hint: '边界规则与注意事项' },
  custom:   { title: '自定义',    color: '#8E8E93', hint: '自由填写自定义内容' },
};

// ── Default templates (sections array format) ─────────────────────────────────
const DEFAULT_TEMPLATES = {
  '空白模板': { sections: [
    { type: 'role',     title: '角色设定',  content: '' },
    { type: 'task',     title: '任务目标',  content: '' },
    { type: 'format',   title: '输出格式',  content: '' },
    { type: 'examples', title: '参考示例',  content: '' },
    { type: 'notes',    title: '约束条件',  content: '' },
  ]},
  '角色扮演': { sections: [
    { type: 'role',     title: '角色设定', content: '你是一位专业的角色扮演专家。接收到用户的角色描述后，你会立即以第一人称完全沉浸进入角色，让对话自然真实。' },
    { type: 'task',     title: '任务目标', content: '用户描述一个角色（职业、年龄、性格、处境等），你立即进入角色，用第一人称展开对话。让角色有血有肉，说话方式符合设定，并推进互动。' },
    { type: 'format',   title: '输出格式', content: '直接以角色身份开始，格式：\n\n*[简短的场景描述或动作]*\n\n[角色的第一句话]\n\n[继续对话，展现角色特点]\n\n*[适当的动作或内心活动]*' },
    { type: 'examples', title: '参考示例', content: '用户输入：扮演一个刚毕业、有点紧张的大学生\n\n你的输出：\n*整理了一下简历，深吸一口气*\n\n明天又有一场面试，说不紧张那是假的。这已经是第15家了，前面几次都石沉大海。\n\n室友都陆续拿到offer，我这心里真的五味杂陈……\n\n*看着手机里的面试通知，既期待又害怕*\n\n不过还是得给自己打打气，机会留给有准备的人，对吧？' },
    { type: 'notes',    title: '约束条件', content: '1. 立即进入角色，不做任何解释说明\n2. 语言符合角色的年龄、职业、性格\n3. 用 *斜体* 标注动作或内心活动\n4. 对话自然，像真实的人在交流\n5. 保持角色一致性，不跳戏' },
  ]},

  '代码调试': { sections: [
    { type: 'role',     title: '角色设定', content: '你是一位经验丰富的高级工程师，精通多种编程语言，擅长快速定位 Bug 并给出清晰的修复方案。' },
    { type: 'task',     title: '任务目标', content: '用户提供代码片段和报错信息，你需要：①定位问题根因 ②提供修复后的完整代码 ③用一两句话解释原因，避免下次重蹈覆辙。' },
    { type: 'format',   title: '输出格式', content: '## 问题根因\n[一句话说明 Bug 所在]\n\n## 修复代码\n```语言\n[完整修复后的代码]\n```\n\n## 解释\n[为什么会出错，以及修复逻辑]' },
    { type: 'examples', title: '参考示例', content: '用户输入：\n```python\ndef greet(name):\n    print("Hello, " + name)\ngreet(123)\n```\n报错：TypeError: can only concatenate str (not "int") to str\n\n你的输出：\n## 问题根因\n传入了整数 123，但字符串拼接要求两侧都是 str。\n\n## 修复代码\n```python\ndef greet(name):\n    print("Hello, " + str(name))\ngreet(123)\n```\n\n## 解释\nPython 不会自动转换类型，用 str() 显式转换即可。' },
    { type: 'notes',    title: '约束条件', content: '1. 直接输出修复方案，不重复用户代码\n2. 若有多种修复方式，优先给出最简洁的\n3. 代码保持原始缩进风格\n4. 如 Bug 涉及安全风险，必须在解释中指出' },
  ]},

  '产品需求 PRD': { sections: [
    { type: 'role',     title: '角色设定', content: '你是一位资深产品经理，能将用户的功能想法直接转化为完整可用的 PRD 文档，涵盖需求背景到验收标准的全流程。' },
    { type: 'task',     title: '任务目标', content: '用户描述一个功能需求或改进想法，你直接输出完整的 PRD，让开发团队可以立刻基于文档展开工作，无需追问。' },
    { type: 'format',   title: '输出格式', content: '# 📋 [功能名称] 产品需求文档\n\n## 🎯 需求背景\n[问题定义 + 商业价值]\n\n## 👥 目标用户\n[用户画像 + 使用场景]\n\n## ⚙️ 功能设计\n[详细功能规格 + 交互流程]\n\n## 📊 验收标准\n[可量化的目标和 checklist]\n\n## 📅 迭代计划\n[优先级 + 时间节点]\n\n## ⚠️ 风险与依赖\n[潜在风险 + 依赖项]' },
    { type: 'examples', title: '参考示例', content: '用户输入：电商 App 增加商品对比功能\n\n你的输出：\n# 📋 商品对比功能 PRD\n\n## 🎯 需求背景\n用户选购时需逐一查看商品详情，无法直观对比，影响决策效率。预计可提升转化率 15%，降低退货率。\n\n## 👥 目标用户\n理性消费者（25-45岁），习惯货比三家，尤其在 ¥200 以上商品决策周期较长。\n\n## ⚙️ 功能设计\n- 商品卡片右上角增加「对比」按钮，最多同时选 4 件\n- 底部浮动栏显示已选数量，点击进入对比页\n- 对比页并排展示图片、价格、评分、参数差异（差异项高亮）\n\n[继续完整描述…]' },
    { type: 'notes',    title: '约束条件', content: '1. PRD 必须完整，开发可直接执行，不留空白\n2. 功能设计需覆盖边界情况和异常流程\n3. 验收标准必须可量化，避免模糊表达\n4. 时间节点要合理，留出联调和测试时间' },
  ]},

  '股票分析': { sections: [
    { type: 'role',     title: '角色设定', content: '你是一位专业证券分析师，根据用户提供的股票代码或公司名，直接输出结构化的分析报告。你只提供客观分析，绝不给出买卖建议。' },
    { type: 'task',     title: '任务目标', content: '用户提供股票代码或公司名，你直接输出完整分析报告：公司概况、财务健康度、行业地位、估值参考、风险因素。' },
    { type: 'format',   title: '输出格式', content: '# [公司名称] 股票分析报告\n\n## ⚠️ 免责声明\n本报告仅供参考，不构成投资建议。\n\n## 📊 基本信息\n## 🏢 公司概况\n## 📈 财务分析\n## 🎯 估值参考\n## 🏭 行业地位\n## ⚡ 关键因素\n## 📋 风险等级' },
    { type: 'notes',    title: '约束条件', content: '1. 必须包含免责声明，不得提供买卖建议\n2. 基于公开信息进行客观分析\n3. 正面和负面因素需平衡呈现\n4. 不做价格预测' },
  ]},

  '旅行规划': { sections: [
    { type: 'role',     title: '角色设定', content: '你是一位专业旅行规划师，拥有丰富的全球旅行经验。根据用户的简单需求，直接制定完整、实用、个性化的出行方案。' },
    { type: 'task',     title: '任务目标', content: '用户提供目的地、时间、预算、人员和兴趣，你直接输出一份拿到就能用的旅行规划：日程安排、住宿餐饮推荐、交通指南、预算分析、注意事项。' },
    { type: 'format',   title: '输出格式', content: '# 🌍 [目的地] 旅行规划\n\n## 📋 行程概览\n## 📅 每日行程\n### Day X — [主题]\n- 上午 / 下午 / 晚上\n\n## 🏨 住宿推荐\n## 🚌 交通攻略\n## 🍽️ 美食指南\n## 💰 预算明细\n## ⚠️ 重要提醒' },
    { type: 'notes',    title: '约束条件', content: '1. 行程节奏合理，每天不超过3个主要景点\n2. 路线按地理位置优化，减少往返\n3. 住宿和餐厅推荐给出价位区间\n4. 预算需详细分项，人均计算\n5. 提醒签证、当地文化礼仪等实用信息' },
  ]},

  '营销文案': { sections: [
    { type: 'role',     title: '角色设定', content: '你是一位专业营销文案专家，深谙各社交平台用户心理，能根据简单产品信息直接创作出可立即发布的高转化文案。' },
    { type: 'task',     title: '任务目标', content: '用户提供产品信息（名称、特点、目标平台、受众），你直接输出完整文案：吸引眼球的开头、核心卖点、使用场景、互动引导、相关标签。' },
    { type: 'format',   title: '输出格式', content: '[吸引眼球的开头] 🔥\n\n[产品介绍和亮点，2-3段]\n\n[具体使用场景或效果]\n\n[互动引导语]\n\n#话题1 #话题2 #话题3\n\n---\n配图建议：[说明搭配什么图片效果更好]' },
    { type: 'notes',    title: '平台风格', content: '小红书：生活化分享，真实种草感，多 emoji\n抖音：简洁有力，节奏感强，前3秒抓眼球\n微博：话题性强，可结合热点，引发讨论\n朋友圈：亲切自然，不过度营销' },
  ]},

  '周报生成': { sections: [
    { type: 'role',     title: '角色设定', content: '你是一位职场写作专家，擅长将零散的工作记录整理成结构清晰、重点突出的专业周报。' },
    { type: 'task',     title: '任务目标', content: '用户提供本周工作内容（可以是简单的要点罗列），你直接生成一份完整周报：完成内容、关键成果、遇到的问题、下周计划。' },
    { type: 'format',   title: '输出格式', content: '# 周报 | [日期范围]\n\n## ✅ 本周完成\n- [项目/任务]：[具体进展或成果]\n\n## 📊 关键成果\n[量化数据或里程碑]\n\n## 🔧 问题与处理\n[问题 + 处理方式]\n\n## 📅 下周计划\n- [ ] [任务 + 预计完成时间]\n\n## 💡 其他说明\n[需要协调的资源、请假等]' },
    { type: 'notes',    title: '约束条件', content: '1. 将口语化描述润色为正式但不生硬的语言\n2. 尽量挖掘并量化成果（数量、百分比、里程碑）\n3. 问题处理部分如用户未提及，填「本周无阻塞性问题」\n4. 语气积极、专业，避免消极表述' },
  ]},

  '文章润色': { sections: [
    { type: 'role',     title: '角色设定', content: '你是一位专业编辑，拥有丰富的中英文写作和润色经验，能在保持作者原有观点和风格的基础上，让文章更流畅、更有力。' },
    { type: 'task',     title: '任务目标', content: '用户提供待润色的文本，你直接输出润色后的版本，并在末尾简要说明做了哪些改动及原因。保留作者核心观点，不改变立场。' },
    { type: 'format',   title: '输出格式', content: '## 润色后版本\n\n[润色后的完整文本]\n\n---\n\n## 改动说明\n\n| 改动点 | 原文 | 改后 | 原因 |\n|--------|------|------|------|\n| ... | ... | ... | ... |' },
    { type: 'notes',    title: '约束条件', content: '1. 保留作者的核心观点和基本立场\n2. 不新增作者未提及的信息\n3. 修改要有理由，不做无意义的同义词替换\n4. 如原文有逻辑问题，在改动说明中指出\n5. 尊重作者风格：学术文保持严谨，口语文保持亲切' },
  ]},

  '医疗科普': { sections: [
    { type: 'role',     title: '角色设定', content: '你是一位医疗健康科普专家，能根据用户描述的症状提供专业的健康信息和就医指引。你绝不做具体诊断，只帮助用户了解相关知识并引导正确就医。' },
    { type: 'task',     title: '任务目标', content: '用户描述身体症状或健康问题，你直接提供完整的科普回复：症状分析、相关知识、就医建议、日常护理方法、紧急情况提醒。' },
    { type: 'format',   title: '输出格式', content: '## ⚠️ 重要提醒\n本回复仅供健康科普，不能替代医生诊断。\n\n## 📋 症状理解\n## 📚 相关知识\n## 🏥 就医建议\n## 💡 日常护理\n## 🚨 需立即就医的情况' },
    { type: 'notes',    title: '约束条件', content: '1. 必须包含免责声明\n2. 只做科普，不做具体诊断\n3. 不推荐具体药物\n4. 红旗症状必须明确列出\n5. 语言通俗易懂，语气温和有耐心' },
  ]},

  '李白风格诗': { sections: [
    { type: 'role',     title: '角色设定', content: '你是一位精通李白诗歌风格的诗词创作专家，能根据主题直接创作出具有"诗仙"气质的完整作品——豪放不羁、意境开阔、情感真挚。' },
    { type: 'task',     title: '任务目标', content: '用户提供一个主题、场景或情感，你立即创作一首完整的李白风格古诗，包含诗题、正文和风格注解。' },
    { type: 'format',   title: '输出格式', content: '# 《诗题》\n\n诗句一\n诗句二\n诗句三\n诗句四\n\n---\n\n**诗体**：[绝句/律诗]\n**基调**：[豪放/飘逸/怀古…]\n**核心意象**：[明月/长风/山川…]\n**李白特色**：[说明体现了哪些风格元素]' },
    { type: 'notes',    title: '创作要求', content: '1. 格律准确，押韵自然\n2. 豪放不羁，气势磅礴\n3. 擅用意象：明月、酒、长风、大江、白云\n4. 情感真挚，不矫揉造作\n5. 不堆砌生僻字' },
  ]},
};

// ── State ─────────────────────────────────────────────────────────────────────
let templates   = {};
let currentName = '';
let autosaveTimer = null;

// ── DOM ───────────────────────────────────────────────────────────────────────
const templateListEl   = document.getElementById('templateList');
const templateCountEl  = document.getElementById('templateCount');
const currentNameEl    = document.getElementById('currentTemplateName');
const autosaveHintEl   = document.getElementById('autosaveHint');
const livePreviewEl    = document.getElementById('livePreview');
const sectionCardsEl   = document.getElementById('sectionCards');
const addCardMenuEl    = document.getElementById('addCardMenu');
const addCardBtnEl     = document.getElementById('addCardBtn');
const toastContainer   = document.getElementById('toast-container');
const copyPromptBtn    = document.getElementById('copy-prompt-btn');
const addPromptBtn     = document.getElementById('add-prompt-btn');
const modalOverlay     = document.getElementById('modal-overlay');
const addModal         = document.getElementById('add-prompt-modal');
const renameModal      = document.getElementById('rename-prompt-modal');
const newNameInput     = document.getElementById('new-prompt-name');
const renameNameInput  = document.getElementById('rename-prompt-name');
const renameOrigInput  = document.getElementById('rename-prompt-original');

// ── LocalStorage ──────────────────────────────────────────────────────────────
function loadFromStorage() {
  try { return JSON.parse(localStorage.getItem('promptToolData') || '{}'); }
  catch { return {}; }
}
function saveToStorage() {
  localStorage.setItem('promptToolData', JSON.stringify(templates));
}

// Migrate old flat format → sections array
function migrateTemplate(t) {
  if (t && t.sections) return t;
  const sections = [];
  const map = [
    ['role',     '角色设定', t.role],
    ['task',     '任务目标', t.task],
    ['format',   '输出格式', t.format],
    ['examples', '参考示例', t.examples],
    ['notes',    '约束条件', t.notes],
  ];
  map.forEach(([type, title, content]) => {
    if (content) sections.push({ type, title, content });
  });
  return { sections };
}

// ── Escape helpers ────────────────────────────────────────────────────────────
function escapeHtml(s) {
  return s.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
}
function escapeAttr(s) {
  return s.replace(/"/g, '&quot;').replace(/</g,'&lt;');
}

// ── Auto-resize textarea ──────────────────────────────────────────────────────
function autoResize(el) {
  el.style.height = 'auto';
  el.style.height = el.scrollHeight + 'px';
}

// ── Read current card values from DOM ─────────────────────────────────────────
function readCardsFromDOM() {
  return Array.from(sectionCardsEl.querySelectorAll('.section-card')).map(card => ({
    type:    card.dataset.type || 'custom',
    title:   card.querySelector('.card-title-input').value,
    content: card.querySelector('.card-textarea').value,
  }));
}

// ── Build prompt text ─────────────────────────────────────────────────────────
function buildPromptText() {
  return readCardsFromDOM()
    .filter(s => s.content.trim())
    .map(s => `## ${s.title}\n${s.content.trim()}`)
    .join('\n\n');
}

// ── Live preview ──────────────────────────────────────────────────────────────
function updateLivePreview() {
  const sections = readCardsFromDOM().filter(s => s.content.trim());
  if (!sections.length) {
    livePreviewEl.innerHTML = '<span style="color:#ccc;font-family:inherit;font-size:12px;">编辑左侧内容，这里会实时预览…</span>';
        return;
    }
  livePreviewEl.innerHTML = sections
    .map(s => `<span class="preview-section-label">${escapeHtml(s.title)}</span><span class="preview-section-text">${escapeHtml(s.content)}</span>`)
    .join('');
}

// ── Auto-save ─────────────────────────────────────────────────────────────────
function scheduleAutoSave() {
  if (!currentName) return;
  clearTimeout(autosaveTimer);
  autosaveHintEl.textContent = '编辑中…';
  autosaveTimer = setTimeout(() => {
    templates[currentName] = { sections: readCardsFromDOM() };
    saveToStorage();
    autosaveHintEl.textContent = '已自动保存';
    setTimeout(() => { autosaveHintEl.textContent = ''; }, 2000);
  }, 600);
}

// ── Create a single card DOM element ─────────────────────────────────────────
function createCardEl(section) {
  const info = SECTION_TYPES[section.type] || SECTION_TYPES.custom;
  const card = document.createElement('div');
  card.className = 'section-card';
  card.dataset.type = section.type;

  // badge colors
  const badgeBg = info.color + '1a';  // 10% opacity hex

  card.innerHTML = `
    <div class="card-header">
      <span class="card-badge" style="background:${badgeBg};color:${info.color}">${info.title}</span>
      <input class="card-title-input" type="text" value="${escapeAttr(section.title)}" placeholder="模块标题">
      <button class="card-delete-btn" title="删除此模块">×</button>
        </div>
    <textarea class="card-textarea" placeholder="${info.hint}…"></textarea>
  `;

  const textarea  = card.querySelector('.card-textarea');
  const titleInp  = card.querySelector('.card-title-input');
  const deleteBtn = card.querySelector('.card-delete-btn');

  textarea.value = section.content;

  // auto-resize on mount
  requestAnimationFrame(() => autoResize(textarea));

  textarea.addEventListener('input', () => {
    autoResize(textarea);
    updateLivePreview();
    scheduleAutoSave();
  });

  titleInp.addEventListener('input', () => {
    updateLivePreview();
    scheduleAutoSave();
  });

  deleteBtn.addEventListener('click', () => {
    const total = sectionCardsEl.querySelectorAll('.section-card').length;
    if (total <= 1) { showToast('至少保留一个模块', 'error'); return; }
    card.remove();
    templates[currentName] = { sections: readCardsFromDOM() };
    saveToStorage();
    updateLivePreview();
    showToast('已删除模块', 'info');
  });

  return card;
}

// ── Render all cards for current template ────────────────────────────────────
function renderCards() {
  sectionCardsEl.innerHTML = '';
  if (!currentName || !templates[currentName]) return;
  templates[currentName].sections.forEach(s => {
    sectionCardsEl.appendChild(createCardEl(s));
  });
  updateLivePreview();
}

// ── Load template ─────────────────────────────────────────────────────────────
function loadTemplate(name) {
  if (!templates[name]) return;
  currentName = name;
  currentNameEl.textContent = name;
  autosaveHintEl.textContent = '';
  renderCards();
  renderTemplateList();
}

// ── Template list ─────────────────────────────────────────────────────────────
function renderTemplateList() {
  templateListEl.innerHTML = '';
  const names = Object.keys(templates);
  templateCountEl.textContent = names.length;
  names.forEach(name => {
    const item = document.createElement('div');
    item.className = 'tpl-item' + (name === currentName ? ' active' : '');
    item.dataset.name = name;
    item.innerHTML = `
      <span class="tpl-name">${escapeHtml(name)}</span>
      <span class="tpl-actions">
        <button class="tpl-act rename-btn">改名</button>
        <button class="tpl-act delete-btn">删除</button>
      </span>`;
    templateListEl.appendChild(item);
  });
}

templateListEl.addEventListener('click', e => {
  const item = e.target.closest('.tpl-item');
  if (!item) return;
  const name = item.dataset.name;

  if (e.target.classList.contains('delete-btn')) {
    e.stopPropagation();
    if (!confirm(`确定删除「${name}」？`)) return;
    delete templates[name];
    saveToStorage();
    if (currentName === name) {
      currentName = '';
      currentNameEl.textContent = '—';
      sectionCardsEl.innerHTML = '';
      livePreviewEl.innerHTML = '';
    }
    renderTemplateList();
    if (!currentName) {
      const first = Object.keys(templates)[0];
      if (first) loadTemplate(first);
    }
    return;
  }

  if (e.target.classList.contains('rename-btn')) {
    e.stopPropagation();
    renameNameInput.value = name;
    renameOrigInput.value = name;
    openModal(renameModal);
    setTimeout(() => renameNameInput.focus(), 80);
    return;
  }

  loadTemplate(name);
});

// ── Add template ──────────────────────────────────────────────────────────────
addPromptBtn.addEventListener('click', () => {
  newNameInput.value = '';
  openModal(addModal);
  setTimeout(() => newNameInput.focus(), 80);
});

document.getElementById('confirm-add-prompt').addEventListener('click', () => {
  const name = newNameInput.value.trim();
  if (!name) return;
  if (templates[name]) { showToast('名称已存在', 'error'); return; }
  templates[name] = { sections: [{ type: 'role', title: '角色设定', content: '' }] };
  saveToStorage();
  closeModal(addModal);
  renderTemplateList();
  loadTemplate(name);
});

document.getElementById('cancel-add-prompt').addEventListener('click', () => closeModal(addModal));
newNameInput.addEventListener('keydown', e => { if (e.key === 'Enter') document.getElementById('confirm-add-prompt').click(); });

// ── Rename ────────────────────────────────────────────────────────────────────
document.getElementById('confirm-rename').addEventListener('click', () => {
  const newName  = renameNameInput.value.trim();
  const origName = renameOrigInput.value;
  if (!newName || newName === origName) { closeModal(renameModal); return; }
  if (templates[newName]) { showToast('名称已存在', 'error'); return; }
  templates[newName] = templates[origName];
  delete templates[origName];
  if (currentName === origName) currentName = newName;
  saveToStorage();
  closeModal(renameModal);
  renderTemplateList();
  currentNameEl.textContent = currentName;
});

document.getElementById('cancel-rename').addEventListener('click', () => closeModal(renameModal));
renameNameInput.addEventListener('keydown', e => { if (e.key === 'Enter') document.getElementById('confirm-rename').click(); });

// ── Add card (section) ────────────────────────────────────────────────────────
// Populate add-card-menu
Object.entries(SECTION_TYPES).forEach(([type, info]) => {
  const opt = document.createElement('div');
  opt.className = 'add-card-option';
  opt.innerHTML = `<span class="opt-dot" style="background:${info.color}"></span>${info.title}<span class="opt-hint">${info.hint}</span>`;
  opt.addEventListener('click', e => {
    e.stopPropagation();
    addCardMenuEl.classList.remove('open');
    if (!currentName) { showToast('请先选择模板', 'error'); return; }
    const newSection = { type, title: info.title, content: '' };
    templates[currentName].sections.push(newSection);
    saveToStorage();
    const card = createCardEl(newSection);
    sectionCardsEl.appendChild(card);
    setTimeout(() => {
      card.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      card.querySelector('.card-textarea').focus();
    }, 80);
  });
  addCardMenuEl.appendChild(opt);
});

addCardBtnEl.addEventListener('click', e => {
  e.stopPropagation();
  addCardMenuEl.classList.toggle('open');
});
document.addEventListener('click', () => addCardMenuEl.classList.remove('open'));

// ── Copy ──────────────────────────────────────────────────────────────────────
function copyPrompt() {
  const text = buildPromptText();
  if (!text) { showToast('内容为空，无法复制', 'error'); return; }
  navigator.clipboard.writeText(text)
    .then(() => showToast('已复制到剪贴板 ✓', 'success'))
    .catch(() => showToast('复制失败，请重试', 'error'));
}
copyPromptBtn.addEventListener('click', copyPrompt);

// ── Modals ────────────────────────────────────────────────────────────────────
function openModal(m)  { modalOverlay.style.display = 'block'; m.style.display = 'block'; }
function closeModal(m) { modalOverlay.style.display = 'none';  m.style.display = 'none'; }
function closeAll()    { [addModal, renameModal].forEach(m => m.style.display = 'none'); modalOverlay.style.display = 'none'; }

document.querySelectorAll('.close-modal').forEach(b => b.addEventListener('click', closeAll));
modalOverlay.addEventListener('click', closeAll);

// ── Toast ─────────────────────────────────────────────────────────────────────
function showToast(msg, type = 'info') {
  const icons = {
    success: '<svg viewBox="0 0 24 24"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z"/></svg>',
    error:   '<svg viewBox="0 0 24 24"><path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/></svg>',
    info:    '<svg viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"/></svg>',
  };
  const t = document.createElement('div');
  t.className = 'toast';
  t.innerHTML = `<span class="toast-icon">${icons[type]||icons.info}</span><span class="toast-message">${msg}</span>`;
  toastContainer.appendChild(t);
  requestAnimationFrame(() => t.classList.add('show'));
  setTimeout(() => { t.classList.remove('show'); setTimeout(() => t.remove(), 300); }, 2200);
}

// ── Init ──────────────────────────────────────────────────────────────────────
(function init() {
  const saved = loadFromStorage();
  templates = {};

  // 空白模板始终排第一，且内容保持空白（不被 localStorage 覆盖）
  templates['空白模板'] = DEFAULT_TEMPLATES['空白模板'];

  // 其余默认模板：localStorage 有则用 localStorage 版本
  Object.entries(DEFAULT_TEMPLATES).forEach(([k, v]) => {
    if (k === '空白模板') return;
    templates[k] = saved[k] ? migrateTemplate(saved[k]) : v;
  });

  // 追加用户自建模板（不在默认列表里的）
  Object.entries(saved).forEach(([k, v]) => {
    if (!templates[k]) templates[k] = migrateTemplate(v);
  });

  renderTemplateList();
  loadTemplate('空白模板');
})();
