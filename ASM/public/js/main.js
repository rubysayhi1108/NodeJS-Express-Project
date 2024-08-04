
async function fetchProduct() {
    const apiUrl = 'http://localhost:3000'; 
    try {
        const productResponse = await fetch(`${apiUrl}/product`);
        const categoryResponse = await fetch(`${apiUrl}/categories`);

        const productData = await productResponse.json();
        const categoryData = await categoryResponse.json();
        // console.log('Product Data:', productData);
        
        // new products
        const containerNew = document.querySelector('#productNew');
        productData
            .sort((a, b) => b.id - a.id)
            .slice(0, 7)
            .forEach(product => {
                const productHTML = showProductNew(product.id, product.name, product.image, product.price, product.view);
                containerNew.innerHTML += productHTML;
            });
        // top seller
        const containerTopSeller = document.querySelector('#topSeller');
        productData.sort((a, b) => b.purchases - a.purchases).slice(0, 1).forEach(product => {
            const productHTML = showTopSeller(product.id, product.image, product.price, product.purchases);
            containerTopSeller.innerHTML += productHTML;
        });
        // seller products
        const containerProductSeller = document.querySelector('#productSeller');
        const sellerProducts = productData
            .filter(product => product.purchases !== undefined && product.purchases !== '')
            .sort((a, b) => b.purchases - a.purchases)
            .slice(1, 3 + 1);
        sellerProducts.forEach(product => {
            const price = product.sale && product.sale > 0 ? product.price * (1 - product.sale / 100) : product.price;
            const productHTML = showProductSeller(product.id, product.name, product.image, price, product.view, product.sale);
            containerProductSeller.innerHTML += productHTML;
        });
        // sale products
        const containerSale = document.querySelector('#productSale');
        productData.forEach(product => {
            if (product.sale && product.sale > 0) {
                const priceSale = product.price * (1 - product.sale / 100);
                const productHTML = showProductSale(product.id, product.name, product.image, priceSale, product.view, product.sale, product.price);
                containerSale.innerHTML += productHTML;
            }
        });
        // categories
        const containerCategories = document.querySelector('#categories');
        categoryData.forEach(category => {
            const categoryHTML = showCategory(category.id, category.name, category.image, category.mota);
            containerCategories.innerHTML += categoryHTML;
        });
       

       
        addCart();
    } catch (error) {
        console.error(`Lỗi khi tải sản phẩm từ API: ${error}`);
    }
}

function showProductNew(id, name, image, price, view) {
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
                            <span>${formatMoney(price)}</span>
                        </div>
                        
                    </div>
                    <div class="product-view-love">
                        <div class="view">
                            <i class="fa-regular fa-eye"></i><p>${view}</p>
                        </div>
                    </div>
                    <div class="product-btn">
                        <button class="btn-buy">MUA NGAY</button>
                        <button  class="btn-add"><i class="fa-solid fa-cart-plus"></i></button>
                    </div>
            </div>
        </a>
    `;
}
function showProductSeller(id, name, image, price, view, sale) {
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
function showTopSeller(id, image, price, purchases) {
    return `
        <a href="../layout/product-detail.html?id=${id}">
            <img src="../asset/img/product/${image}" alt="">
            <div class="purchase">
                <p>Lượt mua : + ${purchases}</p>
                <p style="color: red; ">${formatMoney(price)}</p>
            </div>
            <div class="hot"><img src="../asset/img/banner/bestseller.png" style="width: 180px; height: 180px;"></i></div>
            <button style="width: 100%;" class="btn-buy">MUA NGAY</button>
        </a>
    `;
}
function showProductSale(id, name, image, price, view, sale ) {
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
                    <div class="price-sale">
                        <span>${formatMoney(price)}</span>
                    </div>
                </div>
                <div class="product-view-love">
                    <div class="view">
                        <i class="fa-regular fa-eye"></i><p>${view}</p>
                    </div>
                </div>
                <div class="sale-tag">
                    ${sale}%
                </div>
                <div class="product-btn">
                    <button class="btn-buy">MUA NGAY</button>
                    <button class="btn-add"><i class="fa-solid fa-cart-plus"></i></button>
                </div>
            </div>
        </a>
    `;
}
function showCategory(id, name, image, mota) {
    return `
        <div class="box-content">
            <a href="../layout/shop.html?id=${id}"> <img src="../asset/img/brand/${image}" alt=""></a>
        </div>
    `;
}

function formatMoney(number) {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(number);
}
fetchProduct();
// fetchproduct();




