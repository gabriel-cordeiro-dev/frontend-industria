import React from "react";

import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import { Botao } from "../Botao";
import { login } from "../../utils/auth";

import "../../styles/loginform.css";

class LoginForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      senha: "",
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value,
    });
  }

  handleSubmit(e) {
    e.preventDefault();

    const options = {
      method: "post",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(this.state),
    };

    fetch("https://wild-pink-coati-tux.cyclic.app/api/auth/login", options)
      .then((res) => {
        if (!res.ok) {
          console.log(res.status);
          alert(res.statusText);
        }

        return res.json();
      })
      .then((data) => {
        if(data.token){
          login(data.token);
          window.location.href = "/items";
        }else{
          window.location.href = "/login";
        }
      })
      .catch((err) => console.log(err));
  }

  render() {
    const formStyle = {
      width: "100%",
      maxWidth: 600,
      padding: "50px 0 0 0",
    };
    const labelStyle = {
      width: "60px",
      display: "flex",
      alignItens: "center",
      justifyContent: "flex-end",
      marginRight: "10px",
      fontSize: "20px",
      fontWeight: "600",
    };
    const formControlStyle = {
      borderRadius: "0",
      width: "390px",
    };

    return (
        
      <Row className="py-5">
        
        <Col>
            
            <div className="formLogin">
            <div className="tituloForm">ZOOMtecnologia</div>
                <Form
                onSubmit={this.handleSubmit}
                style={formStyle}
                className="mx-auto"
                >
                <Form.Group controlId="email">
                    <div className="inputField">
                    <Form.Label style={labelStyle}><span class="material-symbols-outlined">mail</span></Form.Label>
                    <Form.Control
                        type="text"
                        name="email"
                        style={formControlStyle}
                        onChange={this.handleChange}
                        value={this.state.email}
                    />
                    </div>
                </Form.Group>
                <Form.Group controlId="senha">
                    <div className="inputField">
                    <Form.Label style={labelStyle}><span class="material-symbols-outlined">lock</span></Form.Label>
                    <Form.Control
                        type="password"
                        name="senha"
                        style={formControlStyle}
                        onChange={this.handleChange}
                        value={this.state.senha}
                    />
                    </div>
                </Form.Group>
                <div className="botaoFormulario">
                    <Botao type="submit" texto="Entrar" />
                </div>
                </Form>
            </div>
        </Col>
      </Row>
    );
  }
}

export default LoginForm;