import React from "react";
import { Layout, Row, Col, Card, Icon, Skeleton, Avatar } from "antd";
import cookie from "react-cookies";

import LambdaLogo from "../assets/logo.png";

import DailyImage from "../assets/daily.jpg";
import SprintImage from "../assets/sprint.jpg";

import axios from "axios";
import Lessons from "../Components/Lessons";

class Dashboard extends React.Component{
    state = {
        joke: ""
    };
    
    componentDidMount(){
        this.getJoke();
    }
    
    logOut = () => {
        cookie.remove( "code" );
        this.props.history.push( "/verify" );
    };
    
    getJoke = () => {
        axios.get( "https://icanhazdadjoke.com/", {
            headers: { Accept: "application/json" }
        } ).then( joke => this.setState( { joke: joke.data.joke } ) ).catch();
    };
    
    changeLessonCompleted = title => {
    
    };
    
    render(){
        return ( <Layout>
            <Layout.Content
                style={ { minHeight: "100vh", margin: "20px 10px" } }>
                <Card
                    style={ { maxWidth: "800px", margin: "20px auto" } }
                    actions={ [
                        <Icon type="reload" onClick={ this.getJoke }/>, <Icon
                            type="github"
                            onClick={ () => window.open( `https://github.com/${ this.props.github }` ) }
                        />, <Icon type="logout" onClick={ this.logOut }/>
                    ] }
                >
                    <Skeleton loading={ this.props.isLoading } avatar
                              active>
                        <Card.Meta
                            avatar={ <Avatar src={ LambdaLogo }/> }
                            title={ `Welcome ${ this.props.firstName } ${ this.props.lastName }` }
                            description={ `Here is a joke: ${ this.state.joke }` }
                        />
                    </Skeleton>
                </Card>
                <Row
                    type="flex"
                    gutter={ 24 }
                    style={ { maxWidth: "800px", margin: "20px auto" } }
                >
                    <Col xs={ 24 } md={ 12 }>
                        <Card
                            hoverable
                            style={ {
                                width: "100%", marginBottom: "10px"
                            } }
                            onClick={ () => this.props.history.push( "/retro" ) }
                            cover={ <img
                                alt="Daily Retro"
                                src={ DailyImage }
                            /> }
                        >
                            <Card.Meta
                                title="Daily Retro"
                                description="Fill out every evening"
                            />
                        </Card>
                    </Col>
                    <Col xs={ 24 } md={ 12 }>
                        <Card
                            hoverable
                            style={ { width: "100%" } }
                            onClick={ () => this.props.history.push( "/sprint" ) }
                            cover={ <img
                                alt="Sprint Form"
                                src={ SprintImage }
                            /> }
                        >
                            <Card.Meta
                                title="Sprint Retro"
                                description="Coming Soon..."
                            />
                        </Card>
                    </Col>
                </Row>
                <Row>
                    <Col xs={ { size: 24, offset: 0 } }
                         md={ { size: 12, offset: 6 } }>
                        <Lessons lessons={ this.props.lessons }
                                 onChange={ this.changeLessonCompleted }/>
                    </Col>
                </Row>
            </Layout.Content>
        </Layout> );
    }
}

export default Dashboard;
