import axios from "axios";

export const updateData = (key, value) => {
  const SHEET_ID = "1UBVi_uEblnStq4Od4IGljjxMmAV9T3hBEAqEI9gq9S8";
  const SHEET_NAME = "Sheet1";
  const API_KEY = "AIzaSyAdVPDFnezNUI5YQHJCg7S8QQovh5lacUA";
  // const ACCESS_TOKEN =
  //   "ya29.a0AfB_byDeHprfYp2Tcrn3doZQ8rXf2dN_523SgBS3nOxf1i6dIGqjh82oDb-P3GefIT22FYIeelEKy93yL0nujWLGpYvCsfxnVHyDRMh1fTH-RXFJgUqAC9USGgae3BUXcduN7HBGLUAx_08y8WAu3MUOfIw24uX8fD-xaCgYKATgSARISFQHGX2MiKng8UssShaf4MGEStmxeWA0171";
  //   const RANGE = key;
  //   const url = `https://sheets.googleapis.com/v4/spreadsheets/${SHEET_ID}/values/${SHEET_NAME}!${RANGE}?key=${API_KEY}`;
  const url = `https://sheets.googleapis.com/v4/spreadsheets/${SHEET_ID}/values/${SHEET_NAME}!${key}?valueInputOption=USER_ENTERED&key=${API_KEY}`;
  const headers = {
    Authorization: `Bearer ${ACCESS_TOKEN}`,
    Accept: "application/json",
    "Content-Type": "application/json",
  };

  const data = {
    range: key,
    values: [value],
  };
  axios
    .put(url, data)
    .then(function (response) {
      console.log(response);
      // handle success
      //   formatResponse(response.data);
    })
    .catch(function (error) {
      // handle error
      onError(error);
    })
    .finally(function () {
      // always executed
      console.log("ALL DONE LOADING DATA");
    });
};

function onError(error) {
  console.error(error);
}
