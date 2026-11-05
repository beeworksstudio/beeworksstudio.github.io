"use strict";
const studioForm = document.querySelector("[data-studio-contact]");
if (studioForm) studioForm.addEventListener("submit", event => {
 event.preventDefault();
 if (!studioForm.reportValidity()) return;
 const data = Object.fromEntries(new FormData(studioForm));
 const ar = document.documentElement.lang === "ar";
 const subject = String(data.subject).replace(/[\r\n]+/g, " ").trim();
 const body = `${ar ? "الاسم" : "Name"}: ${data.name.trim()}\n${ar ? "البريد الإلكتروني" : "Email"}: ${data.email.trim()}\n\n${data.message.trim()}`;
 studioForm.querySelector(".form-status").textContent = ar ? "راجع المسودة واضغط إرسال في تطبيق البريد. إن لم يفتح، استخدم العنوان أدناه." : "Review the draft and press Send in your email app. If it does not open, use the address below.";
 window.location.href = "mailto:hello@beeworksapps.com?subject=" + encodeURIComponent(subject) + "&body=" + encodeURIComponent(body);
});
