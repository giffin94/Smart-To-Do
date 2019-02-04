$(() => {


  function renderUserInfo(data) {
    const userName = data[0].name;
    const userEmail = data[0].email;

    $('<div>').addClass('profile-data')
      .append($('<div>').addClass('username').text(`Username: ${userName}`))
      .append($('<div>').addClass('email').text(`Email: ${userEmail}`))
      .append($('<button>').addClass('edit').text('edit'))
      .appendTo('.profile-flexbox');
  }

  $.ajax({
    method: 'GET',
    url: '/profile/info'
  }).then( (rows) => {
    renderUserInfo(rows);
    makeEvents(rows);
  })

  console.log(sessionName);

  $('<form>').addClass('profile-form hidden')
  .append($(`<input type="text" name="name" value='${sessionName}'>`).addClass('input'))
  .append($(`<input type="text" name="email" value='${sessionEmail}'>`).addClass('input'))
  .append($('<input type="submit" value="Update Profile">').addClass('button'))
  .appendTo('.profile-flexbox');  

  function makeEvents() {

    $('button.edit').on('click', function() {
      $(this).parents('.profile-data').toggle().toggleClass('hidden');
      $(this).parent().prev('.profile-form').toggle().toggleClass('hidden');
     

      $('.profile-form').on('submit', (e) => {
        e.preventDefault();
        e.stopPropagation();
        let userName = profileForm.children("[name='name']").val();
        let email = profileForm.children("[email='email']").val();
          console.log(userName);
          console.log(email);
      });

    });
  }
});
