import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/footer';

const TermsOfUse = () => {
  return (
    <div className="bg-gray-50 min-h-screen">
      <Navbar />
      <div className="container mx-auto px-4 py-16 max-w-4xl">
        <h1 className="text-4xl font-bold mb-8 text-gray-800">Terms of Use</h1>
        
        <div className="prose prose-blue max-w-none text-gray-700">
          <p className="mb-4">Last Updated: April 2026</p>
          
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-gray-800">1. Acceptance of Terms</h2>
            <p className="mb-4">
              By accessing and using this website, you agree to be bound by these Terms of Use and all 
              applicable laws and regulations. If you do not agree with any of these terms, you are 
              prohibited from using or accessing this site.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-gray-800">2. Use License</h2>
            <p className="mb-4">
              Permission is granted to temporarily download one copy of the materials (information or software) 
              on Vybrant Care Services' website for personal, non-commercial transitory viewing only.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-gray-800">3. Disclaimer</h2>
            <p className="mb-4">
              The materials on Vybrant Care Services' website are provided on an 'as is' basis. 
              Vybrant Care Services makes no warranties, expressed or implied, and hereby disclaims 
              and negates all other warranties including, without limitation, implied warranties or 
              conditions of merchantability, fitness for a particular purpose, or non-infringement 
              of intellectual property or other violation of rights.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-gray-800">4. Limitations</h2>
            <p className="mb-4">
              In no event shall Vybrant Care Services or its suppliers be liable for any damages 
              (including, without limitation, damages for loss of data or profit, or due to business 
              interruption) arising out of the use or inability to use the materials on Vybrant 
              Care Services' website.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-gray-800">5. Intellectual Property</h2>
            <p className="mb-4">
              All content, logos, and materials on this website are the property of Vybrant Care Services 
              and are protected by applicable copyright and trademark law.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-gray-800">6. Governing Law</h2>
            <p className="mb-4">
              These terms and conditions are governed by and construed in accordance with the laws 
              of the United Kingdom and you irrevocably submit to the exclusive jurisdiction of the 
              courts in that location.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-gray-800">7. Changes to Terms</h2>
            <p className="mb-4">
              Vybrant Care Services may revise these terms of use for its website at any time 
              without notice. By using this website you are agreeing to be bound by the then 
              current version of these Terms of Use.
            </p>
          </section>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default TermsOfUse;
