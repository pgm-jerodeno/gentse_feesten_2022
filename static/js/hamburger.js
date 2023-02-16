(() => {
  const app = {
    init() {
      this.cacheElements();
      this.toggleHamburgerMenu();
    },
    cacheElements() {
      this.$hamburger = document.querySelector('.hamburger');
      this.$menu = document.querySelector('.menu');
      this.$close = document.querySelector('.close');
    },
    toggleHamburgerMenu() {
      this.$menu.addEventListener('click', () => {
        this.$hamburger.classList.toggle('isopen');
      });
      this.$close.addEventListener('click', () => {
        this.$hamburger.classList.toggle('isopen');
      });
    }
  };
  app.init();
})();