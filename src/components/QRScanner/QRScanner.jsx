import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
// import { QrScanner } from "@yudiel/react-qr-scanner";
import QrReader from "react-qr-scanner";

function QRScanner({ show, handleClose, setPartNumber }) {
  const previewStyle = {
    height: 240,
    width: 320,
  };

  function handleScan(data) {
    console.log(data);
    if (data) {
      setPartNumber(data.text);
      handleClose();
    }
  }
  function handleError(err) {
    console.error(err);
  }

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Scan part</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {/* <QrScanner
          onDecode={(result) => {
            setPartNumber(result);
            handleClose();
          }}
          onError={(error) => console.log(error?.message)}
        /> */}
        <QrReader
          delay={100}
          style={previewStyle}
          onError={handleError}
          onScan={handleScan}
          constraints={{
            video: { facingMode: "environment" },
          }}
        />
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        {/* <Button variant="primary" onClick={handleClose}>
          Continue
        </Button> */}
      </Modal.Footer>
    </Modal>
  );
}

export default QRScanner;
