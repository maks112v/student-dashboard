import React from "react";
import { Layout, Row, Col, Button, Input, Form } from "antd";
import cookie from "react-cookies";

import { store } from "../firebase";

import HomeImage from "../assets/home.svg";

class Welcome extends React.Component {
  state = {
    code: "",
    isLoading: false,
    error: {
      status: '',
      msg: ""
    }
  };

  componentDidMount() {
    if(cookie.load('code')){
      this.props.history.push('/')
    }
  }

  submit = e => {
    e.preventDefault();
    if(this.state.code !== ''){
      this.setState({
        isLoading: true
      });
      store
        .collection("students")
        .doc(this.state.code)
        .get()
        .then(res => {
          if (res.exists) {
            cookie.save('code', this.state.code)
            this.props.history.push(`/`);
          } else {
            this.setState({
              isLoading: false,
              code: "",
              error: {
                status: "error",
                msg: "Wrong Code"
              }
            });
          }
        })
        .catch(err => console.log(err));
    }
    else {
      this.setState({
        error: {
          status: "warning",
          msg: "No Code Entered"
        }
      });
    }
  };

  render() {
    return (
      <Layout>
        <Layout.Content>
          <Row
            gutter={24}
            type="flex"
            style={{
              height: "100vh",
              margin: "0 30px",
              alignItems: "center",
              textAlign: "center"
            }}
          >
            <Col xs={24} md={12}>
              <h1 style={{ fontSize: "2rem" }}>Student Dashboard</h1>
              <h3>
                Welcome to the lambda school (unoffical) student dashboard.
              </h3>
              <h6>If you don't have a code get it from your PM</h6>
              <Form onSubmit={this.submit}>
              <Form.Item
                validateStatus={this.state.error.status}
                help={this.state.error.msg}
              >
                <Input
                  placeholder="Enter Code"
                  size="large"
                  onChange={e => {
                    this.setState({
                      code: e.target.value
                    });
                  }}
                  value={this.state.code}
                  required
                  style={{ marginBottom: "10px", maxWidth: "400px" }}
                />
              </Form.Item>
              <br />
              <Button
                type="primary"
                onClick={this.submit}
                loading={this.state.isLoading}
                shape="round"
                icon="lock"
                size="large"
              >
                Let's Start
              </Button>
              </Form>
            </Col>
            <Col xs={24} md={12}>
              <img src={HomeImage} style={{ width: "100%" }} alt="" />
            </Col>
          </Row>
        </Layout.Content>
      </Layout>
    );
  }
}

export default Welcome;
