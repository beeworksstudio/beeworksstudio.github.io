'use strict';
(() => {
  const query = new URLSearchParams(location.search);
  const fragment = new URLSearchParams(location.hash.slice(1));
  const error = fragment.has('error') || query.has('error');
  const verified = !error && fragment.has('access_token') && fragment.get('type') === 'signup';
  const staging = query.get('environment') === 'staging';
  // Remove authentication material before any external navigation.
  history.replaceState(null, '', location.pathname + (staging ? '?environment=staging' : ''));
  const copy = {
    en: {
      title: error ? 'Let’s get you a fresh link 💚' : verified ? 'You’re all set! ✅' : 'Email confirmation',
      description: error ? 'This link has expired or was already used. No worries—open FilGyb to sign in or request a fresh verification email.' : verified ? 'Your email address is confirmed. Return to FilGyb and sign in to continue.' : 'Open the verification link from your latest FilGyb email to confirm your address.',
      open: error ? 'Open FilGyb for a fresh link' : 'Return to FilGyb', hint: error ? 'Already deleted your account? Thank you for trying FilGyb 💚 You can create a new account whenever you’re ready.' : 'Sign in with your email and password. Your next step is waiting in FilGyb.', support: 'Contact support', privacy: 'Privacy', terms: 'Terms', language: 'العربية'
    },
    ar: {
      title: error ? 'لنحصل على رابط جديد 💚' : verified ? 'كل شيء جاهز! ✅' : 'تأكيد البريد الإلكتروني',
      description: error ? 'انتهت صلاحية هذا الرابط أو سبق استخدامه. لا تقلق، افتح FilGyb لتسجيل الدخول أو لطلب رسالة تحقق جديدة.' : verified ? 'تم تأكيد عنوان بريدك الإلكتروني. ارجع إلى FilGyb وسجّل الدخول للمتابعة.' : 'افتح رابط التحقق في أحدث رسالة وصلتك من FilGyb لتأكيد عنوان بريدك.',
      open: error ? 'افتح FilGyb لطلب رابط جديد' : 'العودة إلى FilGyb', hint: error ? 'هل حذفت حسابك؟ شكرًا لتجربة FilGyb 💚 يمكنك إنشاء حساب جديد متى أردت.' : 'سجّل الدخول باستخدام بريدك الإلكتروني وكلمة المرور للمتابعة.', support: 'تواصل مع الدعم', privacy: 'الخصوصية', terms: 'الشروط', language: 'English'
    }
  };
  let language = navigator.language.startsWith('ar') ? 'ar' : 'en';
  function render() {
    document.documentElement.lang = language;
    document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr';
    for (const [id, text] of Object.entries(copy[language])) document.getElementById(id).textContent = text;
    document.title = copy[language].title + ' · FilGyb';
    document.querySelector('.symbol').textContent = error ? '!' : verified ? '✓' : '✉';
    document.getElementById('privacy').href = language === 'ar' ? '/filgybapp/ar/privacy/' : '/filgybapp/privacy/';
    document.getElementById('terms').href = language === 'ar' ? '/filgybapp/ar/terms/' : '/filgybapp/terms/';
  }
  document.getElementById('environment').hidden = !staging;
  document.getElementById('open').href = staging ? 'com.basemshoaib.noted.staging://' : 'com.basemshoaib.noted://';
  document.getElementById('language').addEventListener('click', () => { language = language === 'en' ? 'ar' : 'en'; render(); });
  render();
})();
