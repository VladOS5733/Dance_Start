const reviews = [
  { author: 'Мария К.',   rating: 5, text: 'Занимаюсь у Анны Смирновой уже второй год. Классика на высшем уровне, всё объясняется медленно и понятно.' },
  { author: 'Павел И.',   rating: 5, text: 'ОФП с Дмитрием Козловым — это отдельный вид удовольствия. Выносливость выросла в разы.' },
  { author: 'Анастасия В.', rating: 5, text: 'Елена Волкова помогла подготовить конкурсную программу. Заняли первое место на региональном турнире!' },
  { author: 'Кирилл С.',  rating: 4, text: 'Очень нравится современная хореография у Максима Петрова. Минус только один — тренировки очень быстро заканчиваются.' },
  { author: 'Дарья М.',   rating: 5, text: 'Теоретическая подготовка у Ольги Новиковой — просто кладезь знаний. Понимаешь не только «как», но и «почему».' },
  { author: 'Игорь Л.',   rating: 5, text: 'Хожу к Сергею Морозову на брейк-данс. Атмосфера дружелюбная, прогресс чувствуется уже через месяц.' },
];

const faq = [
  { q: 'С какого возраста можно начать заниматься?', a: 'В клуб принимаются дети с 4 лет и взрослые любого возраста. Для новичков есть отдельные группы и персональные занятия.' },
  { q: 'Нужна ли специальная подготовка для начала?', a: 'Нет. Достаточно желания. На первых занятиях тренер оценит уровень и подскажет, с какого направления лучше начать.' },
  { q: 'Как записаться на индивидуальную тренировку?', a: 'Перейдите на страницу «Индивидуально», выберите тренера, укажите ФИО, телефон, дату и время в модальном окне и подтвердите запись.' },
  { q: 'Сколько длится одно занятие?', a: 'Индивидуальная тренировка длится 45 минут. Групповые занятия — от 60 до 90 минут в зависимости от направления.' },
  { q: 'Можно ли перенести запись?', a: 'Да, если предупредить администратора не позднее чем за 12 часов до начала тренировки. Контакты есть в подвале сайта.' },
  { q: 'Есть ли пробное занятие?', a: 'Да, первое занятие в любой группе — бесплатное. Достаточно записаться по телефону или через администратора клуба.' },
];

const reviewsList = document.getElementById('reviews-list');
reviewsList.innerHTML = reviews.map((r) => `
  <article class="review-card">
    <div class="review-header">
      <span class="review-author">${r.author}</span>
      <span class="review-stars">${'★'.repeat(r.rating)}${'☆'.repeat(5 - r.rating)}</span>
    </div>
    <p class="review-text">${r.text}</p>
  </article>
`).join('');

const faqList = document.getElementById('faq-list');
faqList.innerHTML = faq.map((item, i) => `
  <div class="faq-item">
    <button class="faq-question" type="button" aria-expanded="false" aria-controls="faq-${i}">
      ${item.q}
    </button>
    <div class="faq-answer" id="faq-${i}">${item.a}</div>
  </div>
`).join('');

faqList.addEventListener('click', (e) => {
  const btn = e.target.closest('.faq-question');
  if (!btn) return;

  const item = btn.parentElement;
  const isOpen = item.classList.contains('open');

  faqList.querySelectorAll('.faq-item').forEach((el) => {
    el.classList.remove('open');
    el.querySelector('.faq-question').setAttribute('aria-expanded', 'false');
  });

  if (!isOpen) {
    item.classList.add('open');
    btn.setAttribute('aria-expanded', 'true');
  }
});