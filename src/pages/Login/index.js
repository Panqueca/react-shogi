import axios from "axios";
import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import { useAuthState } from "../../store/user/state";

const Page = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  background-color: #eee;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const Form = styled.div`
  width: 300px;
  height: 200px;
  padding: 20px;
  background-color: #fff;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  -webkit-box-shadow: 0px 0px 13px -2px rgba(0, 0, 0, 0.19);
  box-shadow: 0px 0px 13px -2px rgba(0, 0, 0, 0.19);
  border-radius: 4px;
`;

const Input = styled.input`
  border-radius: 4px;
  padding: 5px;
  background-color: #f1f1f1;
  border: 1px solid #ccc;
  margin-bottom: 10px;
`;

const Button = styled.button`
  border-radius: 4px;
  background-color: #000;
  color: #fff;
  border: none;
  margin-top: 25px;
  font-size: 12px;
  padding: 5px 15px;
  border: 1px solid transparent;
  opacity: ${({ disabled }) => (disabled ? "0.5" : "1")};
  pointer-events: ${({ disabled }) => (disabled ? "none" : "all")};
  &:hover {
    background-color: #fff;
    color: #000;
    border: 1px solid #000;
  }
`;

const Login = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const { updateSession } = useAuthState();
  const history = useHistory();

  function change(field, newValue) {
    setForm({ ...form, [field]: newValue });
  }

  async function login() {
    const { data: response } = await axios.post(
      "http://localhost:9000/users/login",
      form,
      {
        withCredentials: true
      }
    );

    if (response && response.message === "LOGGED") {
      updateSession();
      history.push("/home");
    }
  }

  return (
    <Page>
      <h1 style={{ padding: "20px" }}>Shogi Battles</h1>
      <Form>
        <Input
          placeholder="E-mail"
          type="text"
          onChange={e => change("email", e.target.value)}
        />
        <Input
          placeholder="Password"
          type="password"
          onChange={e => change("password", e.target.value)}
        />
        <Button disabled={!form.email || !form.password} onClick={login}>
          LOGIN
        </Button>
      </Form>
    </Page>
  );
};

export default Login;
