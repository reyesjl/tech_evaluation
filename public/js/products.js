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

// Deletes a product from the database.
function handleDeleteProductRequest(event) {
    const deleteButton = event.target.closest('#deleteProductButton');
  
    if (deleteButton) {
        event.preventDefault();
        const productId = deleteButton.dataset.productId;

        // Send delete request to the backend
        axios.delete(`/api/products/${productId}`)
        .then((response) => {
            console.log(response.data);
            // Remove the corresponding table row
            const tableRow = deleteButton.closest('tr');
            tableRow.remove();
        })
        .catch((error) => {
            console.error(error);
        }); 
    }
}

// Here we go now we're cooking...
const fetchAllButton = document.getElementById('fetchAllButton');
fetchAllButton.addEventListener('click', handleFetchAllRequest);

const addProductButton = document.getElementById('addProductButton');
addProductButton.addEventListener('click', handleAddProductRequest);

// Delete handler is attached to tbale-body which always exists - not the delete button themselves (which only exists when records display)
const tableBody = document.getElementById('table-body');
tableBody.addEventListener('click', handleDeleteProductRequest);


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
                    <button data-product-id="${product.id}" type="button" class="btn btn-success btn-sm px-2 gap-1" id="editProductButton">edit</button>
                    <button data-product-id="${product.id}" type="button" class="btn btn-danger btn-sm px-2 gap-1" id="deleteProductButton">trash</button>
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

