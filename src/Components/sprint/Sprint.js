import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Icon, Row, Col } from "antd";
import Lesson from "./Lesson";

class Sprint extends Component{
    
    state = {
        open: false
    };
    
    toggleOpen = () => {
        
        this.setState( state => {
            return {
                open: !state.open,
            };
        } );
    };
    
    render(){
        return ( <>
                <Row className={ "inline" }>
                    
                    <Col span={ 2 }>
                        <div>
                            { this.state.open ? <div onClick={ () => {
                            
                            } }>
                                <Icon onClick={ this.toggleOpen }
                                      type={ "caret-down" }/>
                            </div> : <Icon onClick={ this.toggleOpen }
                                           type={ "caret-right" }/> }
                        </div>
                    
                    </Col>
                    <Col span={ 22 }>
                        <h1 className={ this.props.sprint.completed &&
                        "complete" }>{ this.props.sprint.name }</h1>
                    </Col>
                </Row>
                { this.state.open && <Row>
                    <Col md={ 2 } offset={ 2 }><h3>Complete</h3></Col>
                    <Col md={ 5 } offset={ 2 }><h3>Lesson</h3></Col>
                    <Col md={ 3 }><h3>Retro Report</h3></Col>
                    <Col md={ 4 }><h3>Training Kit</h3></Col>
                    <Col md={ 4 }><h3>Project/s</h3></Col>
                </Row> }
                { this.state.open && Object.values( this.props.lessons )
                    .filter( lesson => lesson.sprint === this.props.sprint.id )
                    .sort( ( a, b ) => a.order - b.order )
                    .map( lesson => {
                        return <Lesson lesson={ lesson }/>;
                    } ) }
            </>
        
        );
    }
}

Sprint.propTypes = {
    sprint: PropTypes.shape( {
        name: PropTypes.string.isRequired,
        id: PropTypes.string.isRequired,
        week: PropTypes.string.isRequired,
    } ).isRequired,
};

const mstp = state => ( {
    lessons: state.autoFill.lessons, studentLessons: state.users.studentLessons,
} );

export default connect( mstp )( Sprint );