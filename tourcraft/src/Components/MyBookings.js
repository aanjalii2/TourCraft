import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { PDFDownloadLink, Page, Text, View, Document, StyleSheet } from "@react-pdf/renderer";

const styles = StyleSheet.create({
    page: {
      flexDirection: 'row',
      backgroundColor: '#E4E4E4'
    },
    section: {
      margin: 10,
      padding: 10,
      flexGrow: 1
    }
  });
  

const MyBookings = () => {
    const [ bookings, setBookings ] = useState([]);

    useEffect(() => {
        const fetchBookings = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await axios.get('http://127.0.0.1:8000/users/bookings/', {
                    headers: {
                        Authorization: `Token ${token}`,
                    },
                });
                console.log('Bookings:', response.data);
                setBookings(response.data);
            } catch (error) {
            console.error('Error fetching bookings:', error);
            }
        }

        fetchBookings()
    }, []);

    const verifyPayment = async (bookingId) => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.post(`http://127.0.0.1:8000/users/bookings/${bookingId}/verify_payment/`, {}, {
                headers: {
                    Authorization: `Token ${token}`,
                    },
                });
                console.log('Payment verified:', response.data);
            } catch (error) {
                console.error('Error verifying payment:', error);
            }
        }

    return (
        <div>
            <h1>My Bookings</h1>
            {bookings.map(booking => (
                <div key={booking.id}>
                    <h2>Destination: {booking.destination.name}</h2>
                    <p>Booking Date: {booking.date} | Price: {booking.trip.cost}</p>
                    <p>Your Phone: {booking.phone} | Trip Duration: {booking.trip.trip_duration}</p>
                    <p>Booking Status: {booking.status} | Payment Status: {booking.payments[0]?.status}</p>
                    <button onClick={() => verifyPayment(booking.id)}>Verify Payment</button>
                    <PDFDownloadLink
                        document={<Document>
                            <Page size="A4" style={styles.page}>
                              <View style={styles.section}>
                                <Text>Tourcraft Invoice</Text>
                                <Text>Destination: {booking.destination.name}</Text>
                                <Text>Booking Date: {booking.date} | Price: {booking.trip.cost}</Text>
                                <Text>Your Phone: {booking.phone} | Trip Duration: {booking.trip.trip_duration}</Text>
                                <Text>Booking Status: {booking.status} | Payment Status: {booking.payments[0]?.status}</Text>
                              </View>
                            </Page>
                          </Document>}
                        fileName="invoice.pdf"
                      >
                        {({ blob, url, loading, error }) =>
                          loading ? "Loading document..." : "Download invoice!"
                        }
                      </PDFDownloadLink>
                </div>
            ))}
        </div>
    );
}

export default MyBookings;
