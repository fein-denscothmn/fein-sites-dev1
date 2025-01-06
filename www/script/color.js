const colors = [
 '00', '33', '66', '99', 'CC', 'FF'
];

const palette = document.getElementById('palette');

colors.forEach(r => {
 colors.forEach(g => {
  colors.forEach(b => {
   const color = `#${r}${g}${b}`;
   const colorBox = document.createElement('div');
   colorBox.className = 'color-box';
   colorBox.style.backgroundColor = color;

   const colorCode = document.createElement('div');
   colorCode.className = 'color-code';
   colorCode.textContent = color;

   colorBox.appendChild(colorCode);
   palette.appendChild(colorBox);

   colorBox.addEventListener('click', () => {
    navigator.clipboard.writeText(color).then(() => {
     alert(`Color code copied.: ${color}`);
    });
   });
  });
 });
});
