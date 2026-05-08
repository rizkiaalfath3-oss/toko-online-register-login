'use client';
import { getCookie } from "@/lib/helper";
import { Container } from "lucide-react";
import { useState } from "react";

const addProduct = () => {
    const [productName, setProductName] = useState("");
    const [price, setPrice] = useState(0);
    const [stock, setStock] = useState(0);
    const [description, setDescription] = useState("");
    const [image, setImage] = useState<File | null>(null);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("nama_barang", productName);
        formData.append("harga", price.toString());
        formData.append("stok", stock.toString());
        formData.append("deskripsi", description);
        if (image) {
            formData.append("image", image);
        }
        const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/admin/insertbarang`, {
            method: "POST",
            body: formData,
            headers: {
                "Authorization": `Bearer ${await getCookie("token")}`
            }
        });
        const data = await response.json();
        console.log(data);
        if (!data.status) {
            alert(data.message);
        } else {
            alert("Product added successfully");
        }
    };
  
    return (
        <div>
            <h1>
                Add Product
            </h1>
                <form onSubmit={handleSubmit}>
                    <div className="flex flex-col gap-2">
                        <label>Product Name</label>
                        <input type="text" placeholder="Enter product name" 
                        className="border border-gray-300 rounded py-2" onChange={(e)=>setProductName(e.target.value)}/>
                    </div>
                    <div className="flex flex-col gap-2">
                        <label>Product Description</label>
                        <input type="text" placeholder="Enter product description" 
                        className="border border-gray-300 rounded py-2" onChange={(e)=>setDescription(e.target.value)}/>
                    </div>
                    <div className="flex flex-col gap-2">
                        <label>Price</label>
                        <input type="number" placeholder="Enter product price" 
                        className="border border-gray-300 rounded py-2" onChange={(e)=>setPrice(Number(e.target.value))}/>
                    </div>
                    <div className="flex flex-col gap-2">
                        <label>Image</label>
                        <input type="file" placeholder="Enter image" 
                        className="border border-gray-300 rounded py-2" onChange={(e)=>setImage(e.target.files?.[0] || null)}/>
                    </div>
                    <div className="flex flex-col gap-2">
                        <label>Stock</label>
                        <input type="number" placeholder="Enter product stock" 
                        className="border border-gray-300 rounded py-2" onChange={(e)=>setStock(Number(e.target.value))}/>
                    </div>
                    <button 
                        type="submit" className="bg-blue-500 text-white py-2 px-4 rounded">
                            Add Product
                    </button>
                </form>
                
        </div>
    )
}

export default addProduct;