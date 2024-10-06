import axios from "axios";
import { useEffect, useState } from "react";

function Product() {
    const [products, setProducts] = useState([]); // Initialize as empty array
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        // Fetch products
        axios.get("http://localhost:8080/products")
        .then(function (response) {
            setProducts(response.data);
        })
        .catch(function (error) {
            console.log(error);
        });

        // Fetch categories
        axios.get("http://localhost:8080/categories")
        .then(function (response) {
            setCategories(response.data);
        })
        .catch(function (error) {
            console.log(error);
        });

    }, []);

    const [name, setName] = useState("");
    const [price, setPrice] = useState("");
    const [qty, setQty] = useState("");
    const [categoryId, setCategoryId] = useState("");

    function handleName(event) {
        setName(event.target.value);
    }

    function handlePrice(event) {
        setPrice(event.target.value);
    }

    function handleQuantity(event) {
        setQty(event.target.value);
    }

    function handleCategory(event) {
        setCategoryId(event.target.value); // Set the selected category ID
    }

    function createProduct(event) {
        event.preventDefault();

        const data = {
            name: name,
            price: price,
            quantity: qty,
            categoryId: categoryId
        };

        axios
            .post("http://localhost:8080/products", data)
            .then(function (response) {
                console.log(response);
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    return (
        <div>
            <h1>Products</h1>

            {products.map((product) => (
                <div key={product.id}>
                    <h2>{product.name}</h2>
                    <p>Category: {product.category?.name}</p>
                    <p>Price: {product.price}</p>
                    <p>Qty: {product.quantity}</p>
                    <p>{product.price}</p>
                </div>
            ))}

            <form onSubmit={createProduct}>
                <div>
                    <label>Name</label>
                    <input type="text" onChange={handleName} required />
                </div>

                <br />

                <div>
                    <label>Price</label>
                    <input type="text" onChange={handlePrice} required />
                </div>

                <br />

                <div>
                    <label>Quantity</label>
                    <input type="text" onChange={handleQuantity} required />
                </div>

                <div>
                    <label>Category</label>
                    <select value={categoryId} onChange={handleCategory} required>
                        <option value="">Select a category</option>
                        {categories.map((category) => (
                            <option key={category.id} value={category.id}>
                                {category.name}
                            </option>
                        ))}
                    </select>
                </div>

                <br />
                <br />
                <button type="submit">Create Product</button>
            </form>
        </div>
    );
}

export default Product;
