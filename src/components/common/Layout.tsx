import { Outlet } from "react-router-dom";
import Footer from "../Footer";
import Header from "../Header";
import { ToastContainer } from "react-toastify";

const Layout = () => {
  return (
    <>
      <Header />
      <Outlet />
      <Footer />
      <ToastContainer position="bottom-right" />
    </>
  );
};

export default Layout;
