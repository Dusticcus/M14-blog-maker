let deletePost = document.getElementsByClassName('deletePost');
// let post_id = document.getElementById('deletePost');

const deletePostHandler = async (event) => {
    event.preventDefault();
    if (event) {
        const response = await fetch('/api/posts/', {
          method: 'DELETE',
          body: JSON.stringify({ post_id: event.target.previousElementSibling.id }),
          headers: { 'Content-Type': 'application/json' },
        });
    console.log("CONTENT SAVED");
    console.log(newContent);
        if (response.ok) {
        //   document.location.replace('/');
        document.location.replace('/api/dashboard');
        } else {
          alert('Failed to update Post data');
        }
      }
    console.log(event.target.previousElementSibling.id)
};
for (i = 0; i < deletePost.length; i++) {
    deletePost[i].addEventListener("click", deletePostHandler);
    console.log("ADDED DELETE HANDLER");
}