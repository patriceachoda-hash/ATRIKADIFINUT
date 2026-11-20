document.querySelector('.menu-toggle')?.addEventListener('click', () => {
  document.querySelector('.nav-links')?.classList.toggle('open');
});

const page = location.pathname.split('/').pop() || 'index.html';
document.querySelectorAll('.nav-links a').forEach((link) => {
  if (link.getAttribute('href') === page) link.classList.add('active');
});

document.querySelectorAll('.faq-question').forEach((button) => {
  button.addEventListener('click', () => {
    const item = button.closest('.faq-item');
    const open = item.classList.toggle('open');
    button.setAttribute('aria-expanded', String(open));
  });
});

const filterButtons = document.querySelectorAll('.filter-button');
const searchInput = document.querySelector('#device-search');
const deviceCards = document.querySelectorAll('.device-card');
function filterDevices() {
  const category = document.querySelector('.filter-button.active')?.dataset.category || 'all';
  const query = searchInput?.value.toLowerCase() || '';
  deviceCards.forEach((card) => {
    const matchesCategory = category === 'all' || card.dataset.category === category;
    const matchesQuery = card.textContent.toLowerCase().includes(query);
    card.style.display = matchesCategory && matchesQuery ? '' : 'none';
  });
}
filterButtons.forEach((button) => button.addEventListener('click', () => {
  filterButtons.forEach((item) => item.classList.remove('active'));
  button.classList.add('active');
  filterDevices();
}));
searchInput?.addEventListener('input', filterDevices);

document.querySelectorAll('.pricing-toggle button').forEach((button) => {
  button.addEventListener('click', () => {
    document.querySelectorAll('.pricing-toggle button').forEach((item) => item.classList.remove('active'));
    button.classList.add('active');
    document.querySelectorAll('[data-monthly]').forEach((price) => {
      const value = button.dataset.period === 'annual' ? price.dataset.annual : price.dataset.monthly;
      price.innerHTML = `${value}<small>/mo</small>`;
    });
  });
});

const imageInput = document.querySelector('#device-image');
const imagePreview = document.querySelector('#listing-preview');
imageInput?.addEventListener('change', () => {
  const file = imageInput.files?.[0];
  if (!file || !file.type.startsWith('image/')) return;
  if (file.size > 5 * 1024 * 1024) {
    imageInput.setCustomValidity('Please choose an image smaller than 5MB.');
    imageInput.reportValidity();
    imageInput.value = '';
    return;
  }
  imageInput.setCustomValidity('');
  const reader = new FileReader();
  reader.onload = () => {
    imagePreview.src = reader.result;
    imagePreview.style.display = 'block';
  };
  reader.readAsDataURL(file);
});

document.querySelectorAll('[data-quote-form], [data-listing-form]').forEach((form) => {
  form.insertAdjacentHTML('afterbegin', '<input type="hidden" name="_replyto" value="">');
  form.addEventListener('submit', () => {
    const emailInput = form.querySelector('[name="email"], [name="ownerEmail"]');
    const replyTo = form.querySelector('[name="_replyto"]');
    if (emailInput && replyTo) replyTo.value = emailInput.value;
  });
});

