const query = window.location.search;
const params = new URLSearchParams(query);
const DAY = params.get('day');
const SLUG = params.get('slug');
const SEARCH = params.get('txtSearch');

const getNews = async() => {
  let news = [];
  const newsPromise = await fetch(' https://www.pgm.gent/data/gentsefeesten/news.json')
    .then((response) => {
      if (response.status == 200) {
        return response.json();
      }
      throw Error('Something went wrong!');
    })
    .then((data) => {
      news.push(...data);
    })
    .catch((error) => {
      console.log(`Catch: ${error}`);
    });
    return news;
};

const getCategories= async () => {
  let categories = [];
  const categoriesPromise = await fetch('https://www.pgm.gent/data/gentsefeesten/categories.json')
    .then((response) => {
      if(response.status == 200) {
        return response.json();
      }
      throw Error('Something went wrong!');
    })
    .then((data) => {
      categories.push(...data);
    })
    .catch((error) => {
      console.log(`Catch: ${error}`);
    });
  return categories;
};

const getEvents = async (day) => {
  let events = [];
  const eventsPromise = await fetch('https://www.pgm.gent/data/gentsefeesten/events.json')
    .then((response) => {
      if (response.status == 200) {
        return response.json();
      }
      throw Error('Something went wrong!');
    })
    .then((data) => {
      events.push(...data);
    })
    .catch((error) => {
      console.log(`Catch: ${error}`);
    });
  if (day == undefined) {
    return events;
  } else {
    let eventsOnDay = events.filter(event => event.day == day);
    return eventsOnDay;
  }
};

const getEvent = async (day, slug) => {
  let events = await getEvents(day);
  let event = events.filter(ev => ev.slug == slug);
  event = event[0];
  return event;
};