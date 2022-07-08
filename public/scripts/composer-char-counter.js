$(document).ready(function() {
  // --- our code goes here ---
  $('#tweet-text').keyup(function(e) {
    const $textArea = $(this);
    const remainingLength = 140 - $textArea.val().length;
    $textArea
      .next()
      .children('.counter')
      .text(remainingLength)
      .toggleClass('over-count', remainingLength <= 0);
  });
});