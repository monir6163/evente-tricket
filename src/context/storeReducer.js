import decoded_Token from "../utility/DecodeToken";

const sotreReducer = (state, action) => {
  const { type, payload } = action;
  if (type === "login_success") {
    state.token = payload.token;
    state.userInfo = decoded_Token(payload.token);
  }
  return state;
};
export default sotreReducer;
