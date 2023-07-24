import Layout from "@/components/Layout";
import {useEffect, useState} from "react";
import axios from "axios";
import Spinner from "@/components/Spinner";
import {withSwal} from "react-sweetalert2";

function SettingsPage({swal}) {
  const [logements, setLogements] = useState([]);
  const [featuredLogementId, setFeaturedLogementId] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [shippingFee, setShippingFee] = useState('');

  useEffect(() => {
    setIsLoading(true);
    fetchAll().then(() => {
      setIsLoading(false);
    });
  }, []);

  async function fetchAll() {
    await axios.get('/api/logements').then(res => {
      setLogements(res.data);
    });
    await axios.get('/api/settings?name=featuredLogementId').then(res => {
      console.log(res);
      setFeaturedLogementId(res.data?.value);
    });
    await axios.get('/api/settings?name=shippingFee').then(res => {
      setShippingFee(res.data?.value);
    });
  }

  async function saveSettings() {
    setIsLoading(true);
    console.log(featuredLogementId)
    await axios.put('/api/settings', {
      name: 'featuredLogementId',
      value: featuredLogementId,
    });
    await axios.put('/api/settings', {
      name: 'shippingFee',
      value: shippingFee,
    });
    setIsLoading(false);
    await swal.fire({
      title: 'Settings saved!',
      icon: 'success',
    });
  }

  return (
    <Layout>
      <h1>Settings</h1>
      {isLoading && (
        <Spinner />
      )}
      {!isLoading && (
        <>
          <label>Featured logement</label>
          <select value={featuredLogementId} onChange={ev => setFeaturedLogementId(ev.target.value)}>
            <option value=""> Select logement feature </option>
            {logements.length > 0 && logements.map((logement, i) => (
              <option value={logement._id} key={i}>{logement.name_resident
              } {logement.type_apartment }</option>
            ))}
          </select>
          <label>Shipping price (in usd)</label>
          <input type="number"
                 value={shippingFee}
                 onChange={ev => setShippingFee(ev.target.value)}
          />
          <div>
            <button onClick={saveSettings} className="btn-primary">Save settings</button>
          </div>
        </>
      )}
    </Layout>
  );
}

export default withSwal(({swal}) => (
  <SettingsPage swal={swal} />
));