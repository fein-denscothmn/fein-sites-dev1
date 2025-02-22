// ★スクロールを追いかけるボタンを実装する
window.onscroll = function () {
 var scrollToTopBtn = document.getElementById("scrollToTopBtn");
 if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
  scrollToTopBtn.style.display = "block";
 } else {
  scrollToTopBtn.style.display = "none";
 }
};

function scrollToTop() {
 const scrollDuration = 800;
 const scrollStep = -window.scrollY / (scrollDuration / 15);
 const scrollInterval = setInterval(() => {
  if (window.scrollY !== 0) {
   window.scrollBy(0, scrollStep);
  } else {
   clearInterval(scrollInterval);
  }
 }, 15);
}

// ★ヘッダーのロゴ画像をスクロールする
document.addEventListener("DOMContentLoaded", function () {
 const headerImage = document.querySelector('.header-image');

 headerImage.style.opacity = 0;
 headerImage.style.transform = 'translateX(100%)';

 setTimeout(() => {
  headerImage.style.opacity = 1;
  headerImage.style.transform = 'translateX(0)';
  console.log("Header image is visible");
 }, 100);
});
