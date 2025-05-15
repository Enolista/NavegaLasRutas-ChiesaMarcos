import React from 'react';
import { Link } from 'react-router-dom';

const EmptyCart = () => {
  return (
    <div className="container d-flex flex-column align-items-center justify-content-center text-center" style={{ height: '70vh' }}>
      <h1 className="display-5 mb-3">🙀 Tu carrito está vacío</h1>
        <img
            src="../gatitoasustado.jpg"
            alt="Gatito oh nooo"
            className="img-fluid rounded mx-auto d-block mt-3"
            style={{ maxWidth: '300px', objectFit: 'contain' }}
        />
      <h2 className="mb-4">¡Aún no has agregado productos a tu carrito!</h2>
      <h4 className="mb-4">¡Te invitamos a seguir viendo nuestro catálogo!</h4>
      <Link to='/' className='btn btn-primary btn-lg'>
        Ir a Inicio
      </Link>
    </div>
  );
};

export default EmptyCart;
