import React from 'react'
import { Spinner } from 'react-bootstrap'

function Loadingspinner() {
  return (
    <div style={{width:'100%',height:'40vh'}} className='d-flex justify-content-center align-items-center m-3'>
        <Spinner animation="border" variant="warning" />
        <span className='ms-2'>Loading...</span>
    </div>
  )
}

export default Loadingspinner