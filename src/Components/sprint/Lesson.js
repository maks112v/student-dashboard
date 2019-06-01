import React, { Component } from "react";
import PropTypes from "prop-types";
import "./lesson.scss";
import { connect } from "react-redux";
import { Row, Checkbox, Icon, Col, Popover } from "antd";

class Lesson extends Component{
    
    createLink = () => {
        
        let url = `https://airtable.com/shr8ZYuNjevMLRsxI?prefill_Student=${ this.props.user.firstName.trim() }+${ this.props.user.lastName.trim() }&prefill_Module=${ encodeURI(
            this.props.lesson.name ) }`;
        this.openLink( url );
        
    };
    
    openLink( link ){
        window.open( link );
    }
    
    render(){
        const className = this.props.studentLessons[ this.props.lesson.id ] &&
            this.props.studentLessons[ this.props.lesson.id ].completed &&
            "complete";
        return ( <Row className={ "row-width" }>
            
            <Col md={ 20 }>
                <h3 className={ `${ className } inline` }>
                    <Checkbox className={ "mg-right-lg" }
                              defaultChecked={ className === "complete" }
                              disabled
                    />
                    <Popover placement="rightBottom"
                             content={ <p>{ this.props.lesson.name } Training
                                 Kit</p> }
                    >
                        <div className={ "color-blue" }
                             onClick={ () => this.openLink( this.props.lesson.tk ) }>{ this.props.lesson.name }</div>
                    </Popover>
                </h3>
            </Col>
            <Col md={ 5 }>
                <Popover
                    content={ <p>{ this.props.lesson.name } Retrospective.</p> }
                    placement="leftBottom">
                    <Icon type="form" onClick={ () => this.createLink() }
                          className={ "font-18" }/>
                </Popover>
            </Col>
            <Col md={ 10 }>
                <div className={ " mg-left-md inline" }>
                    { this.props.lesson.projects &&
                    this.props.lesson.projects.map( ( project, index ) => {
                        let className = " inline";
                        if( index !== 0 ){
                            className += " mg-left-md";
                        }
                        return <Popover content={ <p>{ project }</p> }
                                        placement={ "rightBottom" }>
                            <div onClick={ () => this.openLink( project ) }
                                 className={ `${ className } color-blue` }>
                                
                                { `Project ${ index + 1 }` }
                            
                            </div>
                        </Popover>;
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