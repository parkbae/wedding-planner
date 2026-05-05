const STORAGE_KEY = 'wedding_planner_v4';
const STORAGE_KEY_V3 = 'wedding_planner_v3';
const TAB_COLORS = ['#c9a96e','#c9837a','#7aab8a','#8b9fc9','#c9b87a','#a87ac9','#7ac9b8','#c97a9f'];

// ── 지출 내역 데이터 (윤석/혜원 컬럼 제거) ──
const defaultExpense = [
  { id:'s-wedding', name:'💒 본식', color:'#c9a96e', rows:[
    {id:'r1',  name:'웨딩홀 대관료',       vendor:'더세인트', depositAmt:300, depositDate:'26.04.16', depositMode:'num', balanceAmt:400, balanceDate:'26.11.21', total:700,   pay:'카드', note:'계약금 300만원 카드 → 캐시백 51,000'},
    {id:'r2',  name:'식대 (성인 150명)',    vendor:'더세인트', depositAmt:0,   depositDate:'',          depositMode:'none',balanceAmt:1095,balanceDate:'26.11.21', total:1095,  pay:'카드', note:'73,000 × 150명'},
    {id:'r3',  name:'식대 (소인)',           vendor:'',         depositAmt:0,   depositDate:'',          depositMode:'none',balanceAmt:0,   balanceDate:'',          total:0,     pay:'',     note:'44,000/인 (인원 미정)'},
    {id:'r4',  name:'본식 스냅',             vendor:'',         depositAmt:0,   depositDate:'',          depositMode:'none',balanceAmt:150, balanceDate:'',          total:150,   pay:'',     note:''},
    {id:'r5',  name:'본식 영상',             vendor:'',         depositAmt:0,   depositDate:'',          depositMode:'none',balanceAmt:0,   balanceDate:'',          total:0,     pay:'',     note:'미정'},
    {id:'r6',  name:'아이폰 스냅',           vendor:'',         depositAmt:0,   depositDate:'',          depositMode:'none',balanceAmt:0,   balanceDate:'',          total:0,     pay:'',     note:'미정'},
    {id:'r7',  name:'부케',                  vendor:'',         depositAmt:0,   depositDate:'',          depositMode:'none',balanceAmt:0,   balanceDate:'',          total:0,     pay:'',     note:'미정'},
  ]},
  { id:'s-sdme', name:'📷 스드메', color:'#c9837a', rows:[
    {id:'r10', name:'스튜디오/스냅',         vendor:'셀프진행', depositAmt:0,   depositDate:'',          depositMode:'none',balanceAmt:0,   balanceDate:'',          total:0,     pay:'',     note:'셀프로 진행'},
    {id:'r11', name:'드레스',                vendor:'',         depositAmt:0,   depositDate:'',          depositMode:'none',balanceAmt:100, balanceDate:'',          total:100,   pay:'',     note:''},
    {id:'r12', name:'메이크업 (2인)',         vendor:'',         depositAmt:0,   depositDate:'',          depositMode:'none',balanceAmt:40,  balanceDate:'',          total:40,    pay:'',     note:''},
    {id:'r13', name:'촬영부케',              vendor:'',         depositAmt:0,   depositDate:'',          depositMode:'none',balanceAmt:3,   balanceDate:'',          total:3,     pay:'',     note:''},
  ]},
  { id:'s-dress', name:'👗 드레스', color:'#8b9fc9', rows:[
    {id:'r20', name:'투어/피팅 비용',        vendor:'',         depositAmt:0,   depositDate:'',          depositMode:'none',balanceAmt:0,   balanceDate:'',          total:0,     pay:'',     note:'샵 지정 방문하여 방어 예정'},
    {id:'r21', name:'본식 헬퍼비',           vendor:'',         depositAmt:0,   depositDate:'',          depositMode:'none',balanceAmt:30,  balanceDate:'',          total:30,    pay:'현금', note:''},
    {id:'r22', name:'추가금',                vendor:'',         depositAmt:0,   depositDate:'',          depositMode:'none',balanceAmt:0,   balanceDate:'',          total:0,     pay:'',     note:'미정'},
  ]},
  { id:'s-suit', name:'🤵 예복', color:'#7ac9b8', rows:[
    {id:'r30', name:'신랑 예복',             vendor:'',         depositAmt:0,   depositDate:'',          depositMode:'none',balanceAmt:50,  balanceDate:'',          total:50,    pay:'',     note:''},
  ]},
  { id:'s-hanbok', name:'👘 혼주', color:'#c9b87a', rows:[
    {id:'r40', name:'혼주 한복 (2인)',        vendor:'',         depositAmt:0,   depositDate:'',          depositMode:'none',balanceAmt:76,  balanceDate:'',          total:76,    pay:'',     note:'2인 × 38만원'},
    {id:'r41', name:'혼주 메이크업 (3인)',    vendor:'',         depositAmt:0,   depositDate:'',          depositMode:'none',balanceAmt:53,  balanceDate:'',          total:53,    pay:'',     note:'2인 × 17.5 + 1인 × 7.5 (뒷가발 5.5 별도)'},
  ]},
  { id:'s-gift', name:'💍 예물', color:'#a87ac9', rows:[
    {id:'r50', name:'웨딩링',                vendor:'',         depositAmt:0,   depositDate:'',          depositMode:'none',balanceAmt:0,   balanceDate:'',          total:0,     pay:'',     note:'미정'},
    {id:'r51', name:'시계 / 주얼리',         vendor:'',         depositAmt:0,   depositDate:'',          depositMode:'none',balanceAmt:0,   balanceDate:'',          total:0,     pay:'',     note:'미정'},
  ]},
  { id:'s-meeting', name:'🍽 상견례', color:'#c97a9f', rows:[
    {id:'r60', name:'부모님 인사',           vendor:'',         depositAmt:0,   depositDate:'',          depositMode:'none',balanceAmt:70,  balanceDate:'',          total:70,    pay:'',     note:''},
    {id:'r61', name:'상견례',                vendor:'',         depositAmt:0,   depositDate:'',          depositMode:'none',balanceAmt:90,  balanceDate:'',          total:90,    pay:'',     note:''},
  ]},
  { id:'s-etc', name:'🎊 그 외', color:'#7aab8a', rows:[
    {id:'r70', name:'사회자',                vendor:'웨딩홀 전문사회자', depositAmt:0, depositDate:'',   depositMode:'none',balanceAmt:0,   balanceDate:'',          total:0,     pay:'',     note:'웨딩홀 전문 사회자'},
    {id:'r71', name:'축가',                  vendor:'',         depositAmt:0,   depositDate:'',          depositMode:'none',balanceAmt:30,  balanceDate:'',          total:30,    pay:'현금', note:''},
    {id:'r72', name:'축의대',                vendor:'',         depositAmt:0,   depositDate:'',          depositMode:'none',balanceAmt:80,  balanceDate:'',          total:80,    pay:'',     note:'4인 × 20만원'},
    {id:'r73', name:'웨딩카',                vendor:'',         depositAmt:0,   depositDate:'',          depositMode:'none',balanceAmt:0,   balanceDate:'',          total:0,     pay:'',     note:'미정'},
    {id:'r74', name:'식전영상',              vendor:'',         depositAmt:0,   depositDate:'',          depositMode:'none',balanceAmt:5,   balanceDate:'',          total:5,     pay:'',     note:''},
    {id:'r75', name:'모바일 청첩장',          vendor:'',         depositAmt:0,   depositDate:'',          depositMode:'none',balanceAmt:10,  balanceDate:'',          total:10,    pay:'',     note:''},
    {id:'r76', name:'청첩장 제작',           vendor:'',         depositAmt:0,   depositDate:'',          depositMode:'none',balanceAmt:10,  balanceDate:'',          total:10,    pay:'',     note:''},
    {id:'r77', name:'청첩장 모임',           vendor:'',         depositAmt:0,   depositDate:'',          depositMode:'none',balanceAmt:900, balanceDate:'',          total:900,   pay:'',     note:''},
    {id:'r78', name:'꾸밈비',                vendor:'',         depositAmt:0,   depositDate:'',          depositMode:'none',balanceAmt:90,  balanceDate:'',          total:90,    pay:'',     note:'3인 × 30만원'},
    {id:'r79', name:'소개비',                vendor:'',         depositAmt:0,   depositDate:'',          depositMode:'none',balanceAmt:60,  balanceDate:'',          total:60,    pay:'',     note:'2인 × 30만원'},
  ]},
  { id:'s-honeymoon', name:'✈️ 신혼여행', color:'#6ab5c9', rows:[
    {id:'r80', name:'신혼여행지',            vendor:'',         depositAmt:0,   depositDate:'',          depositMode:'none',balanceAmt:0,   balanceDate:'',          total:0,     pay:'',     note:'미정'},
    {id:'r81', name:'비행기 티켓',           vendor:'',         depositAmt:0,   depositDate:'',          depositMode:'none',balanceAmt:0,   balanceDate:'',          total:0,     pay:'',     note:'미정'},
    {id:'r82', name:'숙박',                  vendor:'',         depositAmt:0,   depositDate:'',          depositMode:'none',balanceAmt:0,   balanceDate:'',          total:0,     pay:'',     note:'미정'},
    {id:'r83', name:'신혼여행 환전',         vendor:'',         depositAmt:0,   depositDate:'',          depositMode:'none',balanceAmt:0,   balanceDate:'',          total:0,     pay:'',     note:'미정'},
  ]},
  { id:'s-house', name:'🏠 신혼집', color:'#8b9fc9', rows:[
    {id:'r90', name:'신혼집 보증금/매매',    vendor:'',         depositAmt:0,   depositDate:'',          depositMode:'none',balanceAmt:0,   balanceDate:'',          total:0,     pay:'',     note:'미정'},
    {id:'r91', name:'가전',                  vendor:'',         depositAmt:0,   depositDate:'',          depositMode:'none',balanceAmt:0,   balanceDate:'',          total:0,     pay:'',     note:'미정'},
    {id:'r92', name:'가구',                  vendor:'',         depositAmt:0,   depositDate:'',          depositMode:'none',balanceAmt:0,   balanceDate:'',          total:0,     pay:'',     note:'미정'},
  ]},
];

const defaultBudgetTabs = [
  { id:'b-wedding', name:'💒 예식', tip:'예식장·스드메 추가금 별도. 총액 10% 예비비 필수!', limitPct:25,
    items:[{id:'b1',name:'웨딩홀 대관료+식대',val:1795},{id:'b2',name:'스드메',val:143},{id:'b3',name:'본식 스냅·영상',val:150},{id:'b4',name:'한복·예복·혼주',val:129},{id:'b5',name:'예비비(10%)',val:0}]},
  { id:'b-etc', name:'🎊 부대비용', tip:'청첩장 모임 등 부대비용 미리 설정하세요.', limitPct:10,
    items:[{id:'b6',name:'청첩장 모임',val:900},{id:'b7',name:'예물·예단',val:0},{id:'b8',name:'상견례',val:160},{id:'b9',name:'그외(축가·축의대 등)',val:185}]},
  { id:'b-honeymoon', name:'✈️ 신혼여행', tip:'항공권은 4~6개월 전 예약 시 30~40% 절감!', limitPct:5,
    items:[{id:'b10',name:'항공+숙박',val:0},{id:'b11',name:'현지경비+환전',val:0}]},
  { id:'b-house', name:'🏠 신혼집', tip:'집 예산 10 : 결혼식 1~2 비율이 건강한 재정 구조!', limitPct:60,
    items:[{id:'b12',name:'보증금/매매',val:0},{id:'b13',name:'가전',val:0},{id:'b14',name:'가구',val:0},{id:'b15',name:'이사비',val:0}]},
];

let totalBudget = 0;
let expenseSections = JSON.parse(JSON.stringify(defaultExpense));
let budgetTabs = JSON.parse(JSON.stringify(defaultBudgetTabs));
let activeBudgetTab = budgetTabs[0].id;
let rowCounter = 9000;
let itemCounter = 5000;

// 투두 탭 키 목록 (이동 기능을 위해 순서 유지)
const TODO_KEYS = ['d365','d300','d200','d100','d60','dday','after'];
const TODO_LABELS = {
  d365:'D-365~300 기초공사',
  d300:'D-300~200 핵심계약',
  d200:'D-200~100 집·여행',
  d100:'D-100~60 마무리',
  d60:'D-60~D-1 마지막 점검',
  dday:'🎊 D-Day 당일',
  after:'결혼 후 처리'
};

const defaultTodoData = {
  d365:{label:'D-365~300 기초공사',items:[
    {text:'재정 스냅샷 작성 (총 예산·대출 한도 확정)',done:false},
    {text:'길일 조사 + 양가 날짜 후보 3개 선정',done:false},
    {text:'웨딩홀 투어 2~3곳 예약 (계약 없이 투어만!)',done:false},
    {text:'스드메 업체 3곳 포트폴리오·견적 비교',done:false},
    {text:'웨딩플래너 vs 셀프 방식 결정',done:false},
  ]},
  d300:{label:'D-300~200 핵심계약',items:[
    {text:'예식장 최종 결정 + 계약 (공정위 표준계약서!)',done:true},
    {text:'스드메 계약 (추가금 없음 특약 기재 필수!)',done:false},
    {text:'본식 스냅·영상 작가 선정',done:false},
  ]},
  d200:{label:'D-200~100 집·여행',items:[
    {text:'신혼집 임장 10~15곳 비교',done:false},
    {text:'버팀목 전세대출 한도·금리 사전 조회',done:false},
    {text:'신혼집 계약 (등기부등본 확인 필수!)',done:false},
    {text:'잔금 당일 전입신고 + 확정일자',done:false},
    {text:'신혼여행 항공권 예약 (4~6개월 전 30~40% 절감!)',done:false},
    {text:'혼수 가전·가구 쇼핑 시작',done:false},
  ]},
  d100:{label:'D-100~60 마무리',items:[
    {text:'한복·예복 주문',done:false},
    {text:'예물·예단 양가 합의 (텍스트로 남기기!)',done:false},
    {text:'청첩장 제작 주문',done:false},
    {text:'상견례 진행',done:false},
  ]},
  d60:{label:'D-60~D-1 마지막 점검',items:[
    {text:'D-60 청첩장 발송',done:false},
    {text:'하객 최종 리스트 확정',done:false},
    {text:'웨딩 촬영 진행',done:false},
    {text:'D-14 보증인원 식장 통보',done:false},
    {text:'사회자·축가자 최종 확인',done:false},
    {text:'현금봉투 준비 (헬퍼비·수모비 등)',done:false},
    {text:'전날 음주 금지 🙏🏻',done:false},
  ]},
  dday:{label:'🎊 D-Day 당일',items:[
    {text:'신부 헤어·메이크업 예약시간 확인',done:false},
    {text:'드레스·예복 준비물 챙기기',done:false},
    {text:'부케 수령 확인',done:false},
    {text:'혼주 한복 및 메이크업 시간 확인',done:false},
    {text:'현장 헬퍼 배치 확인',done:false},
    {text:'축가·사회자 최종 연락',done:false},
    {text:'축의금 봉투·방명록 준비 확인',done:false},
    {text:'웨딩홀 담당자 도착 확인',done:false},
    {text:'스냅·영상 작가 도착 확인',done:false},
    {text:'신부 대기실 꽃 장식 확인',done:false},
    {text:'식순표·프로그램 최종 확인',done:false},
    {text:'감사 인사 & 기념사진 촬영',done:false},
  ]},
  after:{label:'결혼 후 처리',items:[
    {text:'혼인신고 (주민센터 or 인터넷)',done:false},
    {text:'지자체 결혼장려금 신청 (30일 내 소멸!)',done:false},
    {text:'생애최초 취득세 감면 신청 (60일 내!)',done:false},
    {text:'전세보증보험 가입 (잔금 후 1개월 내)',done:false},
    {text:'혼인세액공제 연말정산 신청',done:false},
    {text:'건강보험 피부양자 등록',done:false},
    {text:'신분증·금융기관 주소 변경',done:false},
  ]}
};
let todoData = JSON.parse(JSON.stringify(defaultTodoData));

// ═══════════════════════════════════════════════
// 🏠 부동산 탭 데이터 & 함수
// ═══════════════════════════════════════════════
let reProperties = []; // 매물 배열
let reEditId = null;
let reActiveTypes = new Set(); // 모달에서 선택된 거래 유형
let reFilter = 'all';

const RE_STATUS_COLORS = {
  '검토중': {bg:'rgba(139,159,201,0.15)',color:'#4a6da8'},
  '임장완료': {bg:'rgba(122,171,138,0.15)',color:'#4a8a5e'},
  '재방문예정': {bg:'rgba(201,169,110,0.15)',color:'#8a6a2e'},
  '관심없음': {bg:'rgba(180,180,180,0.15)',color:'#999'},
  '계약진행': {bg:'rgba(201,131,122,0.2)',color:'#a85e56'},
};

function renderReGrid() {
  const grid = document.getElementById('re-grid');
  const empty = document.getElementById('re-empty');
  if (!grid) return;

  // 예산 연동 업데이트
  const tb = document.getElementById('re-total-budget');
  const hb = document.getElementById('re-house-budget');
  if (tb) tb.textContent = fmt(totalBudget) + ' 만원';
  if (hb) {
    const houseBudget = budgetTabs.find(t => t.id === 'b-house');
    const houseAmt = houseBudget ? houseBudget.items.reduce((s,i)=>s+(i.val||0),0) : 0;
    hb.textContent = fmt(houseAmt) + ' 만원';
  }

  // 필터링
  let filtered = reProperties.filter(p => {
    if (reFilter === 'all') return true;
    if (reFilter === 'fav') return p.fav;
    return p.types && p.types.includes(reFilter);
  });

  // 카운트 업데이트
  const cd = document.getElementById('re-count-display');
  const fc = document.getElementById('re-fav-count');
  if (cd) cd.textContent = reProperties.length + '개';
  if (fc) fc.textContent = reProperties.filter(p=>p.fav).length + '개';

  // 기존 카드 제거 (re-empty 제외)
  Array.from(grid.children).forEach(el => { if (el.id !== 're-empty') el.remove(); });

  if (filtered.length === 0) {
    if (empty) empty.style.display = 'block';
    return;
  }
  if (empty) empty.style.display = 'none';

  filtered.forEach(p => {
    const card = document.createElement('div');
    card.className = 're-card' + (p.fav ? ' re-fav' : '');
    card.id = 'recard-' + p.id;

    const typeBadges = (p.types||[]).map(t => {
      const map = {monthly:'월세 rtb-monthly', jeonse:'전세 rtb-jeonse', buy:'매매 rtb-buy'};
      const [label, cls] = (map[t]||'').split(' ');
      return label ? `<span class="re-type-badge ${cls}">${label}</span>` : '';
    }).join('');

    const naverUrl = 'https://map.naver.com/v5/search/' + encodeURIComponent(p.location||p.name||'');
    const kakaoUrl = 'https://map.kakao.com/?q=' + encodeURIComponent(p.location||p.name||'');

    // 가격 카드 3개
    const priceMonthly = (p.types||[]).includes('monthly')
      ? `<div class="re-price-item"><div class="re-price-label">월세</div><div class="re-price-val">${p.monthlyDeposit ? fmt(p.monthlyDeposit)+'만' : '<span class="empty">-</span>'}</div><div class="re-price-deposit">${p.monthlyRent ? '월 '+fmt(p.monthlyRent)+'만원' : ''}</div></div>` : '';
    const priceJeonse = (p.types||[]).includes('jeonse')
      ? `<div class="re-price-item"><div class="re-price-label">전세</div><div class="re-price-val">${p.jeonsePrice ? fmt(p.jeonsePrice)+'만' : '<span class="empty">-</span>'}</div><div class="re-price-deposit"></div></div>` : '';
    const priceBuy = (p.types||[]).includes('buy')
      ? `<div class="re-price-item"><div class="re-price-label">매매</div><div class="re-price-val">${p.buyPrice ? fmt(p.buyPrice)+'만' : '<span class="empty">-</span>'}</div><div class="re-price-deposit"></div></div>` : '';
    const priceEmpty = (!priceMonthly && !priceJeonse && !priceBuy)
      ? `<div class="re-price-item"><div class="re-price-label">가격</div><div class="re-price-val empty">미입력</div></div>` : '';

    const statusStyle = RE_STATUS_COLORS[p.status] || RE_STATUS_COLORS['검토중'];

    card.innerHTML = `
      <div class="re-card-top">
        <div class="re-card-name-row">
          <div class="re-card-name">${esc(p.name||'이름 없음')}</div>
          <button class="re-fav-btn${p.fav?' on':''}" onclick="toggleReFav('${p.id}')" title="관심 매물">⭐</button>
          <button class="re-del-btn-top" onclick="deleteReProperty('${p.id}')" title="삭제">×</button>
        </div>
        <div class="re-type-badges">${typeBadges||'<span style="font-size:11px;color:var(--text-l)">유형 미설정</span>'}</div>
        <div class="re-location-row">
          <span style="font-size:14px;">📍</span>
          <span>${esc(p.location||'위치 미입력')}</span>
          ${p.location ? `<a href="${naverUrl}" target="_blank">N지도</a><a href="${kakaoUrl}" target="_blank">K지도</a>` : ''}
        </div>
      </div>
      <div class="re-card-body">
        <div class="re-price-grid" style="grid-template-columns:repeat(${[priceMonthly,priceJeonse,priceBuy].filter(Boolean).length||1},1fr);">
          ${priceMonthly}${priceJeonse}${priceBuy}${priceEmpty}
        </div>
        <div class="re-meta-row">
          ${p.area ? `<span class="re-meta-item">📐 <span class="val">${p.area}㎡</span></span>` : ''}
          ${p.floor ? `<span class="re-meta-item">🏢 <span class="val">${esc(p.floor)}</span></span>` : ''}
          ${p.movein ? `<span class="re-meta-item">📅 <span class="val">${esc(p.movein)}</span></span>` : ''}
        </div>
        ${p.link ? `<div class="re-link-row"><a href="${esc(p.link)}" target="_blank">🔗 ${esc(p.link)}</a></div>` : ''}
        ${p.memo ? `<div class="re-memo-box">${esc(p.memo)}</div>` : ''}
      </div>
      <div class="re-card-footer">
        <span style="font-size:11px;font-weight:600;padding:3px 10px;border-radius:99px;background:${statusStyle.bg};color:${statusStyle.color};">${p.status||'검토중'}</span>
        <button class="re-edit-btn" onclick="editReProperty('${p.id}')">✏️ 수정</button>
      </div>`;
    grid.appendChild(card);
  });
}

