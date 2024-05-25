// import React, { useState } from 'react';
// import axios from 'axios';
// import { useParams } from 'react-router-dom';

// const CheckoutForm = () => {
//   const [message, setMessage] = useState('');
//   const { bookingId } = useParams();

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     const token = localStorage.getItem('token');
//     if (!token) {
//       setMessage('Token not found');
//       return;
//     }

//     try {
//       const axiosInstance = axios.create({
//         baseURL: "http://127.0.0.1:8000/",
//         headers: {
//           "Content-Type": "application/json",
//           "Authorization": 'Key e1efcb9caf0b48159a0a4bf5da0a3cfc'
//         }
//       });

//       const response = await axiosInstance.post(`/users/bookings/${bookingId}/initiate_payment/`);
//       window.location.replace(response.data.payment_url);
//     } catch (error) {
//       console.error('Error initiating payment:', error);
//       if (error.response) {
//         console.error('Response data:', error.response.data);
//         console.error('Response status:', error.response.status);
//         console.error('Response headers:', error.response.headers);
//         setMessage(`Error: ${error.response.data.error || error.response.statusText}`);
//       } else if (error.request) {
//         console.error('No response received:', error.request);
//         setMessage('No response received from server');
//       } else {
//         console.error('Error details:', error.message);
//         setMessage('An error occurred while initiating payment. Please try again.');
//       }
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit}>
//       <button type="submit">Pay with Khalti</button>
//       {message && <p>{message}</p>}
//     </form>
//   );
// };

// export default CheckoutForm;
import React, { useState } from "react";
import { useParams } from "react-router-dom";

import ApiService from "./api";

const KhaltiCheckoutForm = () => {
	const [message, setMessage] = useState("");
	const { bookingId } = useParams();

	const handleSubmit = async (e) => {
		e.preventDefault();

		const token = localStorage.getItem("token");
		if (!token) {
			setMessage("Token not found");
			return;
		}

		try {
			const response = await ApiService(token).post(
				`/users/bookings/${bookingId}/initiate_payment/`
			);
			window.location.replace(response.data.payment_url);
		} catch (error) {
			console.error("Error initiating payment:", error);
			if (error.response) {
				console.error("Response data:", error.response.data);
				console.error("Response status:", error.response.status);
				console.error("Response headers:", error.response.headers);
				setMessage(
					`Error: ${
						error.response.data.error || error.response.statusText
					}`
				);
			} else if (error.request) {
				console.error("No response received:", error.request);
				setMessage("No response received from server");
			} else {
				console.error("Error details:", error.message);
				setMessage(
					"An error occurred while initiating payment. Please try again."
				);
			}
		}
	};

	return (
		<form onSubmit={handleSubmit}>
			<button type="submit">Pay with Khalti</button>
			{message && <p>{message}</p>}
		</form>
	);
};

const StripeCheckoutForm = () => {
	const { bookingId } = useParams();

	return (
		<form
			action={`http://localhost:8000/users/bookings/${bookingId}/create-checkout-session/`}
			method="POST">
			<button className="btn-checkout" type="submit">
				Pay with Stripe
			</button>
		</form>
	);
};

const CheckoutForm = () => {
	return (
		<>
			<KhaltiCheckoutForm />
			<br />
			<StripeCheckoutForm />
		</>
	);
};

export default CheckoutForm;
