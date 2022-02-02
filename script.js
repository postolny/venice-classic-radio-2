$(function() {
  var audio = new Audio();
  var playlist = $("#playlist");
  var timer;

  $('.value').text($("#volumeSlider").val())
  $("#volumeSlider").change(function() {
    var volume = $(this).val();
    audio.volume = volume;
    $(this).attr('value', volume);
    $('.value').text(volume);
  });

  playlist.on("click", "li", function() {
    playlist.find(".current").removeClass("current");
    $(this).addClass("current");
    audio.src = $(this).data("src");
    currentPlayer = $(this).data("url");
    $("#pl").show("fast");
    audio.play();
    $(".btn-info").stop(1, 1).fadeIn();

    function load() {
      $.ajax({
        url: currentPlayer,
        dataType: 'xml',
        cache: false,
        type: 'POST',
        error: function() {},
        success: function(data) {
          var xml_node = $('NowPlaying', data);
          var compositore = xml_node.find('NP[Id="Current"] > Info > Artista').text();
          var titolo = xml_node.find('NP[Id="Current"] > Info > Titolo').text();
          var movimenti = xml_node.find('NP[Id="Current"] > Info > Movimenti').text();
          var interprete = xml_node.find('NP[Id="Current"] > Info > Interpreti').text();
          var durata = xml_node.find('NP[Id="Current"] > Info > Durata').text();

          var compositore_next = xml_node.find('NP[Id="Next1"] > Info > Artista').text();
          var titolo_next = xml_node.find('NP[Id="Next1"] > Info > Titolo').text();
          var movimenti_next = xml_node.find('NP[Id="Next1"] > Info > Movimenti').text();
          var interprete_next = xml_node.find('NP[Id="Next1"] > Info > Interpreti').text()
          var durata_next = xml_node.find('NP[Id="Next1"] > Info > Durata').text();

          $("#art,#art1").html(compositore);
          $("#tit,#tit1").html(titolo);
          $('#mov').html(movimenti);
          $('#int').html(interprete);
          $("#dur").html(durata);

          $("#art-next").html(compositore_next);
          $("#tit-next").html(titolo_next);
          $('#mov-next').html(movimenti_next);
          $('#int-next').html(interprete_next);
          $("#dur-next").html(durata_next);
        }
      });
      timer = setTimeout(load, 15000);
    }
    load();
  });

  $(".stop").click(function(e) {
    e.preventDefault();
    audio.pause();
    // Остановить аудиопоток
    audio.src = audio.src;
    audio.src = "";
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