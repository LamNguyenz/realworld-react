import routerMeta, { IRouterMeta } from "@/lib/routerMeta";
import { Link } from "react-router-dom";
import NavItem from "./NavItem";
import { useContext } from "react";
import { UserContext } from "@/context/UserContextProvider";

const Header = () => {
  const { isLogin } = useContext(UserContext);

  return (
    <nav className="navbar navbar-light">
      <div className="container">
        <Link to="/" className="navbar-brand">
          conduit
        </Link>
        <ul className="nav navbar-nav pull-xs-right">
          {Object.keys(routerMeta).map((componentKey: string) => {
            const menu: IRouterMeta = routerMeta[componentKey];

            if ((menu.isShow && menu.isCommon) || (menu.isShow && !menu.isAuth && !isLogin)) {
              return <NavItem key={menu.path} menu={menu} />;
            }
          })}
        </ul>
      </div>
    </nav>
  );
};

export default Header;
