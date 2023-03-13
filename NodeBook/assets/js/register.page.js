const Register = (() => {

  // ? Properties

  const _REGISTER_FORM = $('#registerForm');

  const _PATH = 'users';

  let _initialized = false;


  // ? Private Methods

  // ! Temporarily, users are stored in localStrorage
  
  const getUsers = () => JSON.parse(localStorage.getItem(_PATH)) || [];

  const addUser = userObj => {
    const users = [...getUsers()];
    users.push(userObj);
    localStorage.setItem(_PATH, JSON.stringify(users));
  }

  
  // ? Public Methods

  const init = () => {

    // Check if Register has been initialized
    if (_initialized) {
      console.warn('Register has already been initialized');
      return;
    }

    // Check if user has already logged in
    Authentication.isLoggedIn();
    
    // Handle on form submit event
    _REGISTER_FORM.addEventListener('submit', function(e) {
      e.preventDefault();

      let fd = new FormData(this);

      // Append additional data
      const additionalData = {
        id: crypto.randomUUID(),
        created_at: new Date(),
        updated_at: null,
      }
      Object.entries(additionalData).forEach(([key, value]) => fd.append(key, value));
      
      // Get the object formatted data
      const data = formDataToJSON(fd);

      // Add the user
      addUser(data);

      // Redirect to the login
      location.assign('./login.html');
    });

    // Set this class as initialized
    _initialized = true;
  }


  // ? Return public methods

  return {
    init
  }
})();

Register.init();