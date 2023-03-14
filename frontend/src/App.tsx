import React from 'react';
import { ChangeEvent, useState, useEffect } from "react"
import axios from  "axios"

function App() {

  type Inputs = {
    name: string,
    age: number,
    email: string,
  }

  type Data  ={
    id: number,
    name: string,
    age: number,
    email: string,
  }

  const [ inputs, setInputs ] = useState<Inputs>({
    name: "",
    age: 0,
    email: ""
  })
  const [ data, setData ] = useState<Data[]>()

  const handleChange = (e: ChangeEvent<HTMLInputElement>):void => {
    const name = e.target.name
    const value = e.target.value
    setInputs((input) => ({
      ...input, [name]:value
    }))
  }

  const handleAdd = async () => {
    if(inputs.name != "" && inputs.age != 0 && inputs.email != ""){
      const res = await axios.post(`${process.env.REACT_APP_url}/addUser`, inputs)
      setData(res.data)
    } 
  }

  const handleDeleteAll = async () => {
    const res = await axios.delete(`${process.env.REACT_APP_url}/deleteAll`)
    if(res.data === "All records deleted Successfully"){
      getData()
    }
  }

  const handleEdit = async (id: number) => {
    const data = {
      id,
      name: inputs.name,
      age: inputs.age,
      email: inputs.email
    }
    const res = await axios.put(`${process.env.REACT_APP_url}/updateUser`, data)
    setData(res.data)
  }

  const handleDelete = async (id: number) => {
    const res = await axios.delete(`${process.env.REACT_APP_url}/deleteUser`, { data: {id}})
    setData(res.data)
  }

  const getData = async () => {
    const res = await axios.get(`${process.env.REACT_APP_url}`)
    console.log(res.data)
    setData(res.data)
  }

  useEffect(() => {
    getData()
  }, [])

  console.log(data)

  return (
   <div className='flex flex-col items-center mt-20'>
    <h1 className='text-4xl font-bold'>CRUD in MySQL and Typescript</h1>
    <div className='flex-row-reverse flex items-center w-full  mt-20'>
      <div className="relative overflow-y-auto w-full flex-1 mr-10 h-table">
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                    <th scope="col" className="px-6 py-3">
                        ID
                    </th>
                    <th scope="col" className="px-6 py-3">
                        Name
                    </th>
                    <th scope="col" className="px-6 py-3">
                        Age
                    </th>
                    <th scope="col" className="px-6 py-3">
                        Email
                    </th>
                    <th scope="col" className="px-6 py-3">
                        Edit
                    </th>
                    <th scope="col" className="px-6 py-3">
                        Delete
                    </th>
                </tr>
            </thead>
            { data && data.map((item) => {
              console.log(item)
              return(
                <tbody key={item.id}>
                  <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                      <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                          {item.id}
                      </th>
                      <td className="px-6 py-4">
                        {item.name}
                      </td>
                      <td className="px-6 py-4">
                        {item.age}
                      </td>
                      <td className="px-6 py-4">
                        {item.email}
                      </td>
                      <td className="px-6 py-4">
                          <button className=' bg-blue-500 w-20 text-white font-bold p-1 rounded-md' onClick={() => handleEdit(item.id)}>Edit</button>
                      </td>
                      <td className="px-6 py-4">
                        <button className=' bg-red-600 w-20 text-white font-bold p-1 rounded-md' onClick={() => handleDelete(item.id)}>Delete</button>
                      </td>
                  </tr>
                </tbody>
              )
            })}
        </table>
      </div>
   
      <div className='flex-1 flex flex-col items-center justify-center'>
        <input type="text" name="name" placeholder='name'  className='w-96 border-2 border-gray-400 outline-none p-2 mb-3' onChange={handleChange}/>
        <input type="number" name="age" placeholder='age' className='w-96 border-2 border-gray-400 outline-none p-2 mb-3' onChange={handleChange}/>
        <input type="text" name="email" placeholder='email' className='w-96 border-2 border-gray-400 outline-none p-2 mb-3' onChange={handleChange}/>
        <button className='mt-10 bg-green-400 w-40 text-xl font-bold p-1' onClick={handleAdd}>Add Record</button>
        <button className='mt-10 bg-red-500 w-52 text-xl font-bold p-1' onClick={handleDeleteAll}>Delete All Records</button>
      </div>
    </div>
   </div>
  )
}

export default App;
