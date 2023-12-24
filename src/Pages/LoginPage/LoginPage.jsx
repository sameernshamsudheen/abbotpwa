import { useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../../App.css";

const LoginPage = () => {
  const navigate = useNavigate();

  const googleLogin = useGoogleLogin({
    scope: "https://www.googleapis.com/auth/spreadsheets",
    onSuccess: async (tokenResponse) => {
      const userInfo = await axios.get(
        "https://www.googleapis.com/oauth2/v3/userinfo",
        { headers: { Authorization: `Bearer ${tokenResponse.access_token}` } }
      );

      localStorage.setItem("access_token", tokenResponse.access_token);
      console.log(tokenResponse);

      localStorage.setItem("user_info", JSON.stringify(userInfo.data));
      console.log(userInfo.data);

      navigate("/home");
    },
    onError: (errorResponse) => console.log(errorResponse),
  });

  return (
    <div className="container vh-100 LoginPage">
      <div className="row h-100 justify-content-center align-items-center">
        <div className="col-md-6">
          <div className="text-center text-light mb-4">
            <h2>Spare Part Manager</h2>
          </div>
          <div className="text-center">
            <button className="btn btn-primary" onClick={googleLogin}>
              Sign in with Google
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
