$(function() {
  let audio = $("#player")[0];

  $("#volumeSlider").change(function() {
    let volume = $(this).val();
    audio.volume = volume;
  });

  playlist = $("#playlist");
  playlist.on("click", "li", function() {
    playlist.find(".current").removeClass("current");
    $(this).addClass("current");
    audio.src = $(this).data("src");
    currentPlayer = $(this).data("url");
    $("#pl").show("fast");
    audio.play();
    $(".btn-info").stop(1, 1).fadeIn();
    let auto_refresh = setInterval(function() {
      $("#art,#art1").load(currentPlayer + " " + "#Current Artista");
      $("#tit,#tit1").load(currentPlayer + " " + "#Current Titolo");
      $("#mov").load(currentPlayer + " " + "#Current Movimenti");
      $("#int").load(currentPlayer + " " + "#Current Interpreti");
      $("#dur").load(currentPlayer + " " + "#Current Durata");
      $("#art-next").load(currentPlayer + " " + "#Next1 Artista");
      $("#tit-next").load(currentPlayer + " " + "#Next1 Titolo");
      $("#mov-next").load(currentPlayer + " " + "#Next1 Movimenti");
      $("#int-next").load(currentPlayer + " " + "#Next1 Interpreti");
      $("#dur-next").load(currentPlayer + " " + "#Next1 Durata");
    }, 3000);
  });

  $(".stop").click(function(e) {
    e.preventDefault();
    audio.pause();
    $("#pl").hide("fast");
    $(".btn-info").stop(1, 1).fadeOut();
    playlist.find(".current").removeClass("current");
  });

  $(".btn-info").hide();
  $(".btn-info").click(function(e) {
    e.preventDefault();
    $(this).toggleClass("opened").toggleClass("closed");
    $("#info").toggle();
    if ($(this).hasClass("opened")) {
      $(this).addClass("btn-info-close");
    } else {
      $(this).removeClass("btn-info-close");
    }
  });
  // Закрываем панель по клику на ней и меняем вид спрайта .btn-info
  $("#info").click(function() {
    $(".btn-info").toggleClass("opened").toggleClass("closed");
    $(this).hide();
    if ($(".btn-info").hasClass("opened")) {
      $(".btn-info").add("btn-info-close");
    } else {
      $(".btn-info").removeClass("btn-info-close");
    }
  });
});