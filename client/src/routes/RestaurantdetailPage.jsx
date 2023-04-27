import React, {useContext, useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import Restaurantfinder from "../api/Restaurantfinder";
import {RestaurantsContext} from "../Context/RestaurantContext";
import StarRating from "../Components/StarRating";
import Reviews from "../Components/Reviews";
import AddReview from "../Components/AddReview";

const RestaurantdetailPage = () => {
    const {id} = useParams();
    const { selectedRestaurant, setSelectedRestaurant} = useContext(RestaurantsContext);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await Restaurantfinder.get(`/${id}`)
                console.log(response);
                //console.log(response.data.reviews);
                setSelectedRestaurant(response.data);
            }
            catch(e) {
                console.log(e);
            }
    };
        fetchData();
    }, []);

    return(
        <div>
            {selectedRestaurant && (
                <>
                    <h1 className="text-center display-1">{selectedRestaurant.restaurant.name}</h1>
                    <h1 className="text-center"><StarRating rating={selectedRestaurant.restaurant.average_rating}/></h1>
                    <div className="text-warning text-center">
                            {selectedRestaurant.restaurant.count
                                ? `(${selectedRestaurant.restaurant.count})`
                                :"(0)"}
                    </div>
                    <div className="mt-3">
                        <Reviews reviews={selectedRestaurant.reviews}/>
                        <AddReview/>
                    </div>
                </>
            )}
        </div>
    )
};

export default RestaurantdetailPage;