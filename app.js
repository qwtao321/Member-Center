/* eslint-disable no-inner-declarations */
// 纯前端实现：使用 Tailwind CDN + Lucide CDN，让页面直接打开即可运行。

const plans = [
  {
    id: 'music',
    name: 'AI音乐会员',
    desc: '独享无损音质会员曲库，下载无限次离线也能听',
    icon: 'music-4',
    theme: 'from-pink-400 to-rose-500',
    regions: ['domestic'],
    price: {
      domestic: { monthly_auto: 8, monthly: 18, quarterly: 25, half_yearly: 45, yearly: 88 }
    },
    features: ['会员曲库', '下载无限次数/月', '无损音质播放']
  },
  {
    id: 'ai',
    name: 'AI会员',
    desc: '拥有 24 小时工作生活随身智能助手',
    icon: 'zap',
    theme: 'from-blue-400 to-indigo-500',
    price: {
      domestic: { monthly_auto: 19, monthly: 29, quarterly: 59, half_yearly: 99, yearly: 168 },
      international: { monthly: 9.9, yearly: 79.9 }
    },
    features: ['塞那银河全能AI不限', 'AI语音助手不限', '面对面翻译100分钟/月', '录音转写100分钟/月']
  },
  {
    id: 'health',
    name: '健康会员',
    desc: 'AI通用 + 运动健康',
    icon: 'activity',
    theme: 'from-green-400 to-emerald-500',
    price: {
      domestic: { monthly_auto: 29, monthly: 49, quarterly: 119, yearly: 499 },
      international: { monthly: 19.9, yearly: 99.9 }
    },
    features: ['助眠计划', '心率/姿态矫正', '运动教练模式', '健康周报分析']
  },
  {
    id: 'rec_normal',
    name: '录音会员',
    desc: '告别会议繁琐速记，满足全月会议转写总结需求',
    icon: 'mic',
    theme: 'from-purple-400 to-purple-600',
    price: {
      domestic: { monthly_auto: 29, monthly: 39, quarterly: 79, half_yearly: 139, yearly: 239 },
      international: { monthly: 12.9, yearly: 99.9 }
    },
    features: ['塞那银河全能AI', '录音转写600分钟/月', 'AI录音会议总结', 'AI录音会议待办']
  },
  {
    id: 'rec_pro',
    name: '录音超级',
    desc: '高级录音权益',
    icon: 'star',
    theme: 'from-orange-400 to-red-500',
    price: {
      domestic: { monthly_auto: 99, monthly: 109, quarterly: 299, yearly: 1099 },
      international: { monthly: 24.9, yearly: 239.9 }
    },
    features: ['不限录音时长', '同声传译', '超大文件转写', '专属识别引擎']
  },
  {
    id: 'super',
    name: '超级会员',
    desc: '全部权益合集',
    icon: 'crown',
    theme: 'from-gray-800 to-black',
    isPremium: true,
    price: {
      domestic: { monthly_auto: 135, monthly: 150, quarterly: 399, yearly: 1499 },
      international: { monthly: 35.9, yearly: 349.9 }
    },
    features: ['全站功能无限制', '最高阶AI模型', '无限录音/转写', '多设备同步优先']
  }
];

const regionConfigs = {
  domestic: {
    id: 'domestic',
    label: '国内版',
    billingOptions: ['monthly_auto', 'monthly', 'quarterly', 'half_yearly', 'yearly'],
    planIds: ['ai', 'music', 'rec_normal'],
    comparePlanIds: ['non_member', 'ai', 'music', 'rec_normal']
  },
  international: {
    id: 'international',
    label: '国际版',
    billingOptions: ['monthly', 'yearly'],
    planIds: ['ai', 'rec_normal'],
    comparePlanIds: ['non_member', 'ai', 'rec_normal']
  }
};

const billingOptionMeta = {
  monthly_auto: { id: 'monthly_auto', label: '连续包月', multiplier: 1, fixedCornerTag: '' },
  monthly: { id: 'monthly', label: '月度会员', multiplier: 1, fixedCornerTag: '' },
  quarterly: { id: 'quarterly', label: '季度会员', multiplier: 3, fixedCornerTag: '' },
  half_yearly: { id: 'half_yearly', label: '半年会员', multiplier: 6, fixedCornerTag: '' },
  yearly: { id: 'yearly', label: '年度会员', multiplier: 12, fixedCornerTag: '' }
};

