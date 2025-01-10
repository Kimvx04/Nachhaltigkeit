document.addEventListener("DOMContentLoaded", () => {
    const products = Array.from(document.querySelectorAll(".product"));
    const paginationContainer = document.querySelector(".pagination");
    const nextButton = document.querySelector(".pagination-next");
    const prevButton = document.querySelector(".pagination-prev");

    let itemsPerPage;
    let currentPage = 1;

    const updateLayout = () => {
        const isMobile = window.innerWidth <= 768;
        itemsPerPage = isMobile ? 4 : 6;
        renderPage(currentPage);
    };

    const renderPage = (pageNumber) => {
        const totalPages = Math.ceil(products.length / itemsPerPage);
        currentPage = Math.max(1, Math.min(pageNumber, totalPages));

        const start = (currentPage - 1) * itemsPerPage;
        const end = start + itemsPerPage;

        products.forEach((product, index) => {
            product.style.display = index >= start && index < end ? "block" : "none";
        });

        updatePaginationState(totalPages);
    };

     // Aktualisierung der Seitennavigation
     const updatePaginationState = (totalPages) => {
        prevButton.disabled = currentPage === 1;
        nextButton.disabled = currentPage === totalPages;
    };

    nextButton.addEventListener("click", () => {
        renderPage(currentPage + 1);
    });

    prevButton.addEventListener("click", () => {
        renderPage(currentPage - 1);
    });

    window.addEventListener("resize", updateLayout);
    updateLayout();

   // Burger-Menü Logik
   burgerMenu.addEventListener("click", (event) => {
    event.stopPropagation();
    dropdownMenu.classList.toggle("active");
});

document.addEventListener("click", (event) => {
    if (!burgerMenu.contains(event.target) && !dropdownMenu.contains(event.target)) {
        dropdownMenu.classList.remove("active");
    }
});

    // Warenkorb Float-Button für Mobilgeräte
    const cartLink = document.querySelector(".cart");
    const floatButton = document.createElement("a");
    floatButton.href = "cart.html";
    floatButton.classList.add("cart-float");
    floatButton.innerHTML = `<img src="in-den-warenkorb-legen.png" alt="Warenkorb">`;
    let isFloatButtonVisible = false;

    const handleResize = () => {
        if (window.innerWidth <= 768) {
            if (!isFloatButtonVisible) {
                document.body.appendChild(floatButton);
                isFloatButtonVisible = true;
            }
            if (cartLink) cartLink.style.display = "none";
        } else {
            if (isFloatButtonVisible) {
                document.body.removeChild(floatButton);
                isFloatButtonVisible = false;
            }
            if (cartLink) cartLink.style.display = "inline-block";
        }
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    // Zeige die erste Seite
    showPage(1);
});

