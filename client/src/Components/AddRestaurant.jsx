import React, {useContext, useState} from "react";
import Restaurantfinder from "../api/Restaurantfinder";
import Header from "./Header";
import {RestaurantsContext} from "../Context/RestaurantContext";

const AddRestaurant = () => {
    const {addRestaurants} = useContext(RestaurantsContext);
    const [name, setName] = useState("")
    const [location, setLocation] = useState("")
    const [priceRange, setPriceRange] = useState("Price Range")

    const handleSubmit = async (e) => {
        e.preventDefault()
        try{
            const response = await Restaurantfinder.post("/", {
                name,
                location,
                price_range: priceRange
            })
            addRestaurants(response.data.restaurants);
            console.log(response);
        }
        catch (e){
            console.log(e);
        }
    }
    return(
        <div className="mb-4">
            <center>
            <form action="">
                <div className="row">
                    <div className="col">
                        <input type={name} onChange={e => setName(e.target.value) } className="form-control" placeholder="name"/>
                    </div>
                    <div className="col">
                        <input type={location} onChange={e => setLocation(e.target.value) }className="form-control"  placeholder="location"/>
                    </div>
                    <div className="col">
                       <select value={priceRange} onChange={e => setPriceRange(e.target.value) }
                           className="custom-select my-1 mr-sm-2">
                           <option disabled>Price Range</option>
                           <option value="1">$</option>
                           <option value="2">$$</option>
                           <option value="3">$$$</option>
                           <option value="4">$$$$</option>
                           <option value="5">$$$$$</option>
                       </select>
                    </div>
                    <div className="col">
                    <button onClick={handleSubmit} className="btn btn-primary">Add</button>
                    </div>
                </div>
            </form>
            </center>
        </div>
    );
};

export default AddRestaurant;