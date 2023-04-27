import React from 'react';
import {BrowserRouter as Router, Routes, Route} from "react-router-dom"
import Home from "./routes/Home";
import UpdatePage from "./routes/UpdatePage";
import RestaurantdetailPage from "./routes/RestaurantdetailPage";
import {RestaurantsContextProvider} from "./Context/RestaurantContext";

const app = () => {
    return(
        <RestaurantsContextProvider>
        <div className="container">
            <Router>
                <Routes>
                    <Route exact path="/" element={<Home/>}/>
                    <Route exact path="/restaurants/:id" element={<RestaurantdetailPage/>}/>
                    <Route exact path="/restaurants/:id/update" element={<UpdatePage/>}/>
                </Routes>
            </Router>
        </div>
        </RestaurantsContextProvider>
    );
}

export default app;