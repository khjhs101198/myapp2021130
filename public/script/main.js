$("button").on("click", function() {
  event.preventDefault();
  $.ajax({
    url: "/",
    data: $("#ajax_form").serializeArray(),
    type: "POST"
  }).done(function(response){
    console.log("Succeed and catch by done");
    console.log(response);
    window.location.reload();
  }).fail(function() {
    console.log("Fail and catch by fail");
  });
});

$("li").on("click", function() {
  let data = this.innerHTML;
  let idx = data.indexOf(" ");
  $.ajax({
    url: "/",
    data: { place: data.slice(0, idx), job: data.slice(idx+1, data.length) },
    type: "DELETE"
  }).done(function(response){
    console.log("Succeed and catch by done");
    console.log(response);
    window.location.reload();
  }).fail(function() {
    console.log("Fail and catch by fail");
  });
});
