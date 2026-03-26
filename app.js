/* eslint-disable no-inner-declarations */
// 纯前端实现：使用 Tailwind CDN + Lucide CDN，让页面直接打开即可运行。

const plans = [
  {
    id: 'ai',
    name: 'AI会员',
    desc: '通用AI + AI音乐',
    icon: 'zap',
    theme: 'from-blue-400 to-indigo-500',
    price: { monthly_auto: 19, monthly: 33, quarterly: 99, yearly: 399 },
    features: ['银河AI基础对话', 'AI音乐生成', 'AI新模型抢先体验', 'AI语音助手']
  },
  {
    id: 'health',
    name: '健康会员',
    desc: 'AI通用 + 运动健康',
    icon: 'activity',
    theme: 'from-green-400 to-emerald-500',
    price: { monthly_auto: 29, monthly: 49, quarterly: 99, yearly: 399 },
    features: ['助眠计划', '心率/姿态矫正', '运动教练模式', '健康周报分析']
  },
  {
    id: 'rec_normal',
    name: '录音普通',
    desc: '通用AI + 1200分钟',
    icon: 'mic',
    theme: 'from-purple-400 to-purple-600',
    price: { monthly_auto: 25, monthly: 35, quarterly: 99, yearly: 399 },
    features: ['1200分钟录音转写', '实时语音转文字', 'AI自动摘要', '云端存储']
  },
  {
    id: 'rec_pro',
    name: '录音超级',
    desc: '通用AI + 不限时长',
    icon: 'star',
    theme: 'from-orange-400 to-red-500',
    price: { monthly_auto: 99, monthly: 109, quarterly: 299, yearly: 1099 },
    features: ['不限录音时长', '同声传译', '超大文件转写', '专属识别引擎']
  },
  {
    id: 'super',
    name: '超级会员',
    desc: '全部权益合集',
    icon: 'crown',
    theme: 'from-gray-800 to-black',
    isPremium: true,
    price: { monthly_auto: 135, monthly: 150, quarterly: 399, yearly: 1499 },
    features: ['全站功能无限制', '最高阶AI模型', '无限录音/转写', '多设备同步优先']
  }
];

const state = {
  activeTab: 'super', // 默认选中超级会员
  billingCycle: 'monthly_auto',
  compareOpen: false // 对比面板默认收起
};

function escapeHtml(str) {
  return String(str)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;');
}

function getCurrentPlan() {
  return plans.find((p) => p.id === state.activeTab) || plans[0];
}

function getUnitFromCycle(cycle) {
  if (cycle.includes('yearly')) return '年';
  if (cycle.includes('quarter')) return '季';
  return '月';
}

function calcDiscount({ price, monthlyBase, multiplier }) {
  const baselineTotal = Number(monthlyBase) * Number(multiplier);
  const safeBaseline = baselineTotal > 0 ? baselineTotal : 1;
  const savings = safeBaseline - Number(price);
  const discountRate = Number(price) / safeBaseline; // 0~1
  const discount = discountRate * 10; // 0~10折
  return {
    baselineTotal,
    savings,
    discountRate,
    discount
  };
}

function formatIntMoney(num) {
  return String(Math.round(Number(num)));
}

function formatDiscountText(discount) {
  return `折扣${Number(discount).toFixed(1)}折`;
}

function getCompareItems() {
  // 用“特权清单”的并集做表格行（保持插入顺序，避免重复）
  const set = new Set();
  const list = [];
  for (const p of plans) {
    for (const f of p.features) {
      if (!set.has(f)) {
        set.add(f);
        list.push(f);
      }
    }
  }
  return list;
}

function getComparePlanColumns() {
  // 展示顺序：固定为 plans 的顺序（对应截图里的列）
  return plans.map((p) => ({
    id: p.id,
    name: p.name,
    theme: p.theme
  }));
}

