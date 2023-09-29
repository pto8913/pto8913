var coll = document.getElementsByClassName("collapse");

for (var collIdx = 0; coll.length; ++collIdx)
{
    coll[collIdx].addEventListener(
        "click",
        function() {
            this.classList.toggle("active");
            var content = this.nextElementSibling;
            if (content.style.display === "block")
            {
                content.style.display = "none";
            }
            else
            {
                content.style.display = "block";
            }
        }
    );
}