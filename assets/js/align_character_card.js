
window.onload = function()
{
    var character_card_description_div = document.getElementById('character_card_description');
    var character_card_image_div = document.getElementsByClassName('Hoshimori_character_card_img');

    if (character_card_image_div.clientHeight < character_card_description_div.clientHeight)
    {
        character_card_description_div.classList.add('Hoshimori_character_card_align_baseline');
    }
}
