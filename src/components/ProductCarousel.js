import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import Loader from './Loader'
import Message from './Message'
import { Carousel, Image } from 'react-bootstrap'
import { getTopRatedProducts } from '../actions/productActions'

const ProductCarousel = () => {
  const dispatch = useDispatch()
  const topRatedProducts = useSelector(state => state.topRatedProducts)
  const { loading, error, products = [] } = topRatedProducts // ✅ Ensure products is always an array

  useEffect(() => {
    dispatch(getTopRatedProducts())
  }, [dispatch])

  useEffect(() => {
    console.log("Products:", products) // ✅ Log after state updates
  }, [products])

  return loading ? (
    <Loader />
  ) : error ? (
    <Message variant='danger'>{error}</Message>
  ) : Array.isArray(products) && products.length > 0 ? ( // ✅ Explicit array check
    <Carousel pause='hover' className='bg-dark'>
      {products.map(product => (
        <Carousel.Item key={product._id}>
          <Link to={`/product/${product._id}`}>
            <Image src={product.image} fluid />
            <Carousel.Caption className='carousel-caption'>
              <h4>{product.name} (${product.price})</h4>
            </Carousel.Caption>
          </Link>
        </Carousel.Item>
      ))}
    </Carousel>
  ) : (
    <Message>No top-rated products available</Message> // ✅ Handles empty products case
  )
}

export default ProductCarousel
