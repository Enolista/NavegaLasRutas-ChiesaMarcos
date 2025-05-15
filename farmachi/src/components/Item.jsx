import React from 'react';
import { Link } from 'react-router-dom';

const Item = ({ producto }) => {
  return (
    <div className="col-md-4 mb-4 d-flex justify-content-center">
      <div className="card shadow-sm" style={{ width: '18rem' }}>
        <img
          src={producto.img}
          alt={producto.name}
          className="card-img-top"
          style={{ height: '200px', objectFit: 'contain', padding: '10px' }}
        />
        <div className="card-body d-flex flex-column justify-content-between">
          <h5 className="card-title text-center">{producto.name}</h5>
          <p className="card-text text-center text-primary fs-5">
            ${producto.price},00
          </p>
          <div className="d-grid">
            <Link className="btn btn-dark" to={`/item/${producto.id}`}>
              Ver más
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Item;
