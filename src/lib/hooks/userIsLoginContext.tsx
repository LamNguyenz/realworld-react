import { useState } from "react";
import Token from "../token";

const useIsLoginContext = () => {
  const [isLogin, setIsLogin] = useState(!!Token.getToken());

  return {
    isLogin,
    setIsLogin,
  };
};

export default useIsLoginContext;
