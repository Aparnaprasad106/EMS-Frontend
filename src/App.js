import { Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './pages/Home';
import Profile from './pages/Profile';
import Register from './pages/Register';
import Edit from './pages/Edit';
import Pnf from './pages/Pnf';
import Header from './components/Header';
import Footer from './components/Footer';

function App() {
  return (
    <div className="App">
     {/* header */}
     <Header />

     {/* home */}
     <Routes>
      <Route path='/' element={<Home />}/>
      <Route path='/profile/:id' element={<Profile />}/>
      <Route path='/register' element={<Register />}/>
      <Route path='/edit/:id' element={<Edit />}/>
      <Route path='*' element={<Pnf />}/>
     </Routes>

     {/* footer */}
     <Footer />
    </div>
  );
}

export default App;
