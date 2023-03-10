$('#createArticle_form').addEventListener('submit', async function(e) {
  e.preventDefault();

  const fd = new FormData(this);
  
  // Append additional data
  const additionalData = {
    id: crypto.randomUUID(),
    user_id: '1a0f6d47-46c7-48da-a056-496de699e6ef',
    created_at: new Date(),
    updated_at: null
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

  try {
    const response = await fetch(`${ BASE_URL_API }/articles`, {
      method: 'POST',
      body: JSON.stringify(data),
      ...API_OPTIONS
    });
    console.log('Response:', response);

    // Redirect to the home page
    location.replace('./');
  } catch(err) {
    console.error('Error response:', err);
  }
});