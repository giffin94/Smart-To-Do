// import { get } from "http";

$(() => {
  const itemForm = $(".new-to-do");

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
    createEvents();
  });

  itemForm.on("submit", function(event) {
    event.preventDefault();
    let query = $(this).serialize();
    $.ajax({
      method: 'GET',
      url: `/apis/${query}`
    })
  })

  function createEvents () {

    const revealDropDown = function(e) {
      $(this).find('.drop-down').show(75).toggleClass('revealed');
      $(this).off('click');
      e.stopPropagation();
    }

    const hideDropDown = function(e) {
      $(this)
        .hide(75, function () {
          $(this).parent().on('click', revealDropDown);
        })
        .toggleClass('revealed');
      e.stopPropagation();
    }

    const resetDropDownEvents = function (e) {
      $('.revealed').toggleClass('revealed').hide(75, function () {
        $('.options').on('click', revealDropDown);
      });
    }

    $('.options').on('click', revealDropDown);
    $('.drop-down').on('click', hideDropDown);
    $('*').not('.revealed').not('.options').on('click', resetDropDownEvents); // mash classes in one string, try
  }

});


