import React from "react";
import {
  Layout,
  Row,
  Col,
  Button,
  Card,
  Icon,
  Modal
} from "antd";
import MakeInput from "../Components/MakeInput";

class Retro extends React.Component {
  state = {
    isSubmitting: false,
    studyToday: "",
    projectSubmittion: "",
    rateProject: 2,
    rateDay: 2,
    finishToday: "",
    finishTommorrow: "",
    blockers: "",
    other: ""
  };

  onChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  submit = () => {
    this.setState({
      isSubmitting: true
    });
    this.openWindow();
    const thisFunc = this;
    Modal.confirm({
      title: "Did the airtable",
      content: "",
      okText: "Finished",
      cancelText: "Try Again",
      onOk() {
        thisFunc.props.history.push('/')
      },
      onCancel() {
        thisFunc.setState({
          isSubmitting: false
        })
      }
    });
  };

  openWindow = () => {
    let url = `https://airtable.com/shr8ZYuNjevMLRsxI?prefill_Student=${this.props.firstName.trim()}+${this.props.lastName.trim()}&prefill_Module=${encodeURI(
      this.state.studyToday
    )}&prefill_Project+Link=${encodeURI(
      this.state.projectSubmittion
    )}&prefill_PR+Rating=${this.state.rateProject}&prefill_Self+Rating=${
      this.state.rateDay
    }&prefill_Finished=${encodeURI(
      this.state.finishToday
    )}&prefill_Need+to+Finish=${encodeURI(
      this.state.finishTommorrow
    )}&prefill_Blockers=${encodeURI(
      this.state.blockers
    )}&prefill_Other=${encodeURI(this.state.other)}`;
    window.open(url);
  };

  render() {
    return (
      <Layout>
        <Layout.Content style={{ minHeight: "100vh", margin: "20px 10px" }}>
          <Card
            style={{ maxWidth: "600px", margin: "20px auto" }}
            title="Daily Standup"
            actions={[
              <Icon
                type="arrow-left"
                onClick={() => this.props.history.push("/")}
              />
            ]}
          >
            <p>
              Standup is an important part of everyday life as a developer.
              During your team standups, you'll give a status update, and note
              anything blocking you from making progress.
            </p>
            <p>
              Your standup report at Lambda School is similar. Your responses
              should be transparent about your progress, and where you need
              help. You'll discuss your blockers in your Team Meetings.
            </p>
          </Card>
          <Row
            gutter={24}
            style={{
              maxWidth: "600px",
              margin: "20px auto",
              padding: "10px 20px"
            }}
          >
            <MakeInput
              type="disabled"
              required
              value={`${this.props.firstName} ${this.props.lastName}`}
              title="Student"
              desc="Your name will be auto filled"
            />
            <MakeInput
              type="suggest"
              required
              title="What did you study today?"
              name="studyToday"
              onChange={select =>
                this.setState({
                  studyToday: select
                })
              }
              value={this.state.studyToday}
              desc="Use search to quickly find the module. Choose the one that matches the page you used in Training Kit"
              data={this.props.sections}
            />
            <MakeInput
              type="disabled"
              required
              value="¯\_(ツ)_/¯"
              title="How are you feeling today?"
              desc="Please fill this out on Airtable we don't want to deal with unicode and emojis"
            />
            <MakeInput
              type="input"
              required
              name="projectSubmittion"
              onChange={this.onChange}
              value={this.state.projectSubmittion}
              title="What's the URL for your submission of today's project?"
              desc="To submit GitHub Pull Requests's, please include your specific pull request URL"
            />
            <MakeInput
              type="rate"
              required
              title="On a scale of 1-3, how would you rate your project submission?"
              value={this.state.rateProject}
              onChange={value => {
                this.setState({
                  rateProject: value
                });
              }}
              desc="1 - Did not meet expectations, obvious bugs, missing functionality, took longer than expected, etc
              2 - Met expectations defined in the project in the given time
              3 - Went above and beyond, completed at least one stretch goal, or otherwise added upon the expectations of the project"
            />
            <MakeInput
              type="rate"
              required
              value={this.state.rateDay}
              onChange={value => {
                this.setState({
                  rateDay: value
                });
              }}
              title="On a scale of 1-3, how would you rate your overall performance and understanding today?"
              desc="Consider your attendance, code challenge, project, use of the help channel, participation in live instruction and team meeting."
            />
            <MakeInput
              type="textarea"
              title="What did you finish today?"
              value={this.state.finishToday}
              name="finishToday"
              onChange={this.onChange}
              required
            />
            <MakeInput
              type="textarea"
              title="What do you need to finish before tomorrow?"
              value={this.state.finishTommorrow}
              name="finishTommorrow"
              onChange={this.onChange}
              required
            />
            <MakeInput
              type="textarea"
              title="Anything blocking you, or breakthroughs you'd like to share?"
              desc="Blockers: what did you try, and what was the error?
              Breakthroughs: what was your 'a-ha' moment?"
              value={this.state.blockers}
              name="blockers"
              onChange={this.onChange}
              required
            />
            <MakeInput
              type="textarea"
              title="Anything else we should know about?"
              value={this.state.other}
              name="other"
              onChange={this.onChange}
            />
            <Col xs={24} style={{ margin: "20px 0", textAlign: "center" }}>
              <Button
                type="primary"
                onClick={this.submit}
                size="large"
                icon="link"
                loading={this.state.isSubmitting}
              >
                Submit
              </Button>
            </Col>
          </Row>
        </Layout.Content>
      </Layout>
    );
  }
}

export default Retro;
