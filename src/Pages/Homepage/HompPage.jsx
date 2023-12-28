import { useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar";
import { useState } from "react";
import { searchPartNumber } from "../../functions/goglesheet";
import { Button } from "react-bootstrap";
import QRScanner from "../../components/QRScanner/QRScanner";
import toast from "react-hot-toast";

const HompPage = () => {
  const navigate = useNavigate();

  const [partNumber, setPartNumber] = useState("");
  const [quantity, setQuantity] = useState("");

  const [isScanOpen, setIsScanOpen] = useState(false);

  const handleSearch = async () => {
    try {
      const res = await searchPartNumber(partNumber);
      setQuantity(res.available_quantity);
      toast.success("Part number found!");
    } catch (error) {
      console.log(error);
      setQuantity("");
      toast.error(error.message);
    }
  };

  const handleRemove = () => {
    navigate("/home/remove");
  };

  const handleReturn = () => {
    navigate("/home/return");
  };

  const handleScanClose = () => {
    setIsScanOpen(false);
  };

  return (
    <>
      <Navbar />
      <div className="container my-5 p-5">
        <div className="row g-4">
          <div className="col-12">
            <input
              type="text"
              className="form-control"
              id="inputEmail4"
              placeholder="Enter your part number"
              value={partNumber}
              onChange={(e) => setPartNumber(e.target.value)}
            />
          </div>
          <div className="col-12">
            <button
              onClick={handleSearch}
              className="btn btn-success rounded-pill w-100"
            >
              Search
            </button>
          </div>
          <div className="col-12">
            <input
              type="text"
              className="form-control"
              id="inputEmail4"
              value={quantity}
              onChange={() => {}}
              placeholder="Qty"
            />
          </div>
          <div className="col-12">
            <Button variant="danger" className="w-100" onClick={handleRemove}>
              Remove
            </Button>
          </div>
          <div className="col-12">
            <Button variant="primary" className="w-100" onClick={handleReturn}>
              Return
            </Button>
          </div>
          <div className="col-12">
            <button
              type="button"
              className="btn btn-success rounded-pill w-100"
              onClick={() => setIsScanOpen(true)}
            >
              Scan Part Number
            </button>
          </div>
        </div>
      </div>
      <QRScanner
        show={isScanOpen}
        handleClose={handleScanClose}
        setPartNumber={setPartNumber}
      />
    </>
  );
};

export default HompPage;
