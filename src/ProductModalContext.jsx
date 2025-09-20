// ProductModalContext.jsx
import React, { createContext, useContext, useState } from "react";

const ProductModalContext = createContext();

export const useProductModal = () => useContext(ProductModalContext);

export const ProductModalProvider = ({ children }) => {
  const [selectedProduct, setSelectedProduct] = useState(null);

  const openModal = (product) => setSelectedProduct(product);
  const closeModal = () => setSelectedProduct(null);

  return (
    <ProductModalContext.Provider
      value={{ selectedProduct, openModal, closeModal }}
    >
      {children}
    </ProductModalContext.Provider>
  );
};
