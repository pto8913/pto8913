var windowHeight = $(window).height();
$("#wh span").text(windowHeight);
$(window).on(
  "scroll", 
  function()
  {
    var scroll_top = $(window).scrollTop();
    $("#scroll span").text(scroll_top);

    $(".fade_box").each(
      function()
      {
        var elem_pos = $(this).offset().top;
        $(this).find(".box_posspan").text(Math.floor(elem_pos));

        if (scroll_top >= elem_pos - windowHeight + 400)
        {
          $(this).addClass("fadein");
        }
        else
        {
          $(this).removeClass("fadein");
        }
      }
    )
  }
);