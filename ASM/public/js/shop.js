
function getCateIdFromURL() {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get('id');
}
document.addEventListener('DOMContentLoaded', async function () {
    const cateId = getCateIdFromURL();
    fetchProductCate(cateId);
    // console.log(cateId);
});

async function fetchProductCate(cateId) {
    const apiCategories = 'http://localhost:3000/categories';
    const apiProducts = 'http://localhost:3000/product';
    try {
        // categories
        const categoriesResponse = await fetch(apiCategories);
        const categoriesData = await categoriesResponse.json();
        // console.log(categoriesData);
        // products
        const productsResponse = await fetch(apiProducts);
        const productsData = await productsResponse.json();

        const container = document.getElementById('categoryShop');
        container.innerHTML = '';
        const dotsPt = document.querySelector('.pagination');
        const titleElement = document.getElementById('title');
        
        const containerFilter = document.getElementById('cateFilter');
        categoriesData.forEach(category => {
            const categoryHTML = showCateFilter(category.id, category.image);
            containerFilter.innerHTML += categoryHTML;
        });

        if (cateId === "0") {
            titleElement.textContent = 'TẤT CẢ CÁC SẢN PHẨM';
        } else {
            const categoryName = categoriesData.find(categories => categories.id === cateId)?.name;
            titleElement.textContent = 'Đồng hồ ' + categoryName;
        }
        const productCate = cateId === "0" ? productsData : productsData.filter(product => product.iddm === cateId);
        if (productCate.length > 0) {
            productCate.forEach(item => {
                const price = item.sale && item.sale > 0 ? item.price * (1 - item.sale / 100) : item.price;
                const productHTML = showProductAll(item.id, item.name, price, item.image, item.view, item.sale);
                container.innerHTML += productHTML;
                dotsPt.style.opacity = '1';
            });
        } else {
            dotsPt.style.opacity = '0';
        }
        return categoriesData;
    } catch (error) {
        console.error(`${error}`);
    }
}


function showProductAll(id, name, price, image,  view, sale){
    const priceSale = price * (1 - sale / 100);
    return `
        <a href="../layout/product-detail.html?id=${id}">
            <div class="product">
                <div class="product-img">
                    <img src="../asset/img/product/${image}" alt="">
                </div>
                <div class="product-name">
                    <p>${name}</p>
                </div>
                <div class="product-price">
                    <div class="price">
                        <span>${formatMoney(priceSale)}</span>
                    </div>
                    ${sale > 0 ? `<div class="price-sale"><span>${formatMoney(price)}</span></div>` : ''}
                </div>
                <div class="product-view-love">
                    <div class="view">
                        <i class="fa-regular fa-eye"></i><p>${view}</p>
                    </div>
                </div>
                ${sale > 0 ? `<div class="sale-tag">${sale}%</div>` : ''}
                <div class="product-btn">
                    <button class="btn-buy">MUA NGAY</button>
                    <button class="btn-add"><i class="fa-solid fa-cart-plus"></i></button>
                </div>
            </div>
        </a>
        
    `;
}
function showCateFilter(id,  image) {
    return `
        <li>
            <a href="../layout/shop.html?id=${id}"><img src="../asset/img/brand/${image}" alt=""></a>
        </li>
    `;
}
function formatMoney(number) {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(number);
}
