import React from 'react';
import '../index.css';

const Contacts = () => {
  return (
    <div className="contacts-page">
      <section className="map-section">
        <iframe
          title="Electro Mart Location"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3988.749589533609!2d36.87748757496564!3d-1.3261874986612407!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x182f112bc11e2631%3A0xd37b8d2b79072674!2sElectromart%20Kenya!5e0!3m2!1sen!2ske!4v1753115629730!5m2!1sen!2ske"
          width="100%"
          height="350"
          style={{ border: 0 }}
          allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
      </section>

      <section className="contact-info">
        <h2>Get in Touch</h2>
        <div className="contact-details">
          <div>
            <h3>Phone Numbers</h3>
            <p>📞 +254 700 111 222</p>
            <p>📞 +254 711 333 444</p>
            <p>📞 +254 722 555 666</p>
          </div>

          <div>
            <h3>Email Addresses</h3>
            <p>support@electromart.com</p>
            <p>sales@electromart.com</p>
          </div>

          <div>
            <h3>WhatsApp</h3>
            <p>
              💬 <a href="https://wa.me/254700111222" target="_blank" rel="noreferrer">
                Chat with us on WhatsApp
              </a>
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contacts;
