import React from 'react';
import NewProductForm from '../Components/NewProductForm';
import ProductsTable from '../Components/ProductsTable';

export default function Products() {
  return (
    <section>
      <h3 className="text-2xl font-semibold my-5">Add New Product</h3>

      <NewProductForm />
      <ProductsTable />
    </section>
  );
}
