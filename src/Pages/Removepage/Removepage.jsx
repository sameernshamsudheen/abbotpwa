import { useState } from "react";
import Button from "react-bootstrap/Button";
import Navbar from "../../components/Navbar/Navbar";
import { removePart } from "../../functions/goglesheet";
import QRScanner from "../../components/QRScanner/QRScanner";
import toast from "react-hot-toast";

export default function Removepage() {
  const [partNumber, setPartNumber] = useState("");
  const [quantity, setQuantity] = useState("");

  const [isScanOpen, setIsScanOpen] = useState(false);

  const handleRemove = async () => {
    try {
      if (partNumber && quantity) {
        const res = await removePart(partNumber, quantity);
        toast.success(res);
        setQuantity("");
      } else {
        toast.error("Part number or quantity is missing!");
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleScanClose = () => {
    setIsScanOpen(false);
  };

  return (
    <>
      <Navbar />
      <div className="container my-5 p-5">
        <h3 className="mb-4">Remove Part</h3>
        <div className="row g-4">
          <div className="col-12">
            <input
              type="text"
              className="form-control"
              placeholder="Enter your part number"
              value={partNumber}
              onChange={(e) => setPartNumber(e.target.value)}
            />
          </div>
          <div className="col-12">
            <input
              type="text"
              className="form-control"
              placeholder="Quantity"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
            />
          </div>
          <div className="col-12">
            <Button variant="danger" className="w-100" onClick={handleRemove}>
              Remove
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
}
