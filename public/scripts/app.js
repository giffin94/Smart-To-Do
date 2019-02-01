$(() => {
  $.ajax({
    method: "GET",
    url: "/your-lists"
  }).done((rows) => {
    for(row of rows) {
      $("<div>").text(row.to_do + ", category: " + row.category).appendTo($("body"));
    }
  });
});
