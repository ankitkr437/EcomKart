import Sidebar from "./components/sidebar/Sidebar";
import Topbar from "./components/topbar/Topbar";
import "./App.css";
import Home from "./pages/home/Home";
import {BrowserRouter as Router,} from "react-router-dom";
import { Route,Routes} from "react-router-dom";
import UserList from "./pages/userList/UserList";
import User from "./pages/user/User";
import NewUser from "./pages/newUser/NewUser";
import ProductList from "./pages/productList/ProductList";
import Product from "./pages/product/Product";
import NewProduct from "./pages/newProduct/NewProduct";
import Login from "./pages/login/Login";
import { useSelector } from "react-redux";

function App() {
  const admin = useSelector((state) => state.user.currentUser.isAdmin);
  return (
    <Router>
      {admin && (
          <>
            <Topbar />
            <div className="container">
              <Sidebar />
      <Routes>
       <Route  path="/login" element={admin?<Home />:<Login />} />
        
              <Route exact path="/" element={<Home />} />
              <Route  path="/users" element={<UserList />} />
              <Route  path="/user/:userId" element={<User />} />
              <Route  path="/newuser" element={<NewUser />} />
              <Route  path="/products" element={<ProductList />} />
              <Route  path="/product/:productId" element={ <Product />} />
              <Route  path="/newproduct" element={  <NewProduct />} />

      </Routes>
      </div>
          </>
        )}
    </Router>
  );
}

export default App;
