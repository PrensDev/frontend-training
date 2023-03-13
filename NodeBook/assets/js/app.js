// * Global Functions

const $ = selector => document.querySelector(selector);

const formDataToJSON = fd => Object.fromEntries(fd.entries());

const validateDataObj = obj => {

  // Get all fields with nullable values
  const errors = Object.entries(obj).reduce((errors, [key, value]) => {
    if (!value) errors[key] = 'Nullable data';
    return errors;
  }, {});

  // Return object
  if (Object.keys(errors).length) return errors;
  return;
}

// To get the paramters from URL
const URLQueryParams = new Proxy(new URLSearchParams(window.location.search), {
  get: (searchParams, prop) => searchParams.get(prop),
});

const errorTemplate = err => `
  <div class="card">
    <div class="card-body error-container">
      <div>
        <i class="fa-solid fa-triangle-exclamation fa-3x text-danger"></i>
        <div class="error-text">Oops! Something went wrong</div>
        <div class="error-code">${ err }</div>

        <div class="mt-4">
          <button class="btn btn-default" onclick="location.reload()">Reload the page</button>
        </div>
      </div>
    </div>
  </div>
`

// * API Requester
const API = (() => {

  // ? Properties

  let _baseURL;
  let _options;
  let _initialized = false;


  // ? Private functions

  const sendRequest = async (url, { 
    method = 'GET', 
    data, 
    success, 
    error
  }) => {
    await fetch(_baseURL + url, {
      ..._options, 
      method: method, 
      body: data && typeof data === 'object' ? JSON.stringify(data) : null 
    })
      .then(res => {
        if (method === 'GET') return res.json();
        return res;
      })
      .then(res => success(res))
      .catch(err => error && typeof error === 'function' ? error(err) : console.error(err))
  }


  // ? Public functions

  const init = ({ baseURL, options }) => {

    // Check if API has already been initialized
    if (_initialized) {
      console.warn('API has already been initialized');
      return;
    }

    // Set the baseURL and API options
    _baseURL = baseURL;
    _options = options;
    
    // Set this method as initialized
    _initialized = true;
  }

  const get = async (url, options) => sendRequest(url, {...options});

  const post = async (url, options) => sendRequest(url, { ...options, method: 'POST' });

  const put = async (url, options) => sendRequest(url, { ...options, method: 'PUT' });

  const patch = async (url, options) => sendRequest(url, { ...options, method: 'PATCH' });

  const del = async (url, options) => sendRequest(url, { ...options, method: 'DELETE' });


  // ? Return Public Functions

  return { init, get, post, put, del, patch }
})();


// * Dark Mode Toggler
const DarkModeToggler = (() => {

  // ? Private Variables

  const _MODE_KEY = 'mode';
  const _DEFAULT_MODE = 'light';
  const _MODE_SELECTOR = $('html');

  let _initialized = false;
  let _toggler;
  let _currentMode;


  // ? Private Methods
  
  const setMode = () => {

    // Check if mode has not been set on localstorage
    if (!_currentMode) {
      localStorage.setItem('mode', _DEFAULT_MODE);
      _currentMode = _DEFAULT_MODE;
      return;
    }

    // Set the mode of the app
    _currentMode === 'dark' ? _MODE_SELECTOR.classList.add('dark') : _MODE_SELECTOR.classList.remove('dark');
  }

  const toggleMode = () => {
    _currentMode = _currentMode === 'dark' ? 'light' : 'dark';
    localStorage.setItem(_MODE_KEY, _currentMode);
    setMode();
  }
  

  // ? Public Methods

  const init = (selector, {
    onInit = () => {},
    onSelectorClick = ()  => {}
  }) => {

    // Check if DarkModeToggler has already been initialized
    if (_initialized) {
      console.warn('DarkModeToggler has been already initialized');
      return;
    }

    // Get the current mode from the localstorage
    _currentMode = localStorage.getItem(_MODE_KEY);

    // Set the mode of the app
    setMode();

    // Set the toggler button
    _toggler = $(selector);

    // Check if toggler exist
    // Some pages doesnt have darkmode toggler
    if (!_toggler) {
      // Immediately set that the DarkModeToggler has been initialized
      _initialized = true;
      return;
    }

    // Add on click event to the toggler
    _toggler.addEventListener('click', () => {
      toggleMode();
      onSelectorClick(_toggler, _currentMode);
    });

    // Invoke the onInit
    onInit(_toggler, _currentMode);

    // Set that the DarkModeToggler has been initialized
    _initialized = true;
  }

  
  // ? Return Public Methods
  
  return { init }
})();


// * For Authentication
const Authentication = (() => {

  // ? Properties

  const _COOKIES = document.cookie;

  let _initialized = false;
  

  // ? Public Methods

  const init = async () => {

    // Check if Authentication has been initialized
    if (_initialized) {
      console.warn('Authentication has already been initialized');
      return;
    }

    // Check if user has not yet logged in
    // Redirect to login if not
    let cookieObj = _COOKIES ? Object.fromEntries(_COOKIES.split('; ').map(cookie => cookie.split('='))) : null;
    if (!cookieObj) location.replace('./login.html');

    // Set this class as initialized
    _initialized = true;
  }

  const logout = async () => {

    // If no cookies, do nothing
    if (!_COOKIES) return;

    // Reset cookie
    // To make sure that the cookie is remove, wrap it on a promise
    await new Promise((resolve, reject) => {
      document.cookie = 'username=; expires=Thu, 01 Jan 1970 00:00:00 GMT';
      document.cookie = 'user_id=; expires=Thu, 01 Jan 1970 00:00:00 GMT';
      resolve();
    });

    // Redirect to login
    location.replace('./login.html');
  }

  const isLoggedIn = () => {
    // Check if user has already logged in
    // Redirect to home page
    const cookieObj = Object.fromEntries(_COOKIES.split('; ').map(cookie => cookie.split('=')));
    if (cookieObj.username && cookieObj.user_id) {
      location.replace('./');
      return;
    }
  }

  return { init, logout, isLoggedIn }
})();


// * Initialize global functions
(() => {

  // ? Initialize dark mode toggler
  const changeDarkModeTogglerIcon = (toggler, currentMode) =>   
    toggler.innerHTML = `<i class="fa-regular fa-${ currentMode === 'dark' ? 'sun' : 'moon' }"></i>`;

  DarkModeToggler.init('#darkModeToggler', {
    onInit: changeDarkModeTogglerIcon,
    onSelectorClick: changeDarkModeTogglerIcon,
  });


  // ? Initialize API Requester
  const API_TOKEN = '41b934c624eb4a78823b34a547acff74';
  
  API.init({
    baseURL: `https://crudcrud.com/api/${ API_TOKEN }`,
    options: {
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json"
      }
    }
  })
})();