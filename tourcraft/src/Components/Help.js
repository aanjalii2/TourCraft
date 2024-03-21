import React from 'react';
import './Help.css'

const HelpSection = () => {
  return (
    <div className="help-section">
      <h2>Welcome to the Help Section</h2>

      <div className="section">
        <h3>Getting Started</h3>
        <p>
          Welcome to our Tour! This system is designed to help you manage various aspects of your travel and tourism business efficiently.
          Whether you're a travel agency, tour operator, or hotelier, our system offers a range of features to streamline your operations and enhance customer satisfaction.
        </p>
      </div>

      <div className="section">
        <h3>Navigation</h3>
        <p>
          - <strong>Dashboard:</strong> The dashboard provides an overview of key metrics and activities, including bookings, revenue, and upcoming events. Use it to quickly assess your business's performance and take necessary actions.
          <br />
          - <strong>Bookings:</strong> Manage all your bookings in one place. View, edit, or cancel bookings, and track payment status effortlessly.
          <br />
          - <strong>Inventory Management:</strong> Keep track of your inventory, including available rooms, flights, tours, and other services. Add, edit, or remove inventory items as needed.
          <br />
          - <strong>Customer Management:</strong> Maintain a comprehensive database of your customers. Keep track of their preferences, contact information, booking history, and loyalty program status.
          <br />
          - <strong>Reports:</strong> Access detailed reports to analyze your business performance, track trends, and make informed decisions. Customize reports based on various parameters such as date range, location, and service type.
          <br />
          - <strong>Settings:</strong> Customize system settings to suit your business needs. Configure currency, time zone, language preferences, and notification settings.
        </p>
      </div>

      <div className="section">
        <h3>Frequently Asked Questions (FAQs)</h3>
        <p>
          <strong>Q: How do I add a new booking?</strong><br />
          A: To add a new booking, navigate to the "Bookings" section and click on the "Add Booking" button. Fill in the required details such as customer information, booking date, service type, and payment details. Once completed, click "Save" to confirm the booking.
          <br /><br />
          <strong>Q: Can I customize email notifications for booking confirmations?</strong><br />
          A: Yes, you can customize email notifications in the "Settings" section. Choose the type of notifications you want to customize (e.g., booking confirmation, payment reminders) and tailor the content and formatting according to your preferences.
          <br /><br />
          <strong>Q: How can I generate a sales report for the previous month?</strong><br />
          A: To generate a sales report, go to the "Reports" section and select the desired date range (e.g., previous month). Choose the type of report (e.g., sales summary, revenue by service type) and click "Generate Report." You can then export the report in various formats for further analysis.
          <br /><br />
          <strong>Q: What should I do if I encounter technical issues or need assistance?</strong><br />
          A: If you encounter any technical issues or require assistance, please contact our support team at <a href="mailto:support@example.com">support@example.com</a>. Our team is available to provide prompt assistance and resolve any issues you may encounter.
        </p>
      </div>

      <div className="section">
        <h3>Additional Resources</h3>
        <p>
          - <strong>User Manual:</strong> Access the comprehensive user manual for detailed instructions on using the system's features and functionalities.
          <br />
          - <strong>Video Tutorials:</strong> Watch video tutorials covering various topics, from getting started with the system to advanced tips and tricks.
          <br />
          - <strong>Community Forum:</strong> Join our community forum to connect with other users, share experiences, and seek advice from industry experts.
        </p>
      </div>

      <p>We hope this help section provides you with the guidance you need to make the most of our Travel and Tourism Management System. If you have any further questions or feedback, please don't hesitate to reach out to us.</p>
      <p>Happy managing and safe travels!</p>
    </div>
  );
};

export default HelpSection;
