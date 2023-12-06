import { urlApi } from "../config/config";
import axios from "../utils/axios";

import { Card,
Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { FiMapPin } from "react-icons/fi";
import { AiOutlineHeart, AiFillHeart} from 'react-icons/ai';
import { IoBookmark } from "react-icons/io5";
import { IoBookmarkOutline } from "react-icons/io5";
import { Image } from "antd";
import { useState } from "react";
function CardImage({imgName, title, address, statusLike, shopCoffeeId, statusSaved}) {

    const [StatusLike, setStatusLike] = useState(statusLike);
    const [StatusSaved, setStatusSaved] = useState(statusSaved);
    const handleLike = async () => {
        console.log(shopCoffeeId);
        await axios.post("/shopCoffee/likeShopCoffee", {shopCoffeeId})
        .then(res => {
            console.log(res);
            if(res.data.success) {
                setStatusLike(!StatusLike)
            }
        })
        .catch(err => {
            console.log(err);
        })
    }

    const handleSave = async () => {
        console.log(shopCoffeeId);
        await axios.post("/shopCoffee/saveShopCoffee", {shopCoffeeId})
        .then(res => {
            console.log(res);
            if(res.data.success) {
                setStatusSaved(!StatusSaved)
            }
        })
        .catch(err => {
            console.log(err);
        })
    }

    return (
        <Card style={{ 
            width: '20rem', 
            border: 'none',
            margin: '0.5rem',
            maxWidth: '46%',
            minWidth: '30%' }}>
            {/* <Card.Img variant="top" src={`${urlApi}/uploads/${imgName}`} /> */}
            <Image src={`${urlApi}/uploads/${imgName}`}
                                style={{margin: '0.4rem 0'}}
                            />
            <Card.Body style={{textAlign: "center"}}>
                <Link to={`/profile/${shopCoffeeId}`} className="link">
                    <Card.Title>{title}</Card.Title>
                </Link>
                <Card.Text>
                    <FiMapPin />
                    {address}
                </Card.Text>
                {StatusLike ? <AiFillHeart style={{color: 'red'}} onClick={handleLike}/> : <AiOutlineHeart onClick={handleLike}/>}   
                {StatusSaved ? <IoBookmark onClick={handleSave}/> : <IoBookmarkOutline onClick={handleSave}/>}                
            </Card.Body>
        </Card>
    )
};

export default CardImage;