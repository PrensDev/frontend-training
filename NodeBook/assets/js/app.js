/**
 * * Constants
 */

const API_TOKEN = 'e3ea30f1ee634a808475b9c40a1cc764';
const BASE_URL_API = `https://crudcrud.com/api/${ API_TOKEN }`;
const API_OPTIONS = {
  headers: {
    "Accept": "application/json",
    "Content-Type": "application/json"
  }
}


/**
 * * Functions
 */

const $ = selector => document.querySelector(selector);


/**
 * * Functions
 */

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



/**
 * * Dark Mode Toggler
 */
const DarkModeToggler = (() => {

  // ? Private Variables

  const MODE_KEY = 'mode';
  const DEFAULT_MODE = 'light';
  const MODE_SELECTOR = $('html');

  let initialized = false;
  let toggler;
  let currentMode;


  // ? Private Methods
  
  const setMode = () => {

    // Check if mode has not been set on localstorage
    if (!currentMode) {
      localStorage.setItem('mode', DEFAULT_MODE);
      currentMode = DEFAULT_MODE;
      return;
    }

    // Set the mode of the app
    currentMode === 'dark' ? MODE_SELECTOR.classList.add('dark') : MODE_SELECTOR.classList.remove('dark');
  }

  const toggleMode = () => {
    currentMode = currentMode === 'dark' ? 'light' : 'dark';
    localStorage.setItem(MODE_KEY, currentMode);
    setMode();
  }
  

  // ? Public Methods

  const init = (selector, {
    onInit = () => {},
    onSelectorClick = ()  => {}
  }) => {

    // Check if DarkModeToggler has already been initialized
    if (initialized) {
      console.warn('DarkModeToggler has been already initialized');
      return;
    }

    // Get the current mode from the localstorage
    currentMode = localStorage.getItem(MODE_KEY);

    // Set the mode of the app
    setMode();

    // Set the toggler button
    toggler = $(selector);

    // Add on click event to the toggler
    toggler.addEventListener('click', () => {
      toggleMode();
      onSelectorClick(toggler, currentMode);
    });

    // Invoke the onInit
    onInit(toggler, currentMode);

    // Set that the DarkModeToggler has been initialized
    initialized = true;
  }

  
  // ? Return Public Methods
  
  return { init }
})();



/**
 * * Initialize on page load
 */

(() => {

  // Initialize dark mode toggler
  const changeDarkModeTogglerIcon = (toggler, currentMode) =>   
    toggler.innerHTML = `<i class="fa-regular fa-${ currentMode === 'dark' ? 'sun' : 'moon' }"></i>`;

  DarkModeToggler.init('#darkModeToggler', {
    onInit: changeDarkModeTogglerIcon,
    onSelectorClick: changeDarkModeTogglerIcon,
  });

})();




const myObj = {
  name: 'Jayson'
}

console.log(myObj?.age);