import React from 'react'
import { Container, Navbar } from 'react-bootstrap'

function Header() {
  return (
    <div>
         <Navbar bg="primary" variant="dark">
        <Container>
          <Navbar.Brand href="/">
          <i class="fa-sharp fa-solid fa-layer-group fa-flip"></i>EMS Application
          </Navbar.Brand>
        </Container>
      </Navbar>
    </div>
  )
}

export default Header