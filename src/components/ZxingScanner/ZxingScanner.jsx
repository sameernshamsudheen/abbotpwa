import { useZxing } from "react-zxing";

function ZxingScanner({ onScanSuccess }) {
  const { ref } = useZxing({
    onDecodeResult(result) {
      console.log(result.getText());
      onScanSuccess(result.getText());
    },
    onError(err) {
      console.log(err);
    },
  });

  return <video ref={ref} style={{ width: "100%", height: "100%" }} />;
}

export default ZxingScanner;
