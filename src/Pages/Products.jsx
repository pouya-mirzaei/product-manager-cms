import React from 'react';
import ErrorBox from '../Components/ErrorBox';
import NewProductForm from '../Components/NewProductForm';

export default function Products() {
  return (
    <section>
      <h3 className="text-2xl font-semibold my-5">Add New Product</h3>

      <NewProductForm />
    </section>
  );
}
