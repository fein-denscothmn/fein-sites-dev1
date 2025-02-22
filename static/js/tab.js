document.addEventListener('DOMContentLoaded', () => {
 const tabsFein = document.querySelectorAll('.tab-fein');
 const tabPanesFein = document.querySelectorAll('.tab-pane-fein');

 tabsFein.forEach(tab => {
  tab.addEventListener('click', () => {
   const target = document.getElementById(tab.getAttribute('data-tab'));

   tabsFein.forEach(tab => {
    tab.classList.remove('active');
   });

   tabPanesFein.forEach(pane => {
    pane.classList.remove('active');
   });

   tab.classList.add('active');
   target.classList.add('active');
  });
 });

 document.querySelector('.tab-fein').classList.add('active');
 document.getElementById('pane1-fein').classList.add('active');
});
