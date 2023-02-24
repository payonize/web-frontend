import React, { createContext, useState } from "react";

export const UtilsContext = createContext();

const UtilsContextProvider = (props) => {
  const [errorMsg, setErrorMsg] = useState({
    email: null,
    password: null,
    confirmPassword: null,
    passwordLogin: null,
  });
  const [loading, setLoading] = useState(false);

  return (
    <UtilsContext.Provider
      value={{ errorMsg, setErrorMsg, loading, setLoading }}
    >
      {props.children}
    </UtilsContext.Provider>
  );
};

export default UtilsContextProvider;
