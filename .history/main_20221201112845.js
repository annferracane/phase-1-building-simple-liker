// Defining text characters for the empty and full hearts for you to use later.
const EMPTY_HEART = '♡'
const FULL_HEART = '♥'

// Your JavaScript code goes here!
const errorModal = document.querySelector('#modal');
const likeHearts = Array.from(document.querySelectorAll('.like-glyph'));
likeHearts.forEach(likeHeart => likeHeart.addEventListener('click', handleResponse));

function handleResponse(e) {
  mimicServerCall()
  .then(resp => responseSuccessful(e, resp))
  .catch(error => responseFailed(e, error));
}

function responseSuccessful(e, resp){
  console.log(resp);
  console.log(e.target);
  const heart = e.target;
  if (heart.textContent === EMPTY_HEART) {
    heart.textContent = FULL_HEART;
    heart.classList.add('activated-heart');
  } else if (heart === FULL_HEART) {
    heart.textContent = EMPTY_HEART;
    heart.classList.remove('activated-heart');
  }
}

function responseFailed(e, error){
  console.log(error);
  errorModal.classList.remove('hidden');
  document.querySelector('#modal-message').textContent = error;
  setTimeout(() => hideErrorModal(), 3000);
}

function hideErrorModal() {
  errorModal.classList.add('hidden');
}


//------------------------------------------------------------------------------
// Don't change the code below: this function mocks the server response
//------------------------------------------------------------------------------

function mimicServerCall(url="http://mimicServer.example.com", config={}) {
  return new Promise(function(resolve, reject) {
    setTimeout(function() {
      let isRandomFailure = Math.random() < .2
      if (isRandomFailure) {
        reject("Random server error. Try again.");
      } else {
        resolve("Pretend remote server notified of action!");
      }
    }, 300);
  });
}
