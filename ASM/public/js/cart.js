// Load giỏ hàng từ local storage khi trang được tải
loadCartFromSessionStorage();
showCart();
updateBoxCart(); 
// Hàm để lưu giỏ hàng vào local storage
function saveCart() {
    sessionStorage.setItem('cart', JSON.stringify(arrCart));
}
function loadCartFromSessionStorage() {
    const storedCart = sessionStorage.getItem('cart');
    if (storedCart) {
        arrCart = JSON.parse(storedCart);
    }
}
function showCart() {
    const cartShow = document.querySelector('.container-product-cart');
    let stt = 1;
    tongTien = 0;
    cartShow.innerHTML = '';
    arrCart.forEach(product => {
        const { name, image, price, quantity } = product;
        const thanhTien = price * quantity;
        const boxSP = `
            <table>
                <tbody>
                    <tr>
                        <td style="font-weight: 700; padding: 20px;">${stt}</td>
                        <td>
                            <img src="${image}" alt="">
                        </td>
                        <td class="name">
                            ${name}
                        </td>
                        <td>
                            ${formatMoney(price)}
                        </td>
                        <td>
                            <div class="qty">
                                <button onclick="minus('${name}')" class="tru">-</button>
                                <input id="input-qty-${name}" type="number" value="${quantity}">
                                <button onclick="plus('${name}')" class="cong">+</button>
                            </div>
                        </td>
                        <td>
                            ${formatMoney(thanhTien)}
                        </td>
                        <td>
                            <i onclick="xoaSP('${name}')" class="fa-solid fa-circle-minus"></i>
                        </td>
                    </tr>
                    
                </tbody>
            </table>
            
        `;
        stt++;
        cartShow.innerHTML += boxSP;
        tongTien += thanhTien;
    });
    updateBoxCart();
    document.querySelector('.thanhtien').innerHTML = `<h3>Thành tiền :</h3><h3>${formatMoney(tongTien)}</h3>`;
    document.querySelector('.total').innerHTML = `<h2>Tổng tiền :</h2><h2>${formatMoney(tongTien)}</h2>`;
}

function xoaSP(name) {
    const index = arrCart.findIndex(product => product.name === name);
    if (index !== -1) {
        arrCart.splice(index, 1);
        showCart();
        saveCart();
    } else {
        console.error("Không tìm thấy sản phẩm để xóa!");
    }
}
// tang giam sl
function minus(name) {
    const inputQty = document.getElementById(`input-qty-${name}`);
    const currentValue = parseInt(inputQty.value);
    if (currentValue > 1) {
        inputQty.value = currentValue - 1;
        updateQuantity(name, currentValue - 1);
    }
}
function plus(name) {
    const inputQty = document.getElementById(`input-qty-${name}`);
    const currentValue = parseInt(inputQty.value);
    if (currentValue < 4) {
        inputQty.value = currentValue + 1;
        updateQuantity(name, currentValue + 1);
    }
}
function updateQuantity(name, newQuantity) {
    const productToUpdate = arrCart.find(product => product.name === name);
    if (productToUpdate) {
        productToUpdate.quantity = newQuantity;
        showCart();
        saveCart();
    }
}
// Hàm cập nhật giao diện box cart
function updateBoxCart() {
    const cartQuantity = document.getElementById('cartQuantity');
    let totalQuantity = 0;
    arrCart.forEach(product => {
        totalQuantity += product.quantity;
    });
    cartQuantity.innerText = totalQuantity;
}


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
