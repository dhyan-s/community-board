// Function to create a new thread card
function createCard(issueName, issueDescription, issueDeadline, issueTags) {
    // Find the template thread div
    const templateThread = document.querySelector('.thread');

    // Make the original thread invisible
    templateThread.style.display = 'none';

    // Clone the thread div
    const newThread = templateThread.cloneNode(true);
    newThread.style.display = 'block';  // Ensure the cloned thread is visible

    // Update the title
    newThread.querySelector('.thread-title').textContent = issueName;

    // Update the description (truncate if necessary and add tooltip)
    const threadDesc = newThread.querySelector('.thread-desc');
    if (issueDescription.length > 150) {
        threadDesc.textContent = issueDescription.slice(0, 150) + '...';
        threadDesc.setAttribute('data-tooltip', issueDescription);  // Add full description as tooltip
    } else {
        threadDesc.textContent = issueDescription;
    }

    // Update the deadline
    newThread.querySelector('.thread-deadline').textContent = issueDeadline;

    // Remove existing tags in the cloned div
    newThread.querySelectorAll('.thread-tags').forEach(tag => tag.remove());

    // Handle the tags (max 5 per line)
    const tagContainer = document.createElement('div');  // Create a container for tags
    let tagsLine = document.createElement('div');
    let tagCount = 0;

    issueTags.forEach((tag, index) => {
        const tagButton = document.createElement('button');
        tagButton.classList.add('thread-tags');
        tagButton.textContent = tag;
        tagsLine.appendChild(tagButton);
        tagCount++;

        // If 5 tags reached, create a new line
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

// Example usage: you can call createCard with form values after submission
