// Sends request to add product to backend.
function handleAddProductRequest(event) {
    event.preventDefault();

    const title = document.getElementById('title').value;
    const price = document.getElementById('price').value;
    const description = document.getElementById('descr').value;

    const tempProduct = {
        title,
        price,
        description
    };
    
    // send product data to backend for processing
    axios.post('/api/products', tempProduct)
    .then(response => {
        // message from backend response
        console.log(response);
    })
    .catch(error => {
        // error from backend error
        console.error(error);
    });
}

// Fetches all products from backend.
function handleFetchAllRequest() {
    axios.get('/api/products')
    .then((response) => {
        const products = response.data;
        renderTable(products);
    })
    .catch((error) => {
        console.error(error);
    });
}

// Handle Edit Side Menu
function handleEditProductRequest(event) {
    event.preventDefault();

    // Get the product ID from the data attribute
    const productId = event.target.dataset.productId;

    // Fetch the product data by ID from the backend
    axios.get(`/api/products/${productId}`)
        .then((response) => {
            const product = response.data;
            // Populate the form fields with the product data
            document.getElementById('title').value = product.title;
            document.getElementById('price').value = product.price;
            document.getElementById('descr').value = product.descr;
            // Open the offcanvas with the form
            const offcanvas = new bootstrap.Offcanvas(document.getElementById('staticBackdropEdit'));
            offcanvas.show();
        })
        .catch((error) => {
            console.error(error);
        });
}

// Handle saving an edited item; saves to database.
function handleSaveEditedProductRequest() {
    // Get the edited product data from the form fields
    const productId = document.getElementById('productId').value;
    const title = document.getElementById('title').value;
    const price = document.getElementById('price').value;
    const description = document.getElementById('descr').value;

    const editedProduct = {
        title,
        price,
        description
    };

    // Send the edited product data to the backend for processing
    axios.put(`/api/products/${productId}`, editedProduct)
        .then((response) => {
            console.log(response);
            // Fetch all products again and render the updated table
            handleFetchAllRequest();

            // Close the offcanvas
            const offcanvas = new bootstrap.Offcanvas(document.getElementById('staticBackdropEdit'));
            offcanvas.hide();
        })
        .catch((error) => {
            console.error(error);
        });
}

// Deletes a product from the database.
function handleDeleteProductRequest(event) {
    event.preventDefault();
    const productId = event.target.dataset.productId;

    // Send delete request to the backend
    axios.delete(`/api/products/${productId}`)
    .then((response) => {
        console.log(response.data);
        // Remove the corresponding table row
        const tableRow = event.target.closest('tr');
        tableRow.remove();
    })
    .catch((error) => {
        console.error(error);
    }); 
}

// Here we go now we're cooking...
const fetchAllButton = document.getElementById('fetchAllButton');
fetchAllButton.addEventListener('click', handleFetchAllRequest);

const addProductButton = document.getElementById('addProductButton');
addProductButton.addEventListener('click', handleAddProductRequest);

// One handler for edit and delete functions :)
const tableBody = document.getElementById('table-body');
tableBody.addEventListener('click', (event) => {
    if (event.target.matches('.editProductButton')) {
        handleEditProductRequest(event);
    } else if (event.target.matches('.deleteProductButton')) {
        handleDeleteProductRequest(event);
    }
});

// Add event listener to the save button inside the offcanvas
const saveButton = document.getElementById('saveProductButton');
saveButton.addEventListener('click', handleSaveEditedProductRequest);


// handle the rendering of the table
function renderTable(products) {
    const tableBody = document.getElementById('table-body');
    let html = '';

    if (Array.isArray(products) && products.length > 0) {
        products.forEach((product) => {
            html += `
            <tr>
                <td>${product.id}</td>
                <td>${product.title}</td>
                <td>${product.price}</td>
                <td>${product.descr}</td>
                <td> 
                    <button data-product-id="${product.id}" type="button" class="btn btn-success btn-sm px-2 gap-1 editProductButton">edit</button>
                    <button data-product-id="${product.id}" type="button" class="btn btn-danger btn-sm px-2 gap-1 deleteProductButton">trash</button>
                </td>
            </tr> 
            `;
        });
    } else {
        html = '<tr><td colspan="8">No products found.</td></tr>';
    }

    tableBody.innerHTML = html;
}

// clear the table
function clearTable() {
    const tableBody = document.getElementById('table-body');
    tableBody.innerHTML = '';
}

