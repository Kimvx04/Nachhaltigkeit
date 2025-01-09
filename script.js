document.addEventListener("DOMContentLoaded", () => {
    const products = Array.from(document.querySelectorAll(".product"));
    const paginationContainer = document.querySelector(".pagination");
    const prevButton = document.querySelector(".prev");
    const nextButton = document.querySelector(".next");

    let itemsPerPage = window.innerWidth <= 768 ? 2 : 3; // Dynamische Artikelanzahl
    let totalPages = Math.ceil(products.length / itemsPerPage);
    let currentPage = 1;

    // Aktualisiert die Seitennavigation
    const updatePagination = () => {
        const pageNumbers = Array.from(
            paginationContainer.querySelectorAll(".page-number")
        );

        pageNumbers.forEach((pageNumber, index) => {
            const pageIndex = index + 1;
            if (pageIndex === currentPage) {
                pageNumber.classList.add("active");
            } else {
                pageNumber.classList.remove("active");
            }
        });
    };

    // Zeigt die aktuelle Seite
    const showPage = (pageNumber) => {
        const start = (pageNumber - 1) * itemsPerPage;
        const end = start + itemsPerPage;

        products.forEach((product, index) => {
            product.style.display = index >= start && index < end ? "block" : "none";
        });

        currentPage = pageNumber;
        updatePagination();
    };

    // Eventlistener für Seitennavigation
    const handlePaginationClick = (e) => {
        if (e.target.classList.contains("page-number")) {
            const pageNumber = parseInt(e.target.dataset.page, 10);
            showPage(pageNumber);
        } else if (e.target.classList.contains("prev")) {
            if (currentPage > 1) showPage(currentPage - 1);
        } else if (e.target.classList.contains("next")) {
            if (currentPage < totalPages) showPage(currentPage + 1);
        }
    };

    // Passt die Artikelanzahl bei Größenänderung an
    const handleResize = () => {
        itemsPerPage = window.innerWidth <= 768 ? 2 : 3;
        totalPages = Math.ceil(products.length / itemsPerPage);
        currentPage = Math.min(currentPage, totalPages);
        showPage(currentPage);
    };

    paginationContainer.addEventListener("click", handlePaginationClick);
    window.addEventListener("resize", handleResize);

    // Initialisierung
    showPage(1);
});



    document.addEventListener('DOMContentLoaded', function () {
        const burgerMenu = document.querySelector('.burger-menu');
        const dropdownMenu = document.querySelector('.dropdown-menu');
        const navLeft = document.querySelector('.nav-left');
        const cartLink = document.querySelector('.cart');

        console.log("JavaScript geladen");
    
        // Toggle Burger-Menü
        burgerMenu.addEventListener('click', () => {
            dropdownMenu.style.display =
                dropdownMenu.style.display === 'flex' ? 'none' : 'flex';
        });
    
        // Float-Button erstellen
        const floatButton = document.createElement('a');
        floatButton.href = "cart.html";
        floatButton.classList.add('cart-float');
        floatButton.innerHTML = `<img src="in-den-warenkorb-legen.png" alt="Warenkorb">`;

        // Im Handyformat hinzufügen
        if (window.innerWidth <= 768) {
        document.body.appendChild(floatButton);
        if (cartLink) cartLink.style.display = 'none';
    }
    
        // Aktualisieren bei Fenstergrößenänderung
        window.addEventListener('resize', () => {
        if (window.innerWidth <= 768) {
            if (!document.body.contains(floatButton)) {
                document.body.appendChild(floatButton);
            }
            if (cartLink) cartLink.style.display = 'none';
        } else {
            if (document.body.contains(floatButton)) {
                document.body.removeChild(floatButton);
            }
            if (cartLink) cartLink.style.display = 'inline';
        }
    });
});
    