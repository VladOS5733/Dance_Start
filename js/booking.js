const trainers = [
  { id: 1, name: 'Анна Смирнова',   direction: 'Классическая хореография', img: 'https://i.pravatar.cc/400?img=47' },
  { id: 2, name: 'Дмитрий Козлов',  direction: 'ОФП и функциональная подготовка', img: 'https://i.pravatar.cc/400?img=12' },
  { id: 3, name: 'Елена Волкова',   direction: 'Технические прогоны', img: 'https://i.pravatar.cc/400?img=32' },
  { id: 4, name: 'Максим Петров',   direction: 'Современная хореография', img: 'https://i.pravatar.cc/400?img=13' },
  { id: 5, name: 'Ольга Новикова',  direction: 'Теоретическая подготовка', img: 'https://i.pravatar.cc/400?img=45' },
  { id: 6, name: 'Сергей Морозов',  direction: 'Брейк-данс', img: 'https://i.pravatar.cc/400?img=59' },
  { id: 7, name: 'Ирина Соколова',  direction: 'Латиноамериканская программа', img: 'https://i.pravatar.cc/400?img=48' },
  { id: 8, name: 'Алексей Лебедев', direction: 'Hip-Hop', img: 'https://i.pravatar.cc/400?img=15' },
];

const grid         = document.getElementById('booking-trainers');
const modal        = document.getElementById('booking-modal');
const modalName    = document.getElementById('modal-trainer-name');
const form         = document.getElementById('booking-form');
const selectDate   = document.getElementById('select-date');
const selectTime   = document.getElementById('select-time');
const formMessage  = document.getElementById('form-message');

function renderTrainers() {
  grid.innerHTML = trainers.map((t) => `
    <article class="trainer-card bookable" data-id="${t.id}" tabindex="0">
      <img class="trainer-photo" src="${t.img}" alt="${t.name}">
      <div class="trainer-info">
        <h3 class="trainer-name">${t.name}</h3>
        <p class="trainer-direction">${t.direction}</p>
      </div>
      <button class="btn btn-coral book-btn" type="button">Записаться</button>
    </article>
  `).join('');
}

const WEEKDAYS = ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'];
const MONTHS   = ['янв', 'фев', 'мар', 'апр', 'мая', 'июн', 'июл', 'авг', 'сен', 'окт', 'ноя', 'дек'];

function fillDates() {
  const today = new Date();
  for (let i = 0; i < 14; i++) {
    const d = new Date(today);
    d.setDate(today.getDate() + i);
    const value = d.toISOString().slice(0, 10);
    const label = `${WEEKDAYS[d.getDay()]}, ${d.getDate()} ${MONTHS[d.getMonth()]}`;
    const opt = document.createElement('option');
    opt.value = value;
    opt.textContent = label;
    selectDate.appendChild(opt);
  }
}

function fillTimes() {
  for (let h = 9; h <= 21; h++) {
    for (const m of [0, 15, 30, 45]) {
      if (h === 21 && m > 0) continue; // последний слот — 21:00
      const value = `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}`;
      const opt = document.createElement('option');
      opt.value = value;
      opt.textContent = value;
      selectTime.appendChild(opt);
    }
  }
}

function openModal(trainerId) {
  const trainer = trainers.find((t) => t.id === trainerId);
  if (!trainer) return;

  modalName.textContent = trainer.name;
  form.reset();
  formMessage.textContent = '';
  formMessage.className = 'form-message';

  modal.classList.add('open');
  modal.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';

  form.querySelector('input[name="fio"]').focus();
}

function closeModal() {
  modal.classList.remove('open');
  modal.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
}

grid.addEventListener('click', (e) => {
  const card = e.target.closest('.bookable');
  if (card) openModal(Number(card.dataset.id));
});

grid.addEventListener('keydown', (e) => {
  if (e.key === 'Enter' || e.key === ' ') {
    const card = e.target.closest('.bookable');
    if (card) {
      e.preventDefault();
      openModal(Number(card.dataset.id));
    }
  }
});

modal.addEventListener('click', (e) => {
  if (e.target.matches('[data-close]')) closeModal();
});

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && modal.classList.contains('open')) closeModal();
});

form.addEventListener('submit', (e) => {
  e.preventDefault();

  const fio   = form.fio.value.trim();
  const phone = form.phone.value.trim();
  const date  = form.date.value;
  const time  = form.time.value;

  if (fio.length < 5) {
    formMessage.textContent = 'Введите корректное ФИО';
    formMessage.className = 'form-message error';
    return;
  }
  if (!/^[\+0-9\s\(\)\-]{10,20}$/.test(phone)) {
    formMessage.textContent = 'Введите корректный номер телефона';
    formMessage.className = 'form-message error';
    return;
  }
  if (!date || !time) {
    formMessage.textContent = 'Выберите дату и время';
    formMessage.className = 'form-message error';
    return;
  }

  const [y, m, d] = date.split('-');
  formMessage.textContent =
    `Готово! Вы записаны на ${d}.${m}.${y} в ${time} к тренеру ${modalName.textContent}.`;
  formMessage.className = 'form-message success';

  form.querySelector('input[name="fio"]').value = '';
  form.querySelector('input[name="phone"]').value = '';

  setTimeout(closeModal, 2200);
});

renderTrainers();
fillDates();
fillTimes();