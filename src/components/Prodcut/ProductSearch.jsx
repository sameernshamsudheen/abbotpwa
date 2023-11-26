import React from "react";

const ProductSearch = () => {
  return (
    <form class="row g-3">
      <div class="col-md-12">
        <input
          type="text"
          class="form-control"
          id="inputEmail4"
          placeholder="Enter your product code"
        />
      </div>
      <div class="col-12">
        <button type="submit" class="btn btn-success rounded-pill ">
          submit
        </button>
      </div>
      <div class="col-md-12">
        <input
          type="text"
          class="form-control"
          id="inputEmail4"
          placeholder="Qty"
        />
      </div>
      <div class="col-md-12">
        <input
          type="text"
          class="form-control"
          id="inputEmail4"
          placeholder="Available Location"
        />
      </div>

      <div class="col-md-12  mt-5  text-center    ">
        <button type="button" class="btn btn-success rounded-pill p-3">
          Scan your Product
        </button>
      </div>
    </form>
  );
};

export default ProductSearch;
