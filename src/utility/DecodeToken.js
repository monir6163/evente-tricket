import { jwtDecode } from "jwt-decode";

const decoded_Token = (token) => {
  if (token) {
    try {
      const decode_token = jwtDecode(token);
      const exp = new Date(decode_token.exp * 1000);
      if (new Date() > exp) {
        localStorage.removeItem("token");
        return "";
      } else {
        return decode_token;
      }
    } catch (error) {
      return error;
    }
  } else {
    return "";
  }
};

export default decoded_Token;
