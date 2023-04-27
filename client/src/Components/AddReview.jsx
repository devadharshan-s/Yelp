import React, {useState} from "react";
import Restaurantfinder from "../api/Restaurantfinder";
import {useLocation, useNavigate, useParams} from "react-router-dom";

const AddReview = () => {
    const {id} = useParams();
    const navigate = useNavigate();
    const location = useLocation();
    const [name,setName] = useState("")
    const [reviewText,setReviewtext] = useState("")
    const [rating,setRating] = useState("Rating")

    const handleSubmitReview = async (e) => {
        e.preventDefault()
        try {
            const response = await Restaurantfinder.post(`/${id}/addReview`, {
                name,
                review: reviewText,
                rating
            });
            navigate("/");
            navigate(location.pathname);
        }
        catch (e){
            console.log(e);
        }
    };

    return (
        <div className="mb-2">
            <form action="">
                    <div className="form-row">
                        <div className="form-group col-8">
                            <label htmlFor="name">Name</label>
                            <input
                                value={name}
                                onChange={e => setName(e.target.value)}
                                id="name" placeholder="name" type="text" className="form-control"/>
                        </div>
                        <div className="form-group col-4">
                            <label htmlFor="rating">Rating</label>
                            <select value={rating}
                                    onChange={e => setRating(e.target.value)}
                                    id="rating" className="custom-select">
                                <option disabled>Rating</option>
                                <option value="1">1</option>
                                <option value="2">2</option>
                                <option value="3">3</option>
                                <option value="4">4</option>
                                <option value="5">5</option>
                            </select>
                        </div>
                </div>
                <div className="form-group">
                    <label htmlFor="Review">Review</label>
                    <textarea
                        value={reviewText} onChange={e => setReviewtext(e.target.value)} id ="Review" className="form-control"></textarea>
                </div>
                <button type="submit" onClick={handleSubmitReview} className="btn btn-primary">Submit</button>
            </form>
        </div>
    );
}

export default AddReview;