$(window).on(
  "scroll", 
  function()
  {
    var viewportHeight = $(window).height();
    $("#wh span").text(viewportHeight);
    var documentPosition = $(window).scrollTop();
    $("#scroll span").text(documentPosition);

    $(".fade_box").each(
      function()
      {
        var elemOffset = $(this).offset().top;
        var elemHeight = $(this).height;
        $(this).find(".box_posspan").text(Math.floor(elemOffset));

        var visibleArea = documentPosition + viewportHeight;
        var elemArea = elemOffset + elemHeight;
        console.log(documentPosition, viewportHeight, elemOffset, elemHeight);
        if (documentPosition <= elemOffset && visibleArea >= elemArea)
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