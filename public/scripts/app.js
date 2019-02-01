$(() => {
  $.ajax({
    method: "GET",
    url: "/users"
  }).done((rows) => {
    for(row of rows) {
      $("<div>").text(row.to_do + ", category: " + row.category).appendTo($("body"));
    }
  });;
});
