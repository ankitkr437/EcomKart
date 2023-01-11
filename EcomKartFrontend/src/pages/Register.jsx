import styled from "styled-components";
import { mobile } from "../responsive";
import { useDispatch, useSelector } from "react-redux";
import { useState,useEffect } from "react";
import { Link } from "react-router-dom";
import { register } from "../redux/apiCalls";
const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background: linear-gradient(
      rgba(255, 255, 255, 0.5),
      rgba(255, 255, 255, 0.5)
    ),
    url("/images/img1.jpg")
      center;
  background-size: cover;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;
const TitleNav=styled.h1`
  font-size: 45px;
  font-weight: 200;
  text-align: center;
  margin-bottom: 3vh;
`
const Wrapper = styled.div`
  width: 40%;
  padding: 20px;
  background-color: white;
  ${mobile({ width: "75%" })}
`;

const Title = styled.h1`
  font-size: 24px;
  font-weight: 300;
`;

const Form = styled.form`
  display: flex;
  flex-wrap: wrap;
`;

const Input = styled.input`
  flex: 1;
  min-width: 40%;
  margin: 20px 10px 0px 0px;
  padding: 10px;
`;

const Agreement = styled.span`
  font-size: 10px;
   margin-bottom: 20px;
   margin-top: 5px;
   color: #7d7d73;
`;

const Button = styled.button`
  width: 40%;
  display: block;
  border: none;
  padding: 15px 20px;
  background-color: #ecd133;
  color: white;
  cursor: pointer;
  &:disabled {
    color: #88781c;
    cursor: not-allowed;
  }
`;
const LinkTag = styled.a`
  margin-top: 20px;
  font-size: 12px;
  display: block;
  text-decoration: none;
`;
const Error = styled.span`
  color: red;
`;

const Register = () => {
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmpassword, setConfirmPassword] = useState("");
 
  const dispatch = useDispatch();
  const { isFetching, error} = useSelector((state) => state.user);

  const handleClick = (e) => {
    e.preventDefault();
    password=== confirmpassword ?
    register(dispatch,{
      username,email, password,
  }) : alert("password is not same")
}
   
  return (
    <Container>
       <TitleNav>EcomKart</TitleNav>
      <Wrapper>
        <Title>CREATE AN ACCOUNT</Title>
        <Form>
          <Input placeholder="first name" 
            onChange={(e) => setFirstname(e.target.value)}
            type="text"
            required
          />
          <Input placeholder="last name" 
           onChange={(e) => setLastname(e.target.value)}
           type="text"
           required
          />
          <Input placeholder="username" 
           onChange={(e) => setUsername(e.target.value)}
           type="text"
           required
          />
          <Input placeholder="email" 
           onChange={(e) => setEmail(e.target.value)}
           type="email"
           required
          />
          <Input placeholder="password" 
           onChange={(e) => setPassword(e.target.value)}
           type="password"
           required
          />
          <Input placeholder="confirm password" 
           onChange={(e) => setConfirmPassword(e.target.value)}
           type="password"
           required
          />
           <LinkTag>
          Already an user?
          <Link to="/login">
            <b>LOGIN</b>
          </Link>
          </LinkTag>
          <Agreement>
            By creating an account, I consent to the processing of my personal
            data in accordance with the <b>PRIVACY POLICY</b>
          </Agreement>
          <Button onClick={handleClick} disabled={isFetching}>CREATE</Button>
          {error && <Error>Something went wrong...</Error>}
        </Form>
      </Wrapper>
    </Container>
  );
};

export default Register;