import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Icon, Row, Col, Popover } from "antd";
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
    
    openLink( link ){
        window.open( link );
    }
    
    render(){
        let sprintClassName = "pointer hover-blue";
        if( this.props.sprint.completed ){
            sprintClassName += " complete";
        }
        return ( <>
                <Row className={ "inline" }>
                    
                    <Col span={ 2 }>
                        <div>
                            { this.state.open ? <div onClick={ () => {
                            
                            } }>
                                <Icon onClick={ this.toggleOpen }
                                      type={ "caret-down" }/>
                            </div> : <Icon onClick={ this.toggleOpen }
                                           type={ "caret-right" }
                                           style={ { fontSize: "24px" } }/> }
                        </div>
                    
                    </Col>
                    <Col span={ 22 }>
                        <Popover content={ `${ this.props.sprint.name } TK` }
                                 placement={ "leftBottom" }>
                            <h1 className={ sprintClassName }
                                onClick={ () => this.openLink( this.props.sprint.tk ) }>{ this.props.sprint.name }
                            </h1>
                        </Popover>
                    
                    </Col>
                </Row>
                { this.state.open && Object.values( this.props.lessons )
                    .filter( lesson => lesson.sprint === this.props.sprint.id )
                    .sort( ( a, b ) => a.order - b.order )
                    .map( lesson => {
                        return <Lesson lesson={ lesson }/>;
                    } ) }
                { this.state.open && <Row>
                
                </Row> }
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