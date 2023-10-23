fetch('https://code.jquery.com/jquery-3.6.3.min.js').then(r=>r.text()).then(t=>eval(t)).then(
  ()=>{
    if($('#fade-in').length == 0)
    {
      console.log( "no tag end--->" + $('#fade-in').length ) ;
      return ;
    }
    Init();
  }
);

function Init()
{
  
}

var windowHeight = $(window).height();
$("#wh span").text(windowHeight);
$(window).on(
  "scroll", 
  function()
  {
    var scroll_top = $(window).scroll_top();
    $("#scroll span").text(scroll_top);

    $(".fade_box").each(
      function()
      {
        var elem_pos = $(this).offset().top;
        $(this).find(".box_posspan").text(Math.floor(elem_pos));

        if (scroll_top >= elem_pos - windowHeight + 200)
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