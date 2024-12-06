// header

fetch('header.html')
.then(response => response.text())
.then(data => {
    document.getElementById('header-container').innerHTML = data;
});

// formfield for adding products


document.getElementById('addProductForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const name = document.getElementById('productName').value;
    const price = document.getElementById('productPrice').value;
    const description = document.getElementById('productDescription').value;
    const imageURL = document.getElementById('productImage').value;
    try {
        const response = await fetch('/products', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name, price, description, imageURL})
        })
        location.reload();
        const data = await response.json();
        console.log('Response from server:', data); // Debug server response
        document.getElementById('addProductButton').addEventListener('click', () => {
            window.location.href = '/createProduct';
        })
    } catch (err) {
        console.error(err);
    }
})

// // Test code to check if /products endpoint works
// fetch('/products', {
//     method: 'POST',
//     headers: { 'Content-Type': 'application/json' },
//     body: JSON.stringify({ "name": "asd", "price": 10, "description": "123", "imageURL": 11 })
// }).then(response => {
//     return response.json();
// }).then(data => {
//     console.log(data);
//     location.reload();
// }).catch(err => {
//     console.error(err);
// });