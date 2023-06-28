import Layout from '@/components/Layout'
import axios, { AxiosHeaders } from 'axios';
import { useEffect, useState } from 'react';
import {withSwal} from 'react-sweetalert2';

function Categories({swal}) {

    const [categoryToEdit, setCategoryToEdit] = useState(null)
    const [name,setName] = useState('');
    const[parentCategory, setparentCategory] = useState('')
    const[categories, setCategories] = useState([]);
    const[properties, setProperties] = useState([])

    async function saveCategory(ev)
    {
        ev.preventDefault();
        const data = {name, 
            parentCategory, 
            properties: properties.map(p => ({
                name: p.name,
                values: p.values.split(',')
            }))
        }
        if (categoryToEdit) {
            data._id = categoryToEdit?._id;
            await axios.put('/api/categories', data)
            setCategoryToEdit(null)
            setName('');
            setparentCategory('');
            setProperties([])
        } else {
            await axios.post('/api/categories', data);
            setName(name);
        }
        fetchCategories();
    }

    function fetchCategories()
    {
        axios.get('/api/categories').then(response => {
            setCategories(response.data);
        });
    }

    function editCategory(category)
    {
        setCategoryToEdit(category);
        setName(category.name);
        setparentCategory(category.parent?._id || '');
        setProperties(
            category.properties.map(({name,values}) => ({
            name,
            values:values.join(',')
          }))
        );
    }

    function deleteCategory(category)
    {
        swal.fire({
            title: 'Do you want to Delete this catogory?',
            showCancelButton: true,
            confirmButtonText: 'Delete',
        }).then((result) => {
            /* Read more about isConfirmed, isDenied below */
            if (result.isConfirmed) {
                axios.delete('/api/categories?_id=' + category._id).then(response => {
                    if (response.data) {
                        swal.fire('Deleted!', '', 'success')
                    }
                })
            } else if (result.isDenied) {

                swal.fire('Changes are not saved', '', 'info')
            }
            fetchCategories();
        })
    }

    function addProperty () {
        setProperties(prev => {
            return [...prev, {name:'',values:''}];
        })
    }

    function removeProperty(indexToRemove) {
        setProperties(prev => {
          return [...prev].filter((p,pIndex) => {
            return pIndex !== indexToRemove;
          });
        });
      }

    function handlePropertyNameChange(index, property, newName) {
        setProperties(prev => {
            const properties = [...prev];
            properties[index].name = newName;
            return properties;
        })
    }

    function handlePropertyValuesChange (index, property, newValues)
    {
        setProperties(prev => {
            const properties = [...prev];
            properties[index].values = newValues;
            return properties;
        })
    }

    useEffect(() => {
        fetchCategories();
    }, []);
    return (
        <Layout>
            <h1>Categories</h1>

            <label>{categoryToEdit ? `Edit category ${categoryToEdit.name}` : 'New categories name'}</label>
            <form onSubmit={saveCategory} >
                <div className='flex gap-1'>
                    <input type="text" 
                    placeholder={'Category name'} 
                    className='mb-0' 
                    value={name}
                    onChange={ev => setName(ev.target.value)}
                    />
                    <select 
                        className='mb-0'
                        value={parentCategory}
                        onChange={ev => { return setparentCategory(ev.target.value)}}
                    >
                        <option value="">No Category Parent</option>
                        {
                            categories.map(category => (
                                <option key={category._d} value={category._id}> {category.name} </option>
                            ))
                        }
                    </select>
                </div>
                <div className="mb-2">
                    <label className="block">Properties</label>
                    <button
                        onClick={addProperty}
                        type="button"
                        className="btn-default text-sm mb-2">
                        Add new property
                    </button>
                </div>
                <div>
                    {
                        properties.length > 0 && properties.map((property, index) => (
                            <div key={index} className='flex gap-1'>
                                <input type="text"
                                        value={property.name}
                                        className="mb-0"
                                        onChange={ev => handlePropertyNameChange(index,property,ev.target.value)}
                                        placeholder="property name (example: color)"/>
                                <input type="text"
                                        className="mb-0"
                                        onChange={ev =>
                                        handlePropertyValuesChange(
                                            index,
                                            property,ev.target.value
                                        )}
                                        value={property.values}
                                        placeholder="values, comma separated"/>
                                <button
                                    onClick={() => removeProperty(index)}
                                    type="button"
                                    className="btn-red">
                                    Remove
                                </button>
                            </div>
                        ))
                    }
                </div>
                
                    <button className='btn-primary py-1'>Save</button>
            </form>

            <table className='basic mt-2'>
                <thead>
                    <tr>
                        <td>Name</td>
                        <td>Parent</td>
                        <td></td>
                        <td></td>
                    </tr>
                </thead>
                <tbody>
                    { categories.map(category => (
                        <tr key={category._id}>
                            <td>{category.name}</td>
                            <td>{category?.parent?.name}</td>
                            <td>
                                <button className='btn-primary mr-1 rounded-md' onClick={() => editCategory(category)}>Edit</button>
                                <button className='btn-primary rounded-md' onClick={() => deleteCategory(category)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </Layout>
    );
}

export default withSwal(({swal}, ref) => {
    return <Categories  swal={swal} />
});

