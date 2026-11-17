document.querySelector('.alert-example-links a[href="#bank-alert-faq"]')?.addEventListener('click', () => {
  const faq = document.getElementById('bank-alert-faq');
  if (faq) faq.open = true;
});
