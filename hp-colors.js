const buttons = document.querySelectorAll('button');
const form = document.querySelector('form');
const toggleSections = document.querySelectorAll('.original, .experimental');

const copyToClipboard = str => {
  const el = document.createElement('textarea');
  el.value = str;
  el.setAttribute('readonly', '');
  el.style.position = 'absolute';
  el.style.left = '-9999px';
  document.body.appendChild(el);
  el.select();
  document.execCommand('copy');
  document.body.removeChild(el);
};

const displayFeedback = el => {
  const target = el.querySelector('span') || el;
  console.log(target);
  target.classList.add('active');
  setTimeout(() => target.classList.remove('active'), 1000);
}

function clickHandler(e) {
  const el = e.target;
  const name = el.className;
  const palette = getComputedStyle(document.body);
  const hexValue = palette.getPropertyValue(name).trim().substring(1);
  copyToClipboard(hexValue);
  displayFeedback(el);
}

function sectionHandler(e) {
  toggleSections.forEach(section => {
    if (section.classList.contains(e.target.id)) {
      section.classList.add('active');
    } else {
      section.classList.remove('active');
    }
  })
}

buttons.forEach(button => button.addEventListener('click', clickHandler))
form.addEventListener('change', sectionHandler)