const popup_container = document.getElementById('popup_img_container');
const popup_img = popup_container.querySelector('img');

popup_container.addEventListener(
    'click', 
    () => popup_container.style.display = 'none'
);

document.querySelectorAll('popup_img').forEach(
    i => {
        i.addEventListener(
            'click',
            () => {
                popup_img.src = i.src;
                popup_container.style.display = 'block';
            }
        );
    }
);