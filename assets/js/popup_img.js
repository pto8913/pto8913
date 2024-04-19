$(window).on("load", initialize())
function initialize()
{
    console.log("initialized");
    const popup_container = document.getElementById('popup_img_container');
    const popup_img = popup_container.querySelector('img');

    popup_container.addEventListener(
        'click', 
        () => {
            console.log("popup_container clicked");
            popup_container.style.display = 'none'
        }
    );

    document.addEventListener(
        'click',
        elem => {
            if (elem.target.classList.contains('popup_img'))
            {
                console.log("popup_img clicked");
                popup_img.src = elem.target.src;
                popup_container.style.display = 'block';
            }
        }
    );
}