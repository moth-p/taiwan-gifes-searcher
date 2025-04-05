import { Outlet } from "react-router-dom";

const AuthLayout = () => {
  return (
    <section className="relative w-screen h-screen flex justify-center items-center">
      <Outlet />
    </section>
  );
};

export default AuthLayout;
