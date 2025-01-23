import { useState } from "react"
import axios from 'axios'
import { useNavigate } from "react-router-dom"

const AddProduct = () => {
    const [title, setTitle] = useState('')
    const [file, setFile] = useState('')
    const [preview, setPreview] = useState('')
    const navigate = useNavigate()

    const loadImage = (e) => {
        const image = e.target.files[0]
        setFile(image)
        setPreview(URL.createObjectURL(image))
    }

    const saveProduct = async (e) => {
        e.preventDefault();

        const formData = new FormData()
        formData.append('file', file)
        formData.append('title', title)
        try {
            await axios.post('http://localhost:5000/products', formData, {
                headers: {
                    "Content-Type": "multipart/form-data"
                }
            });
            navigate('/')
        } catch (error) {
            console.log(error.message);
        }
    }

    return (
        <div className="flex justify-center items-center w-full h-screen">
            <form className="max-w-sm mx-auto" onSubmit={saveProduct}>
                <div className="mb-5">
                    <label htmlFor="title" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                        Product Title
                    </label>
                    <input
                        type="text"
                        id="title"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="Nama Product"
                        required
                        value={title}
                        onChange={(e) => { setTitle(e.target.value) }}
                    />
                </div>
                <div className="mb-5">
                    <label htmlFor="file" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                        Image
                    </label>
                    <input
                        type="file"
                        id="file"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        onChange={loadImage}
                    />
                </div>
                {preview ? (
                    <figure>
                        <img className="aspect-[4/3] object-cover object-center mb-5 rounded-lg" src={preview} alt="preview image" />
                    </figure>
                ) : ''}
                <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit</button>
            </form>

        </div>
    )
}

export default AddProduct
