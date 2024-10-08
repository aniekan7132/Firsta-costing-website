import React, { useEffect, useState } from "react";
import "./index.css";
import data from "./data.json";
import Nav from "./components/Navbar";
import Modal from "./components/Modal";

type Product = {
  image: string;
  price: number;
  productName: string;
};

type PurchasedItem = {
  productName: string;
  price: number;
};

const App: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [purchasedItems, setPurchasedItems] = useState<PurchasedItem[]>([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [searchItem, setSearchItem] = useState("");
  const [addedProducts, setAddedProducts] = useState<Set<string>>(new Set());

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const searchTerm = e.target.value;
    setSearchItem(searchTerm);
    filterProducts(searchTerm);
  };

  const filterProducts = (searchTerm: string) => {
    const lowercasedSearchTerm = searchTerm.toLowerCase();
    const filtered = products.filter((product) =>
      product.productName.toLowerCase().includes(lowercasedSearchTerm)
    );
    setFilteredProducts(filtered);
  };

  useEffect(() => {
    const updatedData = data.map((product) => {
      return product;
    });
    setProducts(updatedData);
    setFilteredProducts(updatedData); // Initialize filtered products with all products
  }, []);

  const handlePurchase = (product: Product) => {
    if (!addedProducts.has(product.productName)) {
      setPurchasedItems((prevItems) => [...prevItems, product]);
      setTotalPrice((prevTotal) => prevTotal + product.price);
      setAddedProducts((prevSet) => new Set(prevSet).add(product.productName));
    }
  };

  const removePurchase = (product: Product) => {
    if (addedProducts.has(product.productName)) {
      setPurchasedItems((prevItems) => prevItems.filter(item => item.productName !== product.productName));
      setTotalPrice((prevTotal) => Math.max(prevTotal - product.price, 0));
      setAddedProducts((prevSet) => {
        const newSet = new Set(prevSet);
        newSet.delete(product.productName);
        return newSet;
      });
    }
  };

  const handleCheckout = () => {
    if (totalPrice === 0) {
      alert("Please purchase an item before checking out");
    } else {
      setShowModal(true);
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <>
      <Nav totalPrice={totalPrice} onCheckout={handleCheckout} />

      <div className={`list__container ${showModal ? "blur" : ""}`}>
        <h1>Software Features</h1>
        <input
          type="text"
          placeholder="Enter Name of your product"
          className="neomorph-input"
        />
        <input
          type="text"
          value={searchItem}
          onChange={handleInputChange}
          placeholder="Type to search"
          className="neomorph-input"
        />
        <div className="product-list">
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product, index) => (
              <div className="product-card" key={index}>
                <div className="product-info">
                  <h2 className="product-name">
                    {product.productName}
                  </h2>
                  <p className="product-price">
                  ₦{product.price.toFixed(2)}
                  </p>
                  <button
                    onClick={() => handlePurchase(product)}
                    disabled={addedProducts.has(product.productName)}
                  >
                    Add Feature
                  </button>
                  <button
                    onClick={() => removePurchase(product)}
                    disabled={!addedProducts.has(product.productName)}
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))
          ) : (
            <h2 className="notfound">Feature Not found 😪😪</h2>
          )}
        </div>
      </div>
      <Modal
        show={showModal}
        handleClose={handleCloseModal}
        items={purchasedItems}
        totalPrice={totalPrice}
      />
    </>
  );
};

export default App;