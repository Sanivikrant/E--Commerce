import React from 'react'
import './Carousel.scss'
import {Link} from 'react-router-dom'
import { shortenText } from '../../utils'


const CarouselItem = ({url, name, price, description}) => {
  return (
    <div className='carouselItem'>
        <Link to="/product-details">
            <img className='product--image' src={url} alt="product" />
            <p className="price">
                {`Rs${price}`}
            </p>
            <h4>{shortenText(name, 18)}</h4>
            <p className="--mb">{shortenText(description, 18)}</p>
        </Link>
        <button className="--btn --btn-primary">
            Add To Cart
        </button>
    </div>
  )
}

export default CarouselItem