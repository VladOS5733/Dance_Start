const lessons = [
  { day: 'Пн', time: '09:00', training: 'Классическая хореография', trainer: 'Анна Смирнова',   format: 'Групповая' },
  { day: 'Пн', time: '11:00', training: 'ОФП',                       trainer: 'Дмитрий Козлов',   format: 'Групповая' },
  { day: 'Пн', time: '18:00', training: 'Технические прогоны',      trainer: 'Елена Волкова',    format: 'Групповая' },
  { day: 'Пн', time: '20:00', training: 'Современная хореография',  trainer: 'Максим Петров',    format: 'Групповая' },

  { day: 'Вт', time: '10:00', training: 'Теоретическая подготовка', trainer: 'Ольга Новикова',   format: 'Лекция' },
  { day: 'Вт', time: '12:00', training: 'Классическая хореография', trainer: 'Анна Смирнова',    format: 'Групповая' },
  { day: 'Вт', time: '17:00', training: 'Брейк-данс',               trainer: 'Сергей Морозов',   format: 'Групповая' },
  { day: 'Вт', time: '19:00', training: 'Латина',                   trainer: 'Ирина Соколова',   format: 'Групповая' },

  { day: 'Ср', time: '09:00', training: 'ОФП',                      trainer: 'Дмитрий Козлов',   format: 'Групповая' },
  { day: 'Ср', time: '13:00', training: 'Технические прогоны',      trainer: 'Елена Волкова',    format: 'Индивидуальная' },
  { day: 'Ср', time: '18:00', training: 'Hip-Hop',                  trainer: 'Алексей Лебедев',  format: 'Групповая' },
  { day: 'Ср', time: '20:00', training: 'Классическая хореография', trainer: 'Анна Смирнова',    format: 'Групповая' },

  { day: 'Чт', time: '10:00', training: 'Теоретическая подготовка', trainer: 'Ольга Новикова',   format: 'Лекция' },
  { day: 'Чт', time: '12:00', training: 'Латина',                   trainer: 'Ирина Соколова',   format: 'Групповая' },
  { day: 'Чт', time: '17:00', training: 'Брейк-данс',               trainer: 'Сергей Морозов',   format: 'Групповая' },
  { day: 'Чт', time: '19:30', training: 'Современная хореография',  trainer: 'Максим Петров',    format: 'Групповая' },

  { day: 'Пт', time: '09:00', training: 'ОФП',                      trainer: 'Дмитрий Козлов',   format: 'Групповая' },
  { day: 'Пт', time: '11:00', training: 'Классическая хореография', trainer: 'Анна Смирнова',    format: 'Групповая' },
  { day: 'Пт', time: '18:00', training: 'Hip-Hop',                  trainer: 'Алексей Лебедев',  format: 'Групповая' },
  { day: 'Пт', time: '20:00', training: 'Технические прогоны',      trainer: 'Елена Волкова',    format: 'Групповая' },

  { day: 'Сб', time: '10:00', training: 'Классическая хореография', trainer: 'Анна Смирнова',    format: 'Групповая' },
  { day: 'Сб', time: '12:00', training: 'Латина',                   trainer: 'Ирина Соколова',   format: 'Групповая' },
  { day: 'Сб', time: '15:00', training: 'Современная хореография',  trainer: 'Максим Петров',    format: 'Групповая' },
  { day: 'Сб', time: '17:00', training: 'Брейк-данс',               trainer: 'Сергей Морозов',   format: 'Групповая' },

  { day: 'Вс', time: '11:00', training: 'Теоретическая подготовка', trainer: 'Ольга Новикова',   format: 'Лекция' },
  { day: 'Вс', time: '14:00', training: 'Hip-Hop',                  trainer: 'Алексей Лебедев',  format: 'Групповая' },
];

const dayOrder = { 'Пн': 1, 'Вт': 2, 'Ср': 3, 'Чт': 4, 'Пт': 5, 'Сб': 6, 'Вс': 7 };

const selectTraining = document.getElementById('filter-training');
const selectTrainer  = document.getElementById('filter-trainer');
const selectDay      = document.getElementById('filter-day');
const selectTime     = document.getElementById('filter-time');
const tbody          = document.getElementById('schedule-body');

function fillSelect(select, values) {
  values.forEach((value) => {
    const opt = document.createElement('option');
    opt.value = value;
    opt.textContent = value;
    select.appendChild(opt);
  });
}

function uniqueValues(arr, key) {
  return [...new Set(arr.map((x) => x[key]))].sort((a, b) => a.localeCompare(b, 'ru'));
}

function getPeriod(timeStr) {
  const hour = parseInt(timeStr.split(':')[0], 10);
  if (hour < 12) return 'Утро';
  if (hour < 17) return 'День';
  return 'Вечер';
}

function render() {
  const trainingFilter = selectTraining.value;
  const trainerFilter  = selectTrainer.value;
  const dayFilter      = selectDay.value;
  const timeFilter     = selectTime.value;

  const filtered = lessons
    .filter((l) => (
      (!trainingFilter || l.training === trainingFilter) &&
      (!trainerFilter  || l.trainer  === trainerFilter)  &&
      (!dayFilter      || l.day      === dayFilter)      &&
      (!timeFilter     || getPeriod(l.time) === timeFilter)
    ))
    .sort((a, b) => dayOrder[a.day] - dayOrder[b.day] || a.time.localeCompare(b.time));

  if (filtered.length === 0) {
    tbody.innerHTML = '<tr><td colspan="5" class="empty">По выбранным фильтрам занятий не найдено</td></tr>';
    return;
  }

  tbody.innerHTML = filtered.map((l) => `
    <tr>
      <td><strong>${l.day}</strong></td>
      <td>${l.time}</td>
      <td>${l.training}</td>
      <td>${l.trainer}</td>
      <td>${l.format}</td>
    </tr>
  `).join('');
}

fillSelect(selectTraining, uniqueValues(lessons, 'training'));
fillSelect(selectTrainer,  uniqueValues(lessons, 'trainer'));
fillSelect(selectDay,      uniqueValues(lessons, 'day').sort((a, b) => dayOrder[a] - dayOrder[b]));

[selectTraining, selectTrainer, selectDay, selectTime].forEach((s) => {
  s.addEventListener('change', render);
});

// Первый рендер
render();