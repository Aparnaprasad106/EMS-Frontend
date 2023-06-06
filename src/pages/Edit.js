import React, { useContext, useEffect, useState } from 'react'
import { Alert, Button, Card, Form, Row } from 'react-bootstrap'
import Select from 'react-select'
import Loadingspinner from '../components/Loadingspinner'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { UpdateUser, empRegister, viewprofile } from '../services/allApis';
import {useNavigate, useParams} from 'react-router-dom'
import {editContext, registerContext} from '../components/ContextShare'
import { BASE_URL } from '../services/base_url';

function Edit() {

  // get editcontext
  const {editData,seteditData} = useContext(editContext)

  // get parameter from url
 const {id} = useParams()
 console.log(id);

//  state to hold existinng image from server
const [existingImg,setexistingImg] = useState("")

// get details of given id from server
const getuserprofile = async()=>{
  // call viewprofile of service
  const {data}=await viewprofile(id)
  setuserData(data);
  setstatus(data.status)
  setexistingImg(data.profile)
}

  // to get context
  const {registerData,setregisterData} = useContext(registerContext)

  // state tohold error msg
  const [errormsg,seterrormsg]=useState("")

  const navigate = useNavigate()
  // create state for set spinner
  const [showspinner,setshowspinner] = useState(true)
// dropdown options for activity status
  const options = [
    { value: 'Active', label: 'Active' },
    { value: 'InActive', label: 'InActive' },
  ]

  // create state to hold user input data
  const [userData,setuserData]=useState({
    fname:"",
    lname:"",
    email:"",
    mobile:"",
    gender:"",
    location:""
  })
  
  

  // create state for status
  const [status,setstatus]=useState("Active")

// create state to hold image
const [image,setimage] = useState("")

// create state to hold profile picture
const [preview,setpreview]=useState("")


  // to update userdata when user enter the input using html
  const userDetails = (e)=>{
    const {name,value} = e.target
    setuserData({...userData, [name]:value})
  }  

// to update status state
const updateState = (e)=>{
  setstatus(e.value)
}

// to updateimage
 const setProfile = (e)=>{
  setimage(e.target.files[0])
 }


// console.log(userData);
// console.log(status);
// console.log(image);
useEffect(()=>{
getuserprofile()
},[id])

  useEffect(()=>{
    if(image){
      setexistingImg("")
      // update preview image
      setpreview(URL.createObjectURL(image))
    }
    setTimeout(() => {
      setshowspinner(false)
    }, 2000);
  },[image])

  // defining register submission
  const handleSubmit=async (e)=>{
// prevent click event to stop reload
e.preventDefault()
// get user input data from form
const {fname,lname,email,mobile,gender,location} = userData
if(fname==="")
{
  toast.error('First Name requied...')

}else if(lname===""){
  toast.error('Last name required')
}else if(email===""){
  toast.error('Email required')
}else if(mobile===""){
  toast.error('Mobile Number required')
}else if(gender===""){
  toast.error('Gender required')
}else if(image===""){
  toast.error('Profile Picture required')
}else if(location===""){
  toast.error('Location required')
}
else{
  // make edit api call

  // headerconfig
  const headerConfig = {
    "Content-Type":"multipart/form-data"
  }

  // body - formData
  const data = new FormData()
  data.append("user_profile",image || existingImg)
  data.append("fname",fname)
  data.append("lname",lname)
  data.append("email",email)
  data.append("mobile",mobile)
  data.append("gender",gender)
  data.append("status",status)
  data.append("location",location)

  // api call
  const response = await UpdateUser(id,data,headerConfig)
  if(response.status===200){
    // reset all states

// share response data to other component via context
seteditData(response.data)
    // navigate to home page
      navigate('/')
  }
  else{
    seterrormsg("Error")
  }
}

  }

  return (
    <>
    {
      errormsg?<Alert variant='danger' className='bg-danger' onClose={()=>seterrormsg("")} dismissible>{errormsg}</Alert>:" "
    }
    
  {
    showspinner?(
      <div>
        <Loadingspinner />
      </div>
    ):
    (
      <div className="container mt-5">
         <h2 className='text-center mt-3'>Edit Employe Details</h2>
         <Card className='shadow mt-3 p-3'>
           <div className="text-center mb-3">
           <img
            className='rounded-circle border p-1'
             width={'70px'} 
             height={'70px'}
              src={preview?preview: `${BASE_URL}/uploads/${existingImg}`} alt="profile"
          />
           </div>
           <Form>
             <Row>
               <Form.Group className='col-lg-6 mb-3'>
               <Form.Label>First Name</Form.Label>
                   <Form.Control type="text"
                   required
                   name="fname"
                   onChange={userDetails}
                   value={userData.fname}
                    placeholder="Enter First Name" 
                    />
               </Form.Group>
               <Form.Group className='col-lg-6 mb-3'>
               <Form.Label>Last Name</Form.Label>
                   <Form.Control type="text"
                   required
                   name="lname"
                   onChange={userDetails}
                   value={userData.lname}
                    placeholder="Enter Last Name" 
                    />
               </Form.Group>
               {/* Address */}
               <Form.Group className='col-lg-6 mb-3'>
               <Form.Label>Email Address</Form.Label>
                   <Form.Control type="email"
                   required
                   name="email"
                   onChange={userDetails}
                   value={userData.email}
                    placeholder="Enter Email" 
                    />
               </Form.Group>
               {/* Mobile */}
               <Form.Group className='col-lg-6 mb-3'>
               <Form.Label>Mobile Number</Form.Label>
                   <Form.Control type="text"
                   required
                   name="mobile"
                   onChange={userDetails}
                   value={userData.mobile}
                    placeholder="Enter Mobile" 
                    />
               </Form.Group>
               {/* Gender */}
               <Form.Group className='col-lg-6 mb-3'>
               <Form.Label>Gender</Form.Label>
                   <Form.Check
                    type={'radio'}
                    label={'Male'}
                    name="gender"
                    value={"Male"}
                    checked={userData.gender==="Male"?true:false}
                    onChange={userDetails}
                    />
                    <Form.Check
                    type={'radio'}
                    label={'Female'}
                    name="gender"
                    value={"Female"}
                    checked={userData.gender==="Female"?true:false}
                    onChange={userDetails}
                    />
               </Form.Group>
               {/* Actions */}
               <Form.Group className='col-lg-6 mb-3'>
               <Form.Label>Enter Employee Status</Form.Label>
                   <Select className='text-dark' options={options} defaultInputValue={status} onChange={updateState} />
               </Form.Group>
               {/* upload photo */}
               <Form.Group className='col-lg-6 mb-3'>
               <Form.Label>Choose Profile Picture</Form.Label>
                   <Form.Control
                    type="file"
                   require
                   name='user_profile'
                   onChange={setProfile}
                    />
               </Form.Group>
               {/* Location */}
               <Form.Group className='col-lg-6 mb-3'>
               <Form.Label>Enter Employee Location</Form.Label>
                   <Form.Control type="text"
                   required
                   name="location"
                   onChange={userDetails}
                   value={userData.location}
                    placeholder="Employee location" 
                    />
               </Form.Group>
               {/* submitt button */}
               <Button  onClick={handleSubmit} className='btn btn-info mt-3'> Submit</Button>
   
             </Row>
           </Form>
           
         </Card>
       </div>
      
    )
  }
  <ToastContainer position='top-center'/>
    </>
  )
}

export default Edit