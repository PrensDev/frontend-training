const Articles = (() => {
  
  // ? Private Methods

  const articleTemplate = ({ _id, title, content }) => `
    <a href="./article?id=${ _id }" class="card feed-card">
      <div class="card-header border-b-0">
        <div class="feed-author-container">
          <div class="feed-author-img">
            <img src="https://randomuser.me/api/portraits/men/55.jpg" alt="">
          </div>
          <div class="fedd-author-content">
            <div class="feed-author">Jetsun Prince Torres</div>
            <div class="feed-created">prensdev.nodebook.dev | March 5, 2023</div>
          </div>
        </div>
      </div>
      <div class="card-body py-0">
        <div class="feed-title">${ title }</div>
        <div class="feed-snippet">${ content.length >= 100 ? content.substring(0, 97) + '...' : content }</div>
      </div>
      <div class="card-footer flex align-center justify-between">
        <div>
          <div class="badge badge-default">HTML</div>
          <div class="badge badge-default">CSS</div>
          <div class="badge badge-default">JavaScript</div>
        </div>
      
        <div>
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
      </div>
    </a>
  `

  const loadArticles = async () => {
    setTimeout(() => {
      API.get('/articles', {
        success: res => {
          $('#articles').innerHTML = res.reverse().map(article => articleTemplate(article)).join('');
        },
        error: err => {
          $('#articles').innerHTML = errorTemplate(err);
        }
      })
    }, 3000);
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