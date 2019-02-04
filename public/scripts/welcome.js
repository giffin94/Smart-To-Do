$(() => {

  const registrationForm = $('.new-user'); 

  registrationForm.on('submit', (e) => {
    e.preventDefault();
    const userName = registrationForm.children("[name='name']").val();
    const email = registrationForm.children("[name='email']").val();
    const password = registrationForm.children("[name='password']").val();
    $.ajax( {
      method: 'POST',
      url: '/verify/reg?_method=PUT',
      data: {
        userName,
        email,
        password
      }
    })
    .then(() => {
      alert("registration successful!");
      $('body').empty().append('<a href="/">SMARTCAT AWAITS...</a>');
    })
    .catch((err) => {
      // console.log(err.responseJSON[0].error); we can send custom errors this way
      alert("email already registered");
    });
  });
})