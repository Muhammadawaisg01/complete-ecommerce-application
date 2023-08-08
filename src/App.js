
import { useEffect } from 'react';
import './App.css';
import Header from "./components/layout/Header/Header.js"
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Footer from "./components/layout/Footer/Footer.js";
import { WebFont } from "webfontloader"
import Home from './components/Home/Home';
import ProductDetails from './components/Product/ProductDetails';
import Products from './components/Product/Products';
import LoginSignUp from './components/User/LoginSignUp';
import store from './store';
import { loadUser } from './actions/userAction';
import Profile from "./components/User/Profile.js"
import { useSelector } from 'react-redux';
import UserOptions from "./components/layout/Header/UserOptions.js"
// import ProtectedRoute from './components/Route/ProtectedRoute';
import UpdateProfile from './components/User/UpdateProfile';
import UpdatePassword from './components/User/UpdatePassword';
import Protected from './components/Route/ProtectedRoute';


function App() {

  const { loading, isAuthenticated, user } = useSelector(state => state.user);

  useEffect(() => {

    // WebFont.load(
    //   {
    //     google: {
    //       families: ["Roboto", "Droid Sans", "Chilanka"],
    //     },
    //   })

    store.dispatch(loadUser());

  }, [])

  return (
    <Router>
      <Header />
      {isAuthenticated && <UserOptions user={user} />}
      <Routes>
        <Route exact path='/' element={<Home />} />
        <Route exact path='/product/:id' element={<ProductDetails />} />
        <Route exact path='/products' element={<Products />} />
        <Route exact path='/login' element={<LoginSignUp />} />

        <Route exact path='/account' element={
          <Protected ><Profile /></Protected>
        } />

        <Route exact path='/me/update' element={
          <Protected ><UpdateProfile /></Protected>
        } />

        <Route exact path='/password/update' element={
          <Protected ><UpdatePassword /></Protected>
        } />

      </Routes>
      <Footer />
    </Router>
  );
}

export default App;