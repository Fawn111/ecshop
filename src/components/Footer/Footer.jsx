import React from "react";
import {
  FaTwitter,
  FaFacebookF,
  FaInstagram,
  FaGithub,
  FaEnvelope,
  FaCcVisa,
  FaCcMastercard,
  FaPaypal,
  FaApplePay,
  FaGooglePay,
} from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gray-100 text-gray-700">
   

      <div className="px-4 py-10 md:px-12 md:grid flex flex-col justify-center items-center  md:grid-cols-5 gap-8">
        <div>
          <h3 className="text-black font-extrabold text-4xl sm:text-3xl uppercase">SHOP.CO</h3>
          <p className="mt-2 text-sm"> We have clothes that suit your style and which you're proud to wear. From women to men.</p>
          <div className="flex gap-3 mt-4">
            <FaTwitter className="cursor-pointer" />
            <FaFacebookF className="cursor-pointer" />
            <FaInstagram className="cursor-pointer" />
            <FaGithub className="cursor-pointer" />
          </div>
        </div>

        <div>
          <h4 className="font-semibold mb-2 uppercase tracking-wider text-black">Company</h4>
          <ul className="space-y-2 text-sm">
            <li>About</li>
            <li>Features</li>
            <li>Works</li>
            <li>Career</li>
          </ul>
        </div>

        <div>
          <h4 className="font-semibold mb-2 uppercase tracking-wider text-black">Help</h4>
          <ul className="space-y-2 text-sm">
            <li>Customer Support</li>
            <li>Delivery Details</li>
            <li>Terms & Conditions</li>
            <li>Privacy Policy</li>
          </ul>
        </div>

        <div>
          <h4 className="font-semibold mb-2 uppercase tracking-wider text-black">FAQ</h4>
          <ul className="space-y-2 text-sm">
            <li>Account</li>
            <li>Manage Deliveries</li>
            <li>Orders</li>
            <li>Payments</li>
          </ul>
        </div>

        <div>
          <h4 className="font-semibold mb-2 uppercase tracking-wider text-black">Resources</h4>
          <ul className="space-y-2 text-sm">
            <li>Free eBooks</li>
            <li>Development Tutorial</li>
            <li>How to - Blog</li>
            <li>Youtube Playlist</li>
          </ul>
        </div>
      </div>

      <div className="px-4 py-4 md:px-12 flex flex-col md:flex-row justify-between items-center border-t border-gray-300 text-sm">
        <p>Shop.co © 2000-2023, All Rights Reserved</p>
        <div className="flex gap-4 mt-2 md:mt-0 text-2xl">
          <FaCcVisa />
          <FaCcMastercard />
          <FaPaypal />
          <FaApplePay />
          <FaGooglePay />
        </div>
      </div>
    </footer>
  );
};

export default Footer;
