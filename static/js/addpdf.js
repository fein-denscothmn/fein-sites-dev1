const pdfjsLib = window['pdfjs-dist/build/pdf'];
pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.6.347/pdf.worker.min.js';

document.querySelectorAll('.pdf-link-add').forEach((link, index) => {
 let isOpen = false;
 link.addEventListener('click', function () {
  const url = this.getAttribute('data-url');
  const fileName = url.substring(url.lastIndexOf('/') + 1);
  const container = document.querySelectorAll('.feinpdf-container-add')[index];
  const viewer = container.querySelector('.feinpdf-viewer-add');
  const prevButton = container.querySelector('.prev-page-add');
  const nextButton = container.querySelector('.next-page-add');
  const pageNumElement = container.querySelector('.page-num-add');
  const pageCountElement = container.querySelector('.page-count-add');

  if (isOpen) {
   container.classList.add('addpdfhidden');
   this.textContent = `${fileName} を開く`;
   isOpen = false;
  } else {
   container.classList.remove('addpdfhidden');
   this.textContent = `${fileName} を閉じる`;
   loadPDF(url, container, viewer, prevButton, nextButton, pageNumElement, pageCountElement);
   isOpen = true;
  }
 });
});

function loadPDF(url, container, viewer, prevButton, nextButton, pageNumElement, pageCountElement) {
 const canvas = document.createElement('canvas');
 viewer.innerHTML = '';
 viewer.appendChild(canvas);

 let pdfDoc = null,
  pageNum = 1,
  pageRendering = false,
  pageNumPending = null,
  ctx = canvas.getContext('2d');

 function renderPage(num) {
  pageRendering = true;
  pdfDoc.getPage(num).then(page => {
   const containerWidth = viewer.clientWidth;
   const scale = 3;
   const viewport = page.getViewport({ scale: scale });

   canvas.height = viewport.height;
   canvas.width = viewport.width;

   const renderContext = {
    canvasContext: ctx,
    viewport: viewport
   };
   const renderTask = page.render(renderContext);

   renderTask.promise.then(() => {
    canvas.style.width = `${containerWidth}px`;
    canvas.style.height = "auto";

    pageRendering = false;
    if (pageNumPending !== null) {
     renderPage(pageNumPending);
     pageNumPending = null;
    }
   });
  });

  pageNumElement.textContent = num;
 }

 function queueRenderPage(num) {
  if (pageRendering) {
   pageNumPending = num;
  } else {
   renderPage(num);
  }
 }

 pdfjsLib.getDocument(url).promise.then(pdfDoc_ => {
  pdfDoc = pdfDoc_;
  pageCountElement.textContent = pdfDoc.numPages;
  renderPage(pageNum);
 });

 prevButton.addEventListener('click', () => {
  if (pageNum <= 1) {
   return;
  }
  pageNum--;
  queueRenderPage(pageNum);
 });

 nextButton.addEventListener('click', () => {
  if (pageNum >= pdfDoc.numPages) {
   return;
  }
  pageNum++;
  queueRenderPage(pageNum);
 });
}
