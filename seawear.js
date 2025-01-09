document.addEventListener("DOMContentLoaded", () => {
    const products = Array.from(document.querySelectorAll(".product"));
    const paginationButtons = document.querySelectorAll(".page-number");
    const prevButton = document.querySelector(".prev");
    const nextButton = document.querySelector(".next");
    const itemsPerPage = 3; // Immer 3 Artikel pro Seite
    let currentPage = 1;

    const updatePagination = () => {
        paginationButtons.forEach((button) => {
            const page = parseInt(button.getAttribute("data-page"), 10);
            button.classList.toggle("active", page === currentPage);
        });
    };

    const showPage = (pageNumber) => {
        const startIndex = (pageNumber - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;

        // Zeige nur die Produkte der aktuellen Seite
        products.forEach((product, index) => {
            product.style.display = index >= startIndex && index < endIndex ? "block" : "none";
        });

        currentPage = pageNumber;
        updatePagination();
    };

    paginationButtons.forEach((button) => {
        button.addEventListener("click", () => {
            const pageNumber = parseInt(button.getAttribute("data-page"), 10);
            showPage(pageNumber);
        });
    });

    prevButton.addEventListener("click", () => {
        if (currentPage > 1) {
            showPage(currentPage - 1);
        }
    });

    nextButton.addEventListener("click", () => {
        if (currentPage < Math.ceil(products.length / itemsPerPage)) {
            showPage(currentPage + 1);
        }
    });

    // Initiale Anzeige der ersten Seite
    showPage(1);
});


    document.addEventListener('DOMContentLoaded', function () {
        const burgerMenu = document.querySelector('.burger-menu');
        const dropdownMenu = document.querySelector('.dropdown-menu');
        const navLeft = document.querySelector('.nav-left');
        const cartLink = document.querySelector('.cart');

        console.log("JavaScript geladen");
        console.log('Burger-Menü angeklickt'); 
        console.log(dropdownMenu); // Prüft, ob das Element vorhanden ist

    
        // Toggle Burger-Menü
        burgerMenu.addEventListener('click', () => {
            if (dropdownMenu.style.display === 'flex') {
                dropdownMenu.style.display = 'none';
            } else {
                dropdownMenu.style.display = 'flex';
            }
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
    