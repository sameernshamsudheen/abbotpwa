import axios from "axios";

const HEADER_ROWS=2

export const getAllData = () => {
  const SHEET_ID = "1UBVi_uEblnStq4Od4IGljjxMmAV9T3hBEAqEI9gq9S8";
  const SHEET_NAME = "Sheet1";
  const API_KEY = "AIzaSyAdVPDFnezNUI5YQHJCg7S8QQovh5lacUA";
  const url = `https://sheets.googleapis.com/v4/spreadsheets/${SHEET_ID}/values/${SHEET_NAME}?valueRenderOption=FORMATTED_VALUE&key=${API_KEY}`;

  return axios
    .get(url)
    .then(function (response) {
      // handle success
      return formatResponse(response.data);
    })
    .catch(function (error) {
      // handle error
      return onError(error);
    })
    .finally(function () {
      // always executed
      console.log("ALL DONE LOADING DATA");
    });
};

function formatResponse(response) {
  const keys = response.values[0];
  
  // console.log("response.values", response.values);

  const data = response.values.slice(HEADER_ROWS);
  const obj = data.map((arr) =>
    Object.assign({}, ...keys.map((k, i) => ({ [k]: arr[i] })))
  );
  console.log("DATA", obj);
  return response.values
}

function getMainHeaderData(response) {}

function onError(error) {
  console.error(error);
}
