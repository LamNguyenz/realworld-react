import { UserContext } from "@/context/UserContextProvider";
import useInputs from "@/lib/hooks/useInputs";
import routerMeta from "@/lib/routerMeta";
import Token from "@/lib/token";
import { postRegister } from "@/repositories/users/usersRepository";
import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const RegisterPage = () => {
  const [error, setError] = useState<string[]>([]);

  const [signupData, onChangeSignupData] = useInputs({
    username: "",
    email: "",
    password: "",
  });

  const { setIsLogin } = useContext(UserContext);

  const navigate = useNavigate();

  const onRegister = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    postRegister(signupData)
      .then((res) => {
        Token.setToken(res?.data?.user?.token);
        setIsLogin(!!Token.getToken());
        navigate("/", { replace: true });
      })
      .catch((err) => {
        console.log("err: ", err);
        const messages = err?.response?.data?.message;
        setError(Array.isArray(messages) ? messages : [messages]);
      });
  };

  return (
    <div className="auth-page">
      <div className="container page">
        <div className="row">
          <div className="col-md-6 offset-md-3 col-xs-12">
            <h1 className="text-xs-center">Sign up</h1>
            <p className="text-xs-center">
              <Link to={routerMeta.SignInPage.path}>Have an account?</Link>
            </p>

            <ul className="error-messages">{error && error?.map((err) => <li>{err}</li>)}</ul>

            <form onSubmit={onRegister}>
              <fieldset className="form-group">
                <input
                  className="form-control form-control-lg"
                  type="text"
                  placeholder="Username"
                  name="username"
                  value={signupData.username}
                  onChange={onChangeSignupData}
                />
              </fieldset>
              <fieldset className="form-group">
                <input
                  className="form-control form-control-lg"
                  type="text"
                  placeholder="Email"
                  name="email"
                  value={signupData.email}
                  onChange={onChangeSignupData}
                />
              </fieldset>
              <fieldset className="form-group">
                <input
                  className="form-control form-control-lg"
                  type="password"
                  placeholder="Password"
                  name="password"
                  value={signupData.password}
                  onChange={onChangeSignupData}
                />
              </fieldset>
              <button className="btn btn-lg btn-primary pull-xs-right">Sign up</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
