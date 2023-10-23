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