import { refs } from "./searchinputLogic";

const observerOpions = {
    root: null,
    rootMargin: '0px',
    threshold: 1.0,
  };
 const observer = new IntersectionObserver(
    onBtnShow,
    observerOpions
  );


  function onBtnShow(entries) {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        refs.list.style.marginBottom = '75px';
        refs.loadBtn.classList.add('load-btn-visible');
      }
    });
  }


  export function addObserver(){
observer.observe(refs.guard);
  }

  export function removeObserver(){
    observer.unobserve(refs.guard);
  }