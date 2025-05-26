class CoffeeBuilder {
  constructor() {
    this.selectedCoffee = null;
    this.selectedSize = null;
    this.basePrice = 0;
    this.sizeMultiplier = 1;

    this.initializeEventListeners();
  }

  initializeEventListeners() {
    // Coffee type selection (radio version)
    document.querySelectorAll('input[name="coffeeType"]').forEach(radio => {
      radio.addEventListener('change', (e) => this.selectCoffeeType(e.target));
    });

    // Size selection (radio version)
    document.querySelectorAll('input[name="coffeeSize"]').forEach(radio => {
      radio.addEventListener('change', (e) => this.selectSize(e.target));
    });

    // Place order button
    document.getElementById('placeOrderBtn').addEventListener('click', () => this.placeOrder());

    // Close success modal
    document.getElementById('successModal').addEventListener('click', (e) => {
      if (e.target === e.currentTarget) {
        this.closeSuccessModal();
      }
    });
  }

  selectCoffeeType(input) {
    this.selectedCoffee = input.value;
    this.basePrice = parseFloat(input.dataset.price);

    this.updateCupVisual(this.selectedCoffee);
    this.updateOrderSummary();
  }

  selectSize(input) {
    this.selectedSize = input.value;
    this.sizeMultiplier = parseFloat(input.dataset.multiplier);

    this.updateCupSize(this.selectedSize);
    this.updateOrderSummary();
  }

  updateCupVisual(coffeeType) {
    const espressoLayer = document.querySelector('.espresso-layer');
    const milkLayer = document.querySelector('.milk-layer');
    const foamLayer = document.querySelector('.foam-layer');
    const steam = document.querySelectorAll('.steam');

    // Reset all layers
    [espressoLayer, milkLayer, foamLayer].forEach(layer => {
      layer.style.opacity = '0';
      layer.style.transform = 'scaleY(0)';
    });

    // Remove steam animation
    steam.forEach(s => s.classList.remove('active'));

    // Add layers based on coffee type with staggered animation
    setTimeout(() => {
      espressoLayer.style.opacity = '1';
      espressoLayer.style.transform = 'scaleY(1) translateY(-65px)';
      espressoLayer.style.height = "100px"
    }, 100);

    if (['cappuccino', 'latte', 'mocha', 'macchiato'].includes(coffeeType)) {
      setTimeout(() => {
        milkLayer.style.opacity = '1';
        milkLayer.style.transform = 'scaleY(1)';
        espressoLayer.style.transform = 'scaleY(1) translateY(-13px)';
        espressoLayer.style.height = "50px"
      }, 400);
    }

    if (['cappuccino', 'macchiato'].includes(coffeeType)) {
      setTimeout(() => {
        foamLayer.style.opacity = '1';
        foamLayer.style.transform = 'scaleY(1) translateY(10px)';
      }, 700);
    }

    // Add steam for hot drinks
    if (coffeeType !== 'cold-brew') {
      setTimeout(() => {
        steam.forEach(s => s.classList.add('active'));
      }, 900);
    }
  }

  updateCupSize(size) {
    const cupSvg = document.querySelector('.cup-svg');
    let scale = 1;

    switch (size) {
      case 'small': scale = 0.9; break;
      case 'medium': scale = 1; break;
      case 'large': scale = 1.1; break;
    }

    cupSvg.style.transform = `scale(${scale})`;
    cupSvg.style.transition = 'transform 0.5s ease';
  }

  updateOrderSummary() {
    const coffeeDisplay = document.getElementById('selectedCoffee');
    const sizeDisplay = document.getElementById('selectedSize');
    const priceDisplay = document.getElementById('totalPrice');
    const orderBtn = document.getElementById('placeOrderBtn');

    coffeeDisplay.textContent = this.selectedCoffee
      ? this.selectedCoffee.charAt(0).toUpperCase() + this.selectedCoffee.slice(1)
      : 'Silakan pilih';

    sizeDisplay.textContent = this.selectedSize
      ? this.selectedSize.charAt(0).toUpperCase() + this.selectedSize.slice(1)
      : 'Silakan pilih';

    const totalPrice = this.basePrice * this.sizeMultiplier;

    // 💰 Format in Indonesian Rupiah
    const formattedPrice = new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(totalPrice);

    priceDisplay.textContent = formattedPrice;

    // Enable order button if both selections are made and form is filled
    const nameInput = document.getElementById('customerName').value;
    const phoneInput = document.getElementById('phoneNumber').value;

    orderBtn.disabled = !(this.selectedCoffee && this.selectedSize && nameInput && phoneInput);
  }

  placeOrder() {
    const customerName = document.getElementById('customerName').value;
    const phoneNumber = document.getElementById('phoneNumber').value;

    if (!customerName || !phoneNumber) {
      alert('Mohon isi nama dan nomor telepon Anda');
      return;
    }

    const totalPrice = this.basePrice * this.sizeMultiplier;

    const orderData = {
      coffee: this.selectedCoffee,
      size: this.selectedSize,
      price: new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
        minimumFractionDigits: 0,
      }).format(totalPrice),
      customer: customerName,
      phone: phoneNumber,
      timestamp: new Date().toISOString()
    };

    console.log('Order berhasil:', orderData);

    this.showSuccessModal();

    setTimeout(() => {
      this.resetForm();
    }, 3000);
  }
  showSuccessModal() {
    document.getElementById('successModal').classList.add('show');
  }

  closeSuccessModal() {
    document.getElementById('successModal').classList.remove('show');
  }

  resetForm() {
    // Reset selections
    this.selectedCoffee = null;
    this.selectedSize = null;
    this.basePrice = 0;
    this.sizeMultiplier = 1;

    // Reset UI
    document.querySelectorAll('.option-btn').forEach(btn => btn.classList.remove('active'));
    document.getElementById('customerName').value = '';
    document.getElementById('phoneNumber').value = '';

    // Reset cup visual
    document.querySelectorAll('.coffee-layer').forEach(layer => {
      layer.style.opacity = '0';
      layer.style.transform = 'scaleY(0)';
    });
    document.querySelectorAll('.steam').forEach(s => s.classList.remove('active'));
    document.querySelector('.cup-svg').style.transform = 'scale(1)';

    // Update summary
    this.updateOrderSummary();

    // Close modal
    this.closeSuccessModal();
  }
}

// Initialize the coffee builder
document.addEventListener('DOMContentLoaded', () => {
  const coffeeBuilder = new CoffeeBuilder();

  // Add real-time validation
  ['customerName', 'phoneNumber'].forEach(id => {
    document.getElementById(id).addEventListener('input', () => {
      coffeeBuilder.updateOrderSummary();
    });
  });
});
