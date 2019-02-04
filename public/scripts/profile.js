$(() => {

  function renderUserInfo(data) {
    const userName = data[0].name
    const userEmail = data[0].email
    $('<div>').addClass('profile-data')
      .append($('<div>').addClass('username').text(`Username: ${userName}`))
      .append($('<div>').addClass('email').text(`Email: ${userEmail}`))
      .append($('<button>').addClass('edit').text('edit'))
      .appendTo('.profile-holder');
  }

  $('<form>').addClass('user-info')
    .append($('<input type="text" name="name" placeholder="your name">').addClass('input'))
    .append($('<input type="text" name="email" placeholder="your email">').addClass('input'))
    .append($('<input type="submit" value="Update Profile">').addClass('button'))
    .appendTo('.profile-holder');


  $.ajax({
    method: 'GET',
    url: '/profile/info'
  }).then( (rows) => {
    renderUserInfo(rows);
  })

});
