// ★見出しに下線を引く
document.addEventListener("DOMContentLoaded", function () {
 const h3s = document.querySelectorAll("h3");

 window.addEventListener("scroll", function () {
  h3s.forEach(function (h3) {
   const rect = h3.getBoundingClientRect();
   if (rect.top >= 0 && rect.bottom <= window.innerHeight) {
    h3.classList.add("visible");
   } else {
    h3.classList.remove("visible");
   }
  });
 });
});

// ★アトリエページのチェックボタン
document.addEventListener('DOMContentLoaded', () => {
 const buttons = document.querySelectorAll('.inline-button');

 buttons.forEach(button => {
  button.addEventListener('click', () => {
   if (button.textContent === '□') {
    button.textContent = '✅';
   } else {
    button.textContent = '□';
   }
  });
 });
});
