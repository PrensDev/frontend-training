const Login = (() => {

  // ? Properties

  const _LOGIN_FORM = $('#loginForm');
  const _ALERT_CONTAINER = $('#alertContainer');
  const _PATH = 'users';

  let _initialized = false;
  let _alertTimeout;


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
        user_id: user.id,
        username: user.username,
        full_name: user.full_name,
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

        // Clear if a timeout is existing
        clearTimeout(_alertTimeout);
        
        // Show an alert
        _ALERT_CONTAINER.innerHTML = `
          <div class="alert alert-danger mb-3">
            ${ loginStatus.status }
          </div>
        `

        // Clear alert after 5 seconds 
        _alertTimeout = setTimeout(() => {
          _ALERT_CONTAINER.innerHTML = '';
        }, 5000);

        return;
      }
      
      // Set user cookies and session
      // Wrapped in promise to make sure cookies and session are set before redirecting to another page
      await new Promise((resolve, reject) => {
        try {

          // Set user cookies
          let expires = new Date();
          expires.setDate(expires.getDate() + 30);
          document.cookie = `username=${ data.username }; expires=${ expires.toUTCString() }; Secure`;
          document.cookie = `user_id=${ data.id }; expires=${ expires.toUTCString() }; Secure`;
          resolve();
  
          // Set user session
          sessionStorage.setItem('user', JSON.stringify(loginStatus.user));
        } catch(err) {
          console.error(err);
          reject();
        }
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