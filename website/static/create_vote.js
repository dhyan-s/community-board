// Initialize Tagify on the input element with tags
var input = document.querySelector('#issueTags');
var tagify = new Tagify(input, {
    delimiters: ",",
    pattern: /^[^\s]+$/,  // Ensure that spaces are not allowed in individual tags
    enforceWhitelist: false, // Allow non-whitelisted tags
    maxTags: 10, // Limit the number of tags to 10
});

// Initialize SweetAlert2 Toast notification
const Toast = Swal.mixin({
    toast: true,
    position: "top-end",
    showConfirmButton: false,
    timer: 2000,
    timerProgressBar: false,
    didOpen: (toast) => {
        toast.onmouseenter = Swal.stopTimer;
        toast.onmouseleave = Swal.resumeTimer;
    }
});

function submitVoteForm (event) {
    event.preventDefault(); 

    // Get form values
    const issueName = document.querySelector('#issueName').value;
    const issueDescription = document.querySelector('#issueDescription').value;
    const issueDeadline = document.querySelector('#issueDeadline').value;
    
    // Get the tags from Tagify
    const issueTags = tagify.value.map(tag => tag.value); // Convert Tagify objects to simple array of strings

    // Create form data object
    const formData = {
        name: issueName,
        description: issueDescription,
        deadline: issueDeadline,
        tags: issueTags
    };

    // Debugging: Log form data to console
    console.log('Form data submitted:', formData);

    fetch('/vote/create', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData) // Send form data as JSON
    })
    .then(response => {
        if (response.ok) {
            return response.json();  // Parse JSON response
        }
        else {
            return response.json().then(error => {
                throw new Error(error.error);
            })
        }
    })
    .then(data => {
        // Debugging: Log success response to console
        console.log('Success:', data);

        // Show success toast notification
        Toast.fire({
            icon: "success",
            title: `Vote Created: ${data['name']}`
          });
        // TODO: frontend - display new card
    })
    .catch((error) => {
        // Debugging: Log any errors to console
        console.error('Error during submission:', error);

        // Show error toast notification
        Toast.fire({
            icon: "error",
            title: "There was an issue creating the vote"
        });
    });
}

document.querySelector('.vote-form').addEventListener('submit', submitVoteForm);