var arrCart = [];
let tongTien = 0;
let totalQuantity = 0;
// Hàm để lưu giỏ hàng vào session storage
function saveCart() {
    sessionStorage.setItem('cart', JSON.stringify(arrCart));
}
// Hàm để đọc giỏ hàng từ session storage
function loadCartFromsessionStorage() {
    const storedCart = sessionStorage.getItem('cart');
    if (storedCart) {
        arrCart = JSON.parse(storedCart);
        renderCart();
    }
}
// Thêm sự kiện khi trang được tải để đọc giỏ hàng từ session storage
window.addEventListener('load', loadCartFromsessionStorage);
function addCart() {
    const btnThem = document.querySelectorAll('.btn-add');
    btnThem.forEach(btn => {
        btn.addEventListener('click', function (e) {
            e.preventDefault();
            const getItem = btn.closest('.product');
            const image = getItem.querySelector('.product-img img').src;
            const name = getItem.querySelector('.product-name p').textContent.trim();
            const priceValue = getItem.querySelector('.product-price .price span').textContent.trim();
            const price = parseFloat(priceValue.replace(/\D/g, ''));
            // Gọi hàm thêm sản phẩm vào giỏ hàng
            addToCart(image, name, price);
        });
    });
}
function addToCart(image, name, price) {
    let quantity = 1;
    const thanhTien = price * quantity;
    const checkProduct = arrCart.find(product => product.name === name);
    if (checkProduct) {
        checkProduct.quantity++;
        checkProduct.thanhtien = checkProduct.price * checkProduct.quantity;
    } else {
        const product = {
            image: image,
            name: name,
            price: price,
            quantity: 1,
            thanhtien: thanhTien
        };
        arrCart.push(product);
    }
    renderCart();
    saveCart();
}
function xoaSP(name) {
    const index = arrCart.findIndex(product => product.name === name);
    if (index !== -1) {
        arrCart.splice(index, 1);
        renderCart();
        saveCart();
    } else {
        console.error("Không tìm thấy sản phẩm để xóa!");
    }
}
function renderCart() {
    const cartShow = document.querySelector('.box-cart .box-sp-cart');
    tongTien = 0;
    totalQuantity = 0;
    cartShow.innerHTML = '';
    arrCart.forEach(product => {
        const { name, image, quantity, price } = product;
        const thanhTien = price * quantity;
        const boxSP = `
            <table>
                <tbody>
                    <tr>
                        <td><img src="${image}" alt=""></td>
                        <td><p class="name-pro">${name}</p></td>
                        <td><p class="sl" style="margin-right: 30px;">${quantity}</p></td>
                        <td><p class="gia-pro">${formatMoney(price)}</p></td>
                        <td><i onclick=" xoaSP('${name}')" style="color: red;" class="fa-solid fa-circle-minus"></i></td>
                    </tr>
                </tbody>
            </table>
        `;
        cartShow.innerHTML += boxSP;
        // Cập nhật tổng tiền và tổng số lượng cho từng sản phẩm
        tongTien += thanhTien;
        totalQuantity += quantity;
    });
    // Cập nhật tổng số lượng sản phẩm và tổng tiền
    document.getElementById('cartQuantity').innerText = totalQuantity;
    document.querySelector('.tongtien').innerHTML = `<h2>Tổng: </h2> <h2>${formatMoney(tongTien)}</h2>`;
}
addCart();

// show box-cart
const btnClose = document.querySelector("#close-cart");
const btnShow = document.querySelector(".cart");
btnShow.addEventListener("click", function(){
    document.querySelector(".box-cart").style.right ="0";
})
btnClose.addEventListener("click", function(){
    document.querySelector(".box-cart").style.right ="-100%";
})
function formatMoney(number) {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(number);
}