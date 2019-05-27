import React, { Component } from "react";
import PropTypes from "prop-types";
import { Col, Layout, Row, Form, Select } from "antd";

import InputComponent from "../Components/form/InputComponent";

class SignUp extends Component{
    state = {
        firstName: "",
        lastName: "",
        username: "",
        githubHandle: "",
        pm: "",
        cohort: "",
    };
    
    onChange = ( name, value ) => {
        this.setState( { [ name ]: value } );
    };
    
    render(){
        const Option = Select.Option;
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
                        <Form>
                            <InputComponent name={ "Username" }
                                            value={ this.state.githubHandle }
                                            onChange={ this.onChange }
                            />
                            <InputComponent name={ "First Name" }
                                            value={ this.state.firstName }
                                            onChange={ this.onChange }
                            />
                            <InputComponent name={ "Last Name" }
                                            value={ this.state.lastName }
                                            onChange={ this.onChange }
                            />
                            <InputComponent name={ "Github Handle" }
                                            value={ this.state.githubHandle }
                                            onChange={ this.onChange }
                            />
                            
                            <Select
                                showSearch
                                style={ { width: 200 } }
                                placeholder="Project Manager"
                                optionFilterProp="children"
                                onChange={ ( e ) => {
                                    this.onChangeSelect( e, "sprintChallenge" );
                                } }
                                value={ this.state.sprintChallenge }
                                filterOption={ ( input,
                                    option ) => option.props.children.toLowerCase()
                                    .indexOf( input.toLowerCase() ) >= 0 }
                            >
                                { this.props.sprints &&
                                Object.values( this.props.sprints )
                                    .sort( ( a, b ) => a.week - b.week )
                                    .map( sprint => {
                                        
                                        return <Option key={ sprint.id }
                                                       value={ sprint.name }>{ `${ sprint.name }` }</Option>;
                                    } ) }
                                <Option
                                    value={ "Sprint" }>Sprint</Option>
                            </Select>
                        
                        </Form>
                    </Col>
                </Row>
            </Layout.Content>
        </Layout> );
    }
}

SignUp.propTypes = {};

export default SignUp;