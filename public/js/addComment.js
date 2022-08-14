let commentButton = document.getElementById('commentButton');
let comment = document.getElementById('comment');
let post_id = document.getElementById('postId');
console.log(post_id.dataset.id);

const newCommentHandler = async (event) => {
    event.preventDefault();
    console.log(comment.value)
    if (comment !== '') {
        const response = await fetch('/api/posts/newcomments', {
            method: 'POST',
            body: JSON.stringify({ name: "anonymous", content: comment.value, post_id: post_id.dataset.id }),
            headers: { 'Content-Type': 'application/json' },
        });
        if (response.ok) {
              document.location.reload();
        } else {
            alert('Failed to update Post data');
        }
    }
}

commentButton.addEventListener('click', newCommentHandler);