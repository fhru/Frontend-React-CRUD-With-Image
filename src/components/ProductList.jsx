import { useEffect, useState } from "react"
import axios from 'axios'
import { Link } from "react-router-dom";

export default function ProductList() {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        getProducts()
    }, []);

    const getProducts = async () => {
        try {
            const response = await axios.get('http://localhost:5000/products')
            setProducts(response.data)
        } catch (error) {
            console.log(error.message);
        }
    }

    const deleteProduct = async (id) => {
        try {
            await axios.delete(`http://localhost:5000/products/${id}`)
            getProducts()
        } catch (error) {
            console.log(error.message);
        }
    }

    return (
        <div className="flex flex-col items-center pt-10">
            <div className="text-5xl font-bold mb-5">Product List</div>
            <Link className="font-medium hover:bg-blue-800 w-fit bg-blue-600 rounded-md px-4 py-2.5" to={"/add"}>
                Add Product
            </Link>
            <div className="container-lg p-[24px] flex gap-8 flex-wrap justify-center">
                {products.map((product) => {
                    return (
                        <div key={product.id} className="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 h-fit">
                            <img
                                className="rounded-t-lg aspect-[4/3] object-cover"
                                src={product.url}
                                alt="gambar"
                            />
                            <div className="p-5">
                                <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                                    {product.name}
                                </h5>
                                <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                                    Lorem ipsum dolor sit, amet consectetur adipisicing elit. Dolores, provident.
                                </p>
                                <div className="flex gap-2 w-full ">
                                    <Link
                                        className="transition-all w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg px-5 py-2.5 focus:outline-none text-center"
                                        to={`/edit/${product.id}`}
                                    >
                                        Edit
                                    </Link>
                                    <button
                                        type="button"
                                        className="transition-all w-full text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg px-5 py-2.5 focus:outline-none"
                                        onClick={() => { deleteProduct(product.id) }}
                                    >
                                        Delete
                                    </button>
                                </div>
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}
