import React from 'react';
import NewProductForm from '../Components/NewProductForm';
import ProductsTable from '../Components/ProductsTable';
import ErrorBox from '../Components/ErrorBox';

export default function Products() {
  return (
    <section>
      <h3 className="text-2xl font-semibold my-5">Add New Product</h3>

      <NewProductForm />

      <ErrorBox message={'No fucking product'} />
      <ProductsTable />
    </section>
  );
}
