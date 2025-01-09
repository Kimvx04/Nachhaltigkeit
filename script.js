document.addEventListener("DOMContentLoaded", () => {
    // Pagination
    const products = Array.from(document.querySelectorAll(".product"));
    const paginationContainer = document.querySelector(".pagination");
    const prevButton = document.querySelector(".prev");
    const nextButton = document.querySelector(".next");

    let itemsPerPage = window.innerWidth <= 768 ? 2 : 3;
    let totalPages = Math.ceil(products.length / itemsPerPage);
    let currentPage = 1;

    const updatePagination = () => {
        const pageNumbers = Array.from(
            paginationContainer.querySelectorAll(".page-number")
        );

        pageNumbers.forEach((pageNumber, index) => {
            const pageIndex = index + 1;
            pageNumber.style.display =
                window.innerWidth > 768 && pageIndex > 2 ? "none" : "inline-block";

            pageNumber.classList.toggle("active", pageIndex === currentPage);
        });

        // Pfeile aktualisieren
        prevButton.disabled = currentPage === 1;
        nextButton.disabled = currentPage === totalPages;
    };

    const showPage = (pageNumber) => {
        const start = (pageNumber - 1) * itemsPerPage;
        const end = start + itemsPerPage;

        products.forEach((product, index) => {
            product.style.display = index >= start && index < end ? "block" : "none";
        });

        currentPage = pageNumber;
        updatePagination();
    };

    // Event Listener für Pagination
    const handlePaginationClick = (e) => {
        if (e.target.classList.contains("page-number")) {
            const pageNumber = parseInt(e.target.dataset.page, 10);
            showPage(pageNumber);
        } else if (e.target === prevButton) {
            if (currentPage > 1) showPage(currentPage - 1);
        } else if (e.target === nextButton) {
            if (currentPage < totalPages) showPage(currentPage + 1);
        }
    };

    // Dynamische Anpassung der Seiteneinstellungen bei Fenstergröße
    const handleResize = () => {
        itemsPerPage = window.innerWidth <= 768 ? 2 : 3;
        totalPages = Math.ceil(products.length / itemsPerPage);

        currentPage = Math.min(currentPage, totalPages); // Stelle sicher, dass die Seite gültig bleibt
        showPage(currentPage);
    };

    // Event Listener für Pagination und Pfeile
    paginationContainer.addEventListener("click", handlePaginationClick);
    prevButton.addEventListener("click", handlePaginationClick);
    nextButton.addEventListener("click", handlePaginationClick);
    window.addEventListener("resize", handleResize);

    // Initialisierung
    showPage(1);
});


    // Burger-Menü
    const burgerMenu = document.querySelector(".burger-menu");
    const dropdownMenu = document.querySelector(".dropdown-menu");

    burgerMenu.addEventListener("click", (event) => {
        event.stopPropagation();
        dropdownMenu.classList.toggle("active");
    });

    document.addEventListener("click", (event) => {
        if (!burgerMenu.contains(event.target) && !dropdownMenu.contains(event.target)) {
            dropdownMenu.classList.remove("active");
        }
    });

    // Float-Button (Warenkorb)
    const cartLink = document.querySelector(".cart");
    const floatButton = document.createElement("a");
    let isFloatButtonVisible = false;

    floatButton.href = "cart.html";
    floatButton.classList.add("cart-float");
    floatButton.innerHTML = `<img src="in-den-warenkorb-legen.png" alt="Warenkorb">`;

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
});
