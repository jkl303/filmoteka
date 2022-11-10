export function becomeDark() {
  document.body.classList.add('dark');
  localStorage.setItem('theme', 'dark');
}
export function becomeLight() {
  document.body.classList.remove('dark');
  localStorage.removeItem('theme');
}
export function storageChecker() {
  if (localStorage.getItem('theme') !== null)
    document.body.classList.add('dark');
}