function renderTabs() {
  const current = getCurrentPlan();
  const container = document.getElementById('tabsContainer');

  container.innerHTML = plans
    .map((plan) => {
      const isActive = plan.id === state.activeTab;
      const btnClass = isActive
        ? 'relative flex-shrink-0 px-5 py-3 rounded-2xl transition-all duration-300 flex flex-col items-center gap-1 border-2 border-indigo-600 bg-white shadow-lg scale-105'
        : 'relative flex-shrink-0 px-5 py-3 rounded-2xl transition-all duration-300 flex flex-col items-center gap-1 border-2 border-transparent bg-white/60 text-slate-400';

      const badgeHtml = `<span class="absolute -top-2 -right-1 bg-yellow-400 text-black text-[9px] px-1.5 py-0.5 rounded-md font-black">推荐</span>`;

      // “超级会员”这里不展示 desc 副标题（避免出现“全部权益合集”）
      const activeHintHtml =
        isActive && plan.id !== 'super'
          ? `<div class="text-[10px] text-slate-500 mt-1 text-center whitespace-nowrap overflow-hidden text-ellipsis max-w-[80px]">${escapeHtml(
              plan.desc
            )}</div>`
          : '';

      return `
        <button
          type="button"
          data-plan-id="${escapeHtml(plan.id)}"
          title="${escapeHtml(plan.desc)}"
          class="${btnClass}"
        >
          ${badgeHtml}
          <div class="p-2 rounded-xl bg-gradient-to-br ${plan.theme} text-white">
            <i data-lucide="${escapeHtml(plan.icon)}" class="w-5 h-5"></i>
          </div>
          <span class="text-xs font-bold whitespace-nowrap">${escapeHtml(plan.name)}</span>
          ${activeHintHtml}
        </button>
      `;
    })
    .join('');

  // 只更新图标，不要重复绑定事件
  if (window.lucide && typeof window.lucide.createIcons === 'function') {
    window.lucide.createIcons();
  }
}

function renderPlanCard() {
  const current = getCurrentPlan();
  const card = document.getElementById('planCard');
  const compareItems = getCompareItems();

  card.className = `relative overflow-hidden rounded-3xl p-6 text-white bg-gradient-to-br shadow-xl transition-all duration-500 ${current.theme}`;

  const badgeHtml = current.isPremium
    ? `<div class="absolute top-4 right-4 bg-yellow-400 text-black text-[10px] font-black px-2 py-0.5 rounded-full uppercase tracking-tighter">
        Best Value
      </div>`
    : '';

  card.innerHTML = `
    ${badgeHtml}
    <div class="flex items-center gap-2 mb-2 opacity-90">
      <i data-lucide="${escapeHtml(current.icon)}" class="w-5 h-5"></i>
      <span class="text-sm tracking-widest font-medium uppercase">${escapeHtml(current.name)}权益卡</span>
    </div>
    <h3 class="text-2xl font-bold mb-4">${escapeHtml(current.desc)}</h3>
    <div class="grid grid-cols-2 gap-3 mb-6">
      ${current.features
        .map(
          (f) => `
        <div class="flex items-center gap-2 text-xs bg-white/10 backdrop-blur-sm rounded-lg p-2">
          <i data-lucide="check" class="w-3 h-3 text-yellow-300"></i>
          <span class="truncate">${escapeHtml(f)}</span>
        </div>
      `
        )
        .join('')}
    </div>
    <button
      type="button"
      data-compare-toggle="1"
      aria-expanded="${state.compareOpen ? 'true' : 'false'}"
      class="w-full bg-white text-slate-900 font-bold py-3 rounded-xl shadow-lg hover:scale-95 transition-transform flex items-center justify-center gap-2"
    >
      <span>查看全部 ${compareItems.length} 项对比</span>
      <i data-lucide="${state.compareOpen ? 'chevron-up' : 'chevron-down'}" class="w-4 h-4"></i>
    </button>
  `;

  if (window.lucide && typeof window.lucide.createIcons === 'function') {
    window.lucide.createIcons();
  }
}

function renderComparePanel() {
  const wrap = document.getElementById('comparePanelWrap');
  const compareItems = getCompareItems();
  const columns = getComparePlanColumns();

  wrap.innerHTML = `
    <div class="bg-white rounded-2xl shadow border border-slate-100 overflow-hidden">
      <div class="px-4 py-3 border-b border-slate-100 flex items-center justify-between">
        <div class="text-slate-900 font-bold text-sm">权益对比表</div>
        <div class="flex items-center gap-1 text-indigo-600 text-xs font-medium">
          对比全部 ${columns.length} 种套餐
          <i data-lucide="chevron-down" class="w-4 h-4"></i>
        </div>
      </div>

      <div class="overflow-x-auto">
        <table class="w-full text-sm text-slate-700">
          <thead>
            <tr class="bg-slate-50">
              <th class="p-3 text-left font-medium text-slate-600 whitespace-nowrap w-40">功能明细</th>
              ${columns
                .map(
                  (c) => `
                <th class="p-3 text-center">
                  <div class="text-xs font-bold text-slate-900">${escapeHtml(c.name)}</div>
                  <div class="mt-1 mx-auto w-8 h-8 rounded-xl bg-gradient-to-br ${c.theme} flex items-center justify-center">
                    <i data-lucide="${escapeHtml(
                      plans.find((p) => p.id === c.id)?.icon || 'star'
                    )}" class="w-4 h-4 text-white"></i>
                  </div>
                </th>
              `
                )
                .join('')}
            </tr>
          </thead>
          <tbody>
            ${compareItems
              .map((item) => {
                const cells = columns
                  .map((c) => {
                    const p = plans.find((pp) => pp.id === c.id);
                    const has = p?.features?.includes(item);
                    return has
                      ? `
                      <td class="p-3 text-center">
                        <span class="inline-flex items-center justify-center w-8 h-8 rounded-full bg-emerald-50 text-emerald-600">
                          <i data-lucide="check" class="w-4 h-4"></i>
                        </span>
                      </td>
                    `
                      : `<td class="p-3 text-center text-slate-400">—</td>`;
                  })
                  .join('');

                return `
                  <tr class="border-t border-slate-100">
                    <td class="p-3 font-medium text-slate-900">${escapeHtml(item)}</td>
                    ${cells}
                  </tr>
                `;
              })
              .join('')}
          </tbody>
        </table>
      </div>

      <div class="px-4 py-3 bg-slate-50 border-t border-slate-100 text-[10px] text-slate-400">
        * 该对比表基于页面内配置的权益清单生成，实际以业务配置为准。
      </div>
    </div>
  `;

  if (window.lucide && typeof window.lucide.createIcons === 'function') {
    window.lucide.createIcons();
  }
}

