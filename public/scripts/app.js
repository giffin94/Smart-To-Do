$(() => {
  const itemForm = $(".new-to-do");
  const profileBtn = $(".nav")

  function renderLists(rows) {
    for(row of rows) {
      let thisClass = row.category;
      if (!thisClass) {
        thisClass = 'uncat';
      }
      if (row.priority) {
        $('<div>').addClass('list-item')
        .append($('<span>').addClass('check').text('√'))
        .append($('<span>').addClass(`${thisClass} priority list-text`).text(row.to_do))
        .append($('<span>').addClass('options').text('&'))
        .prependTo(`div#${thisClass}`);
      } else {
        $('<div>').addClass('list-item')
        .append($('<span>').addClass('check').text('√'))
        .append($('<span>').addClass(`${thisClass} list-text`).text(row.to_do))
        .append($('<span>').addClass('options').text('&'))
        .appendTo(`div#${thisClass}`);
      }
    }
  }

  $.ajax({
    method: 'GET',
    url: '/your-lists'
  }).done((rows) => {
    renderLists(rows);
  });

  itemForm.on("submit", function(event) {
    event.preventDefault();
    let query = $(this).serialize();
    $.ajax({
      method: 'GET',
      url: `/apis/${query}`
    }).then((response) => {
      console.log(response);
    })
  })


  

});


