import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";

const ResetPassword = () => {
  const handleClick = useContext(AuthContext);
  const { user } = useContext(AuthContext);

  return (
    <div>
      <h1>Reset Password</h1>

      {user && (
        <button onClick={() => handleClick.resetPassword(user.email)}>
          Reset password
        </button>
      )}
    </div>
  );
};

export default ResetPassword;
