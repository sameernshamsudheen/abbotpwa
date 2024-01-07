import { Html5QrcodeScanner } from "html5-qrcode";
import { useEffect, useRef } from "react";

const qrcodeRegionId = "html5qr-code-full-region";

// Creates the configuration object for Html5QrcodeScanner.
const createConfig = (props) => {
  let config = {};
  if (props.fps) {
    config.fps = props.fps;
  }
  if (props.qrbox) {
    config.qrbox = props.qrbox;
  }
  if (props.aspectRatio) {
    config.aspectRatio = props.aspectRatio;
  }
  if (props.disableFlip !== undefined) {
    config.disableFlip = props.disableFlip;
  }
  return config;
};

function BarcodeScanner(props) {
  const effectRan = useRef(false);

  useEffect(() => {
    if (!effectRan.current) {
      console.log("MOUNT");

      const config = createConfig(props);
      const verbose = props.verbose === true;

      let html5QrcodeScanner = new Html5QrcodeScanner(
        qrcodeRegionId,
        config,
        verbose
      );
      html5QrcodeScanner.render(
        props.qrCodeSuccessCallback,
        props.qrCodeErrorCallback
      );

      return () => {
        console.log("CLEAR");
        // effectRan.current = true;
        html5QrcodeScanner.clear().catch((error) => {
          console.error("Failed to clear html5QrcodeScanner. ", error);
        });
      };
    }
  }, [props]);

  return <div id={qrcodeRegionId} />;
}

export default BarcodeScanner;
