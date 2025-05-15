import React, { useContext } from 'react';
import { CartContext } from '../context/CartContext';
import { Link } from 'react-router-dom';

const CartView = () => {
  const { cart, removeItem, clear, cartTotal } = useContext(CartContext);

  return (
    <div className="container my-5">
      <h1 className="mb-4 text-center">🛒 Tu Carrito</h1>

      {cart.length === 0 ? (
        <div className="alert alert-info text-center">
          Tu carrito está vacío. <Link to="/">Volver a la tienda</Link>
        </div>
      ) : (
        <>
          <div className="row g-4">
            {cart.map((compra) => (
              <div className="col-12" key={compra.id}>
                <div className="card p-3 shadow-sm">
                  <div className="row g-3 align-items-center">
                    <div className="col-md-2 text-center">
                      <img src={compra.img} alt={compra.name} className="img-fluid rounded" />
                    </div>
                    <div className="col-md-2">
                      <h5 className="mb-0">{compra.name}</h5>
                    </div>
                    <div className="col-md-2 text-center">
                      <span>Cantidad: <strong>{compra.quantity}</strong></span>
                    </div>
                    <div className="col-md-2 text-center">
                      <span>Precio: ${compra.price.toFixed(2)}</span>
                    </div>
                    <div className="col-md-2 text-center">
                      <span>Total: ${(compra.quantity * compra.price).toFixed(2)}</span>
                    </div>
                    <div className="col-md-2 text-center">
                      <button
                        className="btn btn-outline-danger btn-sm"
                        onClick={() => removeItem(compra.id)}
                        title="Eliminar producto"
                      >
                        🗑️
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-4 text-end">
            <h4>Total a pagar: <strong>${cartTotal().toFixed(2)}</strong></h4>
            <div className="mt-3 d-flex justify-content-end gap-2">
              <button className="btn btn-danger" onClick={clear}>
                Vaciar carrito
              </button>
              <Link to="/checkout" className="btn btn-success">
                Terminar compra
              </Link>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default CartView;
