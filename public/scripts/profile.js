$(() => {

  function renderUserInfo(data) {
    const userName = data[0].name
    const userEmail = data[0].email
    console.log(userName, userEmail);
    $('<div>').addClass('list-item')
      .append($('<span>').addClass('username').text(`Username: ${userName}`))
      .append($('<button>').addClass('edit').text('edit'))
      .appendTo("div.eat");
    $('<div>').addClass('list-item')
      .append($('<span>').addClass('email').text(`Email: ${userEmail}`))
      .append($('<button>').addClass('edit').text('edit'))
      .appendTo("div.eat");   
  }

  $.ajax({
    method: 'GET',
    url: '/profile/info'
  }).then( (rows) => {
    renderUserInfo(rows);
  })

});