import { Outlet, Link } from "react-router-dom";
import NavBar from "../components/NavBar";

const MainLayout = () => {
  return (
    <section className="relative py-40 md:py-20">
      {/* nav */}
      <NavBar />

      {/* main */}
      <Outlet />
    </section>
  );
};

export default MainLayout;
