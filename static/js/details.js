(() => {
  const app = {
    init() {
      this.cacheElements();
      this.renderHTMLforDetailedEvent(DAY, SLUG);
    },
    cacheElements() {
      this.$detailedEvent = document.querySelector('.detailed-event');
    },
    async renderHTMLforDetailedEvent(day, slug) {
      const events = await getEvents();
      const event = await getEvent(day, slug);
      let picture;
      let categories = '';
      event.category.forEach((cat) => {
        categories += `<p>${cat}</p>`;
      })
      if (event.image == null) {
        picture = '../static/img/gentse-feesten-icoontjes/image-regular.svg';
      } else {
        picture = event.image.full;
      }
      this.$detailedEvent.innerHTML += `
      <div class="column">
        <div class="link-back">
          <a href="day.html?day=${event.day}">
            <svg version="1.1" xmlns="http://www.w3.org/2000/svg" width="94" height="32" viewBox="0 0 94 32">
              <title>arrow-right-extra-long</title>
              <path d="M86.53 14.152l-5.157-5.157 2.325-2.323 9.36 9.36-9.296 9.296-2.339-2.339 5.432-5.434h-86.854v-3.403z"></path>
            </svg>
            <span>OVERZICHT ${event.day_of_week.toUpperCase()} ${event.day} JULI</span>
          </a>
        </div>
        <h1>${event.title}</h1>
        <div class="subtitle">
          <div class="location">
            <svg version="1.1" xmlns="http://www.w3.org/2000/svg" width="21" height="32" viewBox="0 0 21 32">
              <title>marker</title>
              <path d="M10.4 0c-5.457 0-10.4 4.537-10.4 10.136 0 5.597 4.51 12.28 10.4 21.864 5.89-9.584 10.4-16.267 10.4-21.864 0-5.599-4.941-10.136-10.4-10.136zM10.4 14.667c-2.154 0-3.9-1.791-3.9-4s1.746-4 3.9-4c2.154 0 3.9 1.791 3.9 4s-1.746 4-3.9 4z"></path>
            </svg>
            <span>${event.location}</span>
          </div>
          <div class="time">${event.start} u. - ${event.end} u.</div>
        </div>
        <p class="description">${event.description}</p>
      </div>
      <div class="column"><div class="picture"><img src="${picture}" alt="${event.title}" loading="lazy"></div></div>
      <div class="column">
        <div class="detailed-info">
          <div class="organizer">
            <span>Organisator:</span>
            <a href="#">${event.organizer}</a>
          </div>
          <div class="website">
            <span>Website:</span>
            <a href="${event.url}" target="_blank">${event.url} <svg version="1.1" xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32">
            <title>fancyback</title>
            <path d="M10.061 26.561l-7.061-7.061 7.061-7.060c0.271-0.272 0.646-0.441 1.060-0.441s0.79 0.169 1.060 0.441l0 0c0.271 0.271 0.439 0.646 0.439 1.060s-0.168 0.789-0.439 1.060l-3.439 3.439h13.379c1.654 0 3-1.345 3-3 0-1.654-1.346-3-3-3h-2.5c-0.828 0-1.5-0.672-1.5-1.5s0.672-1.5 1.5-1.5v0h2.5c3.308 0 6 2.692 6 6 0 3.309-2.692 6-6 6h-13.379l3.439 3.44c0.283 0.273 0.458 0.656 0.458 1.079 0 0.828-0.672 1.5-1.5 1.5-0.423 0-0.806-0.175-1.079-0.457l-0-0z"></path>
            </svg></a>
          </div>
          <div class="categories">
            <span>Categorieën:</span>
            <a href="#">${categories}</a>
          </div>
          <div class="ticket">
            <span>Tickets:</span>
            <span>${event.ticket}</span>
          </div>
        </div>
      </div>
        ${this.generateHTMLForMap(event)}
        ${this.generateHTMLForEventsByOrganizer(events, event.organizer)}
        ${this.generateHTMLForEventsByLocation(events, event.location, event.day)}
      </div>`;
    },
    generateHTMLForMap(event) {
      let output = '';
      output += `<div class="map-wrapper">
        <div class="map-info">
          <div class="location">
            <svg version="1.1" xmlns="http://www.w3.org/2000/svg" width="21" height="32" viewBox="0 0 21 32">
              <title>marker</title>
              <path d="M10.4 0c-5.457 0-10.4 4.537-10.4 10.136 0 5.597 4.51 12.28 10.4 21.864 5.89-9.584 10.4-16.267 10.4-21.864 0-5.599-4.941-10.136-10.4-10.136zM10.4 14.667c-2.154 0-3.9-1.791-3.9-4s1.746-4 3.9-4c2.154 0 3.9 1.791 3.9 4s-1.746 4-3.9 4z"></path>
            </svg>
            <span>${event.location}</span>
          </div>
          <a href="https://www.google.com/maps/place/Gent/@51.0587258,3.6625944,12.25z/data=!4m5!3m4!1s0x47c370e1339443ad:0x40099ab2f4d5140!8m2!3d51.0500182!4d3.7303351" target="_blank">Open in Google Maps</a>
          <div class="festival-plan">
            <svg version="1.1" xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32">
              <title>map</title>
              <path d="M10 23.766v-17.526l-4 2v17.528l4-2zM11.086 1.224c0.265-0.141 0.58-0.224 0.914-0.224s0.649 0.083 0.925 0.229l-0.011-0.005 7.086 3.542 7.106-3.552c0.26-0.133 0.568-0.211 0.894-0.211 1.104 0 1.998 0.894 2 1.997v22c0 0 0 0.001 0 0.001 0 0.779-0.445 1.453-1.095 1.784l-0.011 0.005-7.98 3.99c-0.265 0.141-0.58 0.224-0.914 0.224s-0.649-0.083-0.925-0.229l0.011 0.005-7.086-3.542-7.106 3.554c-0.26 0.133-0.568 0.211-0.894 0.211-1.105 0-2-0.895-2-2 0-0.001 0-0.002 0-0.003v0-22c0-0.778 0.445-1.453 1.095-1.783l0.011-0.005 7.98-3.988zM14 6.238v17.528l4 2v-17.526l-4-2zM22 8.238v17.528l4-2v-17.526l-4 2z"></path>
            </svg>
            <span>DOWNLOAD FEESTPLAN</span>
          </div>
        </div>
        <div class="map"><img src="../static/img/google-maps.png" alt="kaart van Gent" loading="lazy"></div>
      </div>`;
      return output;
    },
    generateHTMLForEventsByOrganizer(events, organizer) {
      events = events.filter(event => event.organizer == organizer);
      let output = '<div class="events-other"><h2>Andere Evenementen Van Deze Organisator</h2>';
      for (let i = 0; i < 4; i++) {
        output += `<div class="event-other">
          <div class="event-other__time"><span>${events[i].day_of_week.slice(0, 2).toUpperCase()} ${events[i].day} JULI</span><span>${events[i].start} u.</span></div>
          <div class="event-other__title">${events[i].title}</div>
          <div class="event-other__location">${events[i].location}</div>
        </div>`
      }
      output += '<a href="#">ALLE EVENEMENTEN VAN DEZE ORGANISATOR</a></div>'
      return output;
    },
    generateHTMLForEventsByLocation(events, location, day) {
      // let feestpleinen = ['Korenlei-Graslei', 'Sint-Baafsplein', 'Vrijdagmarkt', 'Willem de Beersteeg', 'Baudelohof', 'Camping Vlasmarkt', 'Sint-Veerleplein', 'Walter De Buckplein', 'Kouter', 'Korenmarkt'];
      events = events.filter(event => event.day == day);
      events = events.filter(event => event.location == location);
      let l = 4;
      if (events.length == 1) {
        return '<div></div>';
      } else if (events.length < 4) {
        l = events.length;
      }
      let output = '<div class="events-other"><h2>Nog Te Beleven Op Deze Locatie</h2>';
      for (let i = 0; i < l; i++) {
        output += `<div class="event-other">
          <div class="event-other__time"><span>${events[i].day_of_week.slice(0, 2).toUpperCase()} ${events[i].day} JULI</span><span>${events[i].start} u.</span></div>
          <div class="event-other__title">${events[i].title}</div>
          <div class="event-other__location">${events[i].location}</div>
        </div>`
      }
      output += '<a href="#">ALLE EVENEMENTEN OP DEZE LOCATIE</a></div>'
      return output;
    }
  }
  app.init();
})()