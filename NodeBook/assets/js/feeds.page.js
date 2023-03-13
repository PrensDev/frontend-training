const Articles = (() => {

  // ? Properties 

  const _ARTICLES = $('#articles');
  
  // ? Private Methods

  const articleTemplate = ({ _id, title, content }) => `
    <div class="card feed-card">
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
        <a href="./article.html?id=${ _id }" class="feed-title">${ title }</a>
        <div class="feed-snippet">${ content.length >= 100 ? content.substring(0, 97) + '...' : content }</div>
      </div>
      <div class="card-footer flex align-center justify-between">
        <div>
          <div class="badge badge-default">HTML</div>
          <div class="badge badge-default">CSS</div>
          <div class="badge badge-default">JavaScript</div>
        </div>
      
        <div>
          <button type="button" class="feed-btn" onclick="Articles.addToBookMark('${ _id }')">
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
    </div>
  `

  const noDataTemplate = `
    <div class="card">
      <div class="card-body nodata-container">

        <div>
          <img src="./assets/img/no_articles.svg" width="250" draggable="false"/>
        </div>

        <h3 class="nodata-title mt-2">No articles yet</h3>
        <div class="nodata-description">Be the first to post an article!</div>
      </div>
    </div>
  `

  const loadArticles = async () => {
    setTimeout(() => {
      API.get('/articles', {
        success: res => {

          if (res.length === 0) {
            _ARTICLES.innerHTML = noDataTemplate;
            return;
          }

          // Insert the articles in the page
          _ARTICLES.innerHTML = res.reverse().map(article => articleTemplate(article)).join('');
        },
        error: err => {

          // Display the error
          _ARTICLES.innerHTML = errorTemplate(err);
        }
      })
    }, 3000);
  }

  
  // ? Public Methods

  const init = () => {
    loadArticles()
  }

  const addToBookMark = async id => {
    console.log('Added to bookmark');
    
    // await API.post(`/bookmarks`, {

    // })
  }


  // ? Return Public Methods
  
  return {
    init, 
    addToBookMark
  }
})();

/**
 * * Load on page
 */

(() => {
  Articles.init();
})();