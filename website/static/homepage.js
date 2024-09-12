// Function to create a new thread card dynamically
function createCard(issueName, issueDescription, issueDeadline, issueTags) {
    // Find the template thread div
    const templateThread = document.querySelector('.thread');

    // If the template .thread is not found, log an error and stop the function
    if (!templateThread) {
        console.error('Template thread element not found! Please ensure there is an element with class "thread" in the HTML.');
        return;
    }

    // Clone the thread div and ensure the cloned thread is visible
    const newThread = templateThread.cloneNode(true);
    newThread.style.display = 'block';  // Ensure it's visible

    // Update the title with the issue name
    newThread.querySelector('.thread-title').textContent = issueName;

    // Update the description and add a tooltip for the full description if it's long
    const threadDesc = newThread.querySelector('.thread-desc');
    if (issueDescription.length > 150) {
        threadDesc.textContent = issueDescription.slice(0, 150) + '...';
        threadDesc.setAttribute('data-tooltip', issueDescription);  // Add full description as tooltip
    } else {
        threadDesc.textContent = issueDescription;
    }

    // Update the deadline
    newThread.querySelector('.thread-deadline').textContent = `Deadline: ${issueDeadline}`;

    // Remove any existing tags in the cloned thread
    newThread.querySelectorAll('.thread-tags').forEach(tag => tag.remove());

    // Create a container for the new tags
    const tagContainer = document.createElement('div');
    let tagsLine = document.createElement('div');
    let tagCount = 0;

    // Add tags dynamically (max 5 per line)
    issueTags.forEach((tag, index) => {
        const tagButton = document.createElement('button');
        tagButton.classList.add('thread-tags');
        tagButton.textContent = tag;
        tagsLine.appendChild(tagButton);
        tagCount++;

        // If 5 tags are reached, append the line and start a new one
        if (tagCount === 5 || index === issueTags.length - 1) {
            tagContainer.appendChild(tagsLine);
            tagsLine = document.createElement('div');
            tagCount = 0;
        }
    });

    // Append the tag container to the new thread
    newThread.appendChild(tagContainer);

    // Append the new thread to the board
    document.querySelector('.Board').appendChild(newThread);
}

// Function to fetch and display votes
function fetchVotes() {
    const url = 'http://127.0.0.1:8000/vote/all';  // Ensure this endpoint exists
    console.log('Fetching votes from:', url);  // Debugging log

    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            if (Array.isArray(data)) {
                data.forEach(vote => {
                    createCard(vote.name, vote.description, vote.deadline, vote.tags);
                });
            } else {
                console.error('Unexpected data format:', data);
            }
        })
        .catch(error => {
            console.error('Error fetching votes:', error);
        });
}

// Call fetchVotes on page load
document.addEventListener('DOMContentLoaded', fetchVotes);
