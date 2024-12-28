function setupFeinalbum(albumId) {
 let currentPage = 0;
 const album = document.getElementById(albumId);
 const pages = album.querySelectorAll('.feinalbum-page');
 const prevButton = album.querySelector('.feinalbum-prev');
 const nextButton = album.querySelector('.feinalbum-next');

 prevButton.addEventListener('click', () => {
  showPage(currentPage - 1);
 });

 nextButton.addEventListener('click', () => {
  showPage(currentPage + 1);
 });

 function showPage(index) {
  if (index < 0 || index >= pages.length) return;

  pages[currentPage].classList.add('feinalbum-page-hidden');

  setTimeout(() => {
   pages[currentPage].classList.add('feinalbum-hidden');
   currentPage = index;
   pages[currentPage].classList.remove('feinalbum-hidden');

   setTimeout(() => {
    pages[currentPage].classList.remove('feinalbum-page-hidden');
    adjustImageSize(pages[currentPage]);
   }, 50);
  }, 600);
 }

 function adjustImageSize(page) {
  const img = page.querySelector('img');
  img.style.width = '100%';
  img.style.height = '100%';
  img.style.objectFit = 'contain';
  img.style.objectPosition = 'center';
 }

 pages.forEach((page, index) => {
  if (index !== currentPage) {
   page.classList.add('feinalbum-page-hidden');
   page.classList.add('feinalbum-hidden');
  } else {
   page.classList.remove('feinalbum-hidden');
   adjustImageSize(page);
  }
 });

 showPage(0);
}

document.addEventListener('DOMContentLoaded', () => {
 const albumContainers = document.querySelectorAll('.feinalbum-container');
 albumContainers.forEach((container, index) => {
  setupFeinalbum(`feinalbum${index + 1}`);
 });
});
