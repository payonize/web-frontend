import { useState } from "react";
import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";

const ForgotPassword = () => {
  const [email, setEmail] = useState();
  const handleClick = useContext(AuthContext);

  return (
    <div>
      <h1>Forgot Password?</h1>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleClick.forgotPassword(email);
        }}
      >
        <label>Email</label>
        <input
          type="email"
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />
        <br />

        <button type="submit">Reset password</button>
      </form>
    </div>
  );
};

export default ForgotPassword;
