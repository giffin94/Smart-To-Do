$(() => {
  const itemForm = $(".new-to-do");

  function renderLists(rows) {
    for(row of rows) {
      let thisClass = row.category;
      let thisID = row.id;
      if (!thisClass) {
        thisClass = 'uncat';
      }

      const check = $('<span>').addClass('check').attr( 'data-id', `${thisID}`).text('√');
      // const priorityItem = $('<span>').addClass(`${thisClass} priority list-text`).text(row.to_do);
      const thisItem = $('<span>').addClass(`${thisClass} list-text`).text(row.to_do);
      const options = $('<span>').addClass('options')
        .append($('<span>').addClass('icon').text('&'))
        .append($('<div>').addClass('drop-down')
          .append($('<div>').addClass('eat-option drop-item').attr({ 'data-id': `${thisID}`, 'data-cat': '2' }).text('EAT'))
          .append($('<div>').addClass('watch-option drop-item').attr({ 'data-id': `${thisID}`, 'data-cat': '4' }).text('WATCH'))
          .append($('<div>').addClass('read-option drop-item').attr({ 'data-id': `${thisID}`, 'data-cat': '1' }).text('READ'))
          .append($('<div>').addClass('buy-option drop-item').attr({ 'data-id': `${thisID}`, 'data-cat': '3' }).text('BUY'))
          .append($('<div>').addClass('delete-option drop-item').attr({ 'data-id': `${thisID}`, 'data-cat': '0' }).text('DELETE')));

      if (row.priority) {
        $('<div>').addClass(`list-item priority`).attr( 'data-id', `${thisID}`)
          .append(check)
          .append(thisItem)
          .append(options)
          .prependTo(`div#${thisClass}`);
      } else {
        $('<div>').addClass(`list-item`).attr( 'data-id', `${thisID}`)
          .append(check)
          .append(thisItem)
          .append(options)
          .appendTo(`div#${thisClass}`);
      }
    }
  }

  function clearLists() {
    $('*.list-items').empty();
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
      if (newCat) {
        $.ajax({
          method: 'POST',
          url: '/your-lists/recat-item?_method=PATCH',
          data: {
            id: itemID,
            catID: newCat
          }
        }).then((rows) => {
          clearLists();
          renderLists(rows);
          createEvents();
        })
      } else {
        $.ajax({
          method: 'POST',
          url: '/your-lists/delete-item?_method=DELETE',
          data: {
            id: itemID,
          }
        }).then((rows) => {
          clearLists();
          renderLists(rows);
          createEvents();
        })
      }
    });
    $('.drop-down').on('click', hideDropDown);
    $('.check').click( function(e) {
      let itemID = $(this).data('id');
        $.ajax({
          method: 'POST',
          url: '/your-lists/recat-item?_method=PATCH',
          data: {
            id: itemID,
            catID: 5
          }
        }).then( (rows) => {
          clearLists();
          renderLists(rows);
          createEvents();
        })
    });
    $('.list-item').dblclick( function() {
      let itemID = $(this).data('id');
      $.ajax({
        method: 'POST',
        url: '/your-lists/prioritize-item?_method=PATCH',
        data: {
          id: itemID
        }
      }).then((rows) => {
        clearLists();
        renderLists(rows);
        createEvents();
      })
    });
  }
});
