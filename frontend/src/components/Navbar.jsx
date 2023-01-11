import { Badge } from "@material-ui/core";
import { Search, ShoppingCartOutlined } from "@material-ui/icons";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { mobile } from "../responsive";
import { useSelector,useDispatch} from "react-redux";
import { Link } from "react-router-dom";
import {logout,search} from "../redux//userRedux";

const Container = styled.div`
  height: 60px;
  ${mobile({ height: "50px" })}
`;

const Wrapper = styled.div`
  padding: 10px 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  ${mobile({ padding: "10px 10px" })}
`;

const Left = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  ${mobile({ flex:5 })}
`;

const Language = styled.span`
  font-size: 14px;
  cursor: pointer;
  ${mobile({ display: "none" })}
`;

const SearchContainer = styled.form`
  border: 1px solid lightgray;
  display: flex;
  align-items: center;
  margin-left: 25px;
  ${mobile({ marginLeft:"0px" })}
  padding: 5px;
`;

const Input = styled.input`
  border: none;
  outline: none;
  ${mobile({ width: "120px" })}
`;

const Center = styled.div`
  flex: 1;
  text-align: center;
 
`;

const Logo = styled.h1`
  font-weight: bold;
  ${mobile({ fontSize: "24px",display:"none" })}
`;
const MobileLogo = styled.h1`
  display: none;
  font-weight: bold;
  padding: 5px 10px;
  ${mobile({ fontSize: "25px",display:"block" })}
`;
const Right = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  ${mobile({ flex: 10, justifyContent: "right" })}
`;

const MenuItem = styled.div`
  font-size: 14px;
  cursor: pointer;
  margin-left: 25px;
  ${mobile({ fontSize: "16px", marginLeft: "15px", marginRight:"5px" })}
`;
const CartItem = styled.div`
  font-size: 14px;
  cursor: pointer;
  margin-left: 25px;
  ${mobile({ fontSize: "12px", marginLeft: "15px" ,marginRight:"5px" })}
`;
const Button = styled.button`
  border: none;
  background-color:#a69221;
  color: white;
  cursor: pointer;
  padding: 5px;
  margin-left: 15px;
  ${mobile({ marginLeft: "4px" })}
`;
const SearchButton = styled.button`
   border: none;
   outline: none;
   background-color: white;
`;

const Navbar = () => {
  const quantity = useSelector(state=>state.cart.quantity)
  const currentUser= useSelector(state=>state.user.currentUser)
  const [searchedValue,setsearchedValue]=useState(null)
  const dispatch = useDispatch();
  const logoutHandler=()=>{
    dispatch(logout());
    // console.log(currentUser)
  }
  const searchHandler=(e)=>{
    e.preventDefault();
    dispatch(search(searchedValue));
    // console.log(searchedValue)
  }
  useEffect(()=>{
    dispatch(search(null));
  },[])
  return (
    <>
    <Link to="/" style={{textDecoration:"none",color:"black"}}>
          <MobileLogo>EcomKart</MobileLogo>
    </Link>
    <Container>
      <Wrapper>
        <Left>
          <Language>EN</Language>
          <SearchContainer onSubmit={searchHandler}>
            <Input placeholder="Search" onChange={(e)=>setsearchedValue(e.target.value)}/>
            <SearchButton type="submit">
            <Search style={{ color: "gray", fontSize: 16 }} />
            </SearchButton >
          </SearchContainer>
        </Left>
        <Center>
        <Link to="/" style={{textDecoration:"none",color:"black"}}>
          <Logo>EcomKart</Logo>
          </Link>
        </Center>
        <Right>
          
            { 
             currentUser?
             <>
             <MenuItem>{currentUser.username}</MenuItem>
             <Button onClick={logoutHandler}>Logout</Button>
             </>
             :
             <>
              <MenuItem>
             <Link to="/login" style={{textDecoration:"none",color:"black"}}>
              SignIn
             </Link>
             </MenuItem>
             <MenuItem>
             <Link to="/register" style={{textDecoration:"none",color:"black"}}>
              Register
             </Link>
             </MenuItem>
             </>
          }
          <Link to="/cart">
          <CartItem>
            <Badge badgeContent={quantity} color="primary">
              <ShoppingCartOutlined />
            </Badge>
          </CartItem>
          </Link>
        </Right>
      </Wrapper>
    </Container>
    </>
  );
};

export default Navbar;