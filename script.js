document.addEventListener("DOMContentLoaded", () => {
    // Pagination
    const products = Array.from(document.querySelectorAll(".product"));
    const paginationContainer = document.querySelector(".pagination");
    let itemsPerPage = window.innerWidth <= 768 ? 2 : 3;
    let currentPage = 1;

    const showPage = (pageNumber) => {
        const start = (pageNumber - 1) * itemsPerPage;
        const end = start + itemsPerPage;

        products.forEach((product, index) => {
            product.style.display = index >= start && index < end ? "block" : "none";
        });

        currentPage = pageNumber;
        updatePagination();
    };

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
    };

    paginationContainer.addEventListener("click", (e) => {
        if (e.target.classList.contains("page-number")) {
            const pageNumber = parseInt(e.target.dataset.page, 10);
            showPage(pageNumber);
        }
    });

    window.addEventListener("resize", () => {
        itemsPerPage = window.innerWidth <= 768 ? 2 : 3;
        showPage(currentPage);
    });

    showPage(1);

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

