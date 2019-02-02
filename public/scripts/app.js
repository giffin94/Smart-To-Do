$(() => {
  const catLookup = {
    '1': 'read',
    '2': 'eat',
    '3': 'buy',
    '4': 'watch',
    '5': 'done'
  };

  $.ajax({
    method: 'GET',
    url: '/your-lists'
  }).done((rows) => {
    for(row of rows) {
      let thisClass = row.category;
      if (!thisClass) {
        thisClass = 'uncat';
      }
      if (row.priority) {
        $('<span>').text(row.to_do).addClass(`${thisClass} priority list-item`).prependTo(`div#${thisClass}`);
      } else {
        $('<span>').text(row.to_do).addClass(`${thisClass} list-item`).appendTo(`div#${thisClass}`);
      }
    }
  });
});


