import { UserContext } from "@/context/UserContextProvider";
import useInputs from "@/lib/hooks/useInputs";
import routerMeta from "@/lib/routerMeta";
import Token from "@/lib/token";
import { postLogin } from "@/repositories/users/usersRepository";
import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const LoginPage = () => {
  const [error, setError] = useState<string[]>([]);
  const [signInData, onChangeSignInData] = useInputs({
    email: "",
    password: "",
  });

  const { setIsLogin } = useContext(UserContext);

  const navigate = useNavigate();

  const onLogin = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    postLogin(signInData)
      .then((res) => {
        Token.setToken(res?.data?.user?.token);
        setIsLogin(!!Token.getToken());
        navigate("/", { replace: true });
      })
      .catch((err) => {
        const messages = err?.response?.data?.message;
        setError(Array.isArray(messages) ? messages : [messages]);
      });
  };

  return (
    <div className="auth-page">
      <div className="container page">
        <div className="row">
          <div className="col-md-6 offset-md-3 col-xs-12">
            <h1 className="text-xs-center">Sign in</h1>
            <p className="text-xs-center">
              <Link to={routerMeta.SignUpPage.path}>Need an account?</Link>
            </p>

            <ul className="error-messages">
              {error.map((message) => (
                <li key={message}>{message}</li>
              ))}
            </ul>

            <form onSubmit={onLogin}>
              <fieldset className="form-group">
                <input
                  className="form-control form-control-lg"
                  type="text"
                  placeholder="Email"
                  name="email"
                  value={signInData.email}
                  onChange={onChangeSignInData}
                />
              </fieldset>
              <fieldset className="form-group">
                <input
                  className="form-control form-control-lg"
                  type="password"
                  placeholder="Password"
                  name="password"
                  value={signInData.password}
                  onChange={onChangeSignInData}
                />
              </fieldset>
              <button className="btn btn-lg btn-primary pull-xs-right">Sign in</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