function setCompareVisibility(open) {
  state.compareOpen = open;
  const wrap = document.getElementById('comparePanelWrap');
  wrap.classList.toggle('hidden', !open);

  if (open) {
    renderComparePanel();
  } else {
    // 收起时不必销毁内容，但保持一致性：清空避免重复 lucide 渲染
    wrap.innerHTML = '';
  }

  // 让按钮里的箭头状态同步更新
  renderPlanCard();
}

function renderBillingOptions() {
  const current = getCurrentPlan();
  const container = document.getElementById('billingOptions');

  const monthlyBase = Number(current.price.monthly);

  const options = [
    { id: 'monthly_auto', label: '连续包月', price: Number(current.price.monthly_auto), multiplier: 1, fixedCornerTag: '首月 ¥1' },
    { id: 'monthly', label: '月度会员', price: Number(current.price.monthly), multiplier: 1, fixedCornerTag: '' },
    { id: 'quarterly', label: '季度会员', price: Number(current.price.quarterly), multiplier: 3, fixedCornerTag: '' },
    { id: 'yearly', label: '年度会员', price: Number(current.price.yearly), multiplier: 12, fixedCornerTag: '' }
  ];

  container.innerHTML = options
    .map((option) => {
      const isActive = option.id === state.billingCycle;
      const baseClass =
        'relative p-4 rounded-2xl border-2 transition-all duration-300 flex flex-col overflow-hidden';
      const activeClass =
        'border-indigo-600 bg-indigo-50/50 shadow-sm max-h-[260px] min-w-[170px] flex-1';
      const inactiveClass =
        'border-slate-200 bg-white max-h-[120px] min-w-[170px] flex-1';
      const btnClass = `${baseClass} ${isActive ? activeClass : inactiveClass}`;

      const { baselineTotal, savings, discount } = calcDiscount({
        price: option.price,
        monthlyBase,
        multiplier: option.multiplier
      });

      const baselineTotalInt = formatIntMoney(baselineTotal);
      const savingsInt = Math.max(0, Math.round(Number(savings)));
      const eqMonthlyInt = Math.max(0, Math.round(option.price / Math.max(1, option.multiplier)));

      const discountText = formatDiscountText(discount); // 如 折扣8.7折
      const savingsText = savingsInt > 0 ? `省¥${savingsInt}` : '';

      const cornerTag =
        option.fixedCornerTag && option.id === 'monthly_auto'
          ? `<span class="absolute top-3 right-3 bg-red-500 text-white text-[9px] px-1.5 py-0.5 rounded-md font-bold whitespace-nowrap leading-none">${escapeHtml(
              option.fixedCornerTag
            )}</span>`
          : savingsInt > 0
            ? `<span class="absolute top-3 right-3 bg-red-500 text-white text-[9px] px-1.5 py-0.5 rounded-md font-bold whitespace-nowrap leading-none">${escapeHtml(
                `省¥${savingsInt}`
              )}</span>`
            : discount < 9.95
              ? `<span class="absolute top-3 right-3 bg-indigo-500 text-white text-[9px] px-1.5 py-0.5 rounded-md font-bold whitespace-nowrap leading-none">${escapeHtml(
                  discountText
                )}</span>`
              : '';

      const collapsed = `
        <div class="flex-1">
          <div class="text-xs text-slate-500 mb-1">${escapeHtml(option.label)}</div>
          <div class="text-xl font-black flex items-baseline gap-1 text-slate-800">
            <span class="text-sm font-normal">¥</span>
            ${formatIntMoney(option.price)}
          </div>
          <div class="mt-2 flex items-center gap-2 text-[10px]">
            <span class="${savingsInt > 0 ? 'text-emerald-600 font-bold' : 'text-slate-500 font-medium'}">
              ${escapeHtml(savingsText || discountText)}
            </span>
          </div>
          <div class="text-[10px] text-slate-400 mt-1 whitespace-nowrap">
            相当于每月 ¥${eqMonthlyInt}
          </div>
        </div>
      `;

      const expanded = `
        <div class="flex-1">
          <div class="flex items-start justify-between mb-2 gap-3">
            <div>
              <div class="text-xs text-slate-500 mb-1">${escapeHtml(option.label)}</div>
              <div class="text-xl font-black flex items-baseline gap-1 text-slate-800">
                <span class="text-sm font-normal">¥</span>
                ${formatIntMoney(option.price)}
              </div>
              <div class="text-[10px] text-slate-400 mt-1 line-through">¥${escapeHtml(baselineTotalInt)}</div>
            </div>
            <div class="text-right min-w-[96px]">
              <div class="text-[11px] font-bold ${savingsInt > 0 ? 'text-emerald-600' : 'text-slate-600'}">
                ${escapeHtml(savingsText || '不涨价')}
              </div>
              <div class="text-[11px] font-bold text-indigo-700 mt-1">${escapeHtml(discountText)}</div>
            </div>
          </div>

          <div class="mt-2 flex items-center justify-between text-[10px] text-slate-600">
            <span>相当于每月 ¥${eqMonthlyInt}</span>
            <span class="text-slate-400">勾选代表同意《会员协议》</span>
          </div>
        </div>
      `;

      return `
        <button
          type="button"
          data-billing-id="${escapeHtml(option.id)}"
          class="${btnClass}"
        >
          ${cornerTag}
          ${isActive ? expanded : collapsed}
        </button>
      `;
    })
    .join('');
}

