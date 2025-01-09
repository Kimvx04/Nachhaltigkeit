document.addEventListener("DOMContentLoaded", () => {
    const products = Array.from(document.querySelectorAll(".product"));
    const paginationButtons = document.querySelectorAll(".page-number");
    const prevButton = document.querySelector(".prev");
    const nextButton = document.querySelector(".next");

    let itemsPerPage = window.innerWidth <= 768 ? 2 : 3; // 2 Artikel pro Seite bei Handys
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

    const updateItemsPerPage = () => {
        itemsPerPage = window.innerWidth <= 768 ? 2 : 3; // Dynamisch an Bildschirmgröße anpassen
        showPage(currentPage);
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

    window.addEventListener("resize", updateItemsPerPage); // Neu berechnen bei Bildschirmgröße
    showPage(1);
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
    