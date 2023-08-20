const { remote } = require('electron');
const main = require('../../main');

const productForm = document.querySelector('#productForm');
const productList = document.querySelector('#products');

const productNameInput = document.querySelector('#name');
const productPriceInput = document.querySelector('#number');
const productDescInput = document.querySelector('#description');


let products = [];
let isEditMode = null;


productForm.addEventListener('submit', async (event) => {
    event.preventDefault();
    try {
        const product = {
            name: productNameInput.value,
            price: productPriceInput.value,
            description: productDescInput.value
        };
        if(isEditMode){
            const data = await main.updateProductById(isEditMode,product);
            isEditMode = false;
            fetchProducts();
        }else{
            const data = await main.createProduct(product);
        }
        productForm.reset();
        productNameInput.focus();
        fetchProducts()
    } catch (error) {
        console.log(error);
    }
});

const fetchProducts =async  () => {
    const data = await main.getProducts();
    renderProduts(data);
}

async function editProduct(id){
    const data = await main.getProductById(id);
    isEditMode = id;
    productNameInput.value = data.name;
    productPriceInput.value = data.price;
    productDescInput.value = data.description;
}


const deleteProduct = (id) => {
    main.deleteProduct(id);
    fetchProducts()
}

fetchProducts();

function renderProduts(products){
    productList.innerHTML = '';

    products.forEach(product => {
        productList.innerHTML += `
            <div class="card card-body my-2 animated fadeInLeft">
                <h4>${product.name}</h4>
                <p>${product.description}</p>
                <h3>${product.price}</h3>
            </div>
            <button class="btn btn-danger btn-sm" onclick="deleteProduct('${product.id}')">Delete</button>
            <button class="btn btn-secondary btn-sm" onclick="editProduct('${product.id}')">Edit</button>
        `;
    })
}


