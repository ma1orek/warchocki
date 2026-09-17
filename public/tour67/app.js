'use strict';
const dialog = document.querySelector('#media-dialog');
const content = document.querySelector('#media-content');
const title = document.querySelector('#media-title');
let lastTrigger = null;
function showMedia(trigger) {
  lastTrigger = trigger;
  title.textContent = trigger.dataset.title;
  content.replaceChildren();
  document.querySelector('#media-error').hidden = true;
  if (trigger.dataset.video) {
    const video = document.createElement('video');
    video.controls = true; video.playsInline = true; video.preload = 'metadata';
    video.src = `assets/video-${trigger.dataset.video}.mp4`;
    video.poster = `assets/video-${trigger.dataset.video}.jpg`;
    video.setAttribute('aria-label', trigger.dataset.title);
    video.addEventListener('error', () => {
      document.querySelector('#media-error').hidden = false;
      document.querySelector('#media-download').href = video.src;
    });
    content.append(video);
    dialog.showModal();
    video.play().catch(() => {});
  } else {
    const img = document.createElement('img');
    img.src = `assets/${trigger.dataset.image}`; img.alt = trigger.dataset.title;
    content.append(img); dialog.showModal();
  }
  document.body.classList.add('modal-open');
  document.querySelector('#close-dialog').focus();
}
document.querySelectorAll('[data-video],[data-image]').forEach(button => button.addEventListener('click', () => showMedia(button)));
document.querySelector('#close-dialog').addEventListener('click', () => dialog.close());
dialog.addEventListener('click', event => {
  const rect = dialog.getBoundingClientRect();
  if (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) dialog.close();
});
dialog.addEventListener('close', () => {
  const video = content.querySelector('video');
  if (video) {video.pause(); video.removeAttribute('src'); video.load();}
  content.replaceChildren(); document.body.classList.remove('modal-open'); lastTrigger?.focus();
});
const routes = {
  a: {title:'Trasa, która sama jest historią.', description:'Przystanki układają się na mapie w liczbę 67. Dwie ekipy rysują jej cyfry, a każdy kolejny odcinek odsłania następny fragment trasy.', km:'2 314 km',towns:'60 miast i miejscowości',regions:'w 13 województwach',distance:'289 m',teams:'42 + 25 szkół',examples:'Przykładowe przystanki: Lubin · Tychowo · Złotoryja · Poznań · Wołczyn',left:'EKIPA 6',leftCount:'42 SZKOŁY',right:'EKIPA 7',rightCount:'25 SZKÓŁ',note:'Schemat idei wariantu A. Przebieg do potwierdzenia.'},
  b: {title:'Ze szkoły prosto na kolejne spotkanie.',description:'Szkoły wybrane pod kątem najkrótszej drogi do Biedronki. Każdemu z 67 przystanków przypisano inny sklep, a ekipy dzielą się na północ i południe.',km:'4 135 km',towns:'59 miast i miejscowości',regions:'w 15 województwach',distance:'76 m',teams:'34 + 33 szkoły',examples:'Przykładowe przystanki: Żyrardów · Knurów · Karpacz · Gdańsk · Katowice',left:'POŁUDNIE',leftCount:'34 SZKOŁY',right:'PÓŁNOC',rightCount:'33 SZKOŁY',note:'67 przystanków blisko sklepów. Przebieg do potwierdzenia.'}
};
const routeButtons = [...document.querySelectorAll('[data-route]')];
function selectRoute(button) {
  const route = routes[button.dataset.route];
  for (const tab of routeButtons) {const selected = tab === button;tab.setAttribute('aria-selected',String(selected));tab.tabIndex = selected ? 0 : -1;}
  document.querySelector('#route-panel').setAttribute('aria-labelledby',button.id);
  for (const key of ['title','description','km','towns','regions','distance','teams','examples']) document.querySelector(`#route-${key}`).textContent = route[key];
  const ends = document.querySelectorAll('.route-bottom>span');
  ends[0].replaceChildren(document.createTextNode(route.left),Object.assign(document.createElement('b'),{textContent:route.leftCount}));
  ends[1].replaceChildren(document.createTextNode(route.right),Object.assign(document.createElement('b'),{textContent:route.rightCount}));
  document.querySelector('.route-visual>p').textContent = route.note;
}
routeButtons.forEach((button,i) => {
  button.addEventListener('click', () => selectRoute(button));
  button.addEventListener('keydown', event => {
    if (['ArrowLeft','ArrowRight','Home','End'].includes(event.key)) {
      event.preventDefault();
      const next = event.key === 'Home' ? routeButtons[0] : event.key === 'End' ? routeButtons.at(-1) : routeButtons[1-i];
      selectRoute(next);next.focus();
    }
  });
});
