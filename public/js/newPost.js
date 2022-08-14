let confirmPost = document.getElementById('createNewPost');
let newPostTitle = document.getElementById('postTitle');
let newPostContent = document.getElementById('postContent');

const newPostHandler = async (event) => {

    if (newPostTitle !== '' && newPostContent !== '') {
        const response = await fetch('/api/posts/new', {
            method: 'POST',
            body: JSON.stringify({ title: newPostTitle.value, content: newPostContent.value }),
            headers: { 'Content-Type': 'application/json' },
        });
        if (response.ok) {
              document.location.replace('/api/dashboard');
        } else {
            alert('Failed to update Post data');
        }
    }
};

confirmPost.addEventListener('click', newPostHandler);