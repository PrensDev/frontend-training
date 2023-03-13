const Login = (() => {

  // ? Properties

  const _LOGIN_FORM = $('#loginForm');
  const _PATH = 'users';
  const _COOKIES = document.cookie;

  let _initialized = false;


  // ? Private Methods

  // ! Temporarily, users are stored in localStrorage

  const getUsers = () => JSON.parse(localStorage.getItem(_PATH)) || [];

  const login = ({ username, password }) => {
    const user = getUsers().find(user => user.username === username);

    // If user does not exist
    if (!user) return {
      status: 'User not found',
      authenticated: false
    }

    // Check if password is correct
    if (user.password !== password) return {
      status: 'Combination of username and password is incorrect',
      authenticated: false
    }

    // Return user privilege
    return {
      status: 'Authenticated',
      authenticated: true,
      user: {
        id: user.id,
        username: user.username
      }
    }
  }


  // ? Public Methods

  const init = () => {

    
    // Check if already initialized
    if (_initialized) {
      console.warn('Login has already been initialized');
      return;
    }
    
    // Check if user has already logged in
    Authentication.isLoggedIn();

    // Handle on form submit event
    _LOGIN_FORM.addEventListener('submit', async function(e) {
      e.preventDefault();

      // Create form data instance
      let fd = new FormData(this);

      // Convert form data to JSON
      const data = formDataToJSON(fd);

      // Check the login status
      const loginStatus = login(data);
      
      // Check if user is authenticated
      
      if (!loginStatus.authenticated) {
        console.error(loginStatus.status);
        return;
      }

      // Set cookie
      let expires = new Date();
      expires.setDate(expires.getDate() + 30);

      await new Promise((resolve, reject) => {
        document.cookie = `username=${ data.username }; expires=${ expires.toUTCString() }; Secure`;
        document.cookie = `user_id=${ data.id }; expires=${ expires.toUTCString() }; Secure`;
        resolve();
      });


      // Redirect to authenticated page
      location.assign('./');
    });

    // Set this class as initialized
    _initialized = true;
  }


  // ? Return public methods

  return {
    init
  }
})();

Login.init();