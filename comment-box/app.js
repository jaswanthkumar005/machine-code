const sampleComments = [
    {
      id: 1,
      text: "This is the first comment",
      likes: 0,
      replies: [
        {
          id: 2,
          text: "This is a reply to the first comment",
          likes: 0,
          replies: [],
        },
      ],
    },
    {
      id: 3,
      text: "This is the second comment",
      likes: 0,
      replies: [],
    },
  ];
  
  // Function to render comments
  function renderComments(comments, container) {
    container.innerHTML = ''; // Clear existing comments
    comments.forEach(comment => {
      const commentElement = createCommentElement(comment);
      container.appendChild(commentElement);
    });
  }
  
  // Function to create a comment element
  function createCommentElement(comment) {
    const commentElement = document.createElement('div');
    commentElement.className = 'comment';
    commentElement.id = `comment-${comment.id}`;
    commentElement.innerHTML = `
      <p>${comment.text}</p>
      <div class="comment-actions">
        <button onclick="likeComment(${comment.id})">Like (${comment.likes})</button>
        <button onclick="toggleReplyForm(${comment.id})">Reply</button>
        <button onclick="deleteComment(${comment.id})">Delete</button>
      </div>
      <div class="reply-form" id="reply-form-${comment.id}">
        <textarea placeholder="Write a reply..."></textarea>
        <button onclick="submitReply(${comment.id})">Submit Reply</button>
      </div>
      <div class="reply">
        ${comment.replies.map(reply => createCommentElement(reply).outerHTML).join('')}
      </div>
    `;
    return commentElement;
  }
  
  // Function to handle liking a comment
  function likeComment(commentId) {
    const comment = findCommentByReplId(sampleComments, commentId);
    if (comment) {
      comment.likes++;
      console.log(deleteElementByid(sampleComments,2),commentId);
      renderComments(sampleComments, document.getElementById('comments-container'));
    }
  }

  function findCommentByReplId(comments,id){
    for(let comment of comments){
        if(comment.id == id){
            return comment;
        }
        if(comment.replies && comment.replies.length > 0){
            let reply = findCommentByReplId(comment.replies,id);
            return reply;
        }
    }
    return null;
  }

  function deleteElementByid(comments,id){
    return comments.filter((comment) => comment.id != id).map((obj) => {return {
        ...obj,
        replies:deleteElementByid(obj.replies,id)
    }});
  }
  
  // Function to toggle the reply form
  function toggleReplyForm(commentId) {
    const replyForm = document.getElementById(`reply-form-${commentId}`);
    
    replyForm.style.display = replyForm.style.display === 'none' ? 'block' : 'none';
  }
  
  // Function to submit a reply
  function submitReply(commentId) {
    const replyText = document.querySelector(`#reply-form-${commentId} textarea`).value;
    if (replyText.trim() === '') return;
  
    const comment = findCommentById(sampleComments, commentId);
    if (comment) {
      const newReply = {
        id: Date.now(),
        text: replyText,
        likes: 0,
        replies: []
      };
      comment.replies.push(newReply);
      renderComments(sampleComments, document.getElementById('comments-container'));
    }
  }
  
  // Function to delete a comment
  function deleteComment(commentId) {
    const commentIndex = findCommentIndexById(sampleComments, commentId);
    if (commentIndex !== -1) {
      sampleComments.splice(commentIndex, 1);
      renderComments(sampleComments, document.getElementById('comments-container'));
    }
  }
  
  // Helper function to find a comment by ID
  function findCommentById(comments, id) {
    for (const comment of comments) {
      if (comment.id === id) return comment;
      const reply = findCommentById(comment.replies, id);
      if (reply) return reply;
    }
    return null;
  }
  
  // Helper function to find comment index by ID
  function findCommentIndexById(comments, id) {
    for (let i = 0; i < comments.length; i++) {
      if (comments[i].id === id) return i;
      const replyIndex = findCommentIndexById(comments[i].replies, id);
      if (replyIndex !== -1) return replyIndex;
    }
    return -1;
  }
  
  // Initialize comments
  document.addEventListener('DOMContentLoaded', () => {
    renderComments(sampleComments, document.getElementById('comments-container'));
  });
  
  // Submit new comment
  document.getElementById('submit-comment').addEventListener('click', () => {
    const commentText = document.getElementById('comment-text').value;
    if (commentText.trim() === '') return;
  
    const newComment = {
      id: Date.now(),
      text: commentText,
      likes: 0,
      replies: []
    };
    sampleComments.push(newComment);
    renderComments(sampleComments, document.getElementById('comments-container'));
    document.getElementById('comment-text').value = '';
  });
  