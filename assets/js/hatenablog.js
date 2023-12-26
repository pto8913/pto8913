fetch('https://code.jquery.com/jquery-3.6.3.min.js').then(r=>r.text()).then(t=>eval(t)).then(
    ()=>{
        if($('#auto-site-map').length == 0)
        {
            console.log( "no tag end--->" + $('#auto-site-map').length ) ;
            return ;
        }
        Init();
    }
);

function Init()
{
    var page = 1;
    var myUrl = 'https://pto8913.hatenablog.com';
    var sitemap_url = new Array();
    var sitemap_time = new Array();
    const num_of_post = 5;
    for (var post_idx=0; post_idx < num_of_post; ++post_idx)
    {
        var data = getArchive( myUrl + '/archive?page=' + page);
        var html = jQuery(jQuery.parseHTML(data));
        html.find('.archive-entry .entry-title a').each(
        function( i, val )
        {
            console.log(val);

            if (i >= num_of_post - 1)
            {
            return false;
            }
            var url = $(val).prop("outerHTML");
            sitemap_url.push(url);
        }
        );
        html.find('time').each(
        function(i, val)
        {
            console.log(val);

            if (i >= num_of_post - 1)
            {
            return false;
            }
            var time = $(val).prop("outerHTML");
            sitemap_time.push(time);
        }
        );
        if( html.find('.pager-next').length == 0 )
        {
        break;
        }
        page++;
    }
    var htmlstr = "";
    htmlstr += '<!-- Begin hatenablog papers -->';
    htmlstr += '<div class="auto-map">';
    htmlstr += '<h2 class="auto-map-subject">最新の記事</h2>';
    for(var idx=0; idx < num_of_post; ++idx){
        htmlstr += '<div class="auto-map-post">';
        htmlstr += sitemap_time[idx];
        htmlstr += '<p class="auto-map-title">' + sitemap_url[idx] + '</p>';
        htmlstr += "</div>" ;
    }
    htmlstr += '<div class="auto-map-more">';
    htmlstr += '<a href="https://pto8913.hatenablog.com/archive">もっと見る</h2>';
    htmlstr += '</div>';
    htmlstr += '</div>';
    htmlstr += '<!-- End hatenablog papers -->';
    $("#auto-site-map").html( htmlstr ) ;
}
function getArchive(urlInfo){
    var data= $.ajax(
        {
            type: 'GET',
            url: urlInfo,
            async: false,
            dataType: 'html',
            success: function( data ){
            },
            error:function() {
            console.log("何らかの理由で失敗しました");
            }
        }
    ).responseText;
    return data;
}