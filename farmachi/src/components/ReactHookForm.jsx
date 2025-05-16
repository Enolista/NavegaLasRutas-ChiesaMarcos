import React, { useContext, useState } from 'react'
import { Link } from 'react-router-dom'
import { set, useForm } from 'react-hook-form'
import { CartContext } from '../context/CartContext'
import { addDoc, collection, serverTimestamp, doc, getDoc, updateDoc } from 'firebase/firestore'
import { db } from '../service/firebase'

const ReactHookForm = () => {
const [orderId, setOrderId] = useState('')
const [loading, setLoading] = useState(false)
//destructurando para obtener el objeto de errores y los valores del formulario
const {register, handleSubmit, formState:{errors}, getValues} = useForm()  
const {cart,cartTotal, clear}=useContext(CartContext)
const finalizarCompra = (dataDelForm) => {
    setLoading(true)
    let order ={
        comprador:{
            name: dataDelForm.name,
            lastname: dataDelForm.lastname,
            address: dataDelForm.address,
            email: dataDelForm.email,
        },
        compras: cart,
        toral: cartTotal(),
        fecha:serverTimestamp()
    }

    const ventas = collection(db, 'orders')
    addDoc(ventas, order)
    .then((res)=>{

        cart.forEach((item)=>{
            const docRef = doc(db, 'productos', item.id)
            getDoc(docRef)
            .then((dbDoc)=>{
                updateDoc(docRef, {stock: dbDoc.data().stock - item.quantity})
                })
                .catch((error)=>console.log(error))
        })
        setOrderId(res.id)
        clear()
    })
    .catch((error)=>console.log(error))
    .finally(()=>setLoading(false))
  }
    if(loading) {
     return   <div className="d-flex justify-content-center align-items-center" style={{ height: '200px' }}>
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Cargando...</span>
          </div>
        </div>
    }


  return (
    <div className="container my-5">
      {
        orderId ? (
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
            <Link className='btn btn-dark mt-3' to='/'>Volver a Inicio</Link>
          </div>
        ) : (
          <div>          
            <h1 className="text-center mb-4">🧍‍♀️ Completa tus datos para finalizar la compra</h1>
            <form onSubmit={handleSubmit(finalizarCompra)} className="row g-3 justify-content-center">
              <input className='form-control' name='name' placeholder='Ingrese nombre' type='text'{...register("name",{required:true,minlength:3})} />
                {errors.name?.type === 'required' && <span style={{color:'red'}} >El campo nombre es obligatorio</span>}
                {errors.name?.type === 'minlength' && <span style={{color:'red'}} >El nombre debe contener al menos 3 caracteres</span>}
              <input className='form-control' name='lastname' placeholder='Ingrese apellido' type='text' {...register("lastname",{required:true,minlength:3})} />
                {errors.lastname?.type === 'required' && <span style={{color:'red'}} >El campo apellido es obligatorio</span>}
                {errors.lastname?.type === 'minlength' && <span style={{color:'red'}} >El apèllido debe contener al menos 3 caracteres</span>}
              <input className='form-control' name='address' placeholder='Ingrese su dirección' type='text' {...register("address",{required:true,minlength:15, maxLength:50})} />
                {errors.address?.type === 'required' && <span style={{color:'red'}} >El campo dirección es obligatorio</span>}
                {errors.address?.type === 'minlength' && <span style={{color:'red'}} >El direccion debe contener al menos 15 caracteres</span>}
                {errors.address?.type === 'maxlength' && <span style={{color:'red'}} >El direccion debe contener un máximo de 50 caracteres</span>}
              <input className='form-control' name='email' placeholder='Ingrese su correo' type='email' {...register("email",{required:true})} />
                {errors.email?.type === 'required' && <span style={{color:'red'}} >Debe completar una dirección de correo electónico</span>}
              <input className='form-control' name='secondemail' placeholder='Repita su correo' type='email'{...register("secondemail",{required:true, validate:{equalsMails: mail2 => mail2 === getValues().email}})} />
                {errors.secondemail?.type === 'required' && <span style={{color:'red'}} >Debe completar neuvamente el correo electónico</span>}
                {errors.secondemail?.type === 'equalsMails' && <span style={{color:'red'}} >Los correos electrónicos son diferentes</span>}
              <button type="submit" className="btn btn-primary btn-lg">
                🛒 Finalizar compra
              </button>
            </form>
          </div>
        )
      }
    </div>
  )
}

export default ReactHookForm
