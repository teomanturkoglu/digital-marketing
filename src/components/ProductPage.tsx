import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

interface Product {
    id: number;
    title: string;
    price: number;
    description: string;
    rating: number;
    images: string[];
}

const ProductPage = () => {
    const {id} = useParams<{id: string}>();
    const navigate = useNavigate();
    const [product, setProducts] = useState<Product | null>(null);

    useEffect(() => {
        console.log("fetching product wit id", id);
        if (id) {
            axios.get<Product>(`https://dummyjson.com/products/${id}`).then((response) => {
                console.log("response", response.data);
                setProducts(response.data);
            }).catch((error) => {
                console.error(`Error fetching error: ${error}`);
            });
        }
    }, [id]); 

    if (!product) {
        return <h1>Loading...</h1>;
    }
    return (
    <div className="p-5 w-[60%]">
        <button onClick={() => navigate(-1)} className="mb-5 px-4 py-2 bg-black text-white rounded">
            Back
        </button>
    <img src={product.images[0]} alt={product.title} className="w-[50%] h-auto mb-5" />
    <h1 className="text-2xl font-bold">{product.title}</h1>
    <p className="mb-4 text-gray-700 w-[70%]">Price: ${product.description}</p>
    <div className="flex">
        <p>Price: ${product.price}</p>
        <p className="ml-10">Rating: {product.rating}</p>
    </div>
    </div>
    );
    
};

export default ProductPage;