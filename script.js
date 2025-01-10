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

  // Float-Warenkorb sichtbar machen
  const floatCart = document.createElement("div");
  floatCart.className = "cart-float";
  floatCart.innerHTML = '<img src="in-den-warenkorb-legen.png" alt="Warenkorb">';

  floatCart.addEventListener("click", () => {
      window.location.href = "cart.html"; // Beispiel: Weiterleitung zur Warenkorb-Seite
  });

  document.body.appendChild(floatCart);

  // Optional: Anzeigen des Float-Carts nur auf Mobilgeräten
  const mediaQuery = window.matchMedia("(max-width: 768px)");
  const toggleFloatCart = (e) => {
      if (e.matches) {
          floatCart.style.display = "block";
      } else {
          floatCart.style.display = "none";
      }
  };

  mediaQuery.addEventListener("change", toggleFloatCart);
  toggleFloatCart(mediaQuery);
});


