(() => {
  const refs = {
    openModalBtn: document.querySelector("[data-modal-open]"),
    closeModalBtn: document.querySelector("[data-modal-close]"),
    modal: document.querySelector("[data-modal]"),
    body:document.querySelector('body')
  };

  refs.openModalBtn.addEventListener("click", toggleModal);
  refs.closeModalBtn.addEventListener("click", toggleModal);


  window.addEventListener('click', evt => {
    
    if (evt.target === refs.modal) {
      toggleModal();
    }
  });

  window.addEventListener('keydown', evt => {
    if (evt.code === "Escape" && !refs.modal.classList.contains("is-hidden")) {
      toggleModal();
    }
  });

  function toggleModal() {
    refs.modal.classList.toggle("is-hidden");
    refs.body.classList.toggle('no-scroll')
  }
})();