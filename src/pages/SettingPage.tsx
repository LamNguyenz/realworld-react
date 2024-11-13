import SettingForm from "@/components/SettingForm";
import { UserContext } from "@/context/UserContextProvider";
import Token from "@/lib/token";
import { useGetUserQuery } from "@/queries/user.query";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";

const SettingPage = () => {
  const navigate = useNavigate();
  const { setIsLogin } = useContext(UserContext);

  const {data: userInfo} = useGetUserQuery();

  const onLogout = () => {
    Token.removeToken();
    setIsLogin(false);
    navigate("/");
  };

  return (
    <div className="settings-page">
      <div className="container page">
        <div className="row">
          <div className="col-md-6 offset-md-3 col-xs-12">
            <h1 className="text-xs-center">Your Settings</h1>
            <SettingForm data={userInfo} />
            <hr />
            <button className="btn btn-outline-danger" onClick={onLogout}>
              Or click here to logout.
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingPage;
