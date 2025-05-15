import { useEffect, useState } from "react";
import ItemList from "./ItemList";
import { useParams } from 'react-router-dom';
import { addDoc, collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '../service/firebase';

const ItemListContainer = ({ greeting }) => {
  const [data, setData] = useState([]);
  const [loader, setLoader] = useState(false);
  const { categoryId } = useParams();

  useEffect(() => {
    setLoader(true);

    const productsCollection = categoryId
      ? query(collection(db, "productos"), where("category", "==", categoryId))
      : collection(db, "productos");

    getDocs(productsCollection)
      .then((res) => {
        const list = res.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setData(list);
      })
      .catch((error) => console.log(error))
      .finally(() => setLoader(false));
  }, [categoryId]);

  return (
    <div className="container my-5">
      {loader ? (
        <div className="d-flex justify-content-center align-items-center" style={{ height: '200px' }}>
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Cargando...</span>
          </div>
        </div>
      ) : (
        <>
          <h1 className="text-center mb-4">
            {greeting}{" "}
            {categoryId && (
              <span className="text-capitalize text-secondary"> {categoryId}</span>
            )}
          </h1>
          <ItemList data={data} />
        </>
      )}
    </div>
  );
};

export default ItemListContainer;
