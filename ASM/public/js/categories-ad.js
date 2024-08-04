
function openPopup(){
    document.getElementById("addPopup").style.display = "block";
}
function closePopup() {
    document.getElementById("addPopup").style.display = "none";
}
const handleAddCategory = () => {
    const formAddCategory = document.querySelector("#formAddCategory");
    formAddCategory.onsubmit = async (event) => {
        event.preventDefault();
        const formData = new FormData(formAddCategory);
        const response = await fetch('/admin/add-category', {
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
                window.location.href = '/admin/categories';
            }, 1000)
        }
    }
}
const deleteCategory = () => {
    const forms = document.querySelectorAll("#formDele");
    forms.forEach(formDel => {
        formDel.onsubmit = async (event) => {
            event.preventDefault();
            const formData = new FormData(formDel);
            const id = formData.get('idCate');
            const response = await fetch('/admin/deleteCategory', {
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
                    window.location.href = "/admin/categories";
                }, 1000);
            }
        }
    });
}
function openFormUpdate() {
    const popupEdit = document.getElementById("editPopup");
    const btnEdits = document.querySelectorAll('#btn-edit');
    btnEdits.forEach(btnEdit => {
        btnEdit.addEventListener('click', () => {
            popupEdit.style.display = "block";
        });
    });
}
function closePopup() {
    document.getElementById("editPopup").style.display = "none";
}
const handlesUpdateCategory = () => {
    const formUpdate = document.querySelector(".formEditCategory2");
    formUpdate.onsubmit = async (event) => {
        event.preventDefault();
        const formData = new FormData(formUpdate);
        const response = await fetch('/admin/edit-category', {
            method: 'POST',
            body: formData
        });
        const res = await response.json();
        if(response.status == 400) {
            alert(res.message);
        }else if(response.status == 200) {
            alert('Cập nhật thành công!');
            setTimeout(() => {
                // window.location.href = "/admin/categories";
                window.location.reload();
            }, 1000)
        }
    }
}

const getValueCategoryEdit = () => { 
    const forms = document.querySelectorAll("#formEditCategory");
    forms.forEach(form => {
        form.onsubmit = async (event) => {
            event.preventDefault();
            // console.log(event.target);
            const formData = new FormData(form);
            const idCate = formData.get("idCate");
            const response = await fetch('/admin/show-editCate', {
                method: 'POST',
                body: JSON.stringify({idCate}),
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            const res = await response.json();
            if(response.status == 200) {
                // console.log("data", res.categoryData);
                openFormUpdate();
                renderFormUpdate(res.categoryData);
            }
        }
    });
}
function renderFormUpdate(data) {
    const formEdit = document.querySelector(".formEditCategory2");
    const textIp = formEdit.querySelector("#cateMota");
    const inputs = formEdit.querySelectorAll("input");
    console.log(">>> data: ", data);
    inputs[0].value = data.name;
    textIp.value = data.mota;
    // inputs[1].value = data.image;
    inputs[2].value = data.id;
    inputs[3].value = data.image;
    inputs[4].value = data.name;
    console.log(document.querySelector(".imageFormUpdate2"));
    document.querySelector(".imageFormUpdate2").src = `/${data.image}`;
}


handleAddCategory();
deleteCategory();
openFormUpdate();
getValueCategoryEdit();
handlesUpdateCategory();

// btnShow.addEventListener("click", async function (e) {
//     e.preventDefault();
//     const name = document.querySelector('#cateName').value;
//     const mota = document.querySelector('#cateMota').value;
//     const image = document.querySelector('#productImage').value.split('\\').pop();
//     // console.log(image);
//     if (!name  || !mota  || !image) {
//         const errorElement = document.querySelector('#error');
//         errorElement.textContent = 'Vui lòng nhập đầy đủ và chính xác thông tin danh mục.';
//         errorElement.style.display = 'block';
//         return;
//     }
//     const errorElement = document.querySelector('#error');
//     errorElement.style.display = 'none';

//     const apiUrl = 'http://localhost:3000/categories';
//     const categoryDataResponse = await fetch(apiUrl);
//     const categoryData = await categoryDataResponse.json();

//     const lastcategoryId = categoryData.length > 0 ? parseInt(categoryData[categoryData.length - 1].id, 10) : 0;
//     const newCategoryId = lastcategoryId + 1;
//     const category = {
//         'id': newCategoryId.toString(),
//         'name': name,
//         'mota': mota,
//         'image': image
//     };
//     try {
//         const apiUrl = 'http://localhost:3000/categories';
//         const response = await fetch(apiUrl, {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json',
//             },
//             body: JSON.stringify(category),
//         });
//         if (!response.ok) {
//             throw new Error('Lỗi khi thêm sản phẩm');
//         }
//         fetchShow();
//         document.querySelector('#categoeyName').value = '';
//         document.querySelector('#categoeyPrice').value = '';
//         document.getElementById("addPopup").style.display = "none";
//     } catch (error) {
//         console.error(`${error.message}`);
//     }
// });