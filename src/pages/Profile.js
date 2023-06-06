import React, { useEffect, useState } from 'react'
import { Card, Row } from 'react-bootstrap'
import Loadingspinner from '../components/Loadingspinner'
import {useParams} from 'react-router-dom'
import { viewprofile } from '../services/allApis'
import { BASE_URL } from '../services/base_url'

function Profile() {

  
// useParms() hook to get path parameter of route
const {id} = useParams()
console.log(id);

  // create state for display spinner
  const [showspinner,setshowspinner]=useState(true)

  // create a state to hold userdetails
  const [userDetails,setuserDetails]=useState({})

  // define function to get profile for a specific user
  const getprofile = async()=>{
    // api call - viewprofile
    const {data} = await viewprofile(id)
    setuserDetails(data)
  }
console.log(userDetails);
  useEffect(()=>{
    // call getprofile function
    getprofile()
    setTimeout(() => {
      setshowspinner(false)
    }, 2000);
  },[])
  return (
    <>
   {
    showspinner?(
      <div><Loadingspinner /></div>
    ):
    ( <div className="container">
    <Card className="shadow col-lg-6 mx-auto mt-5">
      <Card.Body>
        <Row>
          <div className="col">
            <div className="profile_img d-flex justify-content-center">
            <img className='rounded-circle border p-1'
             width={'200px'}
              height={'200px'}
               src={`${BASE_URL}/uploads/${userDetails.profile}`}
               alt="profile" />
            </div>
          </div>
        </Row>
        <div className="text-center mt-3">
          <h3>{userDetails.fname} &nbsp; {userDetails.lname}</h3>
          <h5><i class="fa-solid fa-envelope text-primary"></i>:- {userDetails.email}</h5>
          <h5><i class="fa-solid fa-mobile text-danger"></i>:-{userDetails.mobile}</h5>
          <h5><i class="fa-solid fa-venus-mars text-warning"></i>:-{userDetails.gender}</h5>
          <h5><i class="fa-solid fa-location-dot text-info"></i>:- {userDetails.location}</h5>
          <h5><i class="fa-solid fa-chart-line text-success"></i>:-{userDetails.status}</h5>
        </div>
      </Card.Body>

    </Card>
  </div>)
    
   }

    </>
  )
}

export default Profile