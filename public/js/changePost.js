let changeContent = document.getElementsByClassName("changeContent");
// let clickedPost = document.getElementsByClassName("postWrapper");

let newContent = '';
let newContentId = '';
const changePostHandler = async (event) => {
    // event.preventDefault();
    newContent = event.target.innerText;
    let etar = event;
    newContentId = event.target.parentElement.parentElement.id;
    if (newContent !== '') {
        const response = await fetch('/api/dashboard/:id', {
          method: 'PUT',
          body: JSON.stringify({ id: newContentId, content: newContent }),
          headers: { 'Content-Type': 'application/json' },
        });
    console.log("CONTENT SAVED");
    console.log(newContent);
        if (response.ok) {
        //   document.location.replace('/');
        } else {
          alert('Failed to update Post data');
        }
      }
};
for (i = 0; i < changeContent.length; i++) {
    changeContent[i].addEventListener("blur", changePostHandler);
    console.log("ADDED HANDLER");
}



// const viewPostHandler = async (event) => {
//     event.preventDefault();
//     let post_id = event.currentTarget.id;
//     console.log(post_id);
//     if (post_id) {
//         document.location.replace(`/api/posts/${post_id}`);
//     }
// };
// for (i = 0; i < clickedPost.length; i++) {
//     clickedPost[i].addEventListener('click', viewPostHandler);
// }
