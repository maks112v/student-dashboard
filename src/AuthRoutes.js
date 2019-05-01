import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { store } from "./firebase";

import Dashboard from "./Views/Dashboard";
import cookie from "react-cookies";

import Retro from "./Views/Retro";

class AuthRoutes extends React.Component {
  state = {
    code: cookie.load("code"),
    isLoading: true,
    firstName: "",
    lastName: "",
    github: "",
    autoFill: {
      sections: [],
      sprints: [],
      instructors: []
    }
  };

  componentDidMount() {
    store
      .collection("students")
      .doc(this.state.code)
      .get()
      .then(res => {
        if (res.exists) {
          const path = res.data().ref.path;
          store
            .doc(path)
            .get()
            .then(res => {
              const { firstName, lastName, github } = res.data();
              this.setState({
                isLoading: false,
                firstName,
                lastName,
                github
              });
              this.getAutofill();
            })
            .catch(err => console.log(err));
        } else {
          cookie.remove("code");
          this.props.history.push("/verify");
        }
      })
      .catch(err => console.log(err));
  }

  getAutofill = () => {
    store
      .collection("autoFill")
      .doc("web")
      .collection("sections")
      .orderBy("order", "asc")
      .get()
      .then(sections => {
        let sectionsArray = [];
        let sprintArray = [];
        sections.forEach(section => {
          const { name, isProject } = section.data();
          if (isProject) {
            sectionsArray.push(name);
          } else {
            sprintArray.push(name);
          }
        });
        this.setState({
          autoFill: {
            sections: sectionsArray,
            sprints: sprintArray
          }
        });
      })
      .catch(err => {
        console.log(err);
      });
  };

  render() {
    const sendData = {
      isLoading: this.state.isLoading,
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      github: this.state.github
    };
    return (
      <Switch>
        <Route exact path="/retro" render={props => <Retro {...props} {...sendData} sections={this.state.autoFill.sections} />} />
        <Route
          path="/"
          render={props => <Dashboard {...props} {...sendData} />}
        />
      </Switch>
    );
  }
}

export default AuthRoutes;