function updateBottomBar() {
  const current = getCurrentPlan();
  const price = current.price[state.billingCycle];
  const unit = getUnitFromCycle(state.billingCycle);

  const bottomPrice = document.getElementById('bottomPrice');
  const bottomUnit = document.getElementById('bottomUnit');
  const buyBtn = document.getElementById('buyBtn');

  bottomPrice.textContent = `¥${Number(price)}`;
  bottomUnit.textContent = `/${unit}`;

  buyBtn.className = `px-8 py-4 rounded-full font-bold text-white shadow-xl transform active:scale-95 transition-all bg-gradient-to-r ${current.theme}`;
  buyBtn.textContent = state.billingCycle === 'monthly_auto' ? '7天免费试用' : '立即购买';
}

function renderAll() {
  renderTabs();
  renderPlanCard();
  renderBillingOptions();
  updateBottomBar();
  // 对比面板由 toggle 控制：保持默认收起（不自动展开）
  if (!state.compareOpen) {
    const wrap = document.getElementById('comparePanelWrap');
    wrap.classList.add('hidden');
    wrap.innerHTML = '';
  }
}

function setupEvents() {
  const tabsContainer = document.getElementById('tabsContainer');
  tabsContainer.addEventListener('click', (e) => {
    const btn = e.target && e.target.closest && e.target.closest('button[data-plan-id]');
    if (!btn) return;
    state.activeTab = btn.getAttribute('data-plan-id');
    state.compareOpen = false; // 切换会员卡时默认收起对比面板
    renderAll();
  });

  const billingOptions = document.getElementById('billingOptions');
  billingOptions.addEventListener('click', (e) => {
    const btn = e.target && e.target.closest && e.target.closest('button[data-billing-id]');
    if (!btn) return;
    state.billingCycle = btn.getAttribute('data-billing-id');
    renderBillingOptions();
    updateBottomBar();
  });

  const upgradeBtn = document.getElementById('upgradeBtn');
  upgradeBtn.addEventListener('click', () => {
    state.activeTab = 'super';
    state.compareOpen = false;
    renderAll();
    // 可选：让用户更快看到卡片变化（移动端更友好）
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  const planCard = document.getElementById('planCard');
  planCard.addEventListener('click', (e) => {
    const btn = e.target && e.target.closest && e.target.closest('button[data-compare-toggle="1"]');
    if (!btn) return;
    setCompareVisibility(!state.compareOpen);
  });
}

// 初始化
window.addEventListener('DOMContentLoaded', () => {
  setupEvents();
  renderAll();

  // Lucide 图标需要在首次渲染后创建
  if (window.lucide && typeof window.lucide.createIcons === 'function') {
    window.lucide.createIcons();
  }
});