const buttonGradients = {
  music: 'linear-gradient(135deg, #ec4899 0%, #f43f5e 100%)',
  ai: 'linear-gradient(135deg, #60a5fa 0%, #4f46e5 100%)',
  health: 'linear-gradient(135deg, #4ade80 0%, #10b981 100%)',
  rec_normal: 'linear-gradient(135deg, #c084fc 0%, #9333ea 100%)',
  rec_pro: 'linear-gradient(135deg, #fb923c 0%, #ef4444 100%)',
  super: 'linear-gradient(135deg, #1f2937 0%, #000000 100%)'
};

const compareOnlyPlans = {
  non_member: {
    id: 'non_member',
    name: '非会员',
    icon: 'user',
    theme: 'from-slate-400 to-slate-600'
  }
};

const compareRows = [
  {
    label: '塞那银河全能AI',
    values: { non_member: '每日5次', ai: '不限', music: '', rec_normal: '不限' }
  },
  {
    label: 'AI语音助手',
    values: { non_member: '每日3分钟', ai: '不限', music: '', rec_normal: '不限' }
  },
  {
    label: '面对面翻译',
    values: { non_member: '5分钟/月', ai: '100分钟/月', music: '', rec_normal: '600分钟/月' }
  },
  {
    label: '同声听译',
    values: { non_member: '5分钟/月', ai: '50分钟/月', music: '', rec_normal: '300分钟/月' }
  },
  {
    label: '录音转写',
    values: { non_member: '5分钟/月', ai: '100分钟/月', music: '', rec_normal: '600分钟/月' }
  },
  {
    label: '文字转语音',
    values: { non_member: '100字/月', ai: '10000字/月', music: '', rec_normal: '60000字/月' }
  },
  {
    label: '云空间',
    values: { non_member: '', ai: '1GB', music: '', rec_normal: '3GB' }
  },
  {
    label: '音频区分人说话',
    values: { non_member: '', ai: '支持', music: '', rec_normal: '支持' }
  },
  {
    label: '音频导入',
    values: { non_member: '', ai: '支持', music: '', rec_normal: '支持' }
  },
  {
    label: '思维导图',
    values: { non_member: '', ai: '', music: '', rec_normal: '支持' }
  },
  {
    label: '录音AI问答',
    values: { non_member: '', ai: '', music: '', rec_normal: '支持' }
  },
  {
    label: '录音总结模版',
    values: { non_member: '', ai: '', music: '', rec_normal: '支持' }
  },
  {
    label: 'AI录音会议总结',
    values: { non_member: '', ai: '', music: '', rec_normal: '支持' }
  },
  {
    label: 'AI录音总结章节',
    values: { non_member: '', ai: '', music: '', rec_normal: '支持' }
  },
  {
    label: 'AI录音会议待办',
    values: { non_member: '', ai: '', music: '', rec_normal: '支持' }
  },
  {
    label: '会员曲库',
    values: { non_member: '', ai: '', music: '支持', rec_normal: '' }
  },
  {
    label: '下载次数',
    values: { non_member: '', ai: '', music: '无限/月', rec_normal: '' }
  },
  {
    label: '无损音质播放',
    values: { non_member: '', ai: '', music: '支持', rec_normal: '' }
  }
];

const state = {
  activeRegion: 'domestic',
  activeTab: 'ai',
  billingCycle: 'monthly_auto',
  compareOpen: false // 对比面板默认收起
};

const PLAN_CARD_FADE_DURATION = 300;
const TAB_SCROLL_SETTLE_DELAY = 90;

let planCardFadeTimer = null;
let tabsScrollTimer = null;
let suppressTabScrollSync = false;

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

function getPlanMetaById(planId) {
  return plans.find((p) => p.id === planId) || compareOnlyPlans[planId] || null;
}

function getCurrentRegionConfig() {
  return regionConfigs[state.activeRegion] || regionConfigs.domestic;
}

function getVisiblePlans() {
  const regionConfig = getCurrentRegionConfig();
  return regionConfig.planIds
    .map((planId) => plans.find((plan) => plan.id === planId))
    .filter(Boolean);
}

