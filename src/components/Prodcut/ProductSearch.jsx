import React from "react";
import { useState } from "react";
import { searchPartNumber } from "../../functions/goglesheet";
import { Modal } from "react-bootstrap";

const ProductSearch = () => {
  const [productId, setProductId] = useState("");
  const [aq, setAq] = useState("");
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (productId === "") {
      console.log(" please enter a  product id to continue");
    } else {
      const { available_quantity } = await searchPartNumber(productId);
      available_quantity ? setAq(available_quantity) : setAq("");
    }
  };

  return (
    <form class="row g-3">
      <div class="col-md-12">
        <input
          type="text"
          class="form-control"
          id="inputEmail4"
          placeholder="Enter your product code"
          onChange={(e) => setProductId(e.target.value)}
        />
      </div>
      <div class="col-12">
        <button
          onClick={handleSubmit}
          type="submit"
          class="btn btn-success rounded-pill "
        >
          submit
        </button>
      </div>
      <div class="col-md-12">
        <input
          type="text"
          class="form-control"
          id="inputEmail4"
          value={aq}
          placeholder="Qty"
        />
      </div>
      <div class="col-md-12">
        <input
          type="text"
          class="form-control"
          id="inputEmail4"
          placeholder="Available Location"
          disabled
        />
      </div>
      <div className="container">
        <div className="row ">
          <div className="col-6 d-flex justify-content-center ">
            <button
              type="button"
              class="btn btn-success"
              data-toggle="modal"
              data-target="#exampleModal"
              
            >
              Remove
            </button>
          </div>
          <div className="col-6 d-flex justify-content-center">
            <button
              type="button"
              class="btn btn-success"
              data-toggle="modal"
              data-target="#exampleModal"
            >
              Returned
            </button>
          </div>
        </div>
      </div>

      <div class="col-md-12  mt-5  text-center">
        <button type="button" class="btn btn-success rounded-pill p-3">
          Scan your Product
        </button>
      </div>
      <Modal show={show} />
    </form>
  );
};

export default ProductSearch;
