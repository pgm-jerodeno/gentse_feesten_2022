(() => {
  const app = {
    init() {
      this.cacheElements();
      this.renderHTMLForHomeNews();
      this.renderHTMLForNews();
    },
    cacheElements() {
      this.$homeArticles = document.querySelector('.news__content-articles');
      this.$newsArticles = document.querySelector('.news__articles');
    },
    async renderHTMLForHomeNews() {
      const news = await getNews();
      let article;
      for (let i = 0; i < 3; i++) {
        article = news[i];
        this.$homeArticles.innerHTML += `<article>
          <h3>${article.title}</h3>
          <div class="arrow">
            <svg version="1.1" xmlns="http://www.w3.org/2000/svg" width="94" height="32" viewBox="0 0 94 32">
              <title>arrow-right-extra-long</title>
              <path d="M86.53 14.152l-5.157-5.157 2.325-2.323 9.36 9.36-9.296 9.296-2.339-2.339 5.432-5.434h-86.854v-3.403z"></path>
            </svg>
          </div>
        </article>`;
      }
    },
    async renderHTMLForNews() {
      const news = await getNews();
      news.forEach((article) => {
        this.$newsArticles.innerHTML += `<article>
          <div class="article-title">
            <h3>${article.title}</h3>
            <div class="arrow">
              <svg version="1.1" xmlns="http://www.w3.org/2000/svg" width="94" height="32" viewBox="0 0 94 32">
                <title>arrow-right-extra-long</title>
                <path d="M86.53 14.152l-5.157-5.157 2.325-2.323 9.36 9.36-9.296 9.296-2.339-2.339 5.432-5.434h-86.854v-3.403z"></path>
              </svg>
            </div>
          </div>
          <div class="article-picture">
            <img src="https://www.pgm.gent/data/gentsefeesten/${article.picture.medium}" alt="">
          </div>
        </article>`;
      })
    }
  };
  app.init();
})()