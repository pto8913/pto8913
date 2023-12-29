$(window).on("load", initialize())
$(window).on("resize", initialize())
function initialize()
{
  var windowHeight = $(window).height();
  $("#wh span").text(windowHeight);

  $(".fade_box").each(
    function()
    {
      var elemTop = $(this).offset().top;
      var elemBottom = $(this).offset().bottom;
      $(this).find(".box_posspan").text(Math.floor(elemTop));

      if (0 <= elemTop && elemTop <= windowHeight || 0 <= elemBottom && elemBottom <= windowHeight)
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

$(window).on(
  "scroll", 
  function()
  {
    var windowHeight = $(window).height();
    $("#wh span").text(windowHeight);

    var viewportTop = $(window).scrollTop();
    $("#scroll span").text(viewportTop);

    $(".fade_box").each(
      function()
      {
        var elemTop = $(this).offset().top;
        var elemBottom = $(this).offset().bottom;
        $(this).find(".box_posspan").text(Math.floor(elemTop));

        var viewportHeight = viewportTop + windowHeight;
        // console.log(windowHeight, viewportTop, elemTop);

        if (viewportTop <= elemTop && elemTop <= viewportHeight || viewportTop <= elemBottom && elemBottom <= viewportHeight)
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