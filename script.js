document.addEventListener('DOMContentLoaded', () => {
    const products = Array.from(document.querySelectorAll('.product'));
    let currentPage = 1;

    // Konfigurationswerte
    const itemsPerPageDesktop = 3; // Desktop: 3 Artikel pro Seite
    const itemsPerPageMobile = 2; // Mobile: 2 Artikel pro Seite

    // Funktion zur dynamischen Bestimmung der Artikel pro Seite
    const updateItemsPerPage = () => {
        return window.innerWidth <= 768 ? itemsPerPageMobile : itemsPerPageDesktop;
    };

    // Produkte auf der aktuellen Seite anzeigen
    const renderProducts = () => {
        const itemsPerPage = updateItemsPerPage();
        const totalPages = Math.ceil(products.length / itemsPerPage);
        const startIndex = (currentPage - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;

        products.forEach((product, index) => {
            product.style.display = index >= startIndex && index < endIndex ? 'block' : 'none';
        });

        // Navigation aktualisieren
        document.querySelector('.prev').disabled = currentPage === 1;
        document.querySelector('.next').disabled = currentPage === totalPages;

        document.querySelectorAll('.page-number').forEach((btn, idx) => {
            btn.classList.toggle('active', idx + 1 === currentPage);
        });
    };

    // Seitenzahlen und Navigation erstellen
    const createPagination = () => {
        const paginationContainer = document.querySelector('.pagination');
        const itemsPerPage = updateItemsPerPage();
        const totalPages = Math.ceil(products.length / itemsPerPage);

        paginationContainer.innerHTML = `
            <button class="prev">&lt;</button>
            ${Array.from({ length: totalPages }, (_, i) => 
                `<button class="page-number" data-page="${i + 1}">${i + 1}</button>`
            ).join('')}
            <button class="next">&gt;</button>
        `;

        // Navigation-Events
        paginationContainer.addEventListener('click', (event) => {
            if (event.target.matches('.prev')) {
                currentPage = Math.max(currentPage - 1, 1);
            } else if (event.target.matches('.next')) {
                currentPage = Math.min(currentPage + 1, Math.ceil(products.length / updateItemsPerPage()));
            } else if (event.target.matches('.page-number')) {
                currentPage = parseInt(event.target.dataset.page);
            }
            renderProducts();
        });

        renderProducts();
    };

    // Initialisierung
    createPagination();

    // Dynamische Aktualisierung bei Größenänderung
    window.addEventListener('resize', createPagination);
});



    // Burger menu for mobile
    const burgerMenu = document.querySelector(".burger-menu");
    const dropdownMenu = document.querySelector(".dropdown-menu");

    if (burgerMenu && dropdownMenu) {
        burgerMenu.addEventListener("click", () => {
            dropdownMenu.classList.toggle("active");
        });
    } else {
        console.error("Burger-Menü oder Dropdown-Menü nicht gefunden");
    }

// Warten, bis das DOM vollständig geladen ist
document.addEventListener("DOMContentLoaded", () => {
    // Den Float-Button in der DOM auswählen
    const floatButton = document.createElement("div");
    floatButton.className = "float-button";
    floatButton.innerHTML = `
       <img src="Warenkorb.png" alt="Warenkorb">
    `;
    document.body.appendChild(floatButton);

    // Eventlistener für den Klick auf den Floating-Button
    floatButton.addEventListener("click", () => {
        alert("Warenkorb geöffnet!"); // Beispielaktion: Warenkorb öffnen
        // Hier könnte stattdessen ein Modal geöffnet oder zur Warenkorbseite navigiert werden
    });

    // Dynamisches Ein- und Ausblenden des Buttons beim Scrollen
    window.addEventListener("scroll", () => {
        if (window.scrollY > 200) {
            floatButton.style.transform = "scale(1)";
            floatButton.style.opacity = "1";
        } else {
            floatButton.style.transform = "scale(0)";
            floatButton.style.opacity = "0";
        }
    });

    // Initialer Zustand des Buttons (falls nötig)
    floatButton.style.transform = "scale(0)";
    floatButton.style.opacity = "0";
    floatButton.style.transition = "transform 0.3s ease, opacity 0.3s ease";
});



