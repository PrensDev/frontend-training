const $ = (selector) => document.querySelector(selector);

const formDataToObj = (fd) => Object.fromEntries(fd.entries());

/**
 * LocalStorage
 */

const getPostsFromLocalStorage = () => JSON.parse(localStorage.getItem('posts'));

const setPostsToLocalStorage = posts => localStorage.setItem('posts', JSON.stringify(posts));


/**
 * Load all the posts
 */

const loadPosts = () => {
  
  // Get the posts from the localstorage
  let posts = getPostsFromLocalStorage();
  console.log(posts);
  
  // If there are no posts, immediately return
  if (!posts) {
    $('#posts').innerHTML = `
      <div class="card text-center text-muted" style="padding: 50px 0;">
        You don't post anything yet.
      </div>
    `;
    return;
  }

  // Append the posts in the page
  const toPostTemplate = ({ id, postContent }) => `
    <div class="card post">
      <div class="flex">
        <div>
          <img class="user-img mr-1" src="https://randomuser.me/api/portraits/men/55.jpg" alt="">
        </div>
        <div class="grow">
          <div class="fw-bold">Jetsun Prince Torres</div>
          <div class="text-muted small fw-bold">February 16, 2023</div>
        </div>
        <div>
          <button type="submit" class="btn" onclick="editPost('${ id }')">
            <i class="fa-solid fa-pencil"></i>
          </button>
          <button type="submit" class="btn btn-danger" onclick="deletePost('${ id }')">
            <i class="fa-solid fa-trash"></i>
          </button>
        </div>
      </div>
      <div>${ postContent }</div>
    </div>
  `

  $('#posts').innerHTML = posts.map(post => toPostTemplate(post)).join('');
}


/**
 * CRUD Operations for Posts
 */

const addPost = postObj => {
  let posts = getPostsFromLocalStorage() || [];
  posts.unshift(postObj);
  setPostsToLocalStorage(posts);
  loadPosts();
}

const deletePost = id => {
  let posts = getPostsFromLocalStorage();
  let newPosts = posts.filter(post => post.id !== id);
  setPostsToLocalStorage(newPosts);
  loadPosts();
}

const clearAllPosts = () => {
  setPostsToLocalStorage(null);
  $('#posts').innerHTML = ``;
  loadPosts();
}

const editPost = (id) => {

  // Find the post by id
  let post = getPostsFromLocalStorage().find(post => post.id === id);

  // Check if post exist in localstorage
  if (!post) {
    alert(`Error occured: Post ID ${ id } not found`);
    return;
  }

  // Populate the inputs
  $('#editId_input').value = post.id;
  $('#postContent_input').value = post.postContent;
}


/**
 * For submitting a post
 */

const submitPost_form = $('#submitPost_form');

submitPost_form.addEventListener('submit', (e) => {
  e.preventDefault();

  // Create a form data instance
  let fd = new FormData(submitPost_form);

  // Validate the form

  // If post content has no value
  if (!fd.get('postContent').trim()) {

    // Add an error class in the post textarea
    $('#postContent_input').classList.add('error');
    return;
  }

  // Check if FormData has id
  // Set an id if it doesn't exist
  const id = fd.get('id');
  if (!id) fd.append('id', crypto.randomUUID());

  // Check if FormData has dateCreated
  // Set if it doesn't have
  if (!fd.get('dateCreated')) fd.append('dateCreated', new Date());

  // Convert form data to object
  let data = formDataToObj(fd);

  if (id) {

    // Update the posts if input has id
    // indicating that the form is in edit mode
    const newPosts = getPostsFromLocalStorage().map(post => post.id === data.id ? data : post);
    setPostsToLocalStorage(newPosts);
    loadPosts();
  } else {
    
    // Add the post
    addPost(data);
  }

  // Reset the form
  submitPost_form.reset();
  $('#postContent_input').classList.remove('error');
});


/**
 * Darkmode toggler
 */

const setMode = () => {
  const mode = localStorage.getItem('mode');
  
  // If mode does not yet exist in localstorage
  // Set the mode in localstorage
  if (!mode) {
    localStorage.setItem('mode', 'light');
    return;
  }

  // Set the mode
  if (mode === 'dark') {
    $('html').classList.add('dark');
    $('#darkmodeToggler').innerHTML = `<i class="fa-solid fa-sun"></i>`;
  } else {
    $('html').classList.remove('dark');
    $('#darkmodeToggler').innerHTML = `<i class="fa-solid fa-moon"></i>`;
  }
}

$('#darkmodeToggler').addEventListener('click', (e) => {
  e.preventDefault();

  // Get the mode in localStorage
  const mode = localStorage.getItem('mode');
  
  // Switch the mode in localStorage
  if (mode === 'dark') {
    localStorage.setItem('mode', 'light');
    $('#darkmodeToggler').innerHTML = `<i class="fa-solid fa-moon"></i>`;
  } else {
    localStorage.setItem('mode', 'dark');
    $('#darkmodeToggler').innerHTML = `<i class="fa-solid fa-sun"></i>`;
  }

  // Set the mode
  setMode();
});



/**
 * On page load, invoke necessary functions
 */

(() => {
  setMode();
  loadPosts();
})();