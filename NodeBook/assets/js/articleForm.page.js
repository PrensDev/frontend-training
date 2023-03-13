const ArticleForm = (() => {
  
  // ? Properties
  
  const _id = URLQueryParams.id;
  const mode = _id ? 'edit' : 'create';

  const _ARTICLE_FORM = $('#articleForm');

  let _oldData;
  let _initialized = false;


  // ? Private methods

  const initEdit = async () => {
    await API.get(`/articles/${ _id }`, {
      success: res => {
        const { title, content } = res;
        
        // Store the old data for reference
        _oldData = res;

        // Populate the inputs
        $('#title_input').value = title;
        $('#content_input').value = content;
      },
      error: err => {
        console.error(err);
      }
    })
  }


  // ? Public methods

  const init = async () => {

    // Check if ArticleForm has been initialized
    if (_initialized) {
      console.warn('ArticleForm has already been initialized');
      return;
    }

    // If mode is edit, initialize the edit function
    if (mode === 'edit') await initEdit();
  
    // Handle on form submit event
    _ARTICLE_FORM.addEventListener('submit', async function(e) {
      e.preventDefault();
    
      const fd = new FormData(this);
      
      // Append additional data
      const additionalData = {
        user_id: '1a0f6d47-46c7-48da-a056-496de699e6ef',
        created_at: mode === 'create' ? new Date() : _oldData.created_at,
        updated_at: mode === 'edit' ? new Date() : null,
      }
      Object.entries(additionalData).forEach(([key, value]) => fd.append(key, value));
    
      // Get the object formatted data
      const data = formDataToJSON(fd);
    
      // Validate field
      const errors = validateDataObj(data);
      if (errors) {
        console.warn('Incomplete fields');
        return;
      } 
    
      // Set the button to loading
      $('#publish_btn').setAttribute('disabled', 'disabled');
      $('#publish_btn').innerText = 'Loading...';
    
      // Save the article in API
      mode === 'create'
        ? await API.post(`/articles`, {
          data: data,
          success: () => {
      
            // If success, redirect to home page
            location.replace('./myArticles.html');
          },
          error: err => {
            console.error(err)
          }
        })
        : await API.put(`/articles/${ _id }`, {
          data: data,
          success: () => {
            
            // If success, redirect to home page
            location.replace('./myArticles.html');
          },
          error: err => {
            console.error(err)
          }
        })
    });

    // Remove the loader and show the form
    $('#formLoader').style.display = "none";
    $('#articleForm').style.display = "block";

    // Set this class as initialized
    _initialized = true;
  }
  
  // ? Return public methods

  return { init }

})();

ArticleForm.init();