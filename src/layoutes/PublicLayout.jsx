import { Outlet } from "react-router-dom";
import Nav from "../components/Nav";

export default function PublicLayout() {
  return (
    <>
      <Nav />
      <div className="">
        <Outlet />
      </div>
    </>
  );
}
