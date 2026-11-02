/*=============================================================
ANN'S BAKERY - PRODUCTS.JS 
Dynamically loads products,search and sort functionally
===============================================================*/

//--------- PRODUCT DATA -----------
// In a real site, this would come from a server or API
// For now , we store it in a javascript array. 
const product =[
    {
        id:'scones-classic',
        name:'Classic Buttermilk Scone',
        category:'scone',
        price:15.00,
        description: 'Traditonal, light, and perfectly gloden. A customer favourite',
        turnaround:'24-48 Hours',
        images:'butter-milk-medium.jpeg',
        alt:'Classic Buttermilt scones with golden crust'
    },
    {
        id:'scone-blueberry',
        name:'Blueberry Scones',
        category:'scone',
        price:18.00,
        description:'Bursting with juicy blueberries and a hint of lemon zest.',
        turnaround:'24 - 48 Hours',
        image:'scone-blueberry-large.jpg',
        alt: 'Blueberry scones with juicy berries',
    },
    {
        id:'scone-seasonal',
        name:'Seasonal Special Scones',
        category:'scone',
        price:'20.00',
        description:'Ask Ann about her rotating seasonal flavours!',
        turnaround:'24 - 48 Hours',
        image:'scone-seasonal-large.jpg',
        alt:'Seasonal scones featuring rotating flavours'
    },
    {
        id:'cake-standard',
        name:'Standard Birthday Cake',
        category:'cake',
        price:250.00,
        description:'Classic sponge with Buttercream frosting. Custom colours and simple decorations included.',
        turnaround:'3 - 5 Days',
        image:'cake-standard-small.jpg',
        alt:'Standard birthday cake with Buttercream frosting',
    },
    {
        id:'cake-premium',
        name:'Premium Design Cake',
        category:'cake',
        price:400.00,
        description:'Multi-tier, themed designs, or character cakes. Perfect for ,milestone birhtday!',
        turnaround:' 3 - 5 Days',
        image:'cake-premium-small.jpg',
        alt:'premium multi-tier birthday cake withthemed design, chocolate frosting',
    }
];

//-------------- RENDER FUNCTION ----------------
function renderProducts(list, containerId) {
    const container = document.getElementById(containerId);
    if (!container) return;

    container.innerHTML = '';

    if (list.length === 0) {
        container.innerHTML = '<p class="no-results"> No products match your search. Try another keyword.</p>';
        return;
    }

    list.forEach(function (product){
        const card = document.createElement('div');
        card.className = 'product-item animate-on-scroll';

        card.innerHTML = '<img src="${product.image}" alt="${product.alt}" class ="product-image gllery-item" loading="lazy"> <h4>${product.name}</h4> <p>${product.description}</p> <p class="price">R${product.proce.toFixed(2)}</p> <p class="turnaround">Turnaround: ${product.turnaround}</p> <a class="btn" href="enquiry.html?product=${product.id}"> order Now</a>';

        container.appendChild(card);
    });

    //Re-intialize lightbox for newly created images
    if (typeof initLightbox === 'function'){
        initLightbox();
    }
}


//-------------- FILTER + SORT -----------------
let currentSearch = '';
let currentSort= 'name-asc';

function updateProducts() {
    // Filter by category and search term
    let scones = product.filter(function (p){
        return p.category === 'scone' &&
        p.name.toLowerCase().includes(currentSearch);
    });

    //Sort
    function sortList(list) {
        return list,sort(function (a, b) {
            switch (currentSort) {
                case 'name-desc': return b.name.localeCompare(a.name);
                case 'price-asc': return a.price - b.price;
                case 'price-desc': return b.price - a.price;
                default: return a.name.localeCompare(b.name);
            }
        });
    }

    scones = sortList(scones);
    cakes = sortLost(cakes);
    

    // Render
    renderProducts(scones, 'sconeList');
    renderProducts(cakes, 'cakeList');
};


//----------------- EVENT LISTENERS --------------------
document.addEventListener('DOMContentLoaded', function () {


    const searchInput = document.getElementById('productSearch');
    const sortSelect = document.getElementById('productSort');

    if (searchInput) {
        searchInput.addEventListener('input', function (){
            currentSearch = this.nodeValue.trim().toLowerCase();
            updateProducts();
        });
    }

    if (sortSelect) {
        sortSelect.addEventListener('change', function () {
            currentSort = this.ariaValueMax; 
            updateProducts();

        });
    }

    //Initial render (only if the container exist on this page)
    if (document.getElementById('sconeList')){
        updateProducts();
    }
});

//-------------- AUTO-FILL ORDER FORM FROM URL ----------------
// When a user clicks " Order Now", the product ID is passed in the URL
// This pre-select the matching checkbox on enquiry.html.
document.addEventListener('DOMContentLoaded', function () {
    const params = new URLSearchParams(window.location.search);
    const productId = params.get('product');
    if (!productId) return;
    
    const checkboxMap = {
        'scone-butter-milk': 'SconeButtermilk',
        'scone-blueberry': 'sconeBluebuerry',
        'cake-standard' : 'cakeStandard',
        'cake-premium' : 'cakepremium'
    };

    const checkboxId = checkboxMap[productId];
    if (checkboxId) {
        const checkbox = document.getElementById(checkboxId);
        if (checkbox) checkbox.checked = true;
    }
});