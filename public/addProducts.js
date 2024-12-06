document.getElementById('addProductForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const name = document.getElementById('productName').value;
    const price = document.getElementById('productPrice').value;
    const description = document.getElementById('productDescription').value;
    const imageURL = document.getElementById('productImage').value;
    const stockQuantity = document.getElementById('stockQuantity').value || 0;  // Default to 0 if no value is entered

    try {
        const response = await fetch('/products', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name, price, description, imageURL, stockQuantity })
        });

        const data = await response.json();
        console.log('Response from server:', data); // Debug server response
        location.reload();  // Reload page to reflect the new product added

        document.getElementById('addProductButton').addEventListener('click', () => {
            window.location.href = '/createProduct';
        });
    } catch (err) {
        console.error(err);
    }
});
