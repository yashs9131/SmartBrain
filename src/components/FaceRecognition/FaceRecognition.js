import React from "react";
import './FaceRecognition.css';

const FaceRecognition = ({imageUrl, box}) => {
    return (
        <div className="center">
            <div className="image-box absolute mt3">
                <img 
                // src="https://th.bing.com/th/id/OIP.121zvLGMUx8F-pPrZQtyWQHaFu?pid=ImgDet&rs=1"
                src={imageUrl}
                id="input-image" alt="" width="500px" height="auto"/>
                <div className="bounding-box" style={{ top: box.topRow, right: box.rightCol, bottom: box.bottomRow, left: box.leftCol }}></div>
            </div>
        </div>
    )

}



export default FaceRecognition;