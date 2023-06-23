import Layout from "@/components/layout"

function NewProduct() {
  return (
    <Layout>
      <div>newproduct</div>
      <label>Name : </label>
      <input type="text" placeholder="product name" />
      <label>description : </label>
      <textarea placeholder="description">
        
      </textarea>
      <label>price : </label>
      <input type="number" />

      <button className="btn-primary"> Save </button>
    </Layout>
  )
}

export default NewProduct