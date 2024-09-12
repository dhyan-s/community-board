var input = document.querySelector('#issueTags');
    var tagify = new Tagify(input, {
        delimiters: ",",  
        pattern: /^[^\s]+$/,
        enforceWhitelist: false, 
        maxTags: 10, 
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
    
        fetch('/submit-issue', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        })
        .then(response => response.json())
        .then(data => {
            console.log('Success:', data);
        })
        .catch((error) => {
            console.error('Error:', error);
        });
    });