import React, { Component } from "react";
import PropTypes from "prop-types";
import "./lesson.scss";
import { connect } from "react-redux";

class Lesson extends Component{
    
    render(){
        const className = this.props.studentLessons[ this.props.lesson.id ] &&
            this.props.studentLessons[ this.props.lesson.id ].completed &&
            "complete";
        return ( <div className={ `sprint__lesson ${ className }` }>
            <h3>
                { this.props.lesson.name }
            
            </h3>
        </div> );
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

const mstp = state => ( { studentLessons: state.users.studentLessons, } );

export default connect( mstp )( Lesson );