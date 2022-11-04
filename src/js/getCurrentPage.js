export function getCurrentPage() {
  let currentPage;

  let currentUrl = window.location.href;
  currentUrl.includes('library')
    ? (currentPage = 'library')
    : (currentPage = 'home');

  document
    .querySelector(`[data-${currentPage}]`)
    .classList.add('nav-link__active');
}
