import './App.css';
import Dashboard from './modules/Dashboard';
import Form from './modules/Form';
import { Navigate } from 'react-router-dom';
import { BrowserRouter as Router, Routes, Route, redirect } from 'react-router-dom';

<<<<<<< HEAD
const PortectedRoute=({children})=>{
  const isLoggedIn=localStorage.getItem('user:token')!== null || true;

  if(!isLoggedIn){
=======
const PortectedRoute=({children,auth=false})=>{
  const isLoggedIn=localStorage.getItem('user:token')!== null || false;

  if(!isLoggedIn && auth){
>>>>>>> e6032e2f (backend integrated)
    return <Navigate to="/users/sign_in" />;
  } 
  else if(isLoggedIn && ['/users/sign_in', '/users/sign_up'].includes(window.location.pathname)){
    return <Navigate to="/" />;
  }

  return children
}

function App() {
  return (
      <Routes>
<<<<<<< HEAD
        <Route path='/' element={<PortectedRoute>
=======
        <Route path='/' element={
          <PortectedRoute auth={true}>
>>>>>>> e6032e2f (backend integrated)
              <Dashboard />
          </PortectedRoute>} />
        <Route path='/users/sign_in' element={
          <PortectedRoute>
          <Form isSignInPage={true}/></PortectedRoute>} />
        <Route path='/users/sign_up' element={<PortectedRoute><Form isSignInPage={false}/></PortectedRoute>} />
      </Routes>
  );
}

export default App;
