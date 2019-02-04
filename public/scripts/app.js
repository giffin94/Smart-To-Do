$(() => {
  const itemForm = $(".new-to-do");

  function renderLists(rows) {
    for(row of rows) {
      let thisClass = row.category;
      let thisID = row.id;
      if (!thisClass) {
        thisClass = 'uncat';
      }

      const check = $('<span>').addClass('check').text('√');
      const priorityItem = $('<span>').addClass(`${thisClass} priority list-text`).text(row.to_do);
      const regularItem = $('<span>').addClass(`${thisClass} list-text`).text(row.to_do);
      const options = $('<span>').addClass('options')
        .append($('<span>').addClass('icon').text('&'))
        .append($('<div>').addClass('drop-down')
          .append($('<div>').addClass('eat-option drop-item').attr({ 'data-id': `${thisID}`, 'data-cat': '2' }).text('EAT'))
          .append($('<div>').addClass('watch-option drop-item').attr({ 'data-id': `${thisID}`, 'data-cat': '4' }).text('WATCH'))
          .append($('<div>').addClass('read-option drop-item').attr({ 'data-id': `${thisID}`, 'data-cat': '1' }).text('READ'))
          .append($('<div>').addClass('buy-option drop-item').attr({ 'data-id': `${thisID}`, 'data-cat': '3' }).text('BUY'))
          .append($('<div>').addClass('delete-option drop-item').attr({ 'data-id': `${thisID}`, 'data-cat': '0' }).text('DELETE')));

      if (row.priority) {
        $('<div>').addClass(`list-item`)
          .append(check)
          .append(priorityItem)
          .append(options)
          .prependTo(`div#${thisClass}`);
      } else {
        $('<div>').addClass(`list-item`)
          .append(check)
          .append(regularItem)
          .append(options)
          .appendTo(`div#${thisClass}`);
      }
    }
  }

  $.ajax({
    method: 'GET',
    url: '/your-lists'
  }).done((rows) => {
    renderLists(rows);
    createEvents();
  });

  itemForm.on("submit", function(event) {
    event.preventDefault();
    let query = $(this).serialize();
    $.ajax({
      method: 'GET', // change to PUT
      url: `/apis/${query}`, // change to users/new-item
      // data: req.body // include query as data item
    }).then((response) => {
      console.log('CAW', response);
    })
  })

  function createEvents () {

    const revealDropDown = function(e) {
      const dropDown = $(this).find('.drop-down'); // 'this' is .options
      if (!$(dropDown).hasClass('revealed')) {
        $(dropDown).show(75).toggleClass('revealed');
      }
      $(this).off('click');
      e.stopPropagation();
    }

    const hideDropDown = function(e) {
      $(this).hide(75, () => { // 'this' is .drop-down
          $('.options').on('click', revealDropDown);
        })
        .toggleClass('revealed'); // null
      e.stopPropagation();
    }

    const resetDropDownEvents = () => {
      $('.revealed')
        .hide(75, () => {
          $('.options').on('click', revealDropDown);
        })
        .toggleClass('revealed'); // null
    }

    $('.options').on('click', revealDropDown);
    $('*').not('.revealed').not('.options').on('click', resetDropDownEvents);
    $(".drop-item").click( function (e) {
      let itemID = $(this).data('id');
      let newCat = $(this).data('cat');
      console.log(itemID);
      console.log(newCat);
      if (newCat) {
        $.ajax({
          method: 'PATCH',
          url: '/your-lists/recat',
          data: {
            id: itemID,
            catID: newCat
          }
        })
        //recategorize
      } else {
        //delete
      }
    });
    $('.drop-down').on('click', hideDropDown);

  }

});


