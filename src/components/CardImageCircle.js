import { urlApi } from "../config/config";

import { Card } from "react-bootstrap";
const style_highLightStory = {
    borderRadius: '50%',
    width: '5rem',
    height: '5rem',
    border: `2px solid var(--color-border)`,
    padding: '2px',
    cursor:'pointer',
};
const style_story = {
    borderRadius: '50%',
    width: '6rem',
    height: '6rem',
    border: `2px solid red`,
    padding: '2px',
    cursor:'pointer',
};
function CardImageCircle({imgName, title, type}) {
    return (
        <Card style={{ 
            width: '8rem', 
            border: 'none',           
            margin: '0.5rem',
            maxWidth: '46%' }}>
            <Card.Img variant="top" 
                src={`${urlApi}/uploads/${imgName}`} 
                style={ type == 'highLightStory' ? style_highLightStory : style_story }/>
            <Card.Body style={{textAlign: "center"}}>
                <Card.Title>{title}</Card.Title>
            </Card.Body>
        </Card>
    )
};

export default CardImageCircle;