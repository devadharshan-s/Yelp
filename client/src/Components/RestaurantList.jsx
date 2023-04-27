import React, {useContext, useEffect} from "react";
import Header from "./Header";
import {useNavigate} from "react-router-dom";
import Restaurantfinder from "../api/Restaurantfinder";
import {RestaurantsContext} from "../Context/RestaurantContext";
import StarRating from "./StarRating";

//Fetches from backend.
const RestaurantList = (props) => {
    const {restaurants, setRestaurants} = useContext(RestaurantsContext);
    let history = useNavigate();
    useEffect(() =>{
        const fetchData = async () =>{
            try {
                const response = await Restaurantfinder.get("/")
                setRestaurants(response.data.restaurants);
                console.log(response);
            } catch (e) {
                console.log(e);
             }
        };
          fetchData();
     },[]);

    const handleDelete = async (event,id) =>{
        event.stopPropagation()
        try{
            const response = await Restaurantfinder.delete(`/${id}`);
            setRestaurants(restaurants.filter(restaurant => {
                return restaurant.id !== id
            }))
            console.log(response);
        }
        catch(e){
            console.log(e);
        }
    }
    const handleUpdate = async  (event,id) => {
        event.stopPropagation();
        history(`/restaurants/${id}/update`);
    }

    const handleRestaurantSelect = (id) => {
        history(`/restaurants/${id}`);
    }

    const renderRating = (restaurant) => {
        if(!restaurant.count){
            return <span className="text-warning">0 reviews</span>
        }
        return(
            <>
                <StarRating rating={restaurant.id}/>
                <span className="text-warning ml-1">({restaurant.count})</span>
            </>
        );
    };
    return(
        <div className="list-group">
            <table className="table table-hover table-dark">
                <thead>
                <tr className="bg-primary">
                    <th scope="col" className="bg-primary">Restaurant</th>
                    <th scope="col" className="bg-primary">Location</th>
                    <th scope="col" className="bg-primary">Price Range</th>
                    <th scope="col" className="bg-primary">Ratings</th>
                    <th scope="col" className="bg-primary">Edit</th>
                    <th scope="col" className="bg-primary">Delete</th>
                </tr>
                </thead>
                <tbody>
                {restaurants && restaurants.map((restaurant) => {
                    return (
                        <tr onClick={() => handleRestaurantSelect(restaurant.id)} key={restaurant.id}>
                            <td>{restaurant.name}</td>
                            <td>{restaurant.location}</td>
                            <td>{"$".repeat(restaurant.price_range)}</td>
                            <td>{renderRating(restaurant)}</td>
                            <td>
                                <button onClick={(event) => handleUpdate(event,restaurant.id)} className = "btn btn-warning">Update</button>
                            </td>
                            <td>
                                <button onClick={(event) => handleDelete(event,restaurant.id)} className = "btn btn-danger">Delete</button>
                            </td>
                        </tr>
                    );
                })}
                </tbody>
            </table>
        </div>

    );
};

export default RestaurantList;