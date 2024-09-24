import { useState } from "react";
import { addProduct, updateProduct } from "../../api/productService";

const ProductForm = ({ product, onProductAdded, onProductUpdated }) => {
	const [name, setName] = useState(product ? product.name : "");
	const [type, setType] = useState(product ? product.type : "");
	const [description, setDescription] = useState(
		product ? product.description : ""
	);
	const [photo, setPhoto] = useState(null);  // Set initial state to null for the file

	const handlePhotoChange = (e) => {
		setPhoto(e.target.files[0]);  // Store the uploaded file in state
	};

	const handleSubmit = async (e) => {
		e.preventDefault();

		// Create form data to handle file uploads
		const formData = new FormData();
		formData.append("name", name);
		formData.append("type", type);
		formData.append("description", description);
		if (photo) {
			formData.append("photo", photo);  // Append the file to the form data
		}

		// Check if it's an update or new product
		if (product) {
			await updateProduct(product.id, formData);  // Use FormData for the update request
			onProductUpdated();
		} else {
			await addProduct(formData);  // Use FormData for the add request
			onProductAdded();
		}
	};

	return (
		<form onSubmit={handleSubmit} className="mb-4">
			<input
				type="text"
				value={name}
				onChange={(e) => setName(e.target.value)}
				placeholder="Product Name"
				className="border p-2 mb-2 w-full"
			/>
			<input
				type="text"
				value={type}
				onChange={(e) => setType(e.target.value)}
				placeholder="Product Type"
				className="border p-2 mb-2 w-full"
			/>
			<input
				type="text"
				value={description}
				onChange={(e) => setDescription(e.target.value)}
				placeholder="Description"
				className="border p-2 mb-2 w-full"
			/>

			{/* File input for photo */}
			<input
				type="file"
				onChange={handlePhotoChange}
				placeholder="Upload Photo"
				className="border p-2 mb-2 w-full"
			/>

			<button
				type="submit"
				className="bg-blue-500 text-white px-4 py-2 rounded-md"
			>
				{product ? "Update Product" : "Add Product"}
			</button>
		</form>
	);
};

export default ProductForm;
