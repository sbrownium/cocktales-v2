import React from "react";

export default function XIcon ({
    width,
    height,
    fillColor
}) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={width}
            height={height}
            fill={fillColor}
            viewBox="0 0 75 75"
        >
           <path
                class="#F3D38D"
                d="M75,72.6L72.6,75L37.5,39.9L2.4,75L0,72.6l35.1-35.1L0,2.4L2.4,0l35.1,35.1L72.6,0L75,2.4L39.9,37.5L75,72.6z"
	        /> 
        </svg>
    )
}