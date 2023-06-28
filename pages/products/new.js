import ProductForm from "@/components/ProductForm";
import Layout from "@/components/Layout";
import React, { useEffect, useState } from "react";


function NewProduct() {
  return (
    <Layout>
      <div>newproduct</div>
      <ProductForm />
    </Layout>
  )
}

export default NewProduct