import axios from "axios";
import { GOOGLE_API_KEY, IS_DEV, SHEET_ID, SHEET_NAME } from "../env";

const alphabets = [
  "A",
  "B",
  "C",
  "D",
  "E",
  "F",
  "G",
  "H",
  "I",
  "J",
  "K",
  "L",
  "M",
  "N",
  "O",
  "P",
  "Q",
  "R",
  "S",
  "T",
  "U",
  "V",
  "W",
  "X",
  "Y",
  "Z",
];

// function formatResponse(response) {
//   const keys = response.values[0];
//   const data = response.values.slice(2);
//   const obj = data.map((arr) =>
//     Object.assign({}, ...keys.map((k, i) => ({ [k]: arr[i] })))
//   );
//   console.log("DATA", obj);
//   return response.values;
// }

// export const getAllData = async () => {
//   const url = `https://sheets.googleapis.com/v4/spreadsheets/${SHEET_ID}/values/${SHEET_NAME}?valueRenderOption=FORMATTED_VALUE&key=${GOOGLE_API_KEY}`;

//   try {
//     const response = await axios.get(url);
//     formatResponse(response.data);
//   } catch (error) {
//     onError(error);
//   }
// };

// export const getCellValue = async (range) => {
//   const accessToken = localStorage.getItem("access_token");
//   const url = `https://sheets.googleapis.com/v4/spreadsheets/${SHEET_ID}/values/${range}`;

//   const headers = {
//     Authorization: `Bearer ${accessToken}`,
//     Accept: "application/json",
//     "Content-Type": "application/json",
//   };

//   try {
//     const response = await axios.get(url, { headers });
//     const cellValue = response.data.values[0][0];
//     console.log("Cell Value:", cellValue);
//     return cellValue;
//   } catch (error) {
//     console.error(error);
//   }
// };

// export const updateCellValue = async (key, value) => {
//   const accessToken = localStorage.getItem("access_token");
//   const url = `https://sheets.googleapis.com/v4/spreadsheets/${SHEET_ID}/values/${key}?valueInputOption=USER_ENTERED`;
//   const headers = {
//     Authorization: `Bearer ${accessToken}`,
//     Accept: "application/json",
//     "Content-Type": "application/json",
//   };

//   const data = {
//     values: [[value]],
//   };

//   try {
//     const response = await axios.put(url, data, { headers });
//     console.log(response);
//   } catch (error) {
//     console.error(error);
//   }
// };

const getHeaders = () => {
  const accessToken = localStorage.getItem("access_token");

  const headers = {
    Authorization: `Bearer ${accessToken}`,
    Accept: "application/json",
    "Content-Type": "application/json",
  };

  return headers;
};

const getUserInfo = () => {
  if (IS_DEV === "true") {
    return { given_name: "Yoganand" };
  } else {
    const userInfo = localStorage.getItem("user_info");
    if (userInfo) return JSON.parse(userInfo);
    return null;
  }
};

const getSheetValues = async () => {
  try {
    const url = `https://sheets.googleapis.com/v4/spreadsheets/${SHEET_ID}/values/${SHEET_NAME}?key=${GOOGLE_API_KEY}`;

    const response = await axios.get(url, getHeaders());

    const values = response.data.values || [];

    return values;
  } catch (error) {
    console.error(error);
    return [];
  }
};

const batchUpdateCellValue = async (values) => {
  try {
    const url = `https://sheets.googleapis.com/v4/spreadsheets/${SHEET_ID}/values:batchUpdate?key=${GOOGLE_API_KEY}`;

    const data = {
      spreadsheetId: SHEET_ID,
      valueInputOption: "USER_ENTERED",
      data: values,
    };

    return await axios.post(url, data, getHeaders());
  } catch (error) {
    throw new Error("Something went wrong while updating");
  }
};

const getUserAndPartCell = async (partNumber) => {
  try {
    const user = getUserInfo();

    if (!user) throw new Error("User not logged in!");

    const values = await getSheetValues();

    if (!values) throw new Error("No sheet values found!");

    // Find the row with the matching part number
    const col = values[0].findIndex((element) =>
      element.toLowerCase().includes(user.given_name.toLowerCase())
    );
    if (col < 0) throw new Error("Cannot find user!");

    // Find the row with the matching part number
    const row = values.findIndex((entry) => entry[1] === partNumber);
    if (row < 0) throw new Error("Cannot find part number!");

    console.log(col, row);
    return { col, row };
  } catch (error) {
    throw new Error(error.message);
  }
};

export const searchPartNumber = async (partNumber) => {
  try {
    const url = `https://sheets.googleapis.com/v4/spreadsheets/${SHEET_ID}/values/${SHEET_NAME}?key=${GOOGLE_API_KEY}`;

    const response = await axios.get(url, { headers });

    const values = response.data.values || [];

    // Find the row with the matching part number
    const row = values.find((entry) => entry[1] === partNumber);

    if (row) {
      const available_quantity = row[19]; // Assuming count is in the 19 column (adjust as needed)
      const location = row[20]; // Assuming location is in the 20 column (adjust as needed)

      return { available_quantity, location };
    } else {
      throw new Error("Part number not found");
    }
  } catch (error) {
    console.log(error.message);
    return error.message;
  }
};

export const removePart = async (partNumber, qnty) => {
  try {
    const { col, row } = await getUserAndPartCell(partNumber);

    const colIndex = alphabets[col];

    const rowIndex = row + 1;

    const cellNumber = `${SHEET_NAME}!${colIndex}${rowIndex}`;

    const response = await batchUpdateCellValue([
      {
        range: cellNumber,
        values: [[qnty]],
      },
    ]);
    if (response) return "Return successfull";
  } catch (error) {
    console.log(error.message);
    return error.message;
  }
};

export const returnPart = async (partNumber, qnty) => {
  try {
    const { col, row } = await getUserAndPartCell(partNumber);

    const colIndex = alphabets[col + 1];
    const rowIndex = row + 1;

    const cellNumber = `${SHEET_NAME}!${colIndex}${rowIndex}`;

    const response = await batchUpdateCellValue([
      {
        range: cellNumber,
        values: [[qnty]],
      },
    ]);
    if (response) return "Return successfull";
  } catch (error) {
    console.log(error.message);
    return error.message;
  }
};
