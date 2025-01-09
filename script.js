document.addEventListener("DOMContentLoaded", () => {
    const products = Array.from(document.querySelectorAll(".product"));
    const paginationContainer = document.querySelector(".pagination");
    const prevButton = document.querySelector(".prev");
    const nextButton = document.querySelector(".next");

    let itemsPerPage = window.innerWidth <= 768 ? 2 : 3; // 2 Artikel pro Seite im Handyformat, 3 Artikel im großen Format
    let totalPages = Math.ceil(products.length / itemsPerPage);
    let currentPage = 1;

    // Funktion zur Aktualisierung der Paginierungsbuttons
    const updatePagination = () => {
        const pageNumbers = Array.from(
            paginationContainer.querySelectorAll(".page-number")
        );

        // Aktualisiere aktive Seite und verstecke dritte Seite im großen Format
        pageNumbers.forEach((pageNumber, index) => {
            const pageIndex = index + 1;
            pageNumber.style.display =
                window.innerWidth > 768 && pageIndex > 2 ? "none" : "inline-block";

            pageNumber.classList.toggle("active", pageIndex === currentPage);
        });
    };

    // Funktion zur Anzeige der Artikel
    const showPage = (pageNumber) => {
        const start = (pageNumber - 1) * itemsPerPage;
        const end = start + itemsPerPage;

        products.forEach((product, index) => {
            product.style.display = index >= start && index < end ? "block" : "none";
        });

        currentPage = pageNumber;
        updatePagination();
    };

    // Navigation bei Button-Klick
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

    // Dynamische Anpassung der Seiteneinstellungen bei Bildschirmgröße
    const handleResize = () => {
        itemsPerPage = window.innerWidth <= 768 ? 2 : 3;
        totalPages = Math.ceil(products.length / itemsPerPage);

        currentPage = Math.min(currentPage, totalPages); // Stelle sicher, dass die Seite gültig bleibt
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
        const floatButton = document.createElement('a');

        console.log("JavaScript geladen");
    
        // Toggle Burger-Menü
        burgerMenu.addEventListener('click', () => {
            dropdownMenu.classList.toggle('active'); // CSS-Klasse steuert die Sichtbarkeit
        });
    
        // Float-Button erstellen
        const floatButton = document.createElement('a');
        floatButton.href = "cart.html";
        floatButton.classList.add('cart-float');
        floatButton.innerHTML = `<img src="in-den-warenkorb-legen.png" alt="Warenkorb">`;

        // 3. Warenkorb-Logik für Handyformat
    function handleResize() {
        if (window.innerWidth <= 768) {
            // Handyformat: Float-Warenkorb anzeigen, Nav-Warenkorb verstecken
            if (!document.body.contains(floatButton)) {
                document.body.appendChild(floatButton);
            }
            if (cartLink) cartLink.style.display = 'none';
        } else {
            // Desktopformat: Float-Warenkorb entfernen, Nav-Warenkorb anzeigen
            if (document.body.contains(floatButton)) {
                document.body.removeChild(floatButton);
            }
            if (cartLink) cartLink.style.display = 'inline-block';
        }
    }

    // 4. Initiale Prüfung + Fenstergrößenänderung
    handleResize();
    window.addEventListener('resize', handleResize);
});
    