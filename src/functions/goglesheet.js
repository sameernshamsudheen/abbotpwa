import { GOOGLE_API_KEY, IS_DEV, SHEET_ID, SHEET_NAME } from "../env";
import axiosInstance from "./axios";

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
    const url = `${SHEET_ID}/values/${SHEET_NAME}?key=${GOOGLE_API_KEY}`;
    const response = await axiosInstance.get(url);

    const values = response.data.values || [];

    return values;
  } catch (error) {
    console.error(error);
    return [];
  }
};

const batchUpdateCellValue = async (values) => {
  try {
    const url = `${SHEET_ID}/values:batchUpdate?key=${GOOGLE_API_KEY}`;

    const data = {
      spreadsheetId: SHEET_ID,
      valueInputOption: "USER_ENTERED",
      data: values,
    };

    return await axiosInstance.post(url, data);
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

    // Find the row with the matching user
    const col = values[0].findIndex((element) =>
      element.toLowerCase().includes(user.given_name.toLowerCase())
    );
    if (col < 0) throw new Error("Cannot find user!");

    // Find the row with the matching part number
    const row = values.findIndex((entry) => entry[1] === partNumber);
    if (row < 0) throw new Error("Cannot find part number!");

    // Find the col with the matching string "available qty"
    const avlQtyCol = values[0].findIndex((element) =>
      element.toLowerCase().includes("available qty")
    );
    if (avlQtyCol < 0)
      throw new Error("Cannot find Available Quantity in sheets!");

    const avlQtyValue = parseInt(values[row][avlQtyCol]);

    return { col, row, avlQtyCol, avlQtyValue };
  } catch (error) {
    throw new Error(error.message);
  }
};

export const searchPartNumber = async (partNumber) => {
  console.log(partNumber, "number");
  try {
    const url = `${SHEET_ID}/values/${SHEET_NAME}?key=${GOOGLE_API_KEY}`;

    const response = await axiosInstance.get(url);

    const values = response.data.values || [];

    // Find the row with the matching part number
    const row = values.find((entry) => entry[1] === partNumber);

    if (row) {
      // Find the col with the matching string "available qty"
      const avlQtyCol = values[0].findIndex((element) =>
        element.toLowerCase().includes("available qty")
      );
      if (avlQtyCol < 0)
        throw new Error("Cannot find Available Quantity in sheets!");
      const available_quantity = row[avlQtyCol]; //value of that col in row

      // Find the col with the matching string "location"
      const locCol = values[0].findIndex((element) =>
        element.toLowerCase().includes("location")
      );
      if (locCol < 0) throw new Error("Cannot find location in sheets!");
      const location = row[locCol]; //value of that col in row

      return { available_quantity, location };
    } else {
      throw new Error("Part number not found");
    }
  } catch (error) {
    console.log(error.message);
    throw new Error(error.message);
  }
};

export const removePart = async (partNumber, qnty) => {
  try {
    const { col, row, avlQtyCol, avlQtyValue } = await getUserAndPartCell(
      partNumber
    );

    const colIndex = alphabets[col];
    const avlQtyIndex = alphabets[avlQtyCol];
    const rowIndex = row + 1;

    const cellNumber = `${SHEET_NAME}!${colIndex}${rowIndex}`;
    const AvlQntyCellNumber = `${SHEET_NAME}!${avlQtyIndex}${rowIndex}`;

    const newAvlQty = avlQtyValue - parseInt(qnty);

    const response = await batchUpdateCellValue([
      //update remove cell with quantity
      {
        range: cellNumber,
        values: [[qnty]],
      },
      //update cell with avaliable quantity
      {
        range: AvlQntyCellNumber,
        values: [[newAvlQty]],
      },
    ]);
    if (response) return "Remove successfull";
  } catch (error) {
    console.log(error.message);
    throw new Error(error.message);
  }
};

export const returnPart = async (partNumber, qnty) => {
  try {
    const { col, row, avlQtyCol, avlQtyValue } = await getUserAndPartCell(
      partNumber
    );

    const colIndex = alphabets[col + 1];
    const avlQtyIndex = alphabets[avlQtyCol];
    const rowIndex = row + 1;

    const cellNumber = `${SHEET_NAME}!${colIndex}${rowIndex}`;
    const AvlQntyCellNumber = `${SHEET_NAME}!${avlQtyIndex}${rowIndex}`;

    const newAvlQty = avlQtyValue + parseInt(qnty);

    const response = await batchUpdateCellValue([
      //update return cell with quantity
      {
        range: cellNumber,
        values: [[qnty]],
      },
      //update cell with avaliable quantity
      {
        range: AvlQntyCellNumber,
        values: [[newAvlQty]],
      },
    ]);
    if (response) return "Return successfull";
  } catch (error) {
    console.log(error.message);
    throw new Error(error.message);
  }
};
