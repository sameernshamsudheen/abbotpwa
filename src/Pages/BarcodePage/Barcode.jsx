import React, { useEffect } from "react";
import { Html5QrcodeScanner } from "html5-qrcode";
import { useState } from "react";
import "./barcode.scss";

const Barcode = () => {
  // const [ScanResult, setScanResult] = useState(null);
  // useEffect(() => {
  //   const scanner = new Html5QrcodeScanner("reader", {
  //     qrbox: {
  //       width: 200,
  //       height: 200,
  //     },
  //     fps: 5,
  //   });
  //   scanner.render(success, error);

  //   function success(result) {
  //     scanner.clear();
  //     setScanResult(result);
  //   }
  //   function error(err) {
  //     console.warn(err);
  //   }
  //   return () => {};
  // }, []);

  return (
    <></>
    // <div className="container">
    //   <h1>Qr code Scanning in react</h1>
    //   {ScanResult ? (
    //     <div>
    //       Success: <a href={"http://" + ScanResult}></a>{" "}
    //     </div>
    //   ) : (
    //     <div style={{ width: "500px", height: "200px" }} id="reader">
    //       {" "}
    //     </div>
    //   )}
    // </div>
  );
};

export default Barcode;
