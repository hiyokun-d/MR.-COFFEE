// Animation for the tagline text - word by word appearance
document.addEventListener('DOMContentLoaded', () => {
  const tagline = document.getElementById('tagline');
  const text = tagline.innerHTML.trim();

  const words = text.split(' ');

  tagline.innerHTML = '';

  words.forEach((word, index) => {
    const span = document.createElement('span');
    span.className = 'word';
    span.textContent = `${word}\u00A0`;
    span.style.animationDelay = `${1.5 + (index * 0.12)}s`;
    tagline.appendChild(span);
  });
})
