// // src/app/create-user/page.tsx

// "use client";

// import { useState } from "react";

// export default function CreateUserForm() {
//   // State to hold form data
//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     password: "",
//   });

//   // State to hold response message
//   const [message, setMessage] = useState("");

//   // Handle input changes
//   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setFormData(prevState => ({
//       ...prevState,
//       [e.target.name]: e.target.value,
//     }));
//   };

//   // Handle form submission
//   const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault(); // Prevent default form submission behavior

//     try {
//       const response = await fetch("/api/users", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(formData),
//       });

//       const data = await response.json();

//       if (response.ok) {
//         setMessage("User created successfully!");
//         // Optionally, reset the form
//         setFormData({ name: "", email: "", password: "" });
//       } else {
//         setMessage(`Error: ${data.error || "Unknown error occurred"}`);
//       }
//     } catch (error) {
//       console.error("An error occurred:", error);
//       setMessage("An error occurred while creating the user.");
//     }
//   };

//   return (
//     <div className="max-w-md mx-auto mt-10 p-6 border rounded-md shadow-md">
//       <h1 className="text-2xl font-bold mb-4">Create User</h1>
//       {message && (
//         <div className="mb-4 p-2 bg-yellow-200 text-yellow-800 rounded">
//           {message}
//         </div>
//       )}
//       <form onSubmit={handleSubmit}>
//         <div className="mb-4">
//           <label htmlFor="name" className="block text-gray-700 font-semibold mb-1">
//             Name:
//           </label>
//           <input
//             type="text"
//             id="name"
//             name="name"
//             className="w-full px-3 py-2 border rounded"
//             value={formData.name}
//             onChange={handleChange}
//             required
//           />
//         </div>
//         <div className="mb-4">
//           <label htmlFor="email" className="block text-gray-700 font-semibold mb-1">
//             Email:
//           </label>
//           <input
//             type="email"
//             id="email"
//             name="email"
//             className="w-full px-3 py-2 border rounded"
//             value={formData.email}
//             onChange={handleChange}
//             required
//           />
//         </div>
//         <div className="mb-6">
//           <label htmlFor="password" className="block text-gray-700 font-semibold mb-1">
//             Password:
//           </label>
//           <input
//             type="password"
//             id="password"
//             name="password"
//             className="w-full px-3 py-2 border rounded"
//             value={formData.password}
//             onChange={handleChange}
//             required
//           />
//         </div>
//         <button
//           type="submit"
//           className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
//         >
//           Submit
//         </button>
//       </form>
//     </div>
//   );
// }


// src/app/create-user/page.tsx

"use client";

import { useState } from "react";
import { useRouter } from "next/navigation"; // Step 1: Import useRouter

export default function CreateUserForm() {
  const router = useRouter(); // Step 2: Initialize the router

  // State to hold form data
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  // State to hold response message
  const [message, setMessage] = useState("");

  // Handle input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prevState => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // Prevent default form submission behavior

    try {
      const response = await fetch("/api/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        // Step 3: Redirect to upload page after successful account creation
        router.push("/upload");

        // Optionally, reset the form if you won't redirect immediately
        // setFormData({ name: "", email: "", password: "" });
      } else {
        setMessage(`Error: ${data.error || "Unknown error occurred"}`);
      }
    } catch (error) {
      console.error("An error occurred:", error);
      setMessage("An error occurred while creating the user.");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 border rounded-md shadow-md">
      <h1 className="text-2xl font-bold mb-4">Create User</h1>
      {message && (
        <div className="mb-4 p-2 bg-yellow-200 text-yellow-800 rounded">
          {message}
        </div>
      )}
      <form onSubmit={handleSubmit}>
        {/* Name Field */}
        <div className="mb-4">
          <label htmlFor="name" className="block text-gray-700 font-semibold mb-1">
            Name:
          </label>
          <input
            type="text"
            id="name"
            name="name"
            className="w-full px-3 py-2 border rounded"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        {/* Email Field */}
        <div className="mb-4">
          <label htmlFor="email" className="block text-gray-700 font-semibold mb-1">
            Email:
          </label>
          <input
            type="email"
            id="email"
            name="email"
            className="w-full px-3 py-2 border rounded"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        {/* Password Field */}
        <div className="mb-6">
          <label htmlFor="password" className="block text-gray-700 font-semibold mb-1">
            Password:
          </label>
          <input
            type="password"
            id="password"
            name="password"
            className="w-full px-3 py-2 border rounded"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>
        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          Submit
        </button>
      </form>
    </div>
  );
}



