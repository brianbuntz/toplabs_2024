// pages/contact.tsx
import React from 'react';

const Contact: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4">Contact Us</h1>
      <p className="mb-4">
        We&#39;d love to hear from you! Whether you have a question about our content, 
        want to collaborate, or need assistance, please don&#39;t hesitate to reach out.
      </p>
      <div>
        <h2 className="text-xl font-semibold mb-2">Contact Information:</h2>
        <p>Email: info@rdworld.com</p>
        <p>Phone: +1 (123) 456-7890</p>
        <p>Address: WTWH Media, LLC, 1111 Superior Ave #2600, Cleveland, OH 44114, USA</p>
      </div>
    </div>
  );
};

export default Contact;
