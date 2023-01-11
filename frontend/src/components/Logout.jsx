import React from 'react'
import styled from "styled-components";
const Button = styled.button`
  flex: 1;
  border: none;
  background-color:#ecd133;
  color: white;
`;
const Logout = () => {
  return (
    <Button>
        Logout
    </Button>
  )
}

export default Logout