$(window).on(
  "scroll", 
  function()
  {
    var windowHeight = $(window).height();
    $("#wh span").text(windowHeight);

    var scroll_top = $(window).scrollTop();
    $("#scroll span").text(scroll_top);

    $(".fade_box").each(
      function()
      {
        var elem_pos = $(this).offset().top;
        $(this).find(".box_posspan").text(Math.floor(elem_pos));

        console.log(windowHeight, scroll_top, elem_pos);
        if (scroll_top >= elem_pos - windowHeight)
        {
          $(this).addClass("fadein");
          $(this).removeClass("fadeout");
        }
        else
        {
          $(this).removeClass("fadein");
          $(this).addClass("fadeout");
        }
      }
    )
  }
);