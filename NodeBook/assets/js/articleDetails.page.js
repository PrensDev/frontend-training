const ArticleDetails = (() => {

  // ? Properties

  const _ARTICLE_CONTENT = $('#articleContent');

  const _id = URLQueryParams.id;

  let _initialized = false;
  

  // ? Private Methods

  const articleContentTemplate = ({ title, content }) => `
    <div class="card">
      <div class="card-body">
        
        <div class="text-center article-header">
          <h3 class="article-title">${ title }</h3>
          <div class="article-header-info">Author: Jetsun Prince Torres</div>
          <div class="article-header-info">Last Updated: March 13, 2023</div>
        </div>

        <div class="article-content mt-4">${ content }</div>
      </div>
    </div>
  `

  const getArticleDetails = async () => {
    await API.get(`/articles/${ _id }`, {
      success: res => {
        _ARTICLE_CONTENT.innerHTML = articleContentTemplate(res);
      },
      error: err => {
        _ARTICLE_CONTENT.innerHTML = errorTemplate(`${ err }: ${ _id }`);
      }
    })
  }


  // ? Public Methods

  const init = async () => {

    // Check if ArticleDetails has been initialized
    if (_initialized) {
      console.warn('ArticleDetails has already been initialized');
      return;
    }
    
    // Check if id exist in URL params
    if (!_id) {

      // Show the error template
      _ARTICLE_CONTENT.innerHTML = errorTemplate('URLQueryParams.id is not defined, article was not found');
      _initialized = true;
      return;
    }

    // Get the details of the article
    await getArticleDetails();

    // Set this class as initialized
    _initialized = true;
  }

  // ? Return public methods
  return { init }
})();

ArticleDetails.init();