var input = document.querySelector('#issueTags');
var tagify = new Tagify(input, {
    delimiters: ",",  
    pattern: /^[^\s]+$/,
    enforceWhitelist: false, 
    maxTags: 10, 
});

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

document.querySelector('.vote-form').addEventListener('submit', function(event) {
    event.preventDefault(); 

    const issueName = document.querySelector('#issueName').value;
    const issueDescription = document.querySelector('#issueDescription').value;
    const issueDeadline = document.querySelector('#issueDeadline').value;
    const issueTags = tagify.value.map(tag => tag.value); 
    const formData = {
        name: issueName,
        description: issueDescription,
        deadline: issueDeadline,
        tags: issueTags
    };

    console.log(formData); 

    fetch('/vote/create', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
    })
    .then(response => response.json())
    .then(data => {
        console.log('Success:', data);
        window.location.href = "/"
        Toast.fire({
            icon: "success",
            title: `Vote Created: ${data['name']}`
          });
        // TODO: frontend - display new card
    })
    .catch((error) => {
        console.error('Error:', error);
        Toast.fire({
            icon: "error",
            title: "There was an issue creating the vote"
          });
    });
});