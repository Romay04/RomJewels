let slideIndex = 0;
showSlides();

function showSlides() {
    let slides = document.getElementsByClassName("slide");
    for (let i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
        slides[i].classList.remove("active");
    }
    slideIndex++;
    if (slideIndex > slides.length) { slideIndex = 1; }
    slides[slideIndex-1].style.display = "block";
    setTimeout(() => {
        slides[slideIndex-1].classList.add("active");
    }, 1500);
    setTimeout(showSlides, 5000);
}
//home top- pick
let currentIndex = 0;
        const items = document.querySelectorAll('.item');
        const itemsPerPage = 4;

        function showItems(index) {
            items.forEach((item, i) => {
                item.classList.toggle('active', i >= index && i < index + itemsPerPage);
            });
        }

        function prevItems() {
            currentIndex = (currentIndex === 0) ? items.length - itemsPerPage : currentIndex - itemsPerPage;
            if (currentIndex < 0) {
                currentIndex = 0;
            }
            showItems(currentIndex);
        }

        function nextItems() {
            currentIndex = (currentIndex + itemsPerPage >= items.length) ? 0 : currentIndex + itemsPerPage;
            showItems(currentIndex);
        }
        showItems(currentIndex);


