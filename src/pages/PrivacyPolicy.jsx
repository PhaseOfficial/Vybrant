import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/footer';

const PrivacyPolicy = () => {
  return (
    <div className="bg-gray-50 min-h-screen">
      <Navbar />
      <div className="container mx-auto px-4 py-16 max-w-4xl">
        <h1 className="text-4xl font-bold mb-8 text-gray-800">Privacy Policy</h1>
        
        <div className="prose prose-blue max-w-none text-gray-700">
          <p className="mb-4">Last Updated: April 2026</p>
          
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-gray-800">1. Introduction</h2>
            <p className="mb-4">
              Vybrant Care Services ("we", "us", or "our") is committed to protecting and respecting your privacy. 
              This Privacy Policy explains how we collect, use, and safeguard your personal data in accordance with the 
              General Data Protection Regulation (GDPR) and other applicable data protection laws.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-gray-800">2. Data We Collect</h2>
            <p className="mb-2 font-medium">We may collect and process the following data about you:</p>
            <ul className="list-disc pl-6 mb-4">
              <li>Contact information (Name, email address, phone number).</li>
              <li>Personal details (Address, date of birth).</li>
              <li>Health and care-related information (necessary for providing our services).</li>
              <li>Website usage data through cookies and similar technologies.</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-gray-800">3. How We Use Your Data</h2>
            <p className="mb-2 font-medium">We use your information for the following purposes:</p>
            <ul className="list-disc pl-6 mb-4">
              <li>To provide and manage our care services.</li>
              <li>To communicate with you regarding your enquiries or services.</li>
              <li>To comply with legal and regulatory requirements.</li>
              <li>To improve our website and user experience.</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-gray-800">4. Data Sharing and Disclosure</h2>
            <p className="mb-4">
              We do not sell your personal data. We may share your information with third-party service providers 
              (such as healthcare professionals or regulatory bodies) only when necessary for the provision of care 
              or when required by law.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-gray-800">5. Your Rights</h2>
            <p className="mb-2 font-medium">Under the GDPR, you have the following rights:</p>
            <ul className="list-disc pl-6 mb-4">
              <li>The right to access your personal data.</li>
              <li>The right to rectification of inaccurate data.</li>
              <li>The right to erasure ("the right to be forgotten").</li>
              <li>The right to restrict processing.</li>
              <li>The right to data portability.</li>
              <li>The right to object to processing.</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-gray-800">6. Security</h2>
            <p className="mb-4">
              We implement appropriate technical and organisational measures to protect your personal data 
              against unauthorised access, loss, or misuse.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-gray-800">7. Contact Us</h2>
            <p className="mb-4">
              If you have any questions about this Privacy Policy or our data protection practices, please contact us at:
              <br />
              Email: info@vybrantcareservices.co.uk
            </p>
          </section>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default PrivacyPolicy;
