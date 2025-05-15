import React, { useContext, useState } from 'react';
import { CartContext } from '../context/CartContext';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { db } from '../service/firebase';

const Checkout = () => {
  const [buyer, setBuyer] = useState({});
  const [validateEmail, setValidateEmail] = useState('');
  const [orderId, setOrderId] = useState('');
  const { cart, clear, cartTotal } = useContext(CartContext); //Me traigo el contexto del carrito

  const buyerData = (e) => {
    setBuyer({
      ...buyer,
      [e.target.name]: e.target.value,
    });
  };
    //Quiero evitar que la aplicacion no se recargue
  //cuando se haga submit
  const finalizarCompra = (e) => {
    e.preventDefault();

    if (!buyer.name || !buyer.lastname || !buyer.email) {
      alert('⚠️ Todos los campos son requeridos');
    } else if (buyer.email !== validateEmail) {
      alert('❌ Los correos no coinciden');
    } else {
      const order = {
        comprador: buyer, //los datos del comprador
        compras: cart, //los productos del carrito
        total: cartTotal(), //el total a pagar
        date: serverTimestamp(), //fecha de la compra
      };

      const ventas = collection(db, 'orders');

      addDoc(ventas, order)
        .then((res) => {
          setOrderId(res.id);
          clear();
        })
        .catch((error) => console.log(error));
    }
  };

  return (
    <div className="container my-5">
      {orderId ? (
        <div className="alert alert-success text-center">
          <h2 className="mb-3">✅ ¡Compra realizada con éxito!</h2>
          <p>🧾 Tu número de orden es: <strong>{orderId}</strong></p>
          <p>Gracias por confiar en nosotros 💙</p>
          <img
            src="../gatitosfelices.png"
            alt="Gatitos felices"
            className="img-fluid rounded mx-auto d-block mt-3"
            style={{ maxWidth: '300px', objectFit: 'contain' }}
          />
        </div>
      ) : (
        <>
          <h1 className="text-center mb-4">🧍‍♀️ Completa tus datos para finalizar la compra</h1>
          <form onSubmit={finalizarCompra} className="row g-3 justify-content-center">
            <div className="col-md-4">
              <label className="form-label">Nombre</label>
              <input type="text" name="name" className="form-control" onChange={buyerData}  />
            </div>
            <div className="col-md-4">
              <label className="form-label">Apellido</label>
              <input type="text" name="lastname" className="form-control" onChange={buyerData}  />
            </div>
            <div className="col-md-4">
              <label className="form-label">Correo electrónico</label>
              <input type="email" name="email" className="form-control" onChange={buyerData}  />
            </div>
            <div className="col-md-4">
              <label className="form-label">Confirmar correo electrónico</label>
              <input
                type="email"
                name="second-email"
                className="form-control"
                //Asi no no guardo el segundo email en el state
                onChange={(e) => setValidateEmail(e.target.value)}
                required
              />
            </div>
            <div className="col-12 text-center mt-4">
              <button type="submit" className="btn btn-primary btn-lg">
                🛒 Finalizar compra
              </button>
            </div>
          </form>
        </>
      )}
    </div>
  );
};

export default Checkout;
