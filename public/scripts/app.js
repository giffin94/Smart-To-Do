// import { get } from "http";

$(() => {
  const itemForm = $(".new-to-do");

  function renderLists(rows) {
    for(row of rows) {
      let thisClass = row.category;
      if (!thisClass) {
        thisClass = 'uncat';
      }

      const check = $('<span>').addClass('check').text('√');
      const priorityItem = $('<span>').addClass(`${thisClass} priority list-text`).text(row.to_do);
      const regularItem = $('<span>').addClass(`${thisClass} list-text`).text(row.to_do);
      const options = $('<span>').addClass('options')
        .append($('<span>').addClass('icon').text('&'))
        .append($('<div>').addClass('drop-down')
          .append($('<div>').addClass('eat-option drop-item').text('EAT'))
          .append($('<div>').addClass('watch-option drop-item').text('WATCH'))
          .append($('<div>').addClass('read-option drop-item').text('READ'))
          .append($('<div>').addClass('buy-option drop-item').text('BUY'))
          .append($('<div>').addClass('delete-option drop-item').text('DELETE')));

      if (row.priority) {
        $('<div>').addClass('list-item')
          .append(check)
          .append(priorityItem)
          .append(options)
          .prependTo(`div#${thisClass}`);
      } else {
        $('<div>').addClass('list-item')
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
      method: 'GET',
      url: `/apis/${query}`
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
      $(this).hide(75, function () { // 'this' is .drop-down
          $('.options').on('click', revealDropDown);
        })
        .toggleClass('revealed'); // null
      e.stopPropagation();
    }

    const resetDropDownEvents = function (e) {
      $('.revealed')
        .hide(75, function () {
          $('.options').on('click', revealDropDown);
        })
        .toggleClass('revealed'); // null
    }

    $('.options').on('click', revealDropDown);
    $('.drop-down').on('click', hideDropDown);
    $('*').not('.revealed').not('.options').on('click', resetDropDownEvents);
  }

});


