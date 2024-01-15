import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import BarcodeScanner from "../BarcodeScanner/BarcodeScanner";
import toast from "react-hot-toast";
import ZxingScanner from "../ZxingScanner/ZxingScanner";

function QRScanner({ show, handleClose, setPartNumber }) {
  const onScanSuccess = (decodedText) => {
    setPartNumber(decodedText);
    handleClose();
  };

  // const qrCodeErrorCallback = () => {
  //   toast.error("Something went wrong with the scanner!");
  //   handleClose();
  // };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Scan part</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {/* <BarcodeScanner
          fps={10}
          qrbox={{ width: 280, height: 100 }}
          disableFlip={false}
          qrCodeSuccessCallback={onScanSuccess}
          // qrCodeErrorCallback={qrCodeErrorCallback}
        /> */}
        <ZxingScanner onScanSuccess={onScanSuccess} />
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default QRScanner;