function ensureValidActiveTab() {
  const visiblePlans = getVisiblePlans();
  const exists = visiblePlans.some((plan) => plan.id === state.activeTab);
  if (!exists && visiblePlans[0]) {
    state.activeTab = visiblePlans[0].id;
  }
}

function getBillingOptionsForRegion() {
  const current = getCurrentPlan();
  const regionConfig = getCurrentRegionConfig();
  const priceMap = current.price?.[state.activeRegion] || {};

  return regionConfig.billingOptions
    .map((optionId) => {
      const meta = billingOptionMeta[optionId];
      const rawPrice = priceMap[optionId];
      if (!meta || rawPrice == null) return null;

      return {
        ...meta,
        price: Number(rawPrice)
      };
    })
    .filter(Boolean);
}

function ensureValidBillingCycle() {
  const options = getBillingOptionsForRegion();
  const exists = options.some((option) => option.id === state.billingCycle);
  if (!exists && options[0]) {
    state.billingCycle = options[0].id;
  }
}

function getCurrentPriceMap() {
  const current = getCurrentPlan();
  return current.price?.[state.activeRegion] || {};
}

function getCurrentCurrencySymbol() {
  return state.activeRegion === 'international' ? '$' : '¥';
}

function getMonthlyAutoTag(planId) {
  if (state.activeRegion !== 'domestic') return '';
  if (planId === 'ai' || planId === 'music') return '首月 ¥0';
  if (planId === 'rec_normal') return '首月 ¥19';
  return '';
}

