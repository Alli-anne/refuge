// public/script.js

(function () {
  // Grab elements from the DOM
  const modal = document.querySelector('.waitlist-modal');
  const openBtn = document.getElementById('open-waitlist');

  // Defensive check (if modal doesn't exist, exit)
  if (!modal || !openBtn) return;

  const closeTargets = modal.querySelectorAll('[data-close]');

  function open() {
    modal.classList.add('open');
    modal.setAttribute('aria-hidden', 'false');

    // Trap focus to the first input element
    const firstInput = modal.querySelector('input, select, textarea, button');
    if (firstInput) firstInput.focus();

    // Prevent scrolling the background
    document.body.style.overflow = 'hidden';
  }

  function close() {
    modal.classList.remove('open');
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';

    // Return focus to the trigger button for accessibility
    openBtn.focus();
  }

  // Event listeners
  openBtn.addEventListener('click', open);
  closeTargets.forEach((btn) => btn.addEventListener('click', close));

  // Close modal when pressing ESC key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('open')) {
      close();
    }
  });
})();

// js/index.js
const form = document.querySelector('.waitlist-form');

form.addEventListener('submit', async (e) => {
  e.preventDefault(); // prevent default page reload

  const formData = new FormData(form);
  const data = Object.fromEntries(formData.entries());

  try {
    const res = await fetch(form.action, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });

    const result = await res.json();
    if (res.ok) {
      alert('Thanks for joining the waitlist!');
      form.reset();
      // optionally close modal here
    } else {
      alert(result.message || 'Error submitting form');
    }
  } catch (err) {
    console.error(err);
    alert('Network error');
  }
});
