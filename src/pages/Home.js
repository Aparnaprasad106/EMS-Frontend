import React, { useContext, useEffect, useState } from 'react'
import { Alert, Button, Form } from 'react-bootstrap'
import HomeTable from '../components/HomeTable'
import { useNavigate } from 'react-router-dom'
import Loadingspinner from '../components/Loadingspinner'
import {deleteContext, editContext, registerContext} from '../components/ContextShare'
import { getuserapi, removeuser } from '../services/allApis'


function Home() {

   // get editContext using usecontext
   const { editData,seteditData} = useContext(editContext)

  // get deleteContext using usecontext
  const {deleteData,setdeleteData} =useContext(deleteContext)

  // state to hold search data
  const [searchkey,setsearchkey]=useState("")
  // console.log(searchkey);

  // state to hold use all users
  const [allusers,setallusers] =useState([])

  // define function to call get users api
  const getuserDetails = async()=>{
    const serverResponse = await getuserapi(searchkey)
    // console.log(serverResponse);
    setallusers(serverResponse.data)
  }
  console.log(allusers);

  
  // define delete user
  const DeleteUser = async(id)=>{
    console.log('inside Delete Api'+id);
    // make api call to delete
    const res = await removeuser(id)
    console.log(res);
    if(res.status===200){
      // data successfully removed
      // pass response data to context
      setdeleteData(res.data)
      // call getuser api
      getuserDetails()
    }
    else{
      console.log('error');
    }
   }


  // get registerdata
  const {registerData,setregisterData} = useContext(registerContext)

  // create state to display spinner
const [showspin,Setshowspin] = useState(true)

const navigate = useNavigate()
  // to redirect to register page when button click
  const addUser = ()=>{
    // navigate to register - useNavigate() methode
    navigate('/register')
  }

useEffect(()=>{
  // call getuser api
  getuserDetails()
  setTimeout(() => {
    Setshowspin(false)
  }, 2000);
},[searchkey])
  return (
   <>
   {
    registerData?<Alert className='bg-success' variant='success' onClose={()=>setregisterData("")} dismissible>{registerData.fname.toUpperCase()} successfully registerd</Alert>:""
   }
   {
    editData?<Alert className='bg-success' variant='success' onClose={()=>seteditData("")} dismissible>{editData.fname.toUpperCase()} successfully Updated!!..</Alert>:""
   }
   {
    deleteData?<Alert className='bg-danger' variant='danger' onClose={()=>setdeleteData("")} dismissible>{deleteData.fname.toUpperCase()} successfully Deleted!!</Alert>:""
   }
    <div className='container mt-5'>
      <div className="first_div">
        {/* search add btn */}
        <div className="search_add d-flex justify-content-between">
          {/* search */}
          <div className="search col-md-5">
            <Form className='d-flex'>
            <Form.Control
            required
             type="text" 
             placeholder="Search Employee Name Here"
             onChange={e=>setsearchkey(e.target.value)}
             /> 
             <Button className='ms-2' variant='success'>Search</Button>
            </Form>
          </div>
          {/* add btn */}
          <div className="add">
            <button onClick={addUser} className='btn btn-info'>
              <i className="fa-solid fa-user-plus fa-fade me-1"></i>Add
              </button>
          </div>
        </div>
      </div>
      <div className="sec_div">

       {
        showspin?( 
        <div>
          <Loadingspinner /> 
       </div>):(
       <div>
        {/* table */}
        <HomeTable displayData={allusers}
         handleDelete = {DeleteUser}
         />
       </div>
       )}
      </div>

    </div>
   </>
  )
}

export default Home