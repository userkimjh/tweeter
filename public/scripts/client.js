/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

const renderTweets = function(tweets) {
  tweets.forEach(tweet => {
    const tweetElement = createTweetElement(tweet);
    $(document).ready(function() {
      $('#tweet-container').prepend(tweetElement);
    });
  });
};

const createTweetElement = function(tweet) {
  let $tweet = `
    <div class="tweet-posted">
      <header class="tweet-header">
        <div class="tweet-profile-name">
          <img src=${tweet.user.avatars} alt="profile picture">
          ${tweet.user.name}
        </div>
        <span class="tweet-username">${tweet.user.handle}</span>
      </header>
      <div class="tweet-content">
        ${escapeXSS(tweet.content.text)}
      </div>
      <hr>
      <footer class="tweet-footer">
          ${timeago.format(tweet.created_at)}
        <span class="tweet-footer-logos">
          <i class="fa-solid fa-flag"></i>
          <i class="fa-solid fa-retweet"></i>
          <i class="fa-solid fa-heart"></i>
        </span>
      </footer>
    </div>
  `;
  // ...
  return $tweet;
};

const loadTweets = function() {
  $.ajax('/tweets', {method: 'GET'})
    .then(result => {
      $('#tweet-container').empty();
      renderTweets(result);
    });
};

// renderTweets(data);
loadTweets();

const escapeXSS = function(str) {
  let div = document.createElement("div");
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
};

$(document).ready(function() {
  $('form').submit(function(event) {
    event.preventDefault();
    const $tweet = $(this);
    let tweetData =  $tweet.serialize();
    tweetData = escapeXSS(tweetData);
    if (formValidation(tweetData)) {
      $.ajax('/tweets', {
        method: 'POST',
        data: tweetData
      })
        .done(function() {
          resetForm($tweet);
          loadTweets();
          errorMessage();
        });
    }
  });
});

$(document).ready(function() {
  $('.nav-new-tweet').click(function() {
    toggleForm();
  });
});
// The user should be given an error that their tweet content is too long or that it is not present (ideally separate messages for each scenario)
// The form should not be cleared
// The form should not submit

const formValidation = function(text) {
  const equalIndex = text.indexOf('=');
  text = text.slice(equalIndex + 1);
  if (text.length > 140) {
    errorMessage();
    return false;
  }
  if (text === "" || text === null) {
    alert("Text input field is empty");
    return false;
  }
  return true;
};

const resetForm = function(form) {
  $(document).ready(function() {
    const $formChild = $(form).children();
    $formChild.children('#tweet-text').val("");
    $formChild.children('.counter').text(140);
  });
};

const errorMessage = function() {
  if ($(".error-message").first().is(":hidden")) {
    $(".error-message").slideDown("slow");
  } else {
    $(".error-message").hide();
  }
};

const toggleForm = function() {
  if ($(".new-tweet").first().is(":hidden")) {
    $(".new-tweet").slideDown("slow");
    $('textarea').focus();
  } else {
    $(".new-tweet").slideUp("slow");
  }
};

const toggleGoToTop = function() {
  
}