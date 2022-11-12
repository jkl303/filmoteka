import { refs, onLoadBtnClick } from './searchinputLogic';
import { seeMoreByName, seeMoreByYear } from './homePageSorting';

export function removeEventListeners() {
  refs.loadBtn.removeEventListener('click', onLoadBtnClick);
  refs.loadBtn.removeEventListener('click', seeMoreByName);
  refs.loadBtn.removeEventListener('click', seeMoreByYear);
}
