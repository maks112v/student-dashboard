import React, { Component } from "react";
import PropTypes from "prop-types";
import "./lesson.scss";
import { connect } from "react-redux";
import { Row, Checkbox, Icon, Col } from "antd";

class Lesson extends Component{
    
    createLink = () => {
        
        let url = `https://airtable.com/shr8ZYuNjevMLRsxI?prefill_Student=${ this.props.user.firstName.trim() }+${ this.props.user.lastName.trim() }&prefill_Module=${ encodeURI(
            this.props.lesson.name ) }`;
        window.open( url );
        
    };
    
    render(){
        const className = this.props.studentLessons[ this.props.lesson.id ] &&
            this.props.studentLessons[ this.props.lesson.id ].completed &&
            "complete";
        return ( <Row className={ "row-width" }>
            
            <Col md={ 20 }>
                <h3 className={ `${ className } inline` }>
                    <Checkbox className={ "mg-right-lg" }
                              defaultChecked={ className === "complete" }
                              disabled/>
                    { this.props.lesson.name }
                </h3>
            </Col>
            <Col md={ 5 }>
                <div className={ "mg-left-md" }
                     onClick={ this.createLink }><Icon type="link"/>
                </div>
            </Col>{ this.props.lesson.tk && <Col md={ 5 }>
            <div className={ "mg-left-md" }><a
                href={ this.props.lesson.tk }>TK</a>
            </div>
        </Col> }
            <Col md={ 10 }>
                <div className={ "mg-left-md inline" }>
                    { this.props.lesson.projects &&
                    this.props.lesson.projects.map( ( project, index ) => {
                        let className = "inline";
                        if( index !== 0 ){
                            className += " mg-left-md";
                        }
                        return <a href={ project }
                                  className={ className }>
                            { `Project ${ index + 1 }` }
                        </a>;
                    } ) }
                </div>
            </Col>
        </Row> );
    }
}

Lesson.propTypes = {
    lesson: PropTypes.shape( {
        id: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        order: PropTypes.string.isRequired,
        sprint: PropTypes.string.isRequired,
    } ).isRequired,
};

const mstp = state => ( {
    studentLessons: state.users.studentLessons, user: state.users.user,
} );

export default connect( mstp )( Lesson );