const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// In-memory array with initial data
let products = [
    {
        id: 301,
        name: "Wireless Mouse",
        category: "Electronics",
        price: 799,
        quantity: 25,
        inStock: true
    },
    {
        id: 302,
        name: "Notebook",
        category: "Stationery",
        price: 60,
        quantity: 100,
        inStock: true
    },
    {
        id: 303,
        name: "USB Keyboard",
        category: "Electronics",
        price: 999,
        quantity: 0,
        inStock: false
    }
];

// Helper to generate unique numeric ID
const generateId = () => {
    if (products.length === 0) return 301;
    const maxId = Math.max(...products.map(p => p.id));
    return maxId >= 301 ? maxId + 1 : 301;
};

// 1. GET all records
// GET /api/products
app.get('/api/products', (req, res) => {
    res.status(200).json({
        success: true,
        count: products.length,
        data: products
    });
});

// 6. Filter records (Must be placed BEFORE /api/products/:id to avoid route collision)
// GET /api/products/filter?category=value
app.get('/api/products/filter', (req, res) => {
    const { category } = req.query;
    
    if (!category) {
        return res.status(400).json({
            success: false,
            message: "Please provide a 'category' query parameter for filtering."
        });
    }

    const filtered = products.filter(p => 
        p.category.toLowerCase() === category.toLowerCase()
    );

    res.status(200).json({
        success: true,
        count: filtered.length,
        data: filtered
    });
});

// 3. GET record by ID
// GET /api/products/:id
app.get('/api/products/:id', (req, res) => {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
        return res.status(400).json({ success: false, message: "Invalid ID format" });
    }

    const product = products.find(p => p.id === id);
    if (!product) {
        return res.status(404).json({ success: false, message: "Product not found" });
    }

    res.status(200).json({ success: true, data: product });
});

// 2. POST a new record
// POST /api/products
app.post('/api/products', (req, res) => {
    const { name, category, price, quantity, inStock } = req.body;

    // Validation
    if (!name || !category || price === undefined || quantity === undefined || inStock === undefined) {
        return res.status(400).json({ 
            success: false, 
            message: "Missing required fields: name, category, price, quantity, inStock are required." 
        });
    }

    if (typeof price !== 'number' || typeof quantity !== 'number' || typeof inStock !== 'boolean') {
        return res.status(400).json({ 
            success: false, 
            message: "Invalid data types: price and quantity must be numbers, inStock must be a boolean." 
        });
    }

    const newProduct = {
        id: generateId(),
        name,
        category,
        price,
        quantity,
        inStock
    };

    products.push(newProduct);
    res.status(201).json({ success: true, data: newProduct });
});

// 4. PUT / update a record
// PUT /api/products/:id
app.put('/api/products/:id', (req, res) => {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
        return res.status(400).json({ success: false, message: "Invalid ID format" });
    }

    const index = products.findIndex(p => p.id === id);
    if (index === -1) {
        return res.status(404).json({ success: false, message: "Product not found" });
    }

    const { name, category, price, quantity, inStock } = req.body;

    // Optional validation for provided fields
    if (price !== undefined && typeof price !== 'number') {
        return res.status(400).json({ success: false, message: "Price must be a number" });
    }
    if (quantity !== undefined && typeof quantity !== 'number') {
        return res.status(400).json({ success: false, message: "Quantity must be a number" });
    }
    if (inStock !== undefined && typeof inStock !== 'boolean') {
        return res.status(400).json({ success: false, message: "inStock must be a boolean" });
    }

    // Update fields if provided
    products[index] = {
        ...products[index],
        name: name !== undefined ? name : products[index].name,
        category: category !== undefined ? category : products[index].category,
        price: price !== undefined ? price : products[index].price,
        quantity: quantity !== undefined ? quantity : products[index].quantity,
        inStock: inStock !== undefined ? inStock : products[index].inStock
    };

    res.status(200).json({ success: true, data: products[index] });
});

// 5. DELETE a record
// DELETE /api/products/:id
app.delete('/api/products/:id', (req, res) => {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
        return res.status(400).json({ success: false, message: "Invalid ID format" });
    }

    const index = products.findIndex(p => p.id === id);
    if (index === -1) {
        return res.status(404).json({ success: false, message: "Product not found" });
    }

    const deletedProduct = products.splice(index, 1)[0];
    res.status(200).json({ 
        success: true, 
        message: "Product deleted successfully", 
        data: deletedProduct 
    });
});

app.get('/', (req, res) => {
    res.status(200).json({ 
        success: true, 
        message: "Welcome to the Product Inventory API! Access endpoints at /api/products" 
    });
});
app.listen(PORT, () => {
    console.log(`Product Inventory API running on http://localhost:${PORT}`);
});
