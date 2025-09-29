import React, { useEffect } from 'react';
import Pasta_Image from '../assets/Pasta_Image.png';
import Burger_Image from '../assets/Burger_Image.png';
import Indian_cuisine from '../assets/Indian_cuisine.png';

function Carousel() {
    useEffect(() => {
        // Load Bootstrap CSS
        const bootstrapCSS = document.createElement('link');
        bootstrapCSS.rel = 'stylesheet';
        bootstrapCSS.href = 'https://cdnjs.cloudflare.com/ajax/libs/bootstrap/5.3.0/css/bootstrap.min.css';
        bootstrapCSS.id = 'bootstrap-css';
        if (!document.getElementById('bootstrap-css')) {
            document.head.appendChild(bootstrapCSS);
        }

        // Load Bootstrap JS
        const bootstrapJS = document.createElement('script');
        bootstrapJS.src = 'https://cdnjs.cloudflare.com/ajax/libs/bootstrap/5.3.0/js/bootstrap.bundle.min.js';
        bootstrapJS.id = 'bootstrap-js';
        if (!document.getElementById('bootstrap-js')) {
            document.head.appendChild(bootstrapJS);
        }
    }, []);

    return (
        <div id="carouselExampleAutoplaying" className="carousel slide h-full" data-bs-ride="carousel">
            <div className="carousel-inner h-full">
                <div className="carousel-item active h-full">
                    <img src={Pasta_Image} className="d-block w-100 h-100" alt="image1" style={{ objectFit: 'cover' }} />
                </div>
                <div className="carousel-item h-full">
                    <img src={Burger_Image} className="d-block w-100 h-100" alt="image2" style={{ objectFit: 'cover' }} />
                </div>
                <div className="carousel-item h-full">
                    <img src={Indian_cuisine} className="d-block w-100 h-100" alt="image3" style={{ objectFit: 'cover' }} />
                </div>
            </div>
            <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleAutoplaying" data-bs-slide="prev">
                <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                <span className="visually-hidden">Previous</span>
            </button>
            <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleAutoplaying" data-bs-slide="next">
                <span className="carousel-control-next-icon" aria-hidden="true"></span>
                <span className="visually-hidden">Next</span>
            </button>
        </div>
    );
}

export default Carousel;