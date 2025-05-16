import React, { useContext, useState } from 'react'
import ItemCount from './ItemCount'
import { CartContext } from '../context/CartContext'
import { Link } from 'react-router-dom'
import Swal from 'sweetalert2'

const ItemDetail = ({ productDetail }) => {
  const [purchase, setPurchase] = useState(false)
  const { addToCart } = useContext(CartContext)

  const onAdd = (cantidad) => {
    addToCart(productDetail, cantidad)
    setPurchase(true)
    Swal.fire({
      position: 'top-end',
      icon: 'success',
      title: `Agregaste ${cantidad} ${productDetail.name} al carrito`,
      showConfirmButton: false,
      timer: 1500
    })
  }

  return (
    <div className="container my-5">
      <div className="card p-4 shadow">
        <div className="row g-4 align-items-center">
          <div className="col-md-5 text-center">
            <img
              src={productDetail.img}
              alt={productDetail.name}
              className="img-fluid rounded"
              style={{ maxHeight: '300px', objectFit: 'contain' }}
            />
          </div>
          <div className="col-md-7">
            <h2 className="mb-3">{productDetail.name}</h2>
            <p className="text-muted">{productDetail.description}</p>
            <h4 className="text-primary">Precio: ${productDetail.price},00</h4>
            <p>Stock disponible: {productDetail.stock}</p>

            <div className="mt-4 d-flex gap-3">
              {purchase ? (
                <>
                  <Link className="btn btn-success" to="/cart">
                    ✅ Ir al carrito
                  </Link>
                  <Link className="btn btn-outline-primary" to="/">
                    🛍️ Seguir comprando
                  </Link>
                </>
              ) : (
                <ItemCount stock={productDetail.stock} onAdd={onAdd} />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ItemDetail
