import React from "react";
import { useState } from "react";
import {
  searchPartNumber,
  removePart,
  returnPart,
} from "../../functions/goglesheet";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

const ProductSearch = () => {
  const [productId, setProductId] = useState("");
  const [returnId, setRetrunId] = useState("");
  const [returnQty, setRetrunQty] = useState("");
  const [aq, setAq] = useState("");
  const [show, setShow] = useState(false);
  const [showOne, setShowOne] = useState(false);

  const handleCloseOne = () => setShowOne(false);
  const handleShowOne = () => setShowOne(true);

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

  const handleRemove = () => {
    if (productId === "") {
      console.log("please enter a  product id to continue");
    } else {
      // function
    }
  };
  const handleReturn = async () => {
    if (
      returnId === "" ||
      null ||
      (undefined && returnQty === "") ||
      null ||
      undefined
    ) {
      alert("enter a  valid product id and qty");
    } else {
      const result = await removePart(returnId, returnQty);

      handleCloseOne();
    }

    // handleCloseOne();
  };

  return (
    <>
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
              <Button variant="danger" onClick={handleShow}>
                Remove
              </Button>

              <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                  <Modal.Title>Remove</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  {productId ? (
                    <div>
                      {productId} are you sure you wanted to remove this product
                    </div>
                  ) : (
                    <div>enter your productId</div>
                  )}
                </Modal.Body>
                <Modal.Footer>
                  <Button variant="secondary" onClick={handleClose}>
                    Close
                  </Button>
                  <Button variant="danger" onClick={handleClose}>
                    Remove
                  </Button>
                </Modal.Footer>
              </Modal>
            </div>
            <div className="col-6 d-flex justify-content-center">
              <Button variant="primary" onClick={handleShowOne}>
                Returned
              </Button>

              <Modal show={showOne} onHide={handleCloseOne}>
                <Modal.Header closeButton>
                  <Modal.Title>Return</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  <div className="">
                    <input
                      className="w-100 "
                      type="text"
                      placeholder=" enter your productid"
                    />
                    <input
                      type="text"
                      class="form-control"
                      id="inputEmail4"
                      placeholder="Enter your qauntity"
                    />
                  </div>
                  <h5 className="my-4">
                    Are you sure you wanted to return this product?
                  </h5>
                </Modal.Body>
                <Modal.Footer>
                  <Button variant="secondary" onClick={handleCloseOne}>
                    Close
                  </Button>
                  <Button variant="primary" onClick={handleReturn}>
                    Submit
                  </Button>
                </Modal.Footer>
              </Modal>
            </div>
          </div>
        </div>

        <div class="col-md-12  mt-5  text-center">
          <button type="button" class="btn btn-success rounded-pill p-3">
            Scan your Product
          </button>
        </div>
      </form>
    </>
  );
};

export default ProductSearch;
