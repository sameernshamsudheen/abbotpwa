import { useGoogleLogin } from "@react-oauth/google";

import {
  // getAllData,
  // getCellValue,
  // updateCellValue,
  searchPartNumber,
  removePart,
  returnPart,
} from "../../functions/goglesheet";
import axios from "axios";

const LoginPage = () => {
  const googleLogin = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      const userInfo = await axios.get(
        "https://www.googleapis.com/oauth2/v3/userinfo",
        { headers: { Authorization: `Bearer ${tokenResponse.access_token}` } }
      );

      localStorage.setItem("access_token", tokenResponse.access_token);
      console.log(tokenResponse);

      localStorage.setItem("user_info", JSON.stringify(userInfo.data));
      console.log(userInfo.data);
    },
    onError: (errorResponse) => console.log(errorResponse),
  });

  return (
    <>
      <button onClick={googleLogin}>Google Login 🚀</button>

      {/* <button onClick={() => getAllData()}>GET all data</button>
      <button onClick={() => getCellValue("Sheet1!A1")}>GET cell data</button>
      <button onClick={() => updateCellValue("Sheet1!A1", "new")}>
        UPDATE cell value
      </button> */}
      <button
        onClick={async () => console.log(await searchPartNumber("8-203835-01"))}
      >
        SEARCH part number 8-203835-01
      </button>
      <button
        onClick={async () => console.log(await removePart("8-203835-01", "2"))}
      >
        REMOVE
      </button>
      <button
        onClick={async () => console.log(await returnPart("8-203834-02", "1"))}
      >
        RETURN
      </button>
    </>
  );
};

export default LoginPage;
