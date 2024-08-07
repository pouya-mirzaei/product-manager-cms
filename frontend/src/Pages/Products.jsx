import React, { useEffect, useState } from 'react';
import NewProductForm from '../Components/NewProductForm';
import ProductsTable from '../Components/ProductsTable';
import ErrorBox from '../Components/ErrorBox';
import useNotification from '../hooks/useNotification';

export default function Products() {
  const [data, setData] = useState([]);
  const [pending, setPending] = useState(true);

  const toast = useNotification();

  const fetchData = () => {
    setPending(true);
    fetch('http://localhost:3000/api/products/')
      .then((res) => res.json())
      .then((res) => {
        res.map((p) => (p.key = p.id));

        console.log(res);
        setData(res);
        setTimeout(() => {
          setPending(false);
        }, 500);
      })
      .catch((err) => {
        setPending(false);
        setData([]);
        toast.createNotification('error', 'There was an error getting the products', err.message);
      });
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <section>
      <h3 className="text-2xl font-semibold my-5">Add New Product</h3>
      <NewProductForm />
      {!data.length && <ErrorBox message={'No fucking product'} />}
      <ProductsTable data={data} pending={pending} updateTable={fetchData} />
    </section>
  );
}