function getUnitFromCycle(cycle) {
  if (cycle.includes('yearly')) return '年';
  if (cycle.includes('half_yearly')) return '6月';
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

function formatMoney(num) {
  const value = Number(num);
  if (Number.isInteger(value)) return String(value);
  return value.toFixed(1);
}

function formatDiscountText(discount) {
  return `折扣${Number(discount).toFixed(1)}折`;
}

function getCompareItems() {
  return compareRows;
}

function getComparePlanColumns() {
  const regionConfig = getCurrentRegionConfig();
  return (regionConfig.comparePlanIds || [])
    .map((planId) => getPlanMetaById(planId))
    .filter(Boolean)
    .map((p) => ({
      id: p.id,
      name: p.name,
      theme: p.theme
    }));
}

function getClosestComparePlanId() {
  const columns = getComparePlanColumns();
  if (!columns.length) return '';
  if (columns.some((column) => column.id === state.activeTab)) {
    return state.activeTab;
  }
  return columns[0].id;
}

function centerActiveTabButton(behavior = 'smooth') {
  const container = document.getElementById('tabsContainer');
  if (!container) return;

  const activeBtn = container.querySelector(`button[data-plan-id="${state.activeTab}"]`);
  if (!activeBtn) return;

  suppressTabScrollSync = true;
  activeBtn.scrollIntoView({
    behavior,
    block: 'nearest',
    inline: 'center'
  });

  window.clearTimeout(tabsScrollTimer);
  tabsScrollTimer = window.setTimeout(() => {
    suppressTabScrollSync = false;
  }, TAB_SCROLL_SETTLE_DELAY);
}

function syncComparePanelToCurrentPlan() {
  const wrap = document.getElementById('comparePanelWrap');
  if (!wrap || wrap.classList.contains('hidden')) return;

  const container = wrap.querySelector('[data-compare-scroll]');
  if (!container) return;

  const targetPlanId = getClosestComparePlanId();
  if (!targetPlanId) return;

  const targetColumn = container.querySelector(`[data-compare-col="${targetPlanId}"]`);
  if (!targetColumn) return;

  targetColumn.scrollIntoView({
    behavior: 'smooth',
    block: 'nearest',
    inline: 'center'
  });
}

function renderPlanCardContent() {
  const current = getCurrentPlan();
  const card = document.getElementById('planCard');
  const compareItems = getCompareItems();

  card.className = `relative overflow-hidden rounded-3xl p-6 text-white bg-gradient-to-br shadow-xl ${current.theme}`;

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

function animatePlanCardTransition() {
  const card = document.getElementById('planCard');
  if (!card) {
    renderPlanCardContent();
    return;
  }

  window.clearTimeout(planCardFadeTimer);
  card.classList.add('is-fading');

  planCardFadeTimer = window.setTimeout(() => {
    renderPlanCardContent();
    requestAnimationFrame(() => {
      card.classList.remove('is-fading');
    });
  }, PLAN_CARD_FADE_DURATION / 2);
}

function renderRegionTabs() {
  const container = document.getElementById('regionTabs');
  if (!container) return;

  container.innerHTML = `
    <div class="inline-flex items-center rounded-2xl bg-white/80 border border-slate-200 p-1 shadow-sm backdrop-blur-sm">
      ${Object.values(regionConfigs)
        .map((region) => {
          const isActive = region.id === state.activeRegion;
          const btnClass = isActive
            ? 'px-4 py-2 rounded-xl text-xs font-bold bg-slate-900 text-white shadow-sm'
            : 'px-4 py-2 rounded-xl text-xs font-semibold text-slate-500';

          return `
            <button
              type="button"
              data-region-id="${escapeHtml(region.id)}"
              aria-pressed="${isActive ? 'true' : 'false'}"
              class="${btnClass}"
            >
              ${escapeHtml(region.label)}
            </button>
          `;
        })
        .join('')}
    </div>
  `;
}

function renderTabs() {
  const container = document.getElementById('tabsContainer');

  container.innerHTML = getVisiblePlans()
    .map((plan) => {
      const isActive = plan.id === state.activeTab;
      const btnClass = isActive
        ? 'relative snap-center flex-shrink-0 px-4 py-2 sm:px-5 sm:py-3 rounded-2xl transition-all duration-300 flex flex-col items-center gap-1 border-2 border-indigo-600 bg-white shadow-lg scale-105'
        : 'relative snap-center flex-shrink-0 px-4 py-2 sm:px-5 sm:py-3 rounded-2xl transition-all duration-300 flex flex-col items-center gap-1 border-2 border-transparent bg-white/60 text-slate-400';

      const badgeHtml =
        plan.id === 'super'
          ? `<span class="absolute -top-2 -right-1 bg-yellow-400 text-black text-[9px] px-1.5 py-0.5 rounded-md font-black">推荐</span>`
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
        </button>
      `;
    })
    .join('');

  // 只更新图标，不要重复绑定事件
  if (window.lucide && typeof window.lucide.createIcons === 'function') {
    window.lucide.createIcons();
  }

  centerActiveTabButton('auto');
}

function renderPlanCard() {
  renderPlanCardContent();
}

function renderComparePanel() {
  const wrap = document.getElementById('comparePanelWrap');
  const compareItems = getCompareItems();
  const columns = getComparePlanColumns();
  const activeComparePlanId = getClosestComparePlanId();

  wrap.innerHTML = `
    <div class="bg-white rounded-2xl shadow border border-slate-100 overflow-hidden">
      <div class="px-4 py-3 border-b border-slate-100 flex items-center justify-between">
        <div class="text-slate-900 font-bold text-sm">权益对比表</div>
        <div class="flex items-center gap-1 text-indigo-600 text-xs font-medium">
          对比全部 ${columns.length} 种套餐
          <i data-lucide="chevron-down" class="w-4 h-4"></i>
        </div>
      </div>

      <div class="overflow-x-auto" data-compare-scroll>
        <table class="w-full text-sm text-slate-700">
          <thead>
            <tr class="bg-slate-50">
              <th class="p-3 text-left font-medium text-slate-600 whitespace-nowrap w-40">功能明细</th>
              ${columns
                .map(
                  (c) => `
                <th
                  class="p-3 text-center whitespace-nowrap transition-colors ${
                    c.id === activeComparePlanId ? 'bg-indigo-50' : ''
                  }"
                  data-compare-col="${escapeHtml(c.id)}"
                >
                  <div class="text-xs font-bold text-slate-900">${escapeHtml(c.name)}</div>
                  <div class="mt-1 mx-auto w-8 h-8 rounded-xl bg-gradient-to-br ${c.theme} flex items-center justify-center">
                    <i data-lucide="${escapeHtml(
                      getPlanMetaById(c.id)?.icon || 'star'
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
                    const value = item.values?.[c.id] || '';
                    if (!value) {
                      return `<td class="p-3 text-center text-slate-400 transition-colors ${
                        c.id === activeComparePlanId ? 'bg-indigo-50' : ''
                      }">—</td>`;
                    }

                    const isCheckStyle = value === '支持';
                    const isHighlightStyle = value === '不限' || value === '无限' || value === '无限/月';

                    if (isCheckStyle) {
                      return `
                        <td class="p-3 text-center transition-colors ${c.id === activeComparePlanId ? 'bg-indigo-50' : ''}">
                          <span class="inline-flex items-center justify-center w-8 h-8 rounded-full bg-emerald-50 text-emerald-600">
                            <i data-lucide="check" class="w-4 h-4"></i>
                          </span>
                        </td>
                      `;
                    }

                    return `
                      <td class="p-3 text-center transition-colors ${c.id === activeComparePlanId ? 'bg-indigo-50' : ''}">
                        <span class="inline-flex items-center justify-center rounded-full px-2.5 py-1 text-[11px] font-semibold ${
                          isHighlightStyle
                            ? 'bg-amber-50 text-amber-700'
                            : 'bg-slate-100 text-slate-700'
                        }">
                          ${escapeHtml(value)}
                        </span>
                      </td>
                    `;
                  })
                  .join('');

                return `
                  <tr class="border-t border-slate-100">
                    <td class="p-3 font-medium text-slate-900">${escapeHtml(item.label)}</td>
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

  requestAnimationFrame(() => {
    syncComparePanelToCurrentPlan();
  });
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

function updatePlanSelection(planId, { animateCard = false, centerTab = true } = {}) {
  if (!planId || planId === state.activeTab) return;

  state.activeTab = planId;
  state.compareOpen = false;

  renderTabs();
  if (animateCard) {
    animatePlanCardTransition();
  } else {
    renderPlanCard();
  }
  renderBillingOptions();
  updateBottomBar();

  const wrap = document.getElementById('comparePanelWrap');
  wrap.classList.add('hidden');
  wrap.innerHTML = '';

  if (centerTab) {
    centerActiveTabButton();
  }
}

function getCenteredPlanId() {
  const container = document.getElementById('tabsContainer');
  if (!container) return '';

  const buttons = Array.from(container.querySelectorAll('button[data-plan-id]'));
  if (!buttons.length) return '';

  const containerRect = container.getBoundingClientRect();
  const containerCenter = containerRect.left + containerRect.width / 2;

  let bestButton = buttons[0];
  let bestDistance = Number.POSITIVE_INFINITY;

  for (const button of buttons) {
    const rect = button.getBoundingClientRect();
    const buttonCenter = rect.left + rect.width / 2;
    const distance = Math.abs(buttonCenter - containerCenter);
    if (distance < bestDistance) {
      bestDistance = distance;
      bestButton = button;
    }
  }

  return bestButton.getAttribute('data-plan-id') || '';
}

function renderBillingOptions() {
  const current = getCurrentPlan();
  const container = document.getElementById('billingOptions');
  const currencySymbol = getCurrentCurrencySymbol();

  const monthlyBase = Number(getCurrentPriceMap().monthly || 0);
  const options = getBillingOptionsForRegion();

  container.innerHTML = options
    .map((option) => {
      const isActive = option.id === state.billingCycle;
      const baseClass =
        'relative p-4 rounded-2xl border-2 transition-all duration-300 flex flex-col overflow-hidden';
      const activeClass =
        'border-indigo-600 bg-indigo-50/50 shadow-sm max-h-[260px] flex-1 min-w-0 md:min-w-[170px]';
      const inactiveClass =
        'border-slate-200 bg-white max-h-[120px] flex-1 min-w-0 md:min-w-[170px]';
      const btnClass = `${baseClass} ${isActive ? activeClass : inactiveClass}`;

      const { baselineTotal, savings, discount } = calcDiscount({
        price: option.price,
        monthlyBase,
        multiplier: option.multiplier
      });

      const baselineTotalText = formatMoney(baselineTotal);
      const savingsValue = Math.max(0, Number(savings));

      const savingsText = savingsValue > 0 ? `省${currencySymbol}${formatMoney(savingsValue)}` : '';

      const cornerTag =
        getMonthlyAutoTag(current.id) && option.id === 'monthly_auto'
          ? `<span class="absolute top-3 right-3 bg-red-500 text-white text-[9px] px-1.5 py-0.5 rounded-md font-bold whitespace-nowrap leading-none">${escapeHtml(
              getMonthlyAutoTag(current.id)
            )}</span>`
          : savingsValue > 0
            ? `<span class="absolute top-3 right-3 bg-red-500 text-white text-[9px] px-1.5 py-0.5 rounded-md font-bold whitespace-nowrap leading-none">${escapeHtml(
                `省${currencySymbol}${formatMoney(savingsValue)}`
              )}</span>`
            : '';

      const collapsed = `
        <div class="flex-1">
          <div class="text-xs text-slate-500 mb-1">${escapeHtml(option.label)}</div>
          <div class="text-xl font-black flex items-baseline gap-1 text-slate-800">
            <span class="text-sm font-normal">${escapeHtml(currencySymbol)}</span>
            ${formatMoney(option.price)}
          </div>
          ${
            savingsValue > 0
              ? `<div class="mt-2 flex items-center gap-2 text-[10px]">
            <span class="text-emerald-600 font-bold">${escapeHtml(savingsText)}</span>
          </div>`
              : ''
          }
        </div>
      `;

      const expanded = `
        <div class="flex-1">
          <div class="flex items-start justify-between mb-2 gap-3">
            <div>
              <div class="text-xs text-slate-500 mb-1">${escapeHtml(option.label)}</div>
              <div class="text-xl font-black flex items-baseline gap-1 text-slate-800">
                <span class="text-sm font-normal">${escapeHtml(currencySymbol)}</span>
                ${formatMoney(option.price)}
              </div>
              <div class="text-[10px] text-slate-400 mt-1 line-through">${escapeHtml(currencySymbol)}${escapeHtml(
                baselineTotalText
              )}</div>
            </div>
            ${
              savingsValue > 0
                ? `<div class="text-right min-w-[96px]">
              <div class="text-[11px] font-bold text-emerald-600">${escapeHtml(savingsText)}</div>
            </div>`
                : ''
            }
          </div>

          <div class="mt-2 flex items-center justify-end text-[10px] text-slate-600">
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
  const priceMap = getCurrentPriceMap();
  const price = priceMap[state.billingCycle];
  const unit = getUnitFromCycle(state.billingCycle);
  const currencySymbol = getCurrentCurrencySymbol();

  const bottomPrice = document.getElementById('bottomPrice');
  const bottomUnit = document.getElementById('bottomUnit');
  const buyBtn = document.getElementById('buyBtn');

  bottomPrice.textContent = `${currencySymbol}${formatMoney(price)}`;
  bottomUnit.textContent = `/${unit}`;

  buyBtn.className =
    'px-8 py-4 rounded-full font-bold text-white shadow-xl transform active:scale-95 transition-all border border-white/10';
  buyBtn.style.backgroundImage = buttonGradients[current.id] || buttonGradients.super;
  buyBtn.textContent = '购买';
}

function renderAll() {
  ensureValidActiveTab();
  ensureValidBillingCycle();
  renderRegionTabs();
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
  const regionTabs = document.getElementById('regionTabs');
  regionTabs.addEventListener('click', (e) => {
    const btn = e.target && e.target.closest && e.target.closest('button[data-region-id]');
    if (!btn) return;

    const nextRegion = btn.getAttribute('data-region-id');
    if (!nextRegion || nextRegion === state.activeRegion) return;

    state.activeRegion = nextRegion;
    ensureValidActiveTab();
    ensureValidBillingCycle();
    renderAll();
  });

  const tabsContainer = document.getElementById('tabsContainer');
  tabsContainer.addEventListener('click', (e) => {
    const btn = e.target && e.target.closest && e.target.closest('button[data-plan-id]');
    if (!btn) return;
    updatePlanSelection(btn.getAttribute('data-plan-id'), { animateCard: true, centerTab: true });
  });

  tabsContainer.addEventListener('scroll', () => {
    if (suppressTabScrollSync) return;

    window.clearTimeout(tabsScrollTimer);
    tabsScrollTimer = window.setTimeout(() => {
      const centeredPlanId = getCenteredPlanId();
      if (!centeredPlanId || centeredPlanId === state.activeTab) return;
      updatePlanSelection(centeredPlanId, { animateCard: true, centerTab: false });
    }, TAB_SCROLL_SETTLE_DELAY);
  });

  const billingOptions = document.getElementById('billingOptions');
  billingOptions.addEventListener('click', (e) => {
    const btn = e.target && e.target.closest && e.target.closest('button[data-billing-id]');
    if (!btn) return;
    state.billingCycle = btn.getAttribute('data-billing-id');
    renderBillingOptions();
    updateBottomBar();
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

