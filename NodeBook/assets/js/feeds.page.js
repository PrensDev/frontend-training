const Articles = (() => {
  
  // ? Private Methods

  const articleTemplate = article => `
    <a href="./article?id=${ article._id }" class="card feed-card">
      <div class="card-header border-b-0">
        <div class="feed-author-container">
          <div class="feed-author-img">
            <img src="" alt="">
          </div>
          <div class="fedd-author-content">
            <div class="feed-author">Jetsun Prince Torres</div>
            <div class="feed-created">March 5, 2023</div>
          </div>
        </div>
      </div>
      <div class="card-body py-0">
        <div class="feed-title">${ article.title }</div>
        <div class="feed-snippet">${ article.content }</div>
      </div>
      <div class="card-footer">
        <button type="button" class="feed-btn">
          <i class="fa-regular fa-bookmark"></i>
        </button>
        <button type="button" class="feed-btn">
          <i class="fa-regular fa-heart"></i>
        </button>
        <button type="button" class="feed-btn">
          <i class="fa-regular fa-comment"></i>
        </button>
      </div>
    </a>
  `

  const loadArticles = async () => {
    API.get('/articles', {
      success: res => {
        $('#articles').innerHTML = res.map(article => articleTemplate(article)).join('');
      }
    })
  }

  
  // ? Public Methods

  const init = () => {
    loadArticles()
  }


  // ? Return Public Methods
  
  return {
    init
  }
})();

/**
 * * Load on page
 */

(() => {
  Articles.init();
})();