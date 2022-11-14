import { refs, onLoadBtnClick } from './searchinputLogic';
import { seeMoreByName, seeMoreByYear } from './homePageSorting';

export function removeEventListeners() {
  document
    .querySelector('.load-btn')
    .removeEventListener('click', onLoadBtnClick);
  document
    .querySelector('.load-btn')
    .removeEventListener('click', seeMoreByName);
  document
    .querySelector('.load-btn')
    .removeEventListener('click', seeMoreByYear);
}
