import { urlApi } from "../config/config";
import '../assets/css/CardImage.css'

import { Card, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { BsChatLeft } from "react-icons/bs";
import { AiOutlineHeart } from 'react-icons/ai';
import { useState } from "react";

function CardImageHover({imgName, quantityLike, quantityComment}) {
    const [isShowIcon, setIsShowIcon] = useState(false);

    const handleMouseOver = () => {
        setIsShowIcon(true);
    };

    const handleMouseLeave = () => {
        setIsShowIcon(false);
    };

    return (
        <Card className="card_image_hover"
            onMouseOver={handleMouseOver}
            onMouseLeave={handleMouseLeave}
        >
            <Card.Img variant="top" 
                src={`${urlApi}/uploads/${imgName}`}
                className={isShowIcon ? "card_image_hover-img" : ''}

            />
            {isShowIcon && (
                <div className="card_image_hover-icons">
                    <div>
                        {quantityLike}
                        <AiOutlineHeart className="card_image_hover-icon" />
                    </div>
                    <div>
                        {quantityComment}
                        <BsChatLeft className="card_image_hover-icon" />
                    </div>
                </div>
            )}
        </Card>
    )
};

export default CardImageHover;
