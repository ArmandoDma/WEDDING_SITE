const targetDate = new Date('2026-01-31T00:00:00').getTime();

const daysEl = document.getElementById('days');
const hoursEl = document.getElementById('hours');
const minutesEl = document.getElementById('minutes');
const secondsEl = document.getElementById('seconds');

function updateCountdown() {
  const now = new Date().getTime();
  const distance = targetDate - now;

  if (distance <= 0) {
    daysEl.textContent = '00';
    hoursEl.textContent = '00';
    minutesEl.textContent = '00';
    secondsEl.textContent = '00';
    clearInterval(timer);
    return;
  }

  const days = Math.floor(distance / (1000 * 60 * 60 * 24));
  const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((distance % (1000 * 60)) / 1000);

  daysEl.textContent = String(days).padStart(2, '0');
  hoursEl.textContent = String(hours).padStart(2, '0');
  minutesEl.textContent = String(minutes).padStart(2, '0');
  secondsEl.textContent = String(seconds).padStart(2, '0');
}

const timer = setInterval(updateCountdown, 1000);
updateCountdown();

const qtyInput = document.getElementById("adultos");
const qtyButtons = document.querySelectorAll(".qty-btn");

qtyButtons.forEach(btn => {
  btn.addEventListener("click", () => {
    const action = btn.dataset.action;
    let value = parseInt(qtyInput.value);
    const min = parseInt(qtyInput.min);
    const max = parseInt(qtyInput.max);

    if (action === "increase" && value < max) {
      qtyInput.value = value + 1;
    }

    if (action === "decrease" && value > min) {
      qtyInput.value = value - 1;
    }
  });
});
