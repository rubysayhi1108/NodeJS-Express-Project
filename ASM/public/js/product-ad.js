
function formatMoney(number) {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(number);
}


// add sp
const btnAddPopup = document.querySelector("#btn-add-popup");
btnAddPopup.addEventListener('click', function (e){
    document.getElementById("addPopup").style.display = "block";
});

const btnClosePopup = document.querySelector("#btn-close-popup");
btnClosePopup.addEventListener('click', function (e){
    document.getElementById("addPopup").style.display = "none";
})
const handleAddProduct = () => {
    const formAddProduct = document.querySelector("#formAddProduct");
    formAddProduct.onsubmit = async (event) => {
        event.preventDefault();
        const formData = new FormData(formAddProduct);
        const response = await fetch('/admin/add-product', {
            method: 'POST',
            body: formData
        });
        const res = await response.json();
        if (response.status === 400) {
            alert(`Message: ${res.message}`);
        } else if (response.status === 200) {
            alert(`Message: ${res.message}`);
            sessionStorage.removeItem('cart');
            setTimeout(() => {
                window.location.href = '/admin/product';
            }, 1000)
        }
    }
}
const deleteProduct = () => {
    const forms = document.querySelectorAll("#formDele");
    forms.forEach(formDel => {
        formDel.onsubmit = async (event) => {
            event.preventDefault();
            const formData = new FormData(formDel);
            const id = formData.get('idProduct');
            const response = await fetch('/admin/deleteProduct', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    id
                })
            });
            const res = await response.json();
            if(response.status == 200) {
                alert(`Message: ${res.message}`);
                setTimeout(() => {
                    window.location.href = "/admin/product";
                }, 1000);
            }
        }
    });
}
const handleUpdateProduct = () => {
    const formUpdate = document.querySelector(".formEditProduct2");
    formUpdate.onsubmit = async (event) => {
        event.preventDefault();
        const formData = new FormData(formUpdate);
        const response = await fetch('/admin/edit-product', {
            method: 'POST',
            body: formData
        });
        const res = await response.json();
        if(response.status == 400) {
            alert(res.message);
        }else if(response.status == 200) {
            alert('Cập nhật thành công!');
            window.location.href = "/admin/product";  
        }
    }
}
const getValueProductEdit = () => {
    const forms = document.querySelectorAll("#formEditProduct");
    forms.forEach(form => {
        form.onsubmit = async (event) => {
            event.preventDefault();
            console.log(event.target);
            const formData = new FormData(form);
            const idProduct = formData.get("productId");
            const response = await fetch('/admin/show-edit', {
                method: 'POST',
                body: JSON.stringify({idProduct}),
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            const res = await response.json();
            if(response.status == 200) {
                console.log("data", res.productData);
                openFormUpdate();
                renderFormUpdate(res.productData);
            }
        }
    });
}
getValueProductEdit();
deleteProduct();
handleUpdateProduct();
handleAddProduct();

function openFormUpdate() {
    const popupEdit = document.getElementById("editPopup");
    const btnEdits = document.querySelectorAll('#btn-edit');
    btnEdits.forEach(btnEdit => {
        popupEdit.style.display = "block";
    });
}
const popupEdit = document.getElementById("editPopup");
const btnCloseEdit =  document.getElementById("closeEdit");
btnCloseEdit.addEventListener('click', (e) => {
    e.preventDefault();
    popupEdit.style.display = "none";
});
function renderFormUpdate(data) {
    console.log(">>> data: ", data);
    const formEdit = document.querySelector(".formEditProduct2");
    const inputs = formEdit.querySelectorAll("input");
    inputs[0].value = data.name;
    inputs[1].value = data.price;
    inputs[2].value = data.qty;
    inputs[3].value = data.sale;
    inputs[4].value = data.id;
    inputs[5].value = data.image;
    inputs[6].value = data.name;
    document.querySelector("#preview").src = `/${data.image}`;
}
// const btnShow = document.querySelector("#btn-add");
// btnShow.addEventListener("click", async function (e) {
//     e.preventDefault();

//     // Lấy thông tin sản phẩm từ các trường nhập liệu
//     const name = document.querySelector('#productName').value;
//     const price = parseFloat(document.querySelector('#productPrice').value);
//     const sale = parseFloat(document.querySelector('#productSale').value) || 0;
//     const category = document.querySelector('#productCategory').value;
//     const quantity = parseInt(document.querySelector('#productQty').value);
//     const image = document.querySelector('#productImage').value.split('\\').pop();
//     const purchases = 0;

//     // Kiểm tra nếu có trường nào không hợp lệ
//     if (!name || isNaN(price) || !category || isNaN(quantity) || !image) {
//         const errorElement = document.querySelector('#error');
//         errorElement.textContent = 'Vui lòng nhập đầy đủ và chính xác thông tin sản phẩm.';
//         errorElement.style.display = 'block';
//         return;
//     }
//     const errorElement = document.querySelector('#error');
//     errorElement.style.display = 'none';

//     // Kiểm tra trùng lặp sản phẩm
//     const apiUrl = 'http://localhost:3000/product';
//     const productDataResponse = await fetch(apiUrl);
//     const productData = await productDataResponse.json();

//     const checkName = productData.filter(product => product.name.toLowerCase() === name.toLowerCase());
//     if (checkName.length > 0) {
//         // Product with the same name already exists
//         const errorElement = document.querySelector('#error');
//         errorElement.textContent = 'Sản phẩm đã tồn tại.';
//         errorElement.style.display = 'block';
//         return;
//     }

//     // Nếu không trùng lặp, tiếp tục xử lý
//     const lastProductId = productData.length > 0 ? parseInt(productData[productData.length - 1].id, 10) : 0;
//     const newProductId = lastProductId + 1;
//     const product = {
//         'id': newProductId.toString(),
//         'name': name,
//         'price': price,
//         'sale': sale,
//         'iddm': category.toString(),
//         'qty': quantity,
//         'purchases': purchases,
//         'image': image
//     };

//     try {
//         // Thực hiện thêm sản phẩm mới
//         const response = await fetch(apiUrl, {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json',
//             },
//             body: JSON.stringify(product),
//         });

//         if (!response.ok) {
//             throw new Error('Lỗi khi thêm sản phẩm');
//         }

//         fetchShow();

//         document.getElementById("addPopup").style.display = "none";
//     } catch (error) {
//         console.error(`${error.message}`);
//     }
// });

// // xoa sp
// const confirmPopup = document.getElementById('confirmation-popup');
// const overlay = document.getElementById('overlay');
// const btnCancel = document.querySelector('.btn-huy');
// const btnOK = document.querySelector('.btn-ok');
// function openPopupConfirm() {
//     document.body.addEventListener('click', function (e) {
//         if (e.target.id === 'btn-delete') {
//             confirmPopup.style.display = 'block';
//             overlay.style.display = 'block';
//         }
//     });
// }
// function closePopupConfirm() {
//     confirmPopup.style.display = 'none';
//     overlay.style.display = 'none';
// }
// btnOK.addEventListener('click', async function (e) {
//     e.preventDefault();
//     try {
//         const productId = document.getElementById('productId').textContent.toString();
//         console.log(productId);        
//         const apiUrl = `http://localhost:3000/product/${productId}`;
//         const response = await fetch(apiUrl, {
//             method: 'DELETE',
//         });
//         if (!response.ok) {
//             throw new Error('Lỗi khi xóa sản phẩm');
//         }
//         fetchShow();
//         closePopupConfirm();
//     } catch (error) {
//         console.error(`${error.message}`);
//     }
// });
// btnCancel.addEventListener('click', () => {
//     closePopupConfirm();
// });

// //edit sp 


// async function getJSON (API) {
//     return fetch(API)
//         .then(res => {
//             if (!res.ok) console.log('something went wrong');
//             return res.json();
//         })
// }
// async function getData (API) {
//     try {
//         const data = await getJSON(API);
//         return data;
//     } catch (error) {
//         console.log(error)
//         return null;
//     }
// }
// // render option category
// const categoryAPI = `http://localhost:3000/categories`;
// const categories = await getData(categoryAPI);
// async function renderCategories() {
//     const categorySelectInput = document.querySelector('#productEditCategory');
//     categorySelectInput.innerHTML = '';
//     categories.forEach(item => {
//         const option = document.createElement('option');
//         option.value = item.name; // Sử dụng tên của category làm giá trị của option
//         option.textContent = item.name;
//         categorySelectInput.appendChild(option);
//     });
// }
// renderCategories();;

// // show sp len popup
// (async _ => {
//     const apiUrl = 'http://localhost:3000';
//     const productResponse = await fetch(`${apiUrl}/product`);
//     const categoryResponse = await fetch(`${apiUrl}/categories`);
//     const productData = await productResponse.json();
//     const categoryData = await categoryResponse.json();
//     const [...updatedProductBtns] = document.querySelectorAll('#btn-edit');

//     updatedProductBtns.forEach(btn => {
//         btn.addEventListener('click', async e => {
//         openPopupEdit();
//         const productId = e.target.dataset.productId;
//         const productAPI = `http://localhost:3000/product/${productId}`;
//         const product = await getData(productAPI);

//         const { id, name, price, image, sale, iddm, qty } = product;

//         const productIdEle = document.querySelector('#productID');
//         const productNameEle = document.querySelector('#editContent').querySelector('#productName');
//         const productPriceEle = document.querySelector('#editContent').querySelector('#productPrice');
//         const productQtyEle = document.querySelector('#editContent').querySelector('#productQty');
//         const productSaleEle = document.querySelector('#editContent').querySelector('#productSale');
//         const productCategoryEle = document.querySelector('#editContent').querySelector('#productEditCategory');
//         const productImageEle = document.querySelector('#editContent').querySelector('#preview');

//         const productCategoryName = categories.find(item => item.id == iddm)?.name;
//         productIdEle.textContent = id;
//         productNameEle.value = name;
//         productPriceEle.value = price;
//         productQtyEle.value = qty;
//         productSaleEle.value = sale;
//         productCategoryEle.value = productCategoryName;
//         const imagePath = `../../public/asset/img/product/`;
//         productImageEle.src = `${imagePath}${image}`;

//         })
//     });

//     const closePopUpBtn = document.querySelector('.popup__btn--close');
//     if (closePopUpBtn) {
//         closePopUpBtn.addEventListener('click', closePopupEdit)
//     }
// })()
// const btnUpdate = document.querySelector("#btn-update");
// btnUpdate.addEventListener("click", async function (e) {
//     e.preventDefault();
//     const productId = document.querySelector('#productID').textContent;
//     const updatedProduct = {
//         'id': productId,
//         'name': document.querySelector('#editContent #productName').value.trim(),
//         'price': parseFloat(document.querySelector('#editContent #productPrice').value),
//         'sale': parseFloat(document.querySelector('#editContent #productSale').value) || 0,
//         'iddm': categories.find(category => category.name === document.querySelector('#editContent #productEditCategory').value)?.id,
//         'qty': parseInt(document.querySelector('#editContent #productQty').value),
//         'image': document.getElementById('productImageEdit').value.split('\\').pop()
//     };
//     // Kiểm tra trùng lặp sản phẩm chỉ khi tên sản phẩm mới được nhập
//     if (productName !== '') {
//         const apiUrlproduct = 'http://localhost:3000/product';
//         const apiUrl = `http://localhost:3000/product/${productId}`;

//         const productDataResponse = await fetch(apiUrl);
//         const existingProduct = await productDataResponse.json();
//         const productResponse = await fetch(`${apiUrlproduct}`);
//         const productData = await productResponse.json();

//         if (existingProduct.name.toLowerCase() !== updatedProduct.name.toLowerCase()) {
//             // Kiểm tra trùng lặp tên sản phẩm nếu tên đã thay đổi
//             const checkName = productData.filter(product => product.name.toLowerCase() === updatedProduct.name.toLowerCase());
//             if (checkName.length > 0) {
//                 // Product with the same name already exists
//                 const errorElement = document.querySelector('#error');
//                 errorElement.textContent = 'Sản phẩm đã tồn tại.';
//                 errorElement.style.display = 'block';
//                 return;
//             }
//         }
//     }

//     try {
//         const apiUrl = `http://localhost:3000/product/${productId}`;
//         const response = await fetch(apiUrl, {
//             method: 'PATCH',
//             headers: {
//                 'Content-Type': 'application/json',
//             },
//             body: JSON.stringify(updatedProduct),
//         });

//         if (!response.ok) {
//             throw new Error('Lỗi khi cập nhật sản phẩm');
//         }

//         previewImage();
//         fetchShow();
//     } catch (error) {
//         console.error(`${error.message}`);
//     }
// });

// openPopupConfirm();