document.addEventListener("DOMContentLoaded", () => {
    const products = Array.from(document.querySelectorAll(".product"));
    const paginationContainer = document.querySelector(".pagination");
    const burgerMenu = document.querySelector(".burger-menu");
    const dropdownMenu = document.querySelector(".dropdown-menu");
    let itemsPerPage = window.innerWidth <= 768 ? 4 : 3;
    let currentPage = 1;

    // Funktion zum Anzeigen der Artikel
    const showPage = (pageNumber) => {
        const start = (pageNumber - 1) * itemsPerPage;
        const end = start + itemsPerPage;

        products.forEach((product, index) => {
            product.style.display = index >= start && index < end ? "block" : "none";
        });

        currentPage = pageNumber;
        updatePagination();
    };

     // Aktualisierung der Seitennavigation
     const updatePagination = () => {
        const totalPages = Math.ceil(products.length / itemsPerPage);

        paginationContainer.innerHTML = `
            <span class="prev-page">&#8592;</span>
            ${Array.from({ length: totalPages }, (_, i) =>
                `<span class="page-number ${i + 1 === currentPage ? "active" : ""}" data-page="${i + 1}">${i + 1}</span>`
            ).join("")}
            <span class="next-page">&#8594;</span>
        `;
    };
    // Event-Listener für Navigation per Klick
    paginationContainer.addEventListener("click", (e) => {
        if (e.target.classList.contains("page-number")) {
            const pageNumber = parseInt(e.target.dataset.page, 10);
            showPage(pageNumber);
        } else if (e.target.classList.contains("prev-page") && currentPage > 1) {
            showPage(currentPage - 1);
        } else if (e.target.classList.contains("next-page") && currentPage < Math.ceil(products.length / itemsPerPage)) {
            showPage(currentPage + 1);
        }
    });

    // Event-Listener für Pfeiltasten
    document.addEventListener("keydown", (e) => {
        if (e.key === "ArrowLeft" && currentPage > 1) {
            showPage(currentPage - 1);
        } else if (e.key === "ArrowRight" && currentPage < Math.ceil(products.length / itemsPerPage)) {
            showPage(currentPage + 1);
        }
    });

    // Responsive Einstellungen
    window.addEventListener("resize", () => {
        itemsPerPage = window.innerWidth <= 768 ? 4 : 3;
        showPage(currentPage);
    });

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

