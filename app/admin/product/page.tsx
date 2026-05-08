import { CardProduct } from "@/components/card-product"
import { getCookie } from "@/lib/helper"
import { Cardo } from "next/dist/compiled/@next/font/dist/google"

export interface AllProductResponse {
    status: boolean
    message: string
    data: Product[]
}

export interface Product {
    id: number
    nama_barang: string
    deskripsi: string
    stok: number
    harga: number
    image: string
}
// ** create function loading data product */
async function getProducts(): Promise<Product[]> {
    try {
        const url = `${process.env.NEXT_PUBLIC_BASE_URL}/admin/getbarang`
        const response = await fetch(url, {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${await getCookie("token")}`
            }
        })

        const responseData = await response.json()
        
        if (!response.ok) {
            return []
        }
        return responseData?.data as Product[]
    } catch (error) {
        console.log(error);
        return []
    }
}
export default async function ProductPage() {
    const products = await getProducts()
    return (
        <div className="w-full p-3">
            <div className="grid grid-cols-2 md:grid-cols-4">
                {
                    products.map(product => (
                        <CardProduct
                            key={`product-${product.id}`}
                            name={product.nama_barang}
                            description={product.deskripsi}
                            image={product.image}
                            price={product.harga}
                        />
                    ))
                }
            </div>
        </div>
    )
}
