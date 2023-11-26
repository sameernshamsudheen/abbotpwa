import React from "react";
import Navbar from "../../components/Navbar/Navbar";
import ProductSearch from "../../components/Prodcut/ProductSearch";
import Barcode from "../BarcodePage/Barcode";

const HompPage = () => {
  return (
    <>
      <Navbar />
      <div className="container my-5 p-5">
        <ProductSearch />
      </div>
      <div className="container">
        <Barcode />
      </div>
    </>
  );
};

export default HompPage;
