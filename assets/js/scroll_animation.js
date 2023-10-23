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
  $(function() {
    // スクロールイベント
      $(window).scroll(
        function() {
          // フェードアニメーションを呼び出す
          fadeAnime();
        }
      );
      
      // フェードアニメーションの設定
      function fadeAnime() {
        // .fadeUpTriggerが付いた要素に対して
        $('.fadeUpTrigger').each(
          function() {
            // 縦位置を取得し-50pxして、変数targetに代入する
            let target = $(this).offset().top -= 50;
            // スクロール量を取得し、変数scrollに代入する
            let scroll = $(window).scrollTop();
            // 表示画面の高さを取得し、変数windowHeightに代入する
            let windowHeight = $(window).height();
            // 要素の縦位置から表示画面の高さを引いて200pxを足した数字よりscrollのほうが大きい場合
            if(scroll > target - windowHeight + 200) {
              // .fadeUpを追加する
              $(this).addClass('fadeUp');
            } else {
              // そうでない場合は.fadeUpを削除する
              $(this).removeClass('fadeUp');
            }
          }
        );
      };    
    }
  );
}

let fadeInTarget = document.querySelectorAll('.fade-in');
window.addEventListener(
  'scroll',
  () => {
    for (let i = 0; i < fadeInTarget.length; i++){
      const rect = fadeInTarget[i].getBoundingClientRect().top;
      const scroll = document.documentElement.scrollTop;
      const offset = rect + scroll;
      const windowHeight = window.innerHeight; // 現在のブラウザの高さ
      if (scroll > offset - windowHeight + 150) {
      fadeInTarget[i].classList.add('scroll-in');
      }
      else if (scroll < offset - windowHeight - 150)
      {
      fadeInTarget[i].classList.add('scroll-out');
      }
    }
  }
);