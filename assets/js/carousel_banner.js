const userName = "pto8913";
const carousels = document.querySelectorAll(".carousel__container");

let activeCarousel = null;
let activeCarouselIndex = 0;
let activeCarouselLastIndex = 0;
let timer;

carousels.forEach(
  (carousel, cont_slide) => {
    let slideIndex = 1;
    let slides = carousel.querySelectorAll(".carousel__slide");

    if (cont_slide == 1)
    {
      activeCarousel = carousel;
      activeCarouselIndex = 0;
      activeCarouselLastIndex = slides.length - 1;
    }

    /* create move to prev slide button */ 
    let prev = document.createElement("span");
    prev.classList.add("prev");
    prev.innerHTML = "&#10094;";
    carousel.append(prev);
    /* clicked prev button event */
    prev.addEventListener(
      "click",
      {name: userName, handleEvent: clickedPrev}
    );

    /* create move to next slide button */ 
    let next = document.createElement("span");
    next.classList.add("next");
    next.innerHTML = "&#10095;";
    carousel.append(next);
    /* clicked next button event */
    next.addEventListener(
      "click",
      (e) => {
        slideIndex == slides.length ? (slideIndex = 1) : ++slideIndex;
        activeCarouselIndex = slideIndex;
        activeCarousel = slides[slideIndex];
        slides.forEach(
          (slide, cont_slide) => {
            slide.style = "left: -" + (slideIndex - 1) * 100 + "%;";
          }
        );
      }
    );

    /* create dots under the slide */ 
    let dots = document.createElement("div");
    dots.classList.add("dots");
    carousel.append(dots);
    carousels.forEach(
      (slide, cont_slide) => {
        let dot = document.createElement("span");
        dot.classList.add("dot");
        dots.append(dot);
        dot.addEventListener(
          "click", 
          (e) => {
            slideIndex = cont_slide + 1;
            activeCarouselIndex = slideIndex;
            activeCarousel = slides[slideIndex];
            slides.forEach(
              (slide, cont_slide) => {
                slide.style = "left: -" + (slideIndex - 1) * 100 + "%;";
              }
            );
          }
        );

        let numberText = document.createElement("div");
        numberText.classList.add("numbertext");
        numberText.innerText = cont_slide + 1 + "/" + slides.length;
        slide.insertAdjacentElement("afterbegin", numberText);
      }
    );
  }
);

function clickedPrev(e)
{
  slideIndex == 1 ? (slideIndex = slides.length) : --slideIndex;
  activeCarouselIndex = slideIndex;
  activeCarousel = slides[slideIndex];
  slides.forEach(
    (slide, cont_slide) => {
      slide.style = "left: -" + (slideIndex - 1) * 100 + "%;";
    }
  );
}


function changeSlide()
{
  let width = activeCarousel.outerWidth(true);
  activeCarousel.stop().animate(
    {
      left: activeCarouselIndex * -width
    }
  );
}

function startTimer()
{
  timer = setInterval(
    function()
    {
      if (activeCarouselIndex == activeCarouselLastIndex)
      {
        slideIndex = 0;
        changeSlide();
      }
      else
      {
        ++slideIndex;
        changeSlide();
      }
    },
    3000 /* millisecconds */
  )
}

function stopTimer()
{
  clearInterval(timer);
}

startTimer();