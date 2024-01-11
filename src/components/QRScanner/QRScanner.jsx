import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import BarcodeScanner from "../BarcodeScanner/BarcodeScanner";

function QRScanner({ show, handleClose, setPartNumber }) {
  const onNewScanResult = (decodedText) => {
    setPartNumber(decodedText);
    handleClose();
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Scan part</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <BarcodeScanner
          fps={10}
          qrbox={{ width: 280, height: 100 }}
          disableFlip={false}
          qrCodeSuccessCallback={onNewScanResult}
        />
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
