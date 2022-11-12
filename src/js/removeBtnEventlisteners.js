import { refs, onLoadBtnClick } from "./searchinputLogic";


export function removeEventListeners(){
    refs.loadBtn.removeEventListener('click', onLoadBtnClick);
}

