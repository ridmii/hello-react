import axios from "axios";
import { useEffect, useState } from "react";
import { useAuth } from "./Utils/AuthContext";

function Product() {

    const {isAuthenticated, jwtToken} = useAuth();

    const [products, setProducts] = useState(null);
    const [categories, setCategories] = useState(null);

    const config = {
        Headers: {
            Authorization: `Bearer ${jwtToken}`
        }
    }

    useEffect(() => {

        if(isAuthenticated) {

            axios.get("http://localhost:8080/products", config)
            .then(function (response) {
                setProducts(response.data);
            })
            .catch(function (error) {
                console.log(error);
            });

        axios.get("http://localhost:8080/categories", config)
            .then(function (response) {
                setCategories(response.data);
            })
            .catch(function (error) {
                console.log(error);
            });

        }
        
    }, [isAuthenticated])

    const [name, setName] = useState("");
    const [price, setPrice] = useState("");
    const [qty, setQty] = useState("");
    const [categoryId, setCategoryId] = useState(null);


    function handleName(event) {
        setName(event.target.value);
    }

    function handlePrice(event) {
        setPrice(parseFloat(event.target.value));
    }

    function handleQuantity(event) {
        setQty(parseInt(event.target.value));
    }

    function handleCategory(event) {
        setCategoryId(event.target.value);
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
            .post("http://localhost:8080/products", data, config)
            .then(function (response) {
                console.log(response);
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    const [edit, setEdit] = useState(false);
    const [productId, setProductId] = useState(null);

    function getProducts() {
        axios.get("http://localhost:8080/products", config)
            .then(function (response) {
                setProducts(response.data);
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    function updateProduct(event) {
        event.preventDefault();

        const data = {
            name: name,
            price: price,
            quantity: qty,
            categoryId: categoryId
        }

        axios.put("http://localhost:8080/products/" + productId, data, config)
            .then(function (response) {
                getProducts();
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    return (
        <div>
            <h1>Products</h1>

            {products && products.map((product) => {
                return (
                    <div key={product.id}>
                        <h2>{product.name}</h2>
                        <p>Category: {product.category?.name}</p>
                        <p>Price: {product.price}</p>
                        <p>Qty: {product.quantity}</p>
                        <button type="button" className="btn btn-primary" onClick={() => {
                            setEdit(true);
                            setProductId(product.id);
                            setName(product.name);
                            setPrice(product.price);
                            setQty(product.quantity);
                            setCategoryId(product.category?.id);
                        }}>Edit</button>
                    </div>
                )
            })
            }

            {!edit &&

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
                        <select onChange={handleCategory} required>
                            <option value="">Select a category</option>

                            {categories && categories.map((category) => (
                                <option key={category.id} value={category.id} selected={categoryId === category.id}>{category.name}</option>
                            ))}
                        </select>
                    </div>

                    <br />
                    <br />
                    <button type="submit">Create Product</button>
                </form>
            }

            {edit &&
                <form onSubmit={updateProduct}>
                    <div>
                        <label>Name</label>
                        <input type="text" onChange={handleName} value={name} required />
                    </div>

                    <br />

                    <div>
                        <label>Price</label>
                        <input type="text" onChange={handlePrice} value={price} required />
                    </div>

                    <br />

                    <div>
                        <label>Quantity</label>
                        <input type="text" onChange={handleQuantity} value={qty} required />
                    </div>

                    <div>
                        <label>Category</label>
                        <select onChange={handleCategory} required>
                            <option value="">Select a category</option>

                            {categories && categories.map((category) => (
                                <option key={category.id} value={category.id} selected={category.id === categoryId}>{category.name}</option>
                            ))}
                        </select>
                    </div>

                    <br />
                    <br />
                    <button type="submit">Update Product</button>
                </form>
            }

        </div>
    )
}

export default Product;