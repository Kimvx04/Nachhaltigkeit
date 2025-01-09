document.addEventListener("DOMContentLoaded", () => {
    const products = Array.from(document.querySelectorAll(".product"));
    const paginationContainer = document.querySelector(".pagination");
    const prevButton = document.querySelector(".prev");
    const nextButton = document.querySelector(".next");

    let itemsPerPage = window.innerWidth <= 768 ? 2 : 3; // Dynamische Artikelanzahl pro Seite
    let totalPages = Math.ceil(products.length / itemsPerPage);
    let currentPage = 1;

    const updatePaginationButtons = () => {
        const newButtons = [];
        for (let i = 1; i <= totalPages; i++) {
            newButtons.push(
                `<span class="page-number ${
                    i === currentPage ? "active" : ""
                }" data-page="${i}">${i}</span>`
            );
        }
        paginationContainer.innerHTML = `
            <span class="prev">&#10094;</span>
            ${newButtons.join("")}
            <span class="next">&#10095;</span>
        `;
    };

    const showPage = (pageNumber) => {
        const startIndex = (pageNumber - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;

        // Zeige nur die Produkte der aktuellen Seite
        products.forEach((product, index) => {
            product.style.display = index >= startIndex && index < endIndex ? "block" : "none";
        });

        currentPage = pageNumber;
        updatePaginationButtons();
    };

    const updateItemsPerPage = () => {
        itemsPerPage = window.innerWidth <= 768 ? 2 : 3; // Dynamische Artikelanzahl pro Seite
        totalPages = Math.ceil(products.length / itemsPerPage);
        currentPage = Math.min(currentPage, totalPages); // Sicherstellen, dass die Seite gültig ist
        updatePaginationButtons();
        showPage(currentPage);
    };

    const addPaginationEventListeners = () => {
        paginationContainer.addEventListener("click", (e) => {
            if (e.target.classList.contains("page-number")) {
                const pageNumber = parseInt(e.target.getAttribute("data-page"), 10);
                showPage(pageNumber);
            } else if (e.target.classList.contains("prev")) {
                if (currentPage > 1) {
                    showPage(currentPage - 1);
                }
            } else if (e.target.classList.contains("next")) {
                if (currentPage < totalPages) {
                    showPage(currentPage + 1);
                }
            }
        });
    };

    // Initialisierung
    window.addEventListener("resize", updateItemsPerPage);
    updateItemsPerPage();
    addPaginationEventListeners();
    showPage(currentPage);
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
    