export function removeEventListeners(fn) {
  document.querySelector('.load-btn').replaceWith(document.querySelector('.load-btn').cloneNode(true));
  document.querySelector('.load-btn').classList.add('load-btn-visible');
  document.querySelector('.load-btn').addEventListener('click', fn)
}

export function removeBtn() {
  document.querySelector('.load-btn').classList.remove('load-btn-visible');
}