import styled from "styled-components";

export const Form = styled.form`
  display: flex;
  margin: 0 auto;
  padding: 20px;
  flex-direction: column;
  max-width: 350px;
  align-items: center;
`;

export const FormInput = styled.input`
  margin: 20px;
  border-radius: 20px;
  text-indent: 10px;
  outline: none;
  border: 1px solid black;
  font-weight: 300;
  padding: 10px;
  font-size: 20px;
`;

export const LoginHeader = styled.h1`
  margin-bottom: 0;
  font-weight: ${props => (props.secondary ? 400 : 300)};
  font-size: ${props => (props.secondary ? "24px" : "34px")};
  color: ${props => (!props.secondary ? "black" : "rgba(0,0,0,.7)")};
  color: ${props => props.error && "red"};
`;

export const LoginButton = styled.input`
  padding: 10px 25px;
  border-radius: 25px;
  border: 3px solid white;
  color: white;
  outline: none;
  cursor: pointer;
  font-weight: 300;
  background: black;
  box-shadow: 0px 0px 2px 0px rgba(0, 0, 0, 0.75);
  font-size: 20px;
  transition: 0.25s ease-in-out;
  :hover {
    color: black;
    background: white;
    border: 3px solid black;
  }
`;