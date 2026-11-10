'use strict';
const isArabic = document.documentElement.lang === 'ar';
const panels = {
  wealth: ['Your whole picture, one considered view.', 'Follow net worth, account balances, gold, silver and other assets. Combined totals use approximate exchange rates; individual records keep their own currency.'],
  plans: ['Tomorrow’s commitments, in view today.', 'Keep subscriptions, installments, rent and Money Circles together. See upcoming due dates and link recorded payments without creating another expense.'],
  goals: ['Make a little space for something bigger.', 'Set a savings goal, track what you have put aside, and see your progress. Allocations help you plan; FilGyb does not move money in your bank.']
};
if (isArabic) Object.assign(panels, {
  wealth: ['صورة متكاملة، بنظرة واحدة.', 'تابع صافي ثروتك وأرصدة حساباتك والذهب والفضة وأصولك الأخرى. تستخدم الإجماليات المجمّعة أسعار صرف تقريبية، بينما تحتفظ السجلات الفردية بعملاتها الأصلية.'],
  plans: ['التزامات الغد، أمامك اليوم.', 'اجمع الاشتراكات والأقساط والإيجار والجمعيات في مكان واحد. تابع مواعيد الاستحقاق واربط المدفوعات المسجلة دون إنشاء مصروف آخر.'],
  goals: ['اترك مساحة صغيرة لهدف أكبر.', 'حدد هدفًا للادخار، وتابع ما خصصته له ومدى تقدمك. تساعدك المخصصات في التخطيط، ولا ينقل FilGyb الأموال في حسابك البنكي.']
});
const tabs = [...document.querySelectorAll('[data-tab]')];
function selectTab(tab) {
  tabs.forEach(item => { item.setAttribute('aria-selected', String(item === tab)); item.tabIndex = item === tab ? 0 : -1; });
  const [title, copy] = panels[tab.dataset.tab];
  document.querySelector('[data-panel-title]').textContent = title;
  document.querySelector('[data-panel-copy]').textContent = copy;
  document.getElementById('feature-panel').setAttribute('aria-labelledby', tab.id);
}
tabs.forEach((tab, index) => {
  tab.addEventListener('click', () => selectTab(tab));
  tab.addEventListener('keydown', event => {
    let next;
    if (event.key === 'ArrowRight') next = (index + (isArabic ? tabs.length - 1 : 1)) % tabs.length;
    if (event.key === 'ArrowLeft') next = (index + (isArabic ? 1 : tabs.length - 1)) % tabs.length;
    if (event.key === 'Home') next = 0;
    if (event.key === 'End') next = tabs.length - 1;
    if (next !== undefined) { event.preventDefault(); selectTab(tabs[next]); tabs[next].focus(); }
  });
});
// A mailto draft only: no form content is posted, stored or sent by this site.
function buildSupportDraft(values, arabic = false) {
  const subject = String(values.subject || '').replace(/[\r\n]+/g, ' ').trim();
  const labels = arabic ? ['الاسم', 'البريد الإلكتروني', 'الرسالة'] : ['Name', 'Email', 'Message'];
  const body = `${labels[0]}: ${String(values.name || '').trim()}\n${labels[1]}: ${String(values.email || '').trim()}\n\n${labels[2]}:\n${String(values.message || '').trim()}`;
  const prefix = values.app === 'general' ? 'BeeWorks Studio support' : 'FilGyb support';
  return 'mailto:support@beeworksapps.com?subject=' + encodeURIComponent(prefix + ' — ' + subject) + '&body=' + encodeURIComponent(body);
}
const contactForm = document.querySelector('[data-contact-form]');
if (contactForm) {
  const status = contactForm.querySelector('[data-form-status]');
  const app = contactForm.elements.namedItem('app');
  if (app) {
    app.value = new URLSearchParams(window.location.search).get('app') === 'filgyb' ? 'filgyb' : 'general';
    const languageSwitch = document.querySelector('.language-switch');
    function syncAppSelection() {
      const selected = app.value === 'filgyb';
      app.parentElement.dataset.app = app.value;
      document.querySelectorAll('.help-topics, .support-tips').forEach(section => { section.hidden = !selected; });
      if (languageSwitch) {
        const alternate = new URL(languageSwitch.href);
        if (selected) alternate.searchParams.set('app', 'filgyb');
        else alternate.searchParams.delete('app');
        languageSwitch.href = alternate.href;
      }
    }
    app.addEventListener('change', syncAppSelection);
    syncAppSelection();
  }
  const editable = [...contactForm.querySelectorAll('input[required], textarea[required]')];
  editable.forEach(field => field.addEventListener('input', () => field.setCustomValidity('')));
  contactForm.addEventListener('submit', event => {
    event.preventDefault();
    for (const field of editable) {
      if (!field.value.trim()) {
        field.setCustomValidity(isArabic ? 'يرجى إكمال هذا الحقل.' : 'Please complete this field.');
        field.reportValidity();
        return;
      }
    }
    const values = Object.fromEntries(new FormData(contactForm));
    const draft = buildSupportDraft(values, isArabic);
    status.textContent = isArabic
      ? 'راجع المسودة واضغط إرسال في تطبيق بريدك. إذا لم يفتح تطبيق، استخدم عنوان البريد أدناه.'
      : 'Review the draft and tap Send in your email app. If no app opens, use the email address below.';
    window.location.href = draft;
  });
}
