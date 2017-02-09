console.log('hello from profile.js')

var $updButton = $('.username-button');
var $usernameText = $('.username-text');
function updateUsername(evt) {
  console.log('clicked');

  $updButton.text('Save')

  var text = $usernameText.text()
  $usernameText.html($(`<input class="input-user-box" style = "font-size: 1.5rem;" />`,{'value' : text}).val(text)); //size: ${$(text).length}
  $('.input-user-box').attr('size', text.length);
  $updButton.attr('class', 'save-username');

  $('body').on('click', '.save-username', saveNewUserName);

}

function saveNewUserName (evt) {
  console.log('clicked on save-username')
  var newUserName = $('.input-user-box').val()
  $.post('/profile/me/update', {newUserName}, function (res) {
    console.log(res); //RETURNS STATUS 200
    if (res.status === 200) {
      // convert back to text from input field - PENDING

    }
  })
}

$('body').on('click', '.username-button', updateUsername);


