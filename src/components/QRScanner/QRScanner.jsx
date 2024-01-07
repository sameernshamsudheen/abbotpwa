import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
// import QrReader from "react-qr-scanner";
import BarcodeScanner from "../BarcodeScanner/BarcodeScanner";

function QRScanner({ show, handleClose, setPartNumber }) {
  // const previewStyle = {
  //   height: 240,
  //   width: 320,
  // };

  // function handleScan(data) {
  //   console.log(data);
  //   if (data) {
  //     setPartNumber(data.text);
  //     handleClose();
  //   }
  // }
  // function handleError(err) {
  //   console.error(err);
  // }

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
        {/* <QrReader
          delay={100}
          style={previewStyle}
          onError={handleError}
          onScan={handleScan}
           constraints={{
            video: { facingMode: "environment" },
          }}
        />  */}
        <BarcodeScanner
          fps={10}
          qrbox={250}
          disableFlip={false}
          qrCodeSuccessCallback={onNewScanResult}
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
