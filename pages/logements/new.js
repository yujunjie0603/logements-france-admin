import Layout from "@/components/Layout";
import React, { useEffect, useState } from "react";
import LogementForm from "@/components/LogementForm";
function NewLogement() {
  return (
    <Layout>
      <div>new logement</div>
      <LogementForm />
    </Layout>
  )
}
export default NewLogement