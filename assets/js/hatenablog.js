$(document).ready(function(){
  if( $('#auto-site-map').length == 0 ){
    console.log( "no tag end--->" + $('#auto-site-map').length ) ;
    return ;
  }
  var page = 1 ;
  var myUrl = 'https://pto8913.hatenablog.com/'
  var  url = "" ;
  var category = "" ;
  var  sitemap = new Array() ;
  while( 1 ){
    var data = getArchive( myUrl + '/archive?page=' + page);
    var html = jQuery(jQuery.parseHTML(data));
    html.find('.archive-entry .entry-title a').each( function( i, val )
    {
      url = $( val ).prop( "outerHTML" ) ;
      var category_names = jQuery(html.find( '.archive-entry' ).eq( i ).find( '.categories' )) ; 
      var   cate_len = category_names.children('a').length ;
      for( var cate_cnt = 0 ; cate_cnt < cate_len ; cate_cnt++ ){
        category = category_names.children('a').eq( cate_cnt ).html() ;
        if( sitemap[ category ] == undefined ){
          sitemap[ category ] = new Object() ;
          sitemap[ category ].url = new Array() ;
        }
        sitemap[ category ].url.push( url ) ;
      }
    });
    if( html.find('.pager-next').length == 0 ){
      break ;
    }
    page++ ;
  }
  var  htmlstr = "" ;
  for( var i in sitemap ){
    htmlstr += "<h2>" + i + "</h2>" ;
    htmlstr += '<ul class="auto-map">' ;
    for( var j = 0 ; j < sitemap[ i ].url.length ; j++ ){
      htmlstr += '<li class="auto-map-url">' + sitemap[ i ].url[ j ] + "</li>" ;
    }
    htmlstr += "</ul>" ;
  }
  $("#auto-site-map").html( htmlstr ) ;
});
function getArchive(urlInfo){
  var data= $.ajax({
    type: 'GET',
    url: urlInfo,
    async: false,
    dataType: 'html',
    success: function( data ){
    },
    error:function() {
      //取得失敗時に実行する処理
      console.log("何らかの理由で失敗しました");
    }
  }).responseText;
  return data;
}