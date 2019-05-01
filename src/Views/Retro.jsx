import React from "react";
import {
  Layout,
  Row,
  Col,
  Button,
  Card,
  Icon,
  Skeleton,
  Input,
  Rate,
  AutoComplete
} from "antd";

const MakeInput = ({ type, title, desc, required, isLoading, value, data }) => {
  if (type === "rate" && !isLoading) {
    return (
      <Col xs={24} style={{ margin: "20px 0" }}>
        <h3>
          {required && <span style={{ color: "#f5222d" }}>*</span>} {title}
        </h3>
        <p>{desc}</p>
        <Rate count={3} allowClear={false} />
      </Col>
    );
  }
  if (type === "suggest" && !isLoading) {
    return (
      <Col xs={24} style={{ margin: "20px 0" }}>
        <h3>
          {required && <span style={{ color: "#f5222d" }}>*</span>} {title}
        </h3>
        <p>{desc}</p>
        <AutoComplete
          dataSource={data}
          style={{ width: "80%" }}
          filterOption={(inputValue, option) =>
            option.props.children
              .toUpperCase()
              .indexOf(inputValue.toUpperCase()) !== -1
          }
        />
      </Col>
    );
  }
  if (type === "disabled" && !isLoading) {
    return (
      <Col xs={24} style={{ margin: "20px 0" }}>
        <h3>
          {required && <span style={{ color: "#f5222d" }}>*</span>} {title}
        </h3>
        <p>{desc}</p>
        <Input disabled value={value} style={{ width: "80%" }} />
      </Col>
    );
  }
  return (
    <Col xs={24}>
      <Skeleton active />
    </Col>
  );
};

class Retro extends React.Component {
  render() {
    return (
      <Layout>
        <Layout.Content style={{ minHeight: "100vh", margin: "20px 10px" }}>
          <Card
            style={{ maxWidth: "600px", margin: "20px auto" }}
            title="Daily Standup"
            actions={[
              <Icon type="arrow-left" onClick={() => this.props.history.push('/')} />
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
              desc="Use search to quickly find the module. Choose the one that matches the page you used in Training Kit"
              data={this.props.sections}
            />
            <MakeInput
              type="rate"
              title="On a scale of 1-3, how would you rate your project submission?"
              desc="1 - Did not meet expectations, obvious bugs, missing functionality, took longer than expected, etc
              2 - Met expectations defined in the project in the given time
              3 - Went above and beyond, completed at least one stretch goal, or otherwise added upon the expectations of the project"
            />
            <MakeInput
              type="rate"
              required
              title="On a scale of 1-3, how would you rate your overall performance and understanding today?"
              desc="Consider your attendance, code challenge, project, use of the help channel, participation in live instruction and team meeting."
            />
          </Row>
        </Layout.Content>
      </Layout>
    );
  }
}

export default Retro;
