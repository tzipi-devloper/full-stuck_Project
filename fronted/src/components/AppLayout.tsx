import { Outlet } from "react-router-dom"
import Navbar from './Navbar'
import Footer from "./Footer";
const AppLayout = () => {
    return (
        <div>
            <Navbar/>
            <Outlet/>
        </div>
    )
}
export default AppLayout;
