import { Outlet } from "react-router-dom";
import Navbar from "../shared/Navbar";


const Layout = () => {
    return (
        <div>
            <Navbar  ></Navbar>
            <Outlet></Outlet>
        </div>
    );
};

export default Layout;