function reFilterBy(type, btn) {
  reFilter = type;
  document.querySelectorAll('.re-filter-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  renderReGrid();
}

function openReModal(editId) {
  reEditId = editId || null;
  reActiveTypes = new Set();
  // 폼 초기화
  ['re-name','re-location','re-monthly-deposit','re-monthly-rent','re-jeonse-price','re-buy-price','re-area','re-floor','re-movein','re-link','re-memo'].forEach(id => {
    const el = document.getElementById(id); if (el) el.value = '';
  });
  document.getElementById('re-status').value = '검토중';
  ['monthly','jeonse','buy'].forEach(t => {
    const btn = document.getElementById('rtt-'+t);
    if (btn) { btn.className = 're-type-toggle'; }
    const sec = document.getElementById('re-'+t+'-section');
    if (sec) sec.style.display = 'none';
  });
  document.getElementById('re-modal-title').textContent = editId ? '🏠 매물 수정' : '🏠 매물 등록';

  if (editId) {
    const p = reProperties.find(r => r.id === editId);
    if (p) {
      document.getElementById('re-name').value = p.name||'';
      document.getElementById('re-location').value = p.location||'';
      document.getElementById('re-area').value = p.area||'';
      document.getElementById('re-floor').value = p.floor||'';
      document.getElementById('re-movein').value = p.movein||'';
      document.getElementById('re-link').value = p.link||'';
      document.getElementById('re-memo').value = p.memo||'';
      document.getElementById('re-status').value = p.status||'검토중';
      (p.types||[]).forEach(t => {
        reActiveTypes.add(t);
        const btn = document.getElementById('rtt-'+t);
        if (btn) btn.className = 're-type-toggle on-'+t;
        const sec = document.getElementById('re-'+t+'-section');
        if (sec) sec.style.display = 'block';
      });
      if (p.monthlyDeposit) document.getElementById('re-monthly-deposit').value = p.monthlyDeposit;
      if (p.monthlyRent)    document.getElementById('re-monthly-rent').value = p.monthlyRent;
      if (p.jeonsePrice)    document.getElementById('re-jeonse-price').value = p.jeonsePrice;
      if (p.buyPrice)       document.getElementById('re-buy-price').value = p.buyPrice;
    }
  }
  document.getElementById('re-modal-overlay').classList.add('open');
}

function closeReModal() {
  document.getElementById('re-modal-overlay').classList.remove('open');
}

function toggleReType(type, btn) {
  if (reActiveTypes.has(type)) {
    reActiveTypes.delete(type);
    btn.className = 're-type-toggle';
    const sec = document.getElementById('re-'+type+'-section');
    if (sec) sec.style.display = 'none';
  } else {
    reActiveTypes.add(type);
    btn.className = 're-type-toggle on-'+type;
    const sec = document.getElementById('re-'+type+'-section');
    if (sec) sec.style.display = 'block';
  }
}

function saveReProperty() {
  const name = document.getElementById('re-name').value.trim();
  if (!name) { showToast('부동산명을 입력해주세요'); return; }
  const prop = {
    id: reEditId || ('re' + Date.now()),
    name,
    location: document.getElementById('re-location').value.trim(),
    types: Array.from(reActiveTypes),
    monthlyDeposit: parseFloat(document.getElementById('re-monthly-deposit').value)||0,
    monthlyRent: parseFloat(document.getElementById('re-monthly-rent').value)||0,
    jeonsePrice: parseFloat(document.getElementById('re-jeonse-price').value)||0,
    buyPrice: parseFloat(document.getElementById('re-buy-price').value)||0,
    area: parseFloat(document.getElementById('re-area').value)||0,
    floor: document.getElementById('re-floor').value.trim(),
    movein: document.getElementById('re-movein').value.trim(),
    link: document.getElementById('re-link').value.trim(),
    memo: document.getElementById('re-memo').value.trim(),
    status: document.getElementById('re-status').value,
    fav: reEditId ? (reProperties.find(r=>r.id===reEditId)?.fav || false) : false,
    addedAt: reEditId ? (reProperties.find(r=>r.id===reEditId)?.addedAt || new Date().toISOString()) : new Date().toISOString(),
  };
  if (reEditId) {
    const idx = reProperties.findIndex(r => r.id === reEditId);
    if (idx >= 0) reProperties[idx] = prop;
  } else {
    reProperties.push(prop);
  }
  closeReModal();
  renderReGrid();
  showToast(reEditId ? '✅ 매물 정보가 수정됐어요!' : '🏠 매물이 등록됐어요!');
  saveAll();
}

function editReProperty(id) { openReModal(id); }

function deleteReProperty(id) {
  if (!confirm('이 매물을 삭제할까요?')) return;
  reProperties = reProperties.filter(p => p.id !== id);
  renderReGrid();
  showToast('삭제됐어요');
  saveAll();
}

function toggleReFav(id) {
  const p = reProperties.find(r => r.id === id);
  if (p) { p.fav = !p.fav; renderReGrid(); saveAll(); }
}

function openMapSearch() {
  const loc = document.getElementById('re-location').value.trim() || document.getElementById('re-name').value.trim();
  if (!loc) { showToast('주소를 먼저 입력해주세요'); return; }
  window.open('https://map.naver.com/v5/search/' + encodeURIComponent(loc), '_blank');
}

function openNaverMap() {
  const loc = document.getElementById('re-location').value.trim() || document.getElementById('re-name').value.trim();
  window.open('https://map.naver.com/v5/search/' + encodeURIComponent(loc||'서울'), '_blank');
}

function openKakaoMap() {
  const loc = document.getElementById('re-location').value.trim() || document.getElementById('re-name').value.trim();
  window.open('https://map.kakao.com/?q=' + encodeURIComponent(loc||'서울'), '_blank');
}

// 모달 오버레이 외부 클릭 닫기
document.addEventListener('DOMContentLoaded', () => {
  const overlay = document.getElementById('re-modal-overlay');
  if (overlay) overlay.addEventListener('click', e => { if (e.target === overlay) closeReModal(); });
});


// ── 초기화 ──
function init() {
  const loaded = loadAll();
  if (!loaded) {
    renderExpense();
    calcTotal();
    renderBudgetTabs();
  }
  renderTodo();
  // totalBudget 확정 후 요약탭 카드 재렌더
  setTimeout(() => {
    renderGuidelineCards();
    budgetTabs.forEach(t => updateLimitStatusBar(t.id));
  }, 0);
}

// ── 메인 탭 전환 ──
function switchMain(id) {
  document.querySelectorAll('.main-tab').forEach(t => t.classList.remove('active'));
  document.querySelectorAll('.main-panel').forEach(p => p.classList.remove('active'));
  document.getElementById(id).classList.add('active');
  document.querySelectorAll('.main-tab').forEach(t => {
    if (t.getAttribute('data-panel') === id) t.classList.add('active');
  });
  // 현재 탭 추적 + 메모 가시성 업데이트
  currentMainTab = id;
  updateMemoDisplay();
  if (id === 'tab-summary') { updateSummary(); renderGuidelineCards(); }
  if (id === 'tab-realestate') { renderReGrid(); }
}

// ── 지출 내역 렌더 (윤석/혜원 컬럼 없음) ──
function renderExpense() {
  const container = document.getElementById('expense-tables');
  container.innerHTML = '';
  expenseSections.forEach(sec => {
    const secTotal = sec.rows.reduce((s,r)=>s+(r.total||0),0);
    const div = document.createElement('div');
    div.className = 'exp-section';
    div.id = 'sec-' + sec.id;
    div.innerHTML = `
      <div class="exp-section-title" style="border-color:${sec.color}">
        <span>${sec.name}</span>
        <div style="display:flex;align-items:center;gap:12px;">
          <span class="sec-total" id="sectotal-${sec.id}">${fmt(secTotal)} 만원</span>
          <button onclick="addRow('${sec.id}')" class="row-add-btn" style="margin:0;padding:3px 10px;">+ 항목추가</button>
        </div>
      </div>
      <table class="exp-table">
        <thead>
          <tr>
            <th style="width:28px;"></th>
            <th>항목</th>
            <th>업체명</th>
            <th class="num">계약금</th>
            <th>지출일</th>
            <th class="num">잔금</th>
            <th>지출예정일</th>
            <th class="num">총금액 ✏️</th>
            <th>결제수단</th>
            <th>비고</th>
          </tr>
        </thead>
        <tbody id="tbody-${sec.id}"></tbody>
      </table>`;
    container.appendChild(div);
    sec.rows.forEach(row => renderRow(sec.id, row));
    renderSubtotal(sec.id);
  });
  updatePaymentBar();
}

function renderRow(secId, row) {
  const tbody = document.getElementById('tbody-' + secId);
  if (!tbody) return;
  // depositMode: 'none'=계약금 없음, 'num'=금액 입력
  if (row.depositMode === undefined) {
    row.depositMode = (row.depositAmt && row.depositAmt > 0) ? 'num' : 'none';
  }
  const isNone = row.depositMode === 'none';
  const tr = document.createElement('tr');
  tr.id = 'row-' + row.id;
  tr.innerHTML = `
    <td><button class="row-del-btn" onclick="delRow('${secId}','${row.id}')">×</button></td>
    <td><input class="editable" value="${esc(row.name)}" onchange="updateRow('${secId}','${row.id}','name',this.value)"></td>
    <td><input class="editable" value="${esc(row.vendor)}" onchange="updateRow('${secId}','${row.id}','vendor',this.value)"></td>
    <td class="num">
      <div class="deposit-cell">
        <select class="deposit-mode" id="dmode-${row.id}" onchange="updateDepositMode('${secId}','${row.id}',this.value)">
          <option value="none" ${isNone?'selected':''}>없음</option>
          <option value="num" ${!isNone?'selected':''}>금액</option>
        </select>
        <input class="deposit-input" type="number" id="deposit-input-${row.id}"
          value="${isNone ? '' : (row.depositAmt||'')}"
          placeholder="0"
          ${isNone ? 'disabled style="display:none"' : ''}
          onchange="updateRowNum('${secId}','${row.id}','depositAmt',this.value)">
      </div>
    </td>
    <td><input class="date-edit" value="${esc(row.depositDate)}" placeholder="yy.mm.dd" onchange="updateRow('${secId}','${row.id}','depositDate',this.value)"></td>
    <td class="num"><input class="num-edit" type="number" id="balance-input-${row.id}" value="${row.balanceAmt||''}" placeholder="0" onchange="updateRowNum('${secId}','${row.id}','balanceAmt',this.value)"></td>
    <td><input class="date-edit" value="${esc(row.balanceDate)}" placeholder="yy.mm.dd" onchange="updateRow('${secId}','${row.id}','balanceDate',this.value)"></td>
    <td class="num"><input class="total-edit" type="number" id="rowtotal-input-${row.id}" value="${row.total||''}" placeholder="0" onchange="updateRowTotal('${secId}','${row.id}',this.value)" title="총금액 직접 입력 가능"></td>
    <td>
      <select class="select-edit" onchange="updateRow('${secId}','${row.id}','pay',this.value)">
        <option value="" ${!row.pay?'selected':''}>-</option>
        <option value="카드" ${row.pay==='카드'?'selected':''}>카드</option>
        <option value="현금" ${row.pay==='현금'?'selected':''}>현금</option>
        <option value="상품권" ${row.pay==='상품권'?'selected':''}>상품권</option>
        <option value="계좌이체" ${row.pay==='계좌이체'?'selected':''}>계좌이체</option>
      </select>
    </td>
    <td class="note-cell"><input class="editable" value="${esc(row.note)}" onchange="updateRow('${secId}','${row.id}','note',this.value)"></td>`;
  tbody.appendChild(tr);
}

// 계약금 모드 전환 (없음 ↔ 금액)
function updateDepositMode(secId, rowId, mode) {
  const sec = expenseSections.find(s=>s.id===secId);
  const row = sec?.rows.find(r=>r.id===rowId);
  if (!row) return;
  row.depositMode = mode;
  const inputEl = document.getElementById('deposit-input-' + rowId);
  if (mode === 'none') {
    row.depositAmt = 0;
    if (inputEl) { inputEl.disabled = true; inputEl.style.display = 'none'; inputEl.value = ''; }
    // 계약금 없음 모드: total은 독립 유지 (잔금은 그대로)
  } else {
    if (inputEl) { inputEl.disabled = false; inputEl.style.display = ''; inputEl.focus(); }
  }
  recalcRow(secId, rowId);
}

// 핵심 재계산 함수: 계약금 모드에 따라 분기
// [계약금 없음] total, balanceAmt 완전 독립
// [계약금 있음] total = depositAmt + balanceAmt (양방향)
function recalcRow(secId, rowId, changedField) {
  const sec = expenseSections.find(s=>s.id===secId);
  const row = sec?.rows.find(r=>r.id===rowId);
  if (!row) return;

  if (row.depositMode === 'none') {
    // 계약금 없음: total과 balanceAmt 완전 독립 — 아무것도 연동 안 함
    // (changedField가 total이든 balance든 서로 영향 없음)
  } else {
    // 계약금 있음: 3가지 연동 케이스
    if (changedField === 'depositAmt' || changedField === 'balanceAmt') {
      // 계약금 or 잔금 변경 → total = deposit + balance
      row.total = (row.depositAmt||0) + (row.balanceAmt||0);
      const totalEl = document.getElementById('rowtotal-input-' + rowId);
      if (totalEl && document.activeElement !== totalEl) totalEl.value = row.total || '';
    } else if (changedField === 'total') {
      // 총금액 변경 → 잔금 = total - deposit (음수 방지)
      row.balanceAmt = Math.max(0, (row.total||0) - (row.depositAmt||0));
      const balEl = document.getElementById('balance-input-' + rowId);
      if (balEl && document.activeElement !== balEl) balEl.value = row.balanceAmt || '';
    }
  }

  renderSubtotal(secId);
  updatePaymentBar();
  updateSummary();
}

// 계약금/잔금 수정 이벤트
function updateRowNum(secId, rowId, field, val) {
  const sec = expenseSections.find(s=>s.id===secId);
  const row = sec?.rows.find(r=>r.id===rowId);
  if (!row) return;
  row[field] = parseFloat(val)||0;
  recalcRow(secId, rowId, field);
}

// 총금액 직접 수정 이벤트
function updateRowTotal(secId, rowId, val) {
  const sec = expenseSections.find(s=>s.id===secId);
  const row = sec?.rows.find(r=>r.id===rowId);
  if (!row) return;
  row.total = parseFloat(val)||0;
  recalcRow(secId, rowId, 'total');
}

function renderSubtotal(secId) {
  const sec = expenseSections.find(s=>s.id===secId);
  if (!sec) return;
  const tbody = document.getElementById('tbody-' + secId);
  if (!tbody) return;
  const old = tbody.querySelector('.subtotal-row');
  if (old) old.remove();
  const total = sec.rows.reduce((s,r)=>s+(r.total||0),0);
  const tr = document.createElement('tr');
  tr.className = 'subtotal subtotal-row';
  tr.innerHTML = `
    <td></td><td colspan="2" style="font-size:11px;color:var(--text-l);">소계</td>
    <td class="num"></td><td></td><td class="num"></td><td></td>
    <td class="num">${fmt(total)} 만원</td>
    <td colspan="2"></td>`;
  tbody.appendChild(tr);
  const el = document.getElementById('sectotal-' + secId);
  if (el) el.textContent = fmt(total) + ' 만원';
}

function updateRow(secId, rowId, field, val) {
  const sec = expenseSections.find(s=>s.id===secId);
  const row = sec?.rows.find(r=>r.id===rowId);
  if (!row) return;
  row[field] = val;
}


function addRow(secId) {
  const sec = expenseSections.find(s=>s.id===secId);
  if (!sec) return;
  const row = {id:'r'+rowCounter++, name:'새 항목', vendor:'', depositAmt:0, depositDate:'', balanceAmt:0, balanceDate:'', total:0, pay:'', note:'', depositMode:'none'};
  sec.rows.push(row);
  const tbody = document.getElementById('tbody-' + secId);
  const old = tbody.querySelector('.subtotal-row');
  if (old) old.remove();
  renderRow(secId, row);
  renderSubtotal(secId);
  updatePaymentBar();
  updateSummary();
}

function delRow(secId, rowId) {
  const sec = expenseSections.find(s=>s.id===secId);
  if (!sec) return;
  sec.rows = sec.rows.filter(r=>r.id!==rowId);
  const el = document.getElementById('row-' + rowId);
  if (el) el.remove();
  renderSubtotal(secId);
  updatePaymentBar();
  updateSummary();
}

// 지출 현황 바 (윤석/혜원 제거)
function updatePaymentBar() {
  const allRows = expenseSections.flatMap(s=>s.rows);
  const paid = allRows.reduce((s,r)=>s+(r.depositAmt||0),0);
  const planned = allRows.reduce((s,r)=>s+(r.balanceAmt||0),0);
  const total = allRows.reduce((s,r)=>s+(r.total||0),0);
  const bar = document.getElementById('payment-status-bar');
  bar.innerHTML = `
    <div class="ps-item"><div class="ps-label">총 예상 지출</div><div class="ps-val">${fmt(total)} 만원</div></div>
    <div class="ps-item"><div class="ps-label">계약금 (지출 완료)</div><div class="ps-val" style="color:var(--success)">${fmt(paid)} 만원</div></div>
    <div class="ps-item"><div class="ps-label">잔금 (지출 예정)</div><div class="ps-val" style="color:var(--rose)">${fmt(planned)} 만원</div></div>`;
  const badge = document.getElementById('exp-badge');
  if (badge) {
    const pct = total > 0 ? Math.round(paid/total*100) : 0;
    badge.textContent = `계약금 ${pct}% 납부`;
    badge.className = 'badge ' + (pct > 0 ? 'badge-ok' : 'badge-warn');
  }
}

// ── 예산 플래너 ──
function renderBudgetTabs() {
  const tabsEl = document.getElementById('cost-tabs');
  const panelsEl = document.getElementById('cost-panels');
  tabsEl.querySelectorAll('.cost-tab').forEach(e=>e.remove());
  panelsEl.innerHTML = '';
  budgetTabs.forEach((tab,i) => {
    const btn = document.createElement('button');
    btn.className = 'cost-tab' + (tab.id===activeBudgetTab?' active':'');
    btn.textContent = tab.name;
    btn.onclick = () => switchBudgetTab(tab.id);
    btn.id = 'ctab-' + tab.id;
    tabsEl.insertBefore(btn, tabsEl.querySelector('.tab-add-btn'));
    const panel = document.createElement('div');
    panel.className = 'cost-panel' + (tab.id===activeBudgetTab?' active':'');
    panel.id = 'cpanel-' + tab.id;
    if (!tab.limitPct) tab.limitPct = 0;
    const hdr = document.createElement('div');
    hdr.className = 'tab-panel-header';
    hdr.innerHTML = `<span style="font-size:11px;color:var(--text-l)">항목 추가·수정 가능</span><button class="tab-del-btn" onclick="deleteBudgetTab('${tab.id}')">삭제</button>`;
    panel.appendChild(hdr);
    const limitRow = document.createElement('div');
    limitRow.className = 'limit-row';
    const guideAmt = totalBudget > 0 ? Math.round(totalBudget * (tab.limitPct||0) / 100) : 0;
    limitRow.innerHTML = `<span class="limit-label">📐 목표 비중 상한</span><input class="limit-input" type="number" id="limit-${tab.id}" value="${tab.limitPct||0}" min="0" max="100" oninput="updateLimitPct('${tab.id}',this.value)"><span class="limit-label">%</span><span class="limit-guide" id="limit-guide-${tab.id}">= ${guideAmt > 0 ? fmt(guideAmt)+' 만원' : '총예산 입력 후 계산'}</span>`;
    panel.appendChild(limitRow);
    // 상한 상태 배너
    const statusBar = document.createElement('div');
    statusBar.id = 'lsb-' + tab.id;
    statusBar.className = 'limit-status-bar lsb-unset';
    statusBar.innerHTML = '<div class="lsb-left"><span class="lsb-icon">📋</span><div><div class="lsb-msg unset">상한 비중을 설정하면 예산 현황이 표시돼요</div></div></div>';
    panel.appendChild(statusBar);
    const listEl = document.createElement('div');
    listEl.id = 'bitems-' + tab.id;
    panel.appendChild(listEl);
    const addRow = document.createElement('div');
    addRow.className = 'add-item-row';
    addRow.innerHTML = `<input class="add-item-input" type="text" id="badd-name-${tab.id}" placeholder="항목 이름..." onkeydown="if(event.key==='Enter') addBudgetItem('${tab.id}')"><input class="add-item-input" type="number" id="badd-val-${tab.id}" placeholder="금액(만원)" style="max-width:90px;" onkeydown="if(event.key==='Enter') addBudgetItem('${tab.id}')"><button class="add-item-btn" onclick="addBudgetItem('${tab.id}')">+ 추가</button>`;
    panel.appendChild(addRow);
    if (tab.tip) { const tip=document.createElement('div'); tip.className='tip-box'; tip.textContent='💡 '+tab.tip; panel.appendChild(tip); }
    panelsEl.appendChild(panel);
    tab.items.forEach(item => renderBudgetItem(tab.id, item, i));
  });
  budgetTabs.forEach(t => updateLimitStatusBar(t.id));
  updateSummary();
}

function renderBudgetItem(tabId, item, tabIdx) {
  const listEl = document.getElementById('bitems-' + tabId);
  if (!listEl) return;
  const color = TAB_COLORS[(budgetTabs.findIndex(t=>t.id===tabId)) % TAB_COLORS.length];
  const div = document.createElement('div');
  div.className = 'budget-item';
  div.id = 'bitem-' + item.id;
  div.innerHTML = `
    <div class="item-header">
      <div class="item-name-wrap">
        <button class="item-del-btn" onclick="delBudgetItem('${tabId}','${item.id}')">×</button>
        <input class="item-name-edit" type="text" value="${esc(item.name)}" placeholder="항목명"
          onchange="updateBudgetItemName('${tabId}','${item.id}',this.value)"
          title="클릭하여 항목명 수정">
      </div>
      <div class="item-amounts">
        <input class="item-input" type="number" value="${item.val}" oninput="updateBudgetItem('${tabId}','${item.id}',this.value)">
        <span class="item-unit">만원</span>
      </div>
    </div>
    <div class="pbar-bg"><div class="pbar-fill" id="pbf-${item.id}" style="width:0%;background:linear-gradient(90deg,${color},${color}99)"></div></div>
    <div class="item-pct" id="ppc-${item.id}">총 예산의 0%</div>`;
  listEl.appendChild(div);
}

// 예산 플래너 상한 상태 배너 업데이트
function updateLimitStatusBar(tabId) {
  const bar = document.getElementById('lsb-' + tabId);
  if (!bar) return;
  const tab = budgetTabs.find(t=>t.id===tabId);
  if (!tab) return;
  const usedAmt = tab.items.reduce((s,it)=>s+(it.val||0), 0);
  const limitPct = tab.limitPct || 0;
  // limitAmt: 직접입력 우선, 없으면 비중 계산
  const limitAmt = (tab.limitAmt > 0)
    ? tab.limitAmt
    : (totalBudget > 0 ? Math.round(totalBudget * limitPct / 100) : 0);

  if (limitPct === 0 || limitAmt === 0) {
    bar.className = 'limit-status-bar lsb-unset';
    bar.innerHTML = '<div class="lsb-left"><span class="lsb-icon">📋</span><div><div class="lsb-msg unset">상한 비중을 설정하면 예산 현황이 표시돼요</div></div></div>';
    return;
  }

  const diff = limitAmt - usedAmt;
  const usedPct = usedAmt / limitAmt * 100;
  const fillPct = Math.min(usedPct, 100);
  const over = usedAmt > limitAmt;
  const warn = !over && usedPct >= 80;

  let cls, icon, msgCls, msg, detail, fillColor;
  if (over) {
    cls = 'lsb-over'; icon = '⚠️'; msgCls = 'over';
    msg = '초과 위험!';
    detail = `상한 ${fmt(limitAmt)}만원 대비 ${fmt(usedAmt - limitAmt)}만원 초과`;
    fillColor = 'var(--rose)';
  } else if (warn) {
    cls = 'lsb-warn'; icon = '🔶'; msgCls = 'warn';
    msg = `${usedPct.toFixed(0)}% 사용 — 주의 구간`;
    detail = `${fmt(diff)}만원 남음 (상한의 ${(100-usedPct).toFixed(0)}%)`;
    fillColor = 'var(--gold)';
  } else {
    cls = 'lsb-ok'; icon = '✅'; msgCls = 'ok';
    msg = `${fmt(diff)}만원 남아있음`;
    detail = `상한 ${fmt(limitAmt)}만원 중 ${fmt(usedAmt)}만원 사용 (${usedPct.toFixed(0)}%)`;
    fillColor = 'var(--success)';
  }

  bar.className = 'limit-status-bar ' + cls;
  bar.innerHTML = `
    <div class="lsb-left">
      <span class="lsb-icon">${icon}</span>
      <div>
        <div class="lsb-msg ${msgCls}">${msg}</div>
        <div class="lsb-detail">${detail}</div>
      </div>
    </div>
    <div class="lsb-right">
      <div class="lsb-used ${msgCls}">${fmt(usedAmt)} 만원</div>
      <div class="lsb-limit">/ 상한 ${fmt(limitAmt)} 만원</div>
      <div class="lsb-mini-bar"><div class="lsb-mini-fill" style="width:${fillPct}%;background:${fillColor};"></div></div>
    </div>`;
}

function updateLimitPct(tabId, val) {
  const tab = budgetTabs.find(t=>t.id===tabId);
  if (tab) tab.limitPct = parseFloat(val)||0;
  const guideEl = document.getElementById('limit-guide-'+tabId);
  if (guideEl) {
    const amt = totalBudget > 0 ? Math.round(totalBudget * (tab.limitPct||0) / 100) : 0;
    guideEl.textContent = amt > 0 ? '= '+fmt(amt)+' 만원' : '총예산 입력 후 계산';
  }
  updateLimitStatusBar(tabId);
  renderGuidelineCards();
}

function syncLimitFromCard(tabId, val) {
  const tab = budgetTabs.find(t=>t.id===tabId);
  if (!tab) return;
  tab.limitPct = parseFloat(val) || 0;
  // 비중 입력 시, 금액 직접입력 초기화 (비중 우선)
  if (tab.limitPct > 0) tab.limitAmt = 0;
  const inp = document.getElementById('limit-'+tabId);
  if (inp) inp.value = tab.limitPct;
  const guideEl = document.getElementById('limit-guide-'+tabId);
  if (guideEl && totalBudget > 0) {
    guideEl.textContent = '= '+fmt(Math.round(totalBudget * tab.limitPct / 100))+' 만원';
  }
  const amtInpEl = document.getElementById('gl-amtinput-'+tabId);
  if (amtInpEl && tab.limitAmt === 0) amtInpEl.value = '';
  const limitAmt = tab.limitAmt > 0 ? tab.limitAmt : (totalBudget > 0 ? Math.round(totalBudget * tab.limitPct / 100) : 0);
  const usedAmt = tab.items.reduce((s,it)=>s+(it.val||0), 0);
  const usedPct = limitAmt > 0 ? Math.min(usedAmt / limitAmt * 100, 100) : 0;
  const over = limitAmt > 0 && usedAmt > limitAmt;
  const i = budgetTabs.indexOf(tab);
  const color = TAB_COLORS[i % TAB_COLORS.length];
  const amtEl = document.getElementById('gl-amt-'+tabId);
  if (amtEl) amtEl.textContent = limitAmt > 0 ? fmt(limitAmt)+' 만원' : '—';
  const barEl = document.getElementById('gl-bar-'+tabId);
  if (barEl) { barEl.style.width = usedPct+'%'; barEl.style.background = over ? 'var(--rose)' : color; }
  const statusEl = document.getElementById('gl-status-'+tabId);
  if (statusEl) {
    let txt, cls;
    if (limitAmt===0){txt='미설정';cls='gl-empty';}
    else if (over){txt='초과 ⚠️';cls='gl-over';}
    else if (usedPct>80){txt='주의';cls='gl-warn';}
    else {txt='정상 ✓';cls='gl-ok';}
    statusEl.textContent = txt; statusEl.className = 'gl-status '+cls;
  }
  const pctSum = budgetTabs.reduce((s,t)=>s+(t.limitPct||0), 0);
  const badge = document.getElementById('pct-total-badge');
  const disp = document.getElementById('pct-sum-display');
  if (badge) { badge.textContent='합계 '+pctSum+'%'; badge.className='badge '+(pctSum>100?'badge-warn':'badge-ok'); }
  if (disp) { disp.textContent=pctSum+'%'; disp.className='ptv'+(pctSum>100?' over':''); }
  updateLimitStatusBar(tabId);
}

// 금액 직접 입력 → 비중% 역산 또는 독립 상한 설정
function syncLimitAmtFromCard(tabId, val) {
  const tab = budgetTabs.find(t=>t.id===tabId);
  if (!tab) return;
  const amt = parseFloat(val) || 0;
  tab.limitAmt = amt;
  // 역산: 총예산이 있으면 비중도 함께 표시 (참고용)
  if (amt > 0 && totalBudget > 0) {
    tab.limitPct = Math.round(amt / totalBudget * 100);
    const pctInp = document.querySelector(`#guideline-cards .gl-pct-input[oninput*="${tabId}"]`);
    if (pctInp) pctInp.value = tab.limitPct;
    const inp = document.getElementById('limit-'+tabId);
    if (inp) inp.value = tab.limitPct;
  } else if (amt === 0) {
    tab.limitAmt = 0;
  }
  const limitAmt = amt > 0 ? amt : (totalBudget > 0 ? Math.round(totalBudget * (tab.limitPct||0) / 100) : 0);
  const usedAmt = tab.items.reduce((s,it)=>s+(it.val||0), 0);
  const usedPct = limitAmt > 0 ? Math.min(usedAmt / limitAmt * 100, 100) : 0;
  const over = limitAmt > 0 && usedAmt > limitAmt;
  const i = budgetTabs.indexOf(tab);
  const color = TAB_COLORS[i % TAB_COLORS.length];
  const amtEl = document.getElementById('gl-amt-'+tabId);
  if (amtEl) amtEl.textContent = limitAmt > 0 ? fmt(limitAmt)+' 만원' : '—';
  const barEl = document.getElementById('gl-bar-'+tabId);
  if (barEl) { barEl.style.width = usedPct+'%'; barEl.style.background = over ? 'var(--rose)' : color; }
  const statusEl = document.getElementById('gl-status-'+tabId);
  if (statusEl) {
    let txt, cls;
    if (limitAmt===0){txt='미설정';cls='gl-empty';}
    else if (over){txt='초과 ⚠️';cls='gl-over';}
    else if (usedPct>80){txt='주의';cls='gl-warn';}
    else {txt='정상 ✓';cls='gl-ok';}
    statusEl.textContent = txt; statusEl.className = 'gl-status '+cls;
  }
  updateLimitStatusBar(tabId);
}

function renderGuidelineCards() {
  const container = document.getElementById('guideline-cards');
  if (!container) return;
  container.innerHTML = '';
  let pctSum = 0;
  budgetTabs.forEach((tab,i) => {
    const color = TAB_COLORS[i % TAB_COLORS.length];
    const limitPct = tab.limitPct||0;
    // limitAmt: 직접 입력값 우선, 없으면 비중 계산
    const limitAmt = tab.limitAmt > 0
      ? tab.limitAmt
      : (totalBudget>0 ? Math.round(totalBudget*limitPct/100) : 0);
    const usedAmt = tab.items.reduce((s,it)=>s+(it.val||0),0);
    const usedPct = limitAmt>0 ? Math.min(usedAmt/limitAmt*100,100) : 0;
    const over = limitAmt>0 && usedAmt>limitAmt;
    pctSum += limitPct;
    let statusText, statusClass;
    if (limitAmt===0){statusText='미설정';statusClass='gl-empty';}
    else if (over){statusText='초과 ⚠️';statusClass='gl-over';}
    else if (usedPct>80){statusText='주의';statusClass='gl-warn';}
    else {statusText='정상 ✓';statusClass='gl-ok';}
    const card = document.createElement('div');
    card.className='gl-card'; card.style.borderTopColor=color;
    card.innerHTML=`
      <span class="gl-status ${statusClass}" id="gl-status-${tab.id}">${statusText}</span>
      <div class="gl-card-name">${tab.name}</div>
      <div class="gl-pct-row">
        <input class="gl-pct-input" type="number" value="${limitPct}" min="0" max="100"
          oninput="syncLimitFromCard('${tab.id}',this.value)"
          onblur="syncLimitFromCard('${tab.id}',this.value)">
        <span class="gl-pct-label">% 비중</span>
      </div>
      <div class="gl-or-divider">── 또는 금액 직접 입력 ──</div>
      <div class="gl-amt-row">
        <input class="gl-amt-input" type="number" id="gl-amtinput-${tab.id}"
          value="${tab.limitAmt > 0 ? tab.limitAmt : ''}"
          placeholder="상한 금액"
          oninput="syncLimitAmtFromCard('${tab.id}',this.value)"
          onblur="syncLimitAmtFromCard('${tab.id}',this.value)">
        <span class="gl-amt-label">만원 상한</span>
      </div>
      <div class="gl-amount" style="color:${color}" id="gl-amt-${tab.id}">${limitAmt>0?fmt(limitAmt)+' 만원':'—'}</div>
      <div class="gl-used">실제 입력: <b>${fmt(usedAmt)} 만원</b>${limitAmt>0?' / '+usedPct.toFixed(0)+'% 사용':''}</div>
      <div class="gl-bar-wrap"><div class="gl-bar-fill" id="gl-bar-${tab.id}" style="width:${usedPct}%;background:${over?'var(--rose)':color};"></div></div>`;
    container.appendChild(card);
  });
  const badge=document.getElementById('pct-total-badge');
  const disp=document.getElementById('pct-sum-display');
  if(badge){badge.textContent='합계 '+pctSum+'%';badge.className='badge '+(pctSum>100?'badge-warn':'badge-ok');}
  if(disp){disp.textContent=pctSum+'%';disp.className='ptv'+(pctSum>100?' over':'');}
}

function switchBudgetTab(id) {
  activeBudgetTab = id;
  document.querySelectorAll('.cost-tab').forEach(t=>t.classList.remove('active'));
  document.querySelectorAll('.cost-panel').forEach(p=>p.classList.remove('active'));
  const t=document.getElementById('ctab-'+id); if(t) t.classList.add('active');
  const p=document.getElementById('cpanel-'+id); if(p) p.classList.add('active');
}

function addBudgetItem(tabId) {
  const nameEl = document.getElementById('badd-name-'+tabId);
  const valEl = document.getElementById('badd-val-'+tabId);
  const name = nameEl.value.trim(); const val = parseFloat(valEl.value)||0;
  if (!name) return;
  const tab = budgetTabs.find(t=>t.id===tabId);
  const item = {id:'bi'+itemCounter++, name, val};
  tab.items.push(item);
  renderBudgetItem(tabId, item, budgetTabs.indexOf(tab));
  nameEl.value=''; valEl.value='';
  updateSummary();
}

function delBudgetItem(tabId, itemId) {
  const tab = budgetTabs.find(t=>t.id===tabId);
  tab.items = tab.items.filter(i=>i.id!==itemId);
  const el = document.getElementById('bitem-'+itemId); if(el) el.remove();
  updateSummary();
}

function updateBudgetItemName(tabId, itemId, val) {
  const tab = budgetTabs.find(t=>t.id===tabId);
  const item = tab?.items.find(i=>i.id===itemId);
  if (item) item.name = val.trim() || item.name;
}

function updateBudgetItem(tabId, itemId, val) {
  const tab = budgetTabs.find(t=>t.id===tabId);
  const item = tab?.items.find(i=>i.id===itemId);
  if (item) item.val = parseFloat(val)||0;
  updateLimitStatusBar(tabId);
  updateSummary();
}

function deleteBudgetTab(tabId) {
  if (budgetTabs.length<=1) { alert('최소 1개 카테고리는 유지해야 해요!'); return; }
  if (!confirm('이 카테고리를 삭제할까요?')) return;
  budgetTabs = budgetTabs.filter(t=>t.id!==tabId);
  activeBudgetTab = budgetTabs[0].id;
  renderBudgetTabs();
}

function openModal() { document.getElementById('modal-overlay').classList.add('open'); document.getElementById('modal-input').value=''; setTimeout(()=>document.getElementById('modal-input').focus(),100); }
function closeModal() { document.getElementById('modal-overlay').classList.remove('open'); }
function confirmAddTab() {
  const name = document.getElementById('modal-input').value.trim();
  if (!name) return;
  const newId = 'bt' + Date.now();
  budgetTabs.push({id: newId, name, tip:'', items:[], limitPct:0});
  activeBudgetTab = newId;
  closeModal();
  renderBudgetTabs();
  switchBudgetTab(newId);
  switchMain('tab-budget');
}

// ── 예산 계산 ──
function calcTotal() {
  totalBudget = ['my-savings','partner-savings','family-support','loan'].reduce((s,id)=>s+(parseFloat(document.getElementById(id)?.value)||0),0);
  document.getElementById('total-budget-display').textContent = fmt(totalBudget) + ' 만원';
  budgetTabs.forEach(t => updateLimitStatusBar(t.id));
  updateSummary();
  // 예산 플래너 탭의 상한 가이드 금액도 갱신
  budgetTabs.forEach(tab => {
    const guideEl = document.getElementById('limit-guide-' + tab.id);
    if (guideEl && tab.limitPct > 0) {
      const amt = Math.round(totalBudget * tab.limitPct / 100);
      guideEl.textContent = amt > 0 ? '= ' + fmt(amt) + ' 만원' : '총예산 입력 후 계산';
    }
  });
}

function updateSummary() {
  // ── 예산플래너 기반 집계 ──
  const tabSums = budgetTabs.map(tab => ({
    id: tab.id,
    name: tab.name,
    limitPct: tab.limitPct || 0,
    planned: tab.items.reduce((s,i) => s+(i.val||0), 0)
  }));
  const sumAll = tabSums.reduce((s,t) => s+t.planned, 0);
  const remain = totalBudget - sumAll;

  // ── 지출내역 기반 집계 ──
  const expTotal = expenseSections.reduce((s,sec) => s + sec.rows.reduce((ss,r) => ss+(r.total||0), 0), 0);
  const expPaid  = expenseSections.reduce((s,sec) => s + sec.rows.reduce((ss,r) => ss+(r.depositAmt||0), 0), 0);
  const expBal   = expenseSections.reduce((s,sec) => s + sec.rows.reduce((ss,r) => ss+(r.balanceAmt||0), 0), 0);

  // ── 예산 현황 패널: 진척 바 ──
  const bprEl = document.getElementById('budget-progress-rows');
  if (bprEl) {
    bprEl.innerHTML = '';
    tabSums.forEach((t, i) => {
      const color = TAB_COLORS[i % TAB_COLORS.length];
      const limitAmt = totalBudget > 0 ? Math.round(totalBudget * t.limitPct / 100) : 0;
      const used = t.planned;
      const pct = limitAmt > 0 ? Math.min(used / limitAmt * 100, 100) : 0;
      const over = limitAmt > 0 && used > limitAmt;
      const warn = !over && limitAmt > 0 && pct >= 80;
      let statusCls, statusTxt;
      if (limitAmt === 0) { statusCls='unset'; statusTxt='상한 미설정'; }
      else if (over)      { statusCls='over';  statusTxt=`${fmt(used-limitAmt)}만원 초과 ⚠️`; }
      else if (warn)      { statusCls='warn';  statusTxt=`${fmt(limitAmt-used)}만원 남음 (주의)`; }
      else                { statusCls='ok';    statusTxt=`${fmt(limitAmt-used)}만원 남음`; }
      const row = document.createElement('div');
      row.className = 'budget-progress-row';
      row.innerHTML = `
        <div class="bpr-header">
          <span class="bpr-name">${t.name}</span>
          <span class="bpr-amounts">${limitAmt>0?fmt(limitAmt)+' 만원 중 ':''}<span>${fmt(used)} 만원</span> 계획</span>
        </div>
        <div class="bpr-bar-bg">
          <div class="bpr-bar-fill${over?' over':''}" style="width:${pct}%;background:${over?'var(--rose)':color};"></div>
        </div>
        <div class="bpr-status ${statusCls}">${statusTxt}</div>`;
      bprEl.appendChild(row);
    });
  }

  // ── 예산 현황 패널: 합계 ──
  const st = document.getElementById('sum-total');   if(st) st.textContent = fmt(sumAll)+' 만원';
  const sr = document.getElementById('sum-remain');  if(sr) sr.textContent = fmt(Math.abs(remain))+(remain<0?' 만원 초과 ⚠️':' 만원');
  const rr = document.getElementById('remain-row');  if(rr) rr.className = 'sum-row remain'+(remain<0?' over':'');
  const pct = totalBudget > 0 ? Math.min(sumAll/totalBudget*100, 100) : 0;
  const of = document.getElementById('overall-fill'); if(of){of.style.width=pct+'%';of.className='overall-fill'+(pct>=100?' over':'');}
  const op = document.getElementById('overall-pct'); if(op) op.textContent = Math.round(pct)+'%';

  // ── 지출 요약 패널 ──
  const esrEl = document.getElementById('expense-summary-rows');
  if (esrEl) {
    esrEl.innerHTML = '';
    expenseSections.forEach(sec => {
      const secTotal = sec.rows.reduce((s,r) => s+(r.total||0), 0);
      if (secTotal <= 0) return;
      const row = document.createElement('div');
      row.className = 'expense-sum-row';
      row.innerHTML = `<span class="esr-name">${sec.name}</span><span class="esr-val">${fmt(secTotal)} 만원</span>`;
      esrEl.appendChild(row);
    });
  }
  const et  = document.getElementById('expense-total');   if(et)  et.textContent  = fmt(expTotal)+' 만원';
  const ep  = document.getElementById('expense-paid');    if(ep)  ep.textContent  = fmt(expPaid)+' 만원';
  const eb  = document.getElementById('expense-balance'); if(eb)  eb.textContent  = fmt(expBal)+' 만원';

  // ── 예산 플래너 진척바 (탭 내부) ──
  const badge = document.getElementById('total-usage-badge');
  if(badge){badge.textContent=Math.round(pct)+'% 사용';badge.className='badge '+(pct>90?'badge-warn':'badge-ok');}
  budgetTabs.forEach(tab => tab.items.forEach(item => {
    const bar=document.getElementById('pbf-'+item.id); const pctEl=document.getElementById('ppc-'+item.id);
    if(!bar||!pctEl) return;
    const p = totalBudget>0?(item.val/totalBudget*100):0;
    bar.style.width = Math.min(p,100)+'%';
    bar.className = 'pbar-fill'+(p>100?' over':'');
    pctEl.textContent = '총 예산의 '+p.toFixed(1)+'%';
  }));

  // ── 비중 바 ──
  const rb=document.getElementById('ratio-bar'); const rl=document.getElementById('ratio-legend');
  if(rb&&rl){
    rb.innerHTML=''; rl.innerHTML='';
    tabSums.forEach((t,i)=>{
      if(t.planned<=0) return;
      const color=TAB_COLORS[i%TAB_COLORS.length];
      const flex=totalBudget>0?t.planned/totalBudget:0;
      const seg=document.createElement('div');
      seg.style.cssText=`flex:${flex};background:${color};transition:flex 0.5s;min-width:4px;`;
      rb.appendChild(seg);
      const leg=document.createElement('span');
      const cleanName = t.name.replace(/[^\w\s가-힣·]/g,'').trim();
      leg.innerHTML='<span style="color:'+color+'">■</span> '+cleanName;
      rl.appendChild(leg);
    });
    if(remain>0&&totalBudget>0){const seg=document.createElement('div');seg.style.cssText=`flex:${remain/totalBudget};background:#eee;`;rb.appendChild(seg);}
  }

  calcNet();
  renderGuidelineCards();
}

// 서브탭 전환 (3컬럼 변경 후 no-op — 하위 호환용)
function switchSumTab(tab) {
  // 3컬럼 레이아웃으로 변경되어 탭 전환 불필요
}


function calcNet() {
  const guestsEl = document.getElementById('guests');
  const perGiftEl = document.getElementById('gift-per');
  // value가 없으면 기본값 사용 (스마트 폴백)
  const guestsVal = guestsEl ? guestsEl.value : '';
  const perGiftVal = perGiftEl ? perGiftEl.value : '';
  const guests = guestsVal !== '' ? (parseFloat(guestsVal)||0) : 150;
  const perGift = perGiftVal !== '' ? (parseFloat(perGiftVal)||0) : 5;
  const totalGift = guests * perGift;
  const tg = document.getElementById('total-gift');
  if (tg) tg.textContent = fmt(totalGift) + ' 만원';
  const sumAll = budgetTabs.reduce((s,tab)=>s+tab.items.reduce((ss,i)=>ss+(i.val||0),0), 0);
  const nc = document.getElementById('net-cost');
  if (nc) nc.textContent = fmt(Math.max(0, sumAll - totalGift)) + ' 만원';
}

// ── 투두리스트 (인라인 편집 + 탭 간 이동) ──
function renderTodo() {
  const tabsEl = document.getElementById('todo-tabs');
  const panelsEl = document.getElementById('todo-panels');
  tabsEl.innerHTML = '';
  panelsEl.innerHTML = '';
  TODO_KEYS.forEach((key, i) => {
    const data = todoData[key];
    const tab = document.createElement('button');
    tab.className = 'todo-tab' + (i===0?' active':'');
    tab.textContent = data.label;
    tab.onclick = () => switchTodoTab(key);
    tab.id = 'ttab-' + key;
    tabsEl.appendChild(tab);
    const panel = document.createElement('div');
    panel.className = 'todo-panel' + (i===0?' active':'');
    panel.id = 'tpanel-' + key;
    panel.innerHTML = `
      <div class="todo-progress">
        <span class="tp-text">진행률</span>
        <div class="tp-bar"><div class="tp-fill" id="tpf-${key}" style="width:0%"></div></div>
        <span class="tp-count" id="tpc-${key}">0/${data.items.length}</span>
      </div>
      <div class="todo-add">
        <input type="text" placeholder="할 일 추가..." id="tinput-${key}" onkeydown="if(event.key==='Enter') addTodo('${key}')">
        <button onclick="addTodo('${key}')">+ 추가</button>
      </div>
      <div class="todo-list" id="tlist-${key}"></div>`;
    panelsEl.appendChild(panel);
    data.items.forEach(item => renderTodoItem(key, item));
    updateTodoProgress(key);
  });
}

function renderTodoItem(key, item) {
  const list = document.getElementById('tlist-' + key);
  const div = document.createElement('div');
  div.className = 'todo-item' + (item.done?' done':'');
  div.draggable = true;
  // 드래그 이벤트
  div.addEventListener('dragstart', handleTodoDragStart);
  div.addEventListener('dragend',   handleTodoDragEnd);
  div.addEventListener('dragover',  handleTodoDragOver);
  div.addEventListener('drop',      handleTodoDrop);
  // 이동 메뉴: data속성으로 onclick 따옴표 충돌 방지
  const menuItems = '<div class="move-menu-title">탭 이동</div>' + TODO_KEYS.map(k => {
    const isCurrent = k === key;
    return `<div class="move-menu-item${isCurrent?' current':''}" data-from="${key}" data-to="${k}" onclick="handleMoveClick(this)"><span class="mmi-dot"></span>${isCurrent?'✓ 현재':''}${TODO_LABELS[k]}</div>`;
  }).join('');
  div.innerHTML = `
    <span class="todo-drag-handle" title="드래그하여 순서 변경">⠿</span>
    <div class="todo-check" onclick="toggleTodo(this)">
      <svg width="9" height="7" viewBox="0 0 9 7" fill="none">
        <path d="M1 3.5L3 5.5L8 1" stroke="white" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
    </div>
    <span class="todo-text" ondblclick="startEditTodo(this)" title="더블클릭하여 내용 수정">${item.text}</span>
    <span class="todo-edit-hint">✏️</span>
    <div class="move-dropdown">
      <button class="todo-move-btn" onclick="toggleMoveMenu(this)" title="다른 탭으로 이동">↗ 이동</button>
      <div class="move-menu">${menuItems}</div>
    </div>
    <button class="todo-del" onclick="deleteTodo(this,'${key}')" title="삭제">×</button>`;
  list.appendChild(div);
}

// data-from/to 속성으로 이동 처리 (onclick 따옴표 충돌 해소)
function handleMoveClick(el) {
  const fromKey = el.dataset.from;
  const toKey = el.dataset.to;
  moveTodoItem(el, fromKey, toKey);
}

// ── 드래그 정렬 ──
let _dragTodoEl = null;

function handleTodoDragStart(e) {
  _dragTodoEl = this;
  this.classList.add('dragging');
  e.dataTransfer.effectAllowed = 'move';
}

function handleTodoDragEnd(e) {
  this.classList.remove('dragging');
  document.querySelectorAll('.todo-item.drag-over').forEach(el => el.classList.remove('drag-over'));
  _dragTodoEl = null;
}

function handleTodoDragOver(e) {
  e.preventDefault();
  e.dataTransfer.dropEffect = 'move';
  if (!_dragTodoEl || _dragTodoEl === this) return;
  document.querySelectorAll('.todo-item.drag-over').forEach(el => el.classList.remove('drag-over'));
  this.classList.add('drag-over');
}

function handleTodoDrop(e) {
  e.preventDefault();
  if (!_dragTodoEl || _dragTodoEl === this) return;
  this.classList.remove('drag-over');
  const list = this.parentNode;
  const items = Array.from(list.querySelectorAll('.todo-item'));
  const fromIdx = items.indexOf(_dragTodoEl);
  const toIdx   = items.indexOf(this);
  if (fromIdx < toIdx) {
    list.insertBefore(_dragTodoEl, this.nextSibling);
  } else {
    list.insertBefore(_dragTodoEl, this);
  }
}

// 인라인 편집: 더블클릭 시 input으로 전환
function startEditTodo(spanEl) {
  const text = spanEl.textContent;
  const input = document.createElement('input');
  input.type = 'text';
  input.className = 'todo-text-input';
  input.value = text;
  spanEl.replaceWith(input);
  input.focus();
  input.select();
  function finishEdit() {
    const newText = input.value.trim() || text;
    const span = document.createElement('span');
    span.className = 'todo-text';
    span.textContent = newText;
    span.ondblclick = function(){ startEditTodo(this); };
    input.replaceWith(span);
  }
  input.addEventListener('blur', finishEdit);
  input.addEventListener('keydown', e => {
    if (e.key === 'Enter') input.blur();
    if (e.key === 'Escape') { input.value = text; input.blur(); }
  });
}

// 이동 드롭다운 토글
function toggleMoveMenu(btn) {
  const menu = btn.nextElementSibling;
  // 다른 열린 메뉴 닫기
  document.querySelectorAll('.move-menu.open').forEach(m => { if(m !== menu) m.classList.remove('open'); });
  menu.classList.toggle('open');
  // 외부 클릭 시 닫기
  if (menu.classList.contains('open')) {
    setTimeout(() => {
      document.addEventListener('click', function handler(e) {
        if (!menu.contains(e.target) && e.target !== btn) {
          menu.classList.remove('open');
          document.removeEventListener('click', handler);
        }
      });
    }, 10);
  }
}

// 투두 항목 이동
function moveTodoItem(menuItemEl, fromKey, toKey) {
  if (fromKey === toKey) {
    menuItemEl.closest('.move-menu').classList.remove('open');
    return;
  }
  const todoItem = menuItemEl.closest('.todo-item');
  const textEl = todoItem.querySelector('.todo-text, .todo-text-input');
  const text = textEl ? textEl.value || textEl.textContent : '';
  const done = todoItem.classList.contains('done');
  // 원본 삭제
  todoItem.remove();
  updateTodoProgress(fromKey);
  // 대상 탭에 추가
  renderTodoItem(toKey, {text, done});
  updateTodoProgress(toKey);
  // 대상 탭으로 이동 표시
  showToast(`"${TODO_LABELS[toKey]}"으로 이동했어요!`);
}

function toggleTodo(el) {
  const item = el.closest('.todo-item');
  item.classList.toggle('done');
  updateTodoProgress(item.closest('.todo-panel').id.replace('tpanel-',''));
}

function deleteTodo(btn, key) {
  btn.closest('.todo-item').remove();
  updateTodoProgress(key);
}

function addTodo(key) {
  const input = document.getElementById('tinput-' + key);
  const text = input.value.trim();
  if (!text) return;
  renderTodoItem(key, {text, done:false});
  input.value = '';
  updateTodoProgress(key);
}

function updateTodoProgress(key) {
  const list = document.getElementById('tlist-' + key);
  if (!list) return;
  const all = list.querySelectorAll('.todo-item').length;
  const done = list.querySelectorAll('.todo-item.done').length;
  const pct = all>0 ? done/all*100 : 0;
  const pf = document.getElementById('tpf-'+key); if(pf) pf.style.width = pct+'%';
  const pc = document.getElementById('tpc-'+key); if(pc) pc.textContent = done+'/'+all;
}

function switchTodoTab(key) {
  document.querySelectorAll('.todo-tab').forEach(t=>t.classList.remove('active'));
  document.querySelectorAll('.todo-panel').forEach(p=>p.classList.remove('active'));
  document.getElementById('ttab-'+key).classList.add('active');
  document.getElementById('tpanel-'+key).classList.add('active');
}

// ── 저장/불러오기 ──
function collectTodoState() {
  const state = {};
  TODO_KEYS.forEach(key => {
    const list = document.getElementById('tlist-' + key);
    if (!list) return;
    state[key] = Array.from(list.querySelectorAll('.todo-item')).map(el => ({
      text: (el.querySelector('.todo-text') || el.querySelector('.todo-text-input'))?.textContent ||
            el.querySelector('.todo-text-input')?.value || '',
      done: el.classList.contains('done')
    }));
  });
  return state;
}

// saveAll: 위의 Supabase 섹션에서 오버라이드됨

// loadAll: 위의 Supabase 섹션에서 오버라이드됨

function resetAll() {
  if (!confirm('모든 데이터를 초기화할까요?\n저장된 내용도 삭제돼요.')) return;
  localStorage.removeItem(STORAGE_KEY);
  location.reload();
}

function showToast(msg) {
  const t = document.getElementById('save-toast');
  t.textContent = msg;
  t.classList.add('show');
  setTimeout(()=>t.classList.remove('show'), 2000);
}
function updateLastSaved(t) {
  const el = document.getElementById('last-saved');
  if (el) el.textContent = '마지막 저장: ' + t;
}

function fmt(n) { return Math.round(n||0).toLocaleString('ko-KR'); }
function esc(s) { return (s||'').replace(/"/g,'&quot;').replace(/</g,'&lt;'); }

document.getElementById('modal-overlay').addEventListener('click', function(e){ if(e.target===this) closeModal(); });


// ═══════════════════════════════════════════════
// SUPABASE 설정
// ▶ 사용법: 아래 두 값을 Supabase 프로젝트의 실제 값으로 교체하세요
// ▶ https://supabase.com → 프로젝트 생성 → Settings → API
// ═══════════════════════════════════════════════
// ★ 아래 두 줄만 교체하면 클라우드 연동 완료 ★
const SUPABASE_URL = 'https://xzwtvhqubzjsoalgxzys.supabase.co';
// → Supabase 대시보드 → Settings → API → Project URL
const SUPABASE_ANON_KEY = 'sb_publishable_So4xPfLW5V855r1IRwDQPA_bqyrtSq2';
// → Supabase 대시보드 → Settings → API → anon public 키

// Supabase 클라이언트 (설정 전까지 null, localStorage 모드로 동작)
let sbClient = null;
let currentUser = null;
let currentWeddingId = null;
let realtimeChannel = null;

// Supabase 초기화 시도
function initSupabase() {
  if (SUPABASE_URL === 'YOUR_SUPABASE_URL') {
    console.log('[Planner] Supabase 미설정 → localStorage 모드로 동작');
    return false;
  }
  try {
    sbClient = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
    console.log('[Planner] Supabase 연결 성공');
    return true;
  } catch(e) {
    console.error('[Planner] Supabase 초기화 실패:', e);
    return false;
  }
}

// ── 인증 탭 전환 ──
function switchAuthTab(tab) {
  document.querySelectorAll('.auth-tab').forEach(t => t.classList.remove('active'));
  ['auth-login-form','auth-signup-form','auth-invite-form'].forEach(id => {
    const el = document.getElementById(id);
    if(el) el.style.display = 'none';
  });
  const tabMap = {login:'auth-login-form', signup:'auth-signup-form', invite:'auth-invite-form'};
  if(tabMap[tab]) document.getElementById(tabMap[tab]).style.display = 'block';
  const btns = document.querySelectorAll('.auth-tab');
  if(tab==='login' && btns[0]) btns[0].classList.add('active');
  if(tab==='signup' && btns[1]) btns[1].classList.add('active');
  clearAuthError();
}

function showAuthError(msg) {
  const el = document.getElementById('auth-error');
  if(el) { el.textContent = msg; el.style.display = 'block'; }
}
function clearAuthError() {
  const el = document.getElementById('auth-error');
  if(el) el.style.display = 'none';
}

// ── 로그인 ──
async function handleLogin() {
  if (!sbClient) { showAuthError('Supabase가 설정되지 않았어요. SUPABASE_URL과 SUPABASE_ANON_KEY를 입력해주세요.'); return; }
  const email = document.getElementById('auth-email').value.trim();
  const password = document.getElementById('auth-password').value;
  if (!email || !password) { showAuthError('이메일과 비밀번호를 입력해주세요.'); return; }
  try {
    const { data, error } = await sbClient.auth.signInWithPassword({ email, password });
    if (error) throw error;
    await onLoginSuccess(data.user);
  } catch(e) {
    showAuthError(e.message === 'Invalid login credentials' ? '이메일 또는 비밀번호가 틀렸어요.' : e.message);
  }
}

// ── 회원가입 (새 커플 플래너 생성) ──
async function handleSignup() {
  if (!sbClient) { showAuthError('Supabase가 설정되지 않았어요.'); return; }
  const email = document.getElementById('signup-email').value.trim();
  const password = document.getElementById('signup-password').value;
  const name = document.getElementById('signup-name').value.trim();
  const role = document.getElementById('signup-role').value;
  if (!email || !password || !name) { showAuthError('모든 항목을 입력해주세요.'); return; }
  if (password.length < 6) { showAuthError('비밀번호는 6자 이상이어야 해요.'); return; }
  try {
    // 1. Auth 회원가입
    const { data: authData, error: authError } = await sbClient.auth.signUp({ email, password });
    if (authError) throw authError;
    const userId = authData.user.id;
    // 2. 새 Wedding 생성 (초대 코드 자동 발급)
    const inviteCode = Math.random().toString(36).substring(2,8).toUpperCase();
    const { data: wedding, error: wError } = await sbClient
      .from('weddings').insert({ invite_code: inviteCode, created_by: userId }).select().single();
    if (wError) throw wError;
    // 3. Profile 생성
    const { error: pError } = await sbClient
      .from('profiles').insert({ id: userId, role, wedding_id: wedding.id, name });
    if (pError) throw pError;
    // 4. 초기 플래너 데이터 저장
    await sbClient.from('planner_data').insert({ wedding_id: wedding.id, data: getDefaultData(), updated_by: userId });
    await onLoginSuccess(authData.user);
    // 초대 코드 표시
    showInviteCode(inviteCode);
  } catch(e) {
    showAuthError(e.message.includes('already registered') ? '이미 가입된 이메일이에요.' : e.message);
  }
}

// ── 초대 코드로 참여 ──
async function handleInviteJoin() {
  if (!sbClient) { showAuthError('Supabase가 설정되지 않았어요.'); return; }
  const email = document.getElementById('invite-email').value.trim();
  const password = document.getElementById('invite-password').value;
  const name = document.getElementById('invite-name').value.trim();
  const role = document.getElementById('invite-role').value;
  const code = document.getElementById('invite-code').value.trim().toUpperCase();
  if (!email || !password || !name || !code) { showAuthError('모든 항목을 입력해주세요.'); return; }
  try {
    // 1. 초대 코드로 wedding 찾기
    const { data: wedding, error: wError } = await sbClient
      .from('weddings').select().eq('invite_code', code).single();
    if (wError || !wedding) throw new Error('초대 코드를 찾을 수 없어요. 다시 확인해주세요.');
    // 2. Auth 회원가입
    const { data: authData, error: authError } = await sbClient.auth.signUp({ email, password });
    if (authError) throw authError;
    // 3. Profile 생성 (같은 wedding_id)
    const { error: pError } = await sbClient
      .from('profiles').insert({ id: authData.user.id, role, wedding_id: wedding.id, name });
    if (pError) throw pError;
    await onLoginSuccess(authData.user);
    showToast('💍 파트너와 연결됐어요!');
  } catch(e) {
    showAuthError(e.message);
  }
}

// ── 로그인 성공 후 처리 ──
async function onLoginSuccess(user) {
  currentUser = user;
  document.getElementById('auth-overlay').classList.remove('open');
  // Profile & Wedding 정보 로드
  const { data: profile } = await sbClient
    .from('profiles').select('*, weddings(*)').eq('id', user.id).single();
  if (profile) {
    currentWeddingId = profile.wedding_id;
    await loadUserPlan(user.id);
    // 헤더 업데이트
    updateHeaderInfo(profile.weddings);
    // 유저 배지
    const badge = document.getElementById('user-badge');
    if(badge) badge.textContent = `${profile.role==='groom'?'👔':'👗'} ${profile.name}`;
    document.getElementById('user-status').style.display = 'flex';
    document.getElementById('partner-invite-btn').style.display = 'block';
    // 최초 가입 여부 (venue 없으면 온보딩)
    if (!profile.weddings?.venue_name) {
      setTimeout(() => document.getElementById('onboarding-overlay').classList.add('open'), 500);
    }
    // 플래너 데이터 로드
    await loadFromSupabase();
    // Realtime 구독
    subscribeRealtime();
  }
}

// ── 헤더 정보 업데이트 ──
function updateHeaderInfo(wedding) {
  const el = document.getElementById('header-wedding-info');
  if (!el || !wedding) return;
  const venue = wedding.venue_name || '웨딩홀 미정';
  const dateStr = wedding.wedding_date
    ? new Date(wedding.wedding_date).toLocaleDateString('ko-KR', {year:'numeric',month:'long',day:'numeric'})
    : '날짜 미정';
  const dDay = wedding.wedding_date
    ? Math.ceil((new Date(wedding.wedding_date) - new Date()) / (1000*60*60*24))
    : null;
  const dDayStr = dDay !== null ? (dDay > 0 ? ` · D-${dDay}` : dDay === 0 ? ' · D-Day 🎉' : ' · 결혼 완료 🎊') : '';
  el.textContent = `${venue} · ${dateStr}${dDayStr} 💍`;
}

// ── 온보딩 완료 ──
async function completeOnboarding() {
  const venue = document.getElementById('onboard-venue').value.trim();
  const date = document.getElementById('onboard-date').value;
  if (!venue && !date) { skipOnboarding(); return; }
  if (sbClient && currentWeddingId) {
    await sbClient.from('weddings').update({ venue_name: venue, wedding_date: date || null })
      .eq('id', currentWeddingId);
    const { data: wedding } = await sbClient.from('weddings').select().eq('id', currentWeddingId).single();
    updateHeaderInfo(wedding);
  }
  document.getElementById('onboarding-overlay').classList.remove('open');
  showToast('✨ 설정 완료!');
}
function skipOnboarding() {
  document.getElementById('onboarding-overlay').classList.remove('open');
}

// ── 초대 코드 표시 ──
function showInviteCode(code) {
  document.getElementById('invite-code-display').textContent = code;
  document.getElementById('invite-share-overlay').classList.add('open');
}
function copyInviteCode() {
  const code = document.getElementById('invite-code-display').textContent;
  navigator.clipboard.writeText(code).then(() => showToast('📋 코드가 복사됐어요!'));
}

// saveToSupabase: 플랜 시스템 섹션에서 재정의됨

// ── Supabase 로드 ──
async function loadFromSupabase() {
  if (!sbClient || !currentWeddingId) return false;
  const { data: row, error } = await sbClient.from('planner_data')
    .select('data').eq('wedding_id', currentWeddingId).single();
  if (error || !row?.data) return false;
  applyLoadedData(row.data);
  return true;
}

// subscribeRealtime: 플랜 시스템 섹션에서 재정의됨

// ── 저장 데이터 빌드 ──
function buildSaveData() {
  return {
    budget: {
      my: document.getElementById('my-savings').value,
      partner: document.getElementById('partner-savings').value,
      family: document.getElementById('family-support').value,
      loan: document.getElementById('loan').value
    },
    guests: document.getElementById('guests')?.value,
    giftPer: document.getElementById('gift-per')?.value,
    expenseSections: JSON.parse(JSON.stringify(expenseSections)),
    budgetTabs: JSON.parse(JSON.stringify(budgetTabs)),  // limitAmt 포함
    activeBudgetTab,
    todoState: collectTodoState(),
    memos: JSON.parse(JSON.stringify(memos)),
    requests: JSON.parse(JSON.stringify(requests)),
    reProperties: JSON.parse(JSON.stringify(reProperties)),
    savedAt: new Date().toLocaleString('ko-KR')
  };
}

// ── 로드된 데이터 적용 ──
function applyLoadedData(data) {
  if (data.budget) {
    document.getElementById('my-savings').value = data.budget.my||'';
    document.getElementById('partner-savings').value = data.budget.partner||'';
    document.getElementById('family-support').value = data.budget.family||'';
    document.getElementById('loan').value = data.budget.loan||'';
  }
  if (data.expenseSections) { expenseSections = data.expenseSections; rowCounter = 9999; }
  if (data.budgetTabs) { budgetTabs = data.budgetTabs; itemCounter = 5999; }
  if (data.activeBudgetTab) activeBudgetTab = data.activeBudgetTab;
  renderExpense();
  calcTotal();
  renderBudgetTabs();
  if (data.todoState) {
    TODO_KEYS.forEach(key => {
      if (data.todoState[key]) {
        todoData[key] = { label: TODO_LABELS[key], items: data.todoState[key] };
      }
      // dday 탭이 없는 구 버전 데이터라면 기본값 유지
    });
  }
  renderTodo();
  if (data.guests) { const el=document.getElementById('guests'); if(el) el.value=data.guests; }
  if (data.giftPer) { const el=document.getElementById('gift-per'); if(el) el.value=data.giftPer; }
  calcNet();
  if (data.memos && Array.isArray(data.memos)) {
    memos = data.memos;
    renderAllMemos();
  }
  if (data.requests && Array.isArray(data.requests)) {
    requests = data.requests;
    renderAllRequests();
  }
  if (data.reProperties && Array.isArray(data.reProperties)) {
    reProperties = data.reProperties;
    renderReGrid();
  }
  if (data.savedAt) updateLastSaved(data.savedAt);
}

// ── 기본 데이터 (회원가입 시 초기화용) ──
function getDefaultData() {
  return buildSaveData();
}

// ── 로그아웃 ──
async function handleLogout() {
  if (!confirm('로그아웃할까요?')) return;
  if (sbClient) {
    if (realtimeChannel) sbClient.removeChannel(realtimeChannel);
    await sbClient.auth.signOut();
  }
  currentUser = null; currentWeddingId = null;
  document.getElementById('user-status').style.display = 'none';
  document.getElementById('auth-overlay').classList.add('open');
}

// ── 세션 체크 ──
async function checkSession() {
  if (!sbClient) return false;
  const { data: { session } } = await sbClient.auth.getSession();
  if (session?.user) {
    await onLoginSuccess(session.user);
    return true;
  }
  return false;
}

// ── 파트너 초대 버튼 (헤더에서 호출) ──
async function openInviteShare() {
  if (!sbClient || !currentWeddingId) { showToast('로그인 후 이용해주세요'); return; }
  const { data: wedding } = await sbClient.from('weddings').select('invite_code').eq('id', currentWeddingId).single();
  if (wedding) showInviteCode(wedding.invite_code);
}

// ── saveAll 오버라이드 (수동 저장 전용) ──
async function saveAll() {
  const data = buildSaveData();
  // 항상 localStorage 저장 (오프라인 백업)
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  // 저장 처리
  if (sbClient && currentUser) {
    if (currentPlan === 'pro') {
      const ok = await saveToSupabase();
      showToast(ok ? '☁️ 클라우드 저장됐어요!' : '💾 로컬 저장됐어요 (네트워크 오류)');
    } else {
      showToast('💾 로컬 저장됐어요 (☁️ 클라우드 저장은 PRO 전용)');
    }
  } else {
    showToast('💾 저장됐어요!');
  }
  updateLastSaved(data.savedAt);
}

// ── 기존 loadAll 오버라이드 ──
function loadAll() {
  // Supabase 모드면 loadFromSupabase()가 처리
  if (sbClient && currentUser) return false;
  // localStorage 폴백
  let raw = localStorage.getItem(STORAGE_KEY);
  if (!raw) {
    const rawV3 = localStorage.getItem(STORAGE_KEY_V3);
    if (rawV3) raw = rawV3;
  }
  if (!raw) return false;
  try {
    applyLoadedData(JSON.parse(raw));
    return true;
  } catch(e) { console.error(e); return false; }
}

// ══ 자동저장 제거, 수동저장만 사용 ══
// (30초 자동저장 인터벌 삭제됨)

// ════════════════════════════════════════════
// 스티커 메모 시스템 (탭 연동)
// ════════════════════════════════════════════
let memos = [];
let memoPlacementMode = false;
let selectedMemoColor = '#fff9c4';
let _dragMemo = null, _dragOffX = 0, _dragOffY = 0;
let currentMainTab = 'tab-summary'; // 현재 활성 탭 추적

// 메모 가시성 상태: 'all' | 'current' | 'hidden'
let memoVisibility = 'hidden';

// ── FAB 메모 드롭다운 토글 ──
function toggleMemoDropdown() {
  const dd = document.getElementById('fab-memo-dropdown');
  if(!dd) return;
  const isOpen = dd.classList.contains('open');
  dd.classList.toggle('open', !isOpen);
  if(!isOpen) {
    setTimeout(() => {
      document.addEventListener('click', function handler(e) {
        if(!dd.contains(e.target) && !document.getElementById('fab-memo-btn').contains(e.target)) {
          dd.classList.remove('open');
          document.removeEventListener('click', handler);
        }
      });
    }, 10);
  }
}

// ── 메모 가시성 설정 ──
function setMemoVisibility(mode) {
  const dd = document.getElementById('fab-memo-dropdown');
  if(dd) dd.classList.remove('open');

  if(mode === 'all') {
    memoVisibility = 'all';
    updateMemoDisplay();
    showToast('📝 전체 탭 메모 활성화');
  } else if(mode === 'current') {
    memoVisibility = 'current';
    updateMemoDisplay();
    showToast('📌 현재 탭 메모만 표시');
  } else if(mode === 'hide-current') {
    // 현재 탭 메모만 숨김 (나머지는 유지)
    memos.forEach(m => {
      if(m.tabId === currentMainTab) {
        const el = document.getElementById('sticky-' + m.id);
        if(el) el.style.display = 'none';
      }
    });
    showToast('🙈 현재 탭 메모 숨김');
    return;
  } else if(mode === 'hide-all') {
    memoVisibility = 'hidden';
    updateMemoDisplay();
    showToast('🔕 전체 메모 숨김');
  }
  updateFabMemoLabel();
}

function updateFabMemoLabel() {
  const label = document.getElementById('fab-memo-label');
  if(!label) return;
  const map = { all: '메모 ON', current: '현재탭', hidden: '메모' };
  label.textContent = map[memoVisibility] || '메모';
}

// ── 탭 전환 시 메모 표시 업데이트 ──
function updateMemoDisplay() {
  memos.forEach(m => {
    const el = document.getElementById('sticky-' + m.id);
    if(!el) return;
    let show = false;
    if(memoVisibility === 'all') {
      show = true;
    } else if(memoVisibility === 'current') {
      show = (m.tabId === currentMainTab || !m.tabId);
    } else {
      show = false;
    }
    el.style.display = show ? 'block' : 'none';
  });
}

// ── FAB에서 메모 추가 (현재 탭 기준) ──
function addMemoFromFab() {
  const dd = document.getElementById('fab-memo-dropdown');
  if(dd) dd.classList.remove('open');
  startMemoPlacement();
}

function startMemoPlacement() {
  if(memoVisibility === 'hidden') {
    memoVisibility = 'current';
    updateMemoDisplay();
    updateFabMemoLabel();
  }
  memoPlacementMode = true;
  const ov = document.getElementById('memo-placement-overlay');
  if(ov) ov.style.display = 'block';
}

function handleMemoPlacement(e) {
  if(!memoPlacementMode) return;
  memoPlacementMode = false;
  const ov = document.getElementById('memo-placement-overlay');
  if(ov) ov.style.display = 'none';
  // 페이지 기준 절대 좌표 (스크롤 포함)
  const container = document.getElementById('memo-container');
  const cRect = container.getBoundingClientRect();
  const x = (e.clientX - cRect.left + container.scrollLeft);
  const y = (e.clientY - cRect.top  + window.scrollY);
  document.getElementById('memo-form-id').value = '';
  document.getElementById('memo-form-x').value = x.toFixed(1);
  document.getElementById('memo-form-y').value = y.toFixed(1);
  document.getElementById('memo-form-title').value = '';
  document.getElementById('memo-form-content').value = '';
  document.getElementById('memo-form-link').value = '';
  // 현재 탭 정보도 숨김 필드에 저장
  let tabField = document.getElementById('memo-form-tab');
  if(!tabField) {
    tabField = document.createElement('input');
    tabField.type = 'hidden';
    tabField.id = 'memo-form-tab';
    document.getElementById('memo-form-overlay').querySelector('.modal').appendChild(tabField);
  }
  tabField.value = currentMainTab;
  selectedMemoColor = '#fff9c4';
  document.querySelectorAll('.memo-color-dot').forEach(d =>
    d.classList.toggle('selected', d.dataset.color === selectedMemoColor));
  document.getElementById('memo-form-overlay').classList.add('open');
}

function selectMemoColor(el) {
  selectedMemoColor = el.dataset.color;
  document.querySelectorAll('.memo-color-dot').forEach(d => d.classList.remove('selected'));
  el.classList.add('selected');
}

function closeMemoForm() {
  document.getElementById('memo-form-overlay').classList.remove('open');
}

function saveMemoForm() {
  const id      = document.getElementById('memo-form-id').value || 'memo' + Date.now();
  const x       = parseFloat(document.getElementById('memo-form-x').value);
  const y       = parseFloat(document.getElementById('memo-form-y').value);
  const title   = document.getElementById('memo-form-title').value.trim();
  const body    = document.getElementById('memo-form-content').value.trim();
  const link    = document.getElementById('memo-form-link').value.trim();
  const tabField = document.getElementById('memo-form-tab');
  const tabId   = tabField ? tabField.value : currentMainTab;
  closeMemoForm();
  if(!title && !body) return;
  const memo = {id, x, y, title, body, link, color: selectedMemoColor, tabId};
  const idx = memos.findIndex(m => m.id === id);
  if(idx >= 0) memos[idx] = memo; else memos.push(memo);
  renderMemoEl(memo);
}

function renderMemoEl(memo) {
  const oldEl = document.getElementById('sticky-' + memo.id);
  if(oldEl) oldEl.remove();
  const div = document.createElement('div');
  div.className = 'sticky-memo';
  div.id = 'sticky-' + memo.id;
  // px 좌표 (절대위치, 컨테이너 기준)
  div.style.left = (memo.x || 0) + 'px';
  div.style.top  = (memo.y || 0) + 'px';
  div.style.background = memo.color || '#fff9c4';
  // 탭 배지 표시
  const tabLabels = {
    'tab-summary':'요약','tab-expense':'지출','tab-budget':'예산',
    'tab-todo':'투두','tab-request':'요청함'
  };
  const tabBadge = memo.tabId && memo.tabId !== currentMainTab
    ? '<span style="font-size:9px;background:rgba(0,0,0,0.1);padding:1px 5px;border-radius:99px;margin-left:4px;">'
      + (tabLabels[memo.tabId]||memo.tabId) + '</span>'
    : '';
  const bodyHtml = memo.body
    ? '<div class="sticky-memo-body">' + memo.body.replaceAll('\n','<br>') + '</div>'
    : '';
  const linkHtml = memo.link
    ? '<a href="' + memo.link + '" target="_blank" rel="noopener" class="sticky-memo-link">🔗 링크 열기</a>'
    : '';
  div.innerHTML =
    '<div class="sticky-memo-header" onmousedown="startDragMemo(event,\'' + memo.id + '\')">' +
      '<span class="sticky-memo-title">' + (memo.title || '메모') + tabBadge + '</span>' +
      '<div style="display:flex;gap:2px;">' +
        '<button class="sticky-memo-btn" onclick="editMemoById(\'' + memo.id + '\')">✏️</button>' +
        '<button class="sticky-memo-btn" onclick="deleteMemoById(\'' + memo.id + '\')">×</button>' +
      '</div>' +
    '</div>' + bodyHtml + linkHtml;
  // 가시성 적용
  let show = false;
  if(memoVisibility === 'all') show = true;
  else if(memoVisibility === 'current') show = (memo.tabId === currentMainTab || !memo.tabId);
  div.style.display = show ? 'block' : 'none';
  // memo-container에 붙임 (스크롤 따라가지 않도록 absolute)
  const container = document.getElementById('memo-container');
  if(container) container.appendChild(div);
  else document.body.appendChild(div); // 폴백
}

function editMemoById(id) {
  const m = memos.find(m => m.id === id);
  if(!m) return;
  document.getElementById('memo-form-id').value = m.id;
  document.getElementById('memo-form-x').value = m.x;
  document.getElementById('memo-form-y').value = m.y;
  document.getElementById('memo-form-title').value = m.title || '';
  document.getElementById('memo-form-content').value = m.body || '';
  document.getElementById('memo-form-link').value = m.link || '';
  let tabField = document.getElementById('memo-form-tab');
  if(!tabField) {
    tabField = document.createElement('input');
    tabField.type = 'hidden'; tabField.id = 'memo-form-tab';
    document.getElementById('memo-form-overlay').querySelector('.modal').appendChild(tabField);
  }
  tabField.value = m.tabId || currentMainTab;
  selectedMemoColor = m.color || '#fff9c4';
  document.querySelectorAll('.memo-color-dot').forEach(d =>
    d.classList.toggle('selected', d.dataset.color === selectedMemoColor));
  document.getElementById('memo-form-overlay').classList.add('open');
}

function deleteMemoById(id) {
  memos = memos.filter(m => m.id !== id);
  const el = document.getElementById('sticky-' + id);
  if(el) el.remove();
}

function renderAllMemos() {
  memos.forEach(m => renderMemoEl(m));
}

function startDragMemo(e, id) {
  e.preventDefault();
  const el = document.getElementById('sticky-' + id);
  if(!el) return;
  const r = el.getBoundingClientRect();
  _dragOffX = e.clientX - r.left;
  _dragOffY = e.clientY - r.top;
  _dragMemo = {id, el};
  document.addEventListener('mousemove', _onDragMemo);
  document.addEventListener('mouseup', _stopDragMemo);
}

function _onDragMemo(e) {
  if(!_dragMemo) return;
  const container = document.getElementById('memo-container');
  const cRect = container ? container.getBoundingClientRect() : {left:0, top:0};
  const newX = e.clientX - cRect.left - _dragOffX;
  const newY = e.clientY - cRect.top  - _dragOffY + window.scrollY;
  _dragMemo.el.style.left = Math.max(0, newX) + 'px';
  _dragMemo.el.style.top  = Math.max(0, newY) + 'px';
}

function _stopDragMemo() {
  if(!_dragMemo) return;
  const m = memos.find(m => m.id === _dragMemo.id);
  if(m) {
    m.x = parseFloat(_dragMemo.el.style.left);
    m.y = parseFloat(_dragMemo.el.style.top);
  }
  _dragMemo = null;
  document.removeEventListener('mousemove', _onDragMemo);
  document.removeEventListener('mouseup', _stopDragMemo);
}

document.addEventListener('keydown', e => {
  if(e.key === 'Escape' && memoPlacementMode) {
    memoPlacementMode = false;
    const ov = document.getElementById('memo-placement-overlay');
    if(ov) ov.style.display = 'none';
  }
});

// ════════════════════════════════════════════
// 개선 요청함 시스템
// ════════════════════════════════════════════
let requests = [];

const REQ_CATEGORY_LABEL = {
  expense: '📋 지출 내역',
  budget:  '💰 예산 플래너',
  todo:    '✅ 투두리스트',
  other:   '💡 기타'
};
const REQ_CATEGORY_CLASS = {
  expense: 'rb-expense',
  budget:  'rb-budget',
  todo:    'rb-todo',
  other:   'rb-other'
};

function addRequest() {
  const category = document.getElementById('req-category').value;
  const urgent   = document.getElementById('req-urgent').value;
  const content  = document.getElementById('req-content').value.trim();
  if(!content) { showToast('요청 내용을 입력해주세요'); return; }
  const who = currentUser
    ? (document.getElementById('user-badge')?.textContent || '나')
    : '나';
  const req = {
    id: 'req' + Date.now(),
    category, urgent, content, who,
    read: false, done: false,
    createdAt: new Date().toLocaleString('ko-KR')
  };
  requests.push(req);
  renderRequestItem(req);
  updateRequestBadge();
  document.getElementById('req-content').value = '';
  showToast('요청을 남겼어요 ✓');
}

function renderRequestItem(req) {
  const listActive = document.getElementById('request-list-active');
  const listDone   = document.getElementById('request-list-done');
  if(!listActive || !listDone) return;
  // 기존 element 제거
  const old = document.getElementById('req-item-' + req.id);
  if(old) old.remove();

  const div = document.createElement('div');
  div.className = 'request-item' + (req.done ? ' done' : '');
  div.id = 'req-item-' + req.id;

  const urgentHtml = req.urgent === 'urgent'
    ? '<span class="request-urgent">🔴 긴급</span>' : '';
  const readHtml = req.read
    ? '<span style="font-size:10px;color:var(--success);">✓ 읽음</span>' : '';

  div.innerHTML =
    '<div class="request-header">' +
      '<span class="request-badge ' + REQ_CATEGORY_CLASS[req.category] + '">' +
        REQ_CATEGORY_LABEL[req.category] + '</span>' +
      urgentHtml +
      readHtml +
      '<span class="request-from">' + req.who + ' · ' + req.createdAt + '</span>' +
    '</div>' +
    '<div class="request-content">' + req.content.replaceAll('\n','<br>') + '</div>' +
    '<div class="request-actions">' +
      '<button class="req-check-btn' + (req.read ? ' checked' : '') + '" ' +
        'onclick="toggleRequestRead(\'' + req.id + '\')">' +
        (req.read ? '✓ 읽음' : '읽음 체크') +
      '</button>' +
      '<button class="req-done-btn' + (req.done ? ' done-ok' : '') + '" ' +
        'onclick="toggleRequestDone(\'' + req.id + '\')">' +
        (req.done ? '✅ 완료됨' : '완료 처리') +
      '</button>' +
      '<button class="req-del-btn" onclick="deleteRequest(\'' + req.id + '\')" title="삭제">×</button>' +
    '</div>';

  if(req.done) {
    listDone.prepend(div);
    const sec = document.getElementById('req-done-section');
    if(sec) sec.style.display = 'block';
  } else {
    listActive.prepend(div);
  }
  updateRequestBadge();
}

function toggleRequestRead(id) {
  const req = requests.find(r => r.id === id);
  if(!req) return;
  req.read = !req.read;
  renderRequestItem(req);
}

function toggleRequestDone(id) {
  const req = requests.find(r => r.id === id);
  if(!req) return;
  req.done = !req.done;
  if(!req.done) req.read = true;
  renderRequestItem(req);
  showToast(req.done ? '✅ 완료 처리했어요!' : '↩ 미완료로 되돌렸어요');
}

function deleteRequest(id) {
  requests = requests.filter(r => r.id !== id);
  const el = document.getElementById('req-item-' + id);
  if(el) el.remove();
  updateRequestBadge();
  const listDone = document.getElementById('request-list-done');
  const sec = document.getElementById('req-done-section');
  if(sec && listDone && listDone.children.length === 0) sec.style.display = 'none';
}

function updateRequestBadge() {
  const badge = document.getElementById('request-badge');
  const tabBtn = document.getElementById('tab-btn-request');
  const pending = requests.filter(r => !r.done).length;
  const unread  = requests.filter(r => !r.read && !r.done).length;
  if(badge) {
    badge.textContent = pending + '건' + (unread > 0 ? ' · 미읽음 ' + unread : '');
    badge.className = 'badge ' + (unread > 0 ? 'badge-warn' : 'badge-ok');
  }
  if(tabBtn) {
    tabBtn.textContent = unread > 0 ? '💬 요청함 🔴' : '💬 요청함';
  }
}

function toggleDoneRequests() {
  const list   = document.getElementById('request-list-done');
  const toggle = document.getElementById('req-done-toggle');
  if(!list) return;
  const isOpen = list.style.display !== 'none';
  list.style.display = isOpen ? 'none' : 'block';
  if(toggle) toggle.textContent = (isOpen ? '▶' : '▼') + ' 완료된 요청 보기';
}

function renderAllRequests() {
  const listActive = document.getElementById('request-list-active');
  const listDone   = document.getElementById('request-list-done');
  if(listActive) listActive.innerHTML = '';
  if(listDone)   listDone.innerHTML = '';
  const sec = document.getElementById('req-done-section');
  if(sec) sec.style.display = 'none';
  requests.forEach(r => renderRequestItem(r));
  updateRequestBadge();
}


init();


// ═══════════════════════════════════════════════
// 플랜 & 수익화 시스템
// ═══════════════════════════════════════════════
let currentPlan = 'free'; // 'free' | 'pro'

// Supabase profiles 테이블에 plan 컬럼 추가 필요:
// ALTER TABLE profiles ADD COLUMN plan TEXT DEFAULT 'free';
// ALTER TABLE profiles ADD COLUMN plan_activated_at TIMESTAMPTZ;

// 플랜 로드 (로그인 후 호출)
async function loadUserPlan(userId) {
  if (!sbClient) return;
  const { data } = await sbClient.from('profiles').select('plan').eq('id', userId).single();
  currentPlan = data?.plan || 'free';
  updatePlanUI();
}

// 플랜 UI 업데이트
function updatePlanUI() {
  const banner = document.getElementById('plan-banner');
  const bannerText = document.getElementById('plan-banner-text');
  const upgradeBtn = document.getElementById('plan-upgrade-btn');
  if (!banner) return;
  banner.style.display = 'flex';
  if (currentPlan === 'pro') {
    banner.className = 'plan-banner pro';
    bannerText.textContent = '✨ PRO 플랜 사용 중';
    upgradeBtn.style.display = 'none';
  } else {
    banner.className = 'plan-banner';
    bannerText.textContent = '🔄 파트너와 실시간 동기화 중';
    upgradeBtn.style.display = 'none'; // 2인 전용: 업그레이드 불필요
  }
}

// 업그레이드 모달 표시
function showUpgradeModal() {
  document.getElementById('upgrade-overlay').classList.add('open');
}

// 결제 처리 (토스페이먼츠/포트원 연동 자리)
async function handleUpgrade() {
  // TODO: 실제 결제 연동 (토스페이먼츠 또는 포트원)
  // 현재는 데모용 즉시 PRO 전환
  if (sbClient && currentUser) {
    const { error } = await sbClient.from('profiles')
      .update({ plan: 'pro', plan_activated_at: new Date().toISOString() })
      .eq('id', currentUser.id);
    if (!error) {
      currentPlan = 'pro';
      updatePlanUI();
      document.getElementById('upgrade-overlay').classList.remove('open');
      showToast('🎉 PRO 플랜 활성화됐어요!');
    }
  } else {
    // 로그인 안 된 경우
    document.getElementById('upgrade-overlay').classList.remove('open');
    document.getElementById('auth-overlay').classList.add('open');
    showToast('먼저 로그인해주세요');
  }
}

// PRO 기능 게이트: 무료 사용자가 PRO 기능 접근 시 업그레이드 유도
function requirePro(featureName) {
  if (currentPlan === 'pro') return true;
  showToast(`💎 "${featureName}"은 PRO 전용 기능이에요`);
  setTimeout(() => showUpgradeModal(), 600);
  return false;
}

// Supabase 저장 → PRO만 클라우드 저장, 무료는 로컬만
async function saveToSupabase() {
  if (!sbClient || !currentWeddingId || !currentUser) return false;
  if (currentPlan !== 'pro') return false; // 무료는 로컬만
  const data = buildSaveData();
  const { error } = await sbClient.from('planner_data')
    .upsert({
      wedding_id: currentWeddingId,
      data,
      updated_by: currentUser.id,
      updated_at: new Date().toISOString()
    }, { onConflict: 'wedding_id' });
  return !error;
}

// Realtime 구독 → PRO만 활성화
function subscribeRealtime() {
  if (!sbClient || !currentWeddingId) return;
  if (currentPlan !== 'pro') {
    console.log('[Planner] Realtime은 PRO 전용');
    return;
  }
  if (realtimeChannel) sbClient.removeChannel(realtimeChannel);
  realtimeChannel = sbClient.channel('planner-' + currentWeddingId)
    .on('postgres_changes', {
      event: 'UPDATE',
      schema: 'public',
      table: 'planner_data',
      filter: `wedding_id=eq.${currentWeddingId}`
    }, (payload) => {
      if (payload.new.updated_by === currentUser?.id) return;
      applyLoadedData(payload.new.data);
      showToast('🔄 파트너가 업데이트했어요!');
    })
    .subscribe();
}

// Supabase 초기화 및 세션 체크 (CDN defer 후 실행 보장)
window.addEventListener('load', async () => {
  const sbOk = initSupabase();
  if (sbOk) {
    const hasSession = await checkSession();
    if (!hasSession) {
      document.getElementById('auth-overlay').classList.add('open');
    }
  }
  // Supabase 미설정 → localStorage 모드로 바로 진행 (모달 없음)
});

