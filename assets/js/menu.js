fetch('https://code.jquery.com/jquery-3.6.3.min.js').then(r=>r.text()).then(t=>eval(t)).then(
  ()=>{
    if($('#menu_logo').length == 0)
    {
      console.log( "no tag end--->" + $('#menu_logo').length ) ;
      return ;
    }
    /* set logo visible, when the logo is not intersecting */
    $(window).on(
      "scroll",
      function()
      {
        var scroll_top = $(window).scrollTop();
        $("#menu_logo").each(
          function()
          {
            if (scroll_top >= 200)
            {
              $(this).addClass("menu_display");
            }
            else
            {
              $(this).removeClass("menu_display");
            }
          }
        );

        $(".menu_li_container").each(
          function()
          {
            if (scroll_top >= 200)
            {
              $(this).addClass("menu_li_container_scrolled");
            }
            else
            {
              $(this).removeClass("menu_li_container_scrolled");
            }
          }
        );

        /* Don't remove!!! */
        return false;
      }
    );
  }
);