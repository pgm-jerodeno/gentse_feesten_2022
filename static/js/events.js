(() => {
  const app = {
    init() {
      this.cacheElements();
      this.renderHTMLForEventsHome();
      this.addCheckListener();
      this.eventsForDay = null;
      this.renderHTMLForEvents(DAY);
      this.addSearchListener();
      this.toggleGridView();
      this.toggleListView();
      this.wheelchair = false;
      this.free = false;
    },
    cacheElements() {
      this.$eventsHome = document.querySelector('.home__events');
      this.$categorieList = document.querySelector('.categorie__list');
      this.$formCheck = document.querySelector('#formCheck');
      this.$events = document.querySelector('.events');
      this.$formSearch = document.querySelector('#formSearch');
      this.$searchResultString = document.querySelector('.search-result-string');
      this.$searchResults = document.querySelector('.search__results');
      this.$grid = document.querySelector('.lay-out-selector div:first-of-type');
      this.$list = document.querySelector('.lay-out-selector div:last-of-type');
    },

    // generate HTML for a each event card
    generateHTMLForEventCard(events) {
      let picture;
      let output = '';
      events.forEach((event) => {
        if (event.image == null) {
          picture = '../static/img/gentse-feesten-icoontjes/image-regular.svg';
        } else {
          picture = event.image.full;
        }
        output += `<article class="event-card">
          <a href="detail.html?day=${event.day}&slug=${event.slug}">
            <div class="event-date">${event.day_of_week.slice(0, 2).toUpperCase()} ${event.day} JULI</div>
            <div class="event-picture"><img src="${picture}" alt="" loading="lazy"></div>
            <div class="event-details">
              <h3 class="event-title">${event.title}</h3>
              <span class="event-location">${event.location}</span>
              <span class="event-start">${event.start} u.</span>
            </div>
          </a>
        </article>`;
      })
      return output;
    },

    // generate HTML for the events on the home page
    async renderHTMLForEventsHome() {
      const events = await getEvents();
      let r = Math.floor(Math.random() * events.length);
      let randomEvents = events.slice(r, r+8);
      this.$eventsHome.innerHTML = this.generateHTMLForEventCard(randomEvents);
    },

    // listen for the checkboxes in the filter component
    async addCheckListener() {
      this.$formCheck.addEventListener('change', async (ev) => {
        if (ev.target.id === 'wheelchair') {
          this.wheelchair = ev.target.checked;
          this.$events.innerHTML = '';
          await this.renderHTMLForEvents(DAY);
        };
        if (ev.target.id === 'free') {
          this.free = ev.target.checked;
          this.$events.innerHTML = '';
          await this.renderHTMLForEvents(DAY);
        };
      })
    },

    // get the events for the current day and sort them per category
    async renderHTMLForEvents(day) {
      const events = await getEvents(day);
      this.sortEventsPerCategory(events, this.wheelchair, this.free);
    },

    // sort the events for the current day per category
    sortEventsPerCategory(events, wheelchair, free) {
      // get a set of unique categories from the list of events for the current day
      let categoriesSet = new Set();
      events.forEach((event) => {
        categoriesSet.add(...event.category);
      });
      const categories = Array.from(categoriesSet).sort();
      // load the list of unique categories in the filter component
      this.$categorieList.innerHTML = this.renderHTMLForCategories(categories);

      // for each category, find the list of events and group these together
      categories.forEach((category) => {
        let filteredEvents = events.filter(event => {return event.category.find((cat) => cat == category)});
        if (wheelchair === true) {
          filteredEvents = filteredEvents.filter((event) => {
            return event.wheelchair_accessible === wheelchair
          });
        };
        if (free === true) {
          filteredEvents = filteredEvents.filter((event) => {
            return event.ticket === "free";
          });
        };
        filteredEvents = filteredEvents.sort((event1, event2) => (event1.sort_key > event2.sort_key) ? 1 : ((event2.sort_key > event1.sort_key) ? -1 : 0));
        this.$events.innerHTML += `<div class="event" id="${category}">
        <div class="event__category-title">
          <h2>${category}</h2>
          <a href="#filter"><svg version="1.1" xmlns="http://www.w3.org/2000/svg" width="18" height="32" viewBox="0 0 18 32">
          <title>arrow-up</title>
          <path d="M17.809 9.9l-8.88-9.9-8.929 9.897 2.225 2.007 5.189-5.752-0 25.848h2.997l0-25.863 5.169 5.763z"></path>
          </svg></a>
        </div>
        ${this.generateHTMLForEventCard(filteredEvents)}</div>`;
      })
    },

    // generate html for the list of categories used in the filter component
    renderHTMLForCategories(categories) {
      let output = '';
      categories.forEach((category) => {
        output += `<li class="categorie__list-item">
          <a href="#${category}">
            <svg version="1.1" xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32">
              <title>category</title>
              <path d="M10.741 32c-2.648 0-5.137-1.031-7.009-2.902s-2.903-4.361-2.903-7.009 1.031-5.137 2.903-7.009l13.006-13.006c1.338-1.337 3.115-2.074 5.006-2.074s3.668 0.737 5.006 2.073c1.337 1.337 2.073 3.115 2.073 5.007s-0.737 3.67-2.073 5.007l-13.022 13.006c-1.591 1.592-4.413 1.594-6.005 0.001-0.791-0.792-1.245-1.887-1.245-3.005 0-1.135 0.442-2.202 1.244-3.003l12.016-12.002c0.553-0.551 1.45-0.553 2.003 0.001 0.551 0.553 0.551 1.449-0.001 2.001l-12.017 12.002c-0.267 0.267-0.414 0.622-0.414 1.001 0 0.373 0.151 0.738 0.415 1.002 0.53 0.529 1.472 0.531 2.004 0l13.021-13.007c0.802-0.801 1.244-1.868 1.244-3.004s-0.442-2.203-1.244-3.004c-1.606-1.606-4.403-1.606-6.009 0l-13.006 13.006c-1.337 1.338-2.074 3.115-2.074 5.007s0.737 3.669 2.074 5.007c1.337 1.337 3.115 2.073 5.007 2.073s3.67-0.737 5.007-2.073l13.006-13.006c0.553-0.553 1.448-0.553 2.001 0s0.553 1.448 0 2.001l-13.006 13.006c-1.872 1.871-4.361 2.902-7.009 2.902z"></path>
            </svg>
            <span>${category}</span>
          </a>
        </li>`;
      })
      return output;
    },

    // listen for the search query
    async addSearchListener() {
      const events = await getEvents();
      this.$formSearch.addEventListener('submit', (ev) => {
        ev.preventDefault();
        let userInput = ev.currentTarget.elements.search.value;
        userInput = userInput.trim().toLowerCase();
        this.searchEvents(events, userInput);
      })
    },

    // generate the sentence with the number of results for a specific query
    generateSearchResultString(events, search) {
      this.$searchResultString.innerHTML = `<strong>${events.length} resultaten</strong> voor "${search}"`;
    },

    // search for the events that correspond with the query
    searchEvents(events, search = "puppetbusker") {
      let filteredEvents = [];
      events.forEach((event) => {
        let eventStr = JSON.stringify(event).toLowerCase();
        let searchLocation = eventStr.search(search);
        if(searchLocation != -1) {
          filteredEvents.push(event)
        }
      })
      filteredEvents = filteredEvents.sort((event1, event2) => (event1.sort_key > event2.sort_key) ? 1 : ((event2.sort_key > event1.sort_key) ? -1 : 0));
      this.$searchResults.innerHTML =  this.generateHTMLForEventCard(filteredEvents);
      this.generateSearchResultString(filteredEvents, search);
    },
    
    toggleGridView() {
      this.$grid.addEventListener('click', () => {
        this.$events.classList.add('grid');
        this.$events.classList.remove('list');
        this.$grid.classList.add('active');
        this.$list.classList.remove('active');
      });
    },
    toggleListView() {
      this.$list.addEventListener('click', () => {
        this.$events.classList.add('list');
        this.$events.classList.remove('grid');
        this.$list.classList.add('active');
        this.$grid.classList.remove('active');
      });
    },
  };
  app.init();
})()