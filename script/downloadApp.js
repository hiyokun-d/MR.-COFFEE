const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.animationPlayState = 'running';
    }
  });
}, observerOptions);

document.querySelectorAll('.promoteApp, .promotion').forEach(section => {
  observer.observe(section);
});

document.querySelectorAll('button').forEach(button => {
  button.addEventListener('click', function (e) {
    const ripple = document.createElement('span');
    const rect = this.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = e.clientX - rect.left - size / 2;
    const y = e.clientY - rect.top - size / 2;

    ripple.style.cssText = `
      position: absolute;
      width: ${size}px;
      height: ${size}px;
      left: ${x}px;
      top: ${y}px;
      background: rgba(255, 255, 255, 0.3);
      border-radius: 50%;
      transform: scale(0);
      animation: ripple 0.6s ease-out;
      pointer-events: none;
    `;

    this.appendChild(ripple);

    setTimeout(() => {
      ripple.remove();
    }, 600);
  });
});

document.getElementById("downloadButton").addEventListener("click", () => {
  const userAgent = navigator.userAgent || navigator.vendor || window.opera;

  if (/android/i.test(userAgent)) {
    window.location.href = "https://play.google.com/store/apps/details?id=com.tapblaze.coffeebusiness";
  } else if (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream) {
    window.location.href = "https://apps.apple.com/id/app/good-coffee-great-coffee/id1603584945";
  } else {
    alert("maaf nih karena saya kerjanya sendiri jadinya saya belum buat untuk desktop, untuk sementara nih tombol ngarahinnya ke ini dulu ya")
    const funLinks = ["https://www.youtube.com/watch?v=dQw4w9WgXcQ", "https://www.youtube.com/watch?v=6dMjCa0nqK0",];

    const random = Math.floor(Math.random() * funLinks.length);
    window.open(funLinks[random], "_blank");
  }
});
