document.addEventListener('DOMContentLoaded', function () {

  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const cardObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate-in');
        // Add staggered delay for multiple cards
        const cards = Array.from(document.querySelectorAll('.card'));
        const index = cards.indexOf(entry.target);
        entry.target.style.animationDelay = `${index * 0.2}s`;

        setTimeout(() => {
          animatePriceCounters();
        }, 1200); // Start after card intro animations complete

        setTimeout(() => {
          animatePriceCounters();
        }, 100);
      }
    });
  }, observerOptions);



  function animatePriceCounters() {
    document.querySelectorAll('.card p span').forEach(priceElement => {
      const originalText = priceElement.getAttribute("actual-price");

      const numericValue = originalText.replace(/[^\d]/g, '');
      const finalPrice = parseInt(numericValue);

      if (!isNaN(finalPrice) && finalPrice > 0) {
        let currentPrice = 0;
        const increment = Math.ceil(finalPrice / 35); // Smooth animation over ~2 seconds
        const duration = 30; // milliseconds between updates

        const timer = setInterval(() => {
          currentPrice += increment;

          if (currentPrice >= finalPrice) {
            currentPrice = finalPrice;
            clearInterval(timer);
          }

          const formattedPrice = formatNumber(currentPrice);
          priceElement.textContent = formattedPrice;
        }, duration);
      }
    });
  }

  function formatNumber(number) {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
  }

  document.querySelectorAll('.card').forEach(card => {
    cardObserver.observe(card);
  });
})
