(() => {
  const app = {
    init() {
      this.cacheElements();
      this.toggleCurrentDay(DAY);
      this.generateDayTitle(DAY);
    },
    cacheElements() {
      this.$days = document.querySelectorAll('.day');
      this.$dayTitle = document.querySelector('.day-title');
    },
    toggleCurrentDay(day) {
      this.$days[day - 15].classList.toggle('current-day');
    },
    generateDayTitle(day) {
      const day_of_week = ['Vrijdag', 'Zaterdag', 'Zondag', 'Maandag', 'Dinsdag', 'Woensdag', 'Donderdag', 'Vrijdag', 'Zaterdag', 'Zondag']
      let output = `${day_of_week[day-15]} ${day} juli`;
      this.$dayTitle.innerHTML = output;
    },
  };
  app.init();
})()