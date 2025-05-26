const container = document.getElementById("coffee-bean")
document.addEventListener('DOMContentLoaded', function () {
  for (let i = 0; i < 80; i++) {
    const bean = document.createElement("img");
    bean.src = "assets/background icon.svg"; // or .png if you're using that
    bean.alt = "bean";
    bean.classList.add("floating-bean");

    // Random size between 30px and 80px
    const size = Math.floor(Math.random() * 50) + 30;
    bean.style.width = `${size}px`;

    // Random position
    bean.style.position = "absolute";
    bean.style.top = `${Math.random() * 90}%`;
    bean.style.left = `${Math.random() * 100}%`;
    bean.style.opacity = "0"

    bean.style.setProperty("--rotation", `${Math.floor(Math.random() * 360)}deg`)

    const directions = ['top', 'left', 'right', 'bottom'];
    const direction = directions[Math.floor(Math.random() * directions.length)];

    let translateX = '0%';
    let translateY = '0%';

    switch (direction) {
      case 'top':
        translateY = '-120%';
        break;
      case 'left':
        translateX = '-120%';
        break;
      case 'right':
        translateX = '120%';
        break;
      case 'bottom':
        translateY = '120%';
        break;
    }

    const delay = i * 0.01; // 0s, 0.1s, 0.2s, etc.
    bean.style.animationDelay = `${delay}s`;

    bean.style.setProperty('--startX', translateX);
    bean.style.setProperty('--startY', translateY);

    container.appendChild(bean);
  }
})
