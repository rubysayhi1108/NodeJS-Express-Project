// Hàm lấy productId từ URL
function getProductIdFromURL() {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get('id');
}
const productId = getProductIdFromURL();
fetchProductDetails(productId);

async function fetchProductDetails(productId) {
    try {
        const productResponse = await fetch(`http://localhost:3000/product/${productId}`);
        const productData = await productResponse.json();
        const imageLittleResponse = await fetch(`http://localhost:3000/image-little/${productId}`);
        const imageLittleData = await imageLittleResponse.json();
        const relatedProductsResponse = await fetch(`http://localhost:3000/product?iddm=${productData.iddm}&_limit=4`);
        const relatedProductsData = await relatedProductsResponse.json();
        const categoryResponse = await fetch(`http://localhost:3000/categories/${productData.iddm}`);
        const categoryData = await categoryResponse.json();
        //thumpnail
        if (productData && productData.id) {
            const imageLittle = imageLittleData ? imageLittleData.image : [];
            const container = showProductDetail(productData.id, productData.name, productData.price, productData.image, productData.sale, imageLittle);
            document.getElementById('detail-product').innerHTML = container;
        } 
        // mo ta
        const mota = categoryData ? categoryData.mota : '';
        const motaContainer = showMota(productData.iddm, mota);
        document.getElementById('motaCate').innerHTML = motaContainer;
        // san pham lien quan 
        const relatedContainer = document.querySelector('#spLienquan');
        relatedContainer.innerHTML = '';
        relatedProductsData.forEach((item) => {
            const price = item.sale && item.sale > 0 ? item.price * (1 - item.sale / 100) : item.price;
            const productHTML = showProductLq(item.id, item.name, item.image, price, item.view, item.sale);
            relatedContainer.innerHTML += productHTML;
        });

        minus();
        plus();
        addcartDetail();
        addCart();
    } catch (error) {
        console.error(`Lỗi khi tải sản phẩm: ${error}`);
    }
}

function showProductDetail(id, name, price, image, sale, imageLittle) {
    const priceSale = price * (1 - sale / 100);
    const thumbnailImages = imageLittle.map((img, index) => `
     <img src="../asset/img/product/${img}" alt="" data-index="${index}" onclick="changeMainImage(${index})">`).join('');
    return `
        <div class="img-product">
        <img class="img-main"  src="../asset/img/product/${image}" alt="">
        <div class="img-small">
            ${thumbnailImages}
        </div>
        </div>
        <div class="detail-product">
            <h1 class="name-product">${name}</h1>
            <div class="box-price">
                <h1 class="price">${formatMoney(priceSale)}</h1>
                ${sale > 0 ? `
                    <div class="box-sale">
                        <h1 class="sale-price">${formatMoney(price)}</h1> 
                        <div class="tag-sale"><p>${sale}%</p></div>
                    </div>
                ` : ''}
            </div>
            <div class="box-btn-container">
                <div class="box-qty">
                    <button id="minusButton" onclick="minus()" class="tru">-</button>
                    <input id="input-qty" type="number" value="0">
                    <button id="plusButton" onclick="plus()" class="cong">+</button>
                </div>
                <div class="box-btn-detail">
                    <button id="themButton" class="them"><i class="fa-solid fa-cart-plus"></i></button>
                    <button   class="mua">MUA NGAY</button>
                </div>
            </div>
            <div class="box-thongso">
                <h2>Thông số kĩ thuật</h2>
                <div class="thongso">
                    <h3>Thương Hiệu :</h3>
                    <p>Longines</p>
                </div>
                <div class="thongso">
                    <h3>Dòng máy :</h3>
                    <p>Cơ/Automatic</p>
                </div>
                <div class="thongso">
                    <h3>Đối tượng sử dụng :</h3>
                    <p>Nam</p>
                </div>
                <div class="thongso">
                    <h3>Chất liệu kính :</h3>
                    <p>Kính Sapphire</p>
                </div>
                <div class="thongso">
                    <h3>Size mặt :</h3>
                    <p>38.5mm</p>
                </div>
                <div class="thongso">
                    <h3>Chất liệu vỏ :</h3>
                    <p>Vỏ thép không gỉ</p>
                </div>
                <div class="thongso">
                    <h3>Màu vỏ :</h3>
                    <p>Vàng</p>
                </div>
                <div class="thongso">
                    <h3>Kháng nước :</h3>
                    <p>3atm</p>
                </div>
            </div>
        </div>
        
    `;
}
function showMota(id, mota) {
    return `
        <h3>Mô tả</h3>
        <p>${mota}</p>
    `;
}
function showProductLq(id, name, image, price, view, sale){
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
function formatMoney(number) {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(number);
}
function addcartDetail() {
    const themButton = document.getElementById('themButton');
    if (themButton) {
        themButton.addEventListener('click', function (e) {
            e.preventDefault();
            // Lấy thông tin từ trang chi tiết sản phẩm
            const image = document.querySelector('.img-main').src;
            const name = document.querySelector('.name-product').textContent.trim();
            const priceValue = document.querySelector('.price').textContent.trim();
            const price = parseFloat(priceValue.replace(/\D/g, ''));
            // Lấy số lượng từ thẻ input
            const quantity = parseInt(document.getElementById('input-qty').value, 10) || 1;
            // Gọi hàm thêm sản phẩm vào giỏ hàng
            addToCart(image, name, price, quantity, { isDetailPage: true });
        });
    }
}
function addToCart(image, name, price, quantity = 1, details = {}) {
    let thanhTien = price * quantity;
    const checkProduct = arrCart.find(product => product.name === name);
    if (checkProduct) {
        checkProduct.quantity += quantity;
        checkProduct.thanhtien = checkProduct.price * checkProduct.quantity;
    } else {
        const product = {
            image: image,
            name: name,
            price: price,
            quantity: quantity,
            thanhtien: thanhTien
        };
        arrCart.push(product);
    }
    renderCart();
    saveCart();
}
// tang giam sl
document.getElementById('minusButton').addEventListener('click', minus);
document.getElementById('plusButton').addEventListener('click', plus);
function minus() {
    var inputQty = document.getElementById('input-qty');
    var currentValue = parseInt(inputQty.value);
    if (currentValue > 1) {
        inputQty.value = currentValue - 1;
    }
}
function plus() {
    var inputQty = document.getElementById('input-qty');
    var currentValue = parseInt(inputQty.value);
    if (currentValue < 4) {
        inputQty.value = currentValue + 1;
    }
}
