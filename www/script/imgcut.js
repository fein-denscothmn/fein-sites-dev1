document.addEventListener('DOMContentLoaded', () => {
 const container = document.getElementById('image-container-dencut');
 const imageUrl = '/flower3/flower3cut.jpg'; // 任意の画像のパス

 for (let i = 0; i < 10; i++) {
  const tile = document.createElement('div');
  tile.classList.add('image-tile-dencut');

  const row = Math.floor(i / 5);
  const col = i % 5;

  tile.style.backgroundImage = `url(${imageUrl})`;
  tile.style.backgroundPosition = `${-col * 50}px ${-row * 100}px`;

  container.appendChild(tile);
 }
});
