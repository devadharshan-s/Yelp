import React, {useContext, useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import {RestaurantsContext} from "../Context/RestaurantContext";
import Restaurantfinder from "../api/Restaurantfinder";

const  UpdateRestaurant = () => {
    let navigate = useNavigate()
    const {id} = useParams();
    const {restaurants} = useContext(RestaurantsContext);
    const [name, setName] = useState("");
    const [location, setLocation] = useState("");
    const [priceRange, setPriceRange] = useState("");

    useEffect(() => {
        const  fetchData = async () => {
            const response = await Restaurantfinder.get(`/${id}`);
            console.log(response.data);
            setName(response.data.restaurant.name)
            setLocation(response.data.restaurant.location)
            setPriceRange(response.data.restaurant.price_range)
        };

        fetchData();
    },[]);

    const handleSubmit = async (e) => {
        e.preventDefault()
        const updatedRestaurant = await Restaurantfinder.put(`/${id}`,{
            name,
            location,
            price_range: priceRange,
        });
        console.log(updatedRestaurant);
        navigate(-1);
     }

    return(
        <div>
            {/*<h1>{restaurants[0].name}</h1>*/}
            <form action ="">
                <div className="form-group">
                    <label htmlFor="name">Name</label>
                    <input value={name} onChange={e => setName(e.target.value)} id="name" className="form-control" type="text"></input>
                </div>
                <div className="form-group">
                    <label htmlFor="location">Location</label>
                    <input value={location} onChange={e => setLocation(e.target.value)} id="location" className="form-control" type="text"></input>
                </div>
                <div className="form-group">
                    <label htmlFor="price_range">Price Range</label>
                    <input value={priceRange} onChange={e => setPriceRange(e.target.value)} id="price_range" className="form-control" type="number"></input>
                </div>
                <center>
                <button onClick={handleSubmit} className="btn btn-primary">Submit</button>
                </center>
            </form>
        </div>
    )
}

export default UpdateRestaurant;