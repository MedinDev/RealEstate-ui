import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "../node_modules/bootstrap/dist/js/bootstrap.min.js";
import AddHouse from "./components/house/AddHouse.jsx";
import {Route, Router, Routes} from "react-router-dom";
import Header from "./components/layout/Header.jsx";
import ExistingHouses from "./components/house/ExistingHouses.jsx";
import EditHouse from "./components/house/EditHouse.jsx";
import Home from "./components/home/Home.jsx";

const App = () => {
    return (
        <Router>
            <Header/>
            <Routes>
                <Route path="/" element={<Home/>}/>
                <Route path="/add-house" element={<AddHouse/>}/>
                <Route path="/edit-house/:houseId" element={<EditHouse/>}/>
                <Route path="/existing-houses" element={<ExistingHouses/>}/>
            </Routes>

        </Router>
    );
};

export default App;