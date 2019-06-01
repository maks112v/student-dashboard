import React from "react";
import { Layout, Row, Col, Button, Input, Form } from "antd";
import { connect } from "react-redux";
import { getUserById } from "../actions";

import HomeImage from "../assets/home.svg";

class Welcome extends React.Component{
    state = {
        code: "", error: {
            status: "", msg: ""
        }
    };
    
    componentDidMount(){
    
    }
    
    componentWillUpdate( nextProps, nextState, nextContext ){
    
    }
    
    submit = e => {
        
        e.preventDefault();
        this.props.getUserById( this.state.code );
        
    };
    
    render(){
        return ( <Layout>
            <Layout.Content>
                <Row
                    gutter={ 24 }
                    type="flex"
                    style={ {
                        height: "100vh",
                        margin: "0 30px",
                        alignItems: "center",
                        textAlign: "center"
                    } }
                >
                    <Col xs={ 24 } md={ 12 }>
                        <h1 style={ { fontSize: "2rem" } }>Student
                            Dashboard</h1>
                        <h3>
                            Welcome to the lambda school (unoffical) student
                            dashboard.
                        </h3>
                        <h6>If you don't have a code get it from your
                            PM</h6>
                        <Form onSubmit={ this.submit }>
                            <Form.Item
                                validateStatus={ this.state.error.status }
                                help={ this.state.error.msg }
                            >
                                <Input
                                    placeholder="Enter Code"
                                    size="large"
                                    onChange={ e => {
                                        this.setState( {
                                            code: e.target.value
                                        } );
                                    } }
                                    value={ this.state.code }
                                    style={ {
                                        marginBottom: "10px", maxWidth: "400px"
                                    } }
                                />
                            </Form.Item>
                            <br/>
                            <Button
                                type="primary"
                                onClick={ this.submit }
                                loading={ this.state.isLoading }
                                shape="round"
                                icon="lock"
                                size="large"
                            >
                                Let's Start
                            </Button>
                        </Form>
                    </Col>
                    <Col xs={ 24 } md={ 12 }>
                        <img src={ HomeImage } style={ { width: "100%" } }
                             alt=""/>
                    </Col>
                </Row>
            </Layout.Content>
        </Layout> );
    }
}

const mstp = state => ( {
    user: state.users.user,
} );

export default connect( mstp, { getUserById } )( Welcome );
