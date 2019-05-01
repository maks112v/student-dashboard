import React, { useState } from "react";
import { Col, Skeleton, Input, Rate, AutoComplete, Form } from "antd";

const MakeInput = ({
  type,
  title,
  desc,
  required,
  isLoading,
  value,
  data,
  onChange,
  name
}) => {
  let [valStatus, setStatus] = useState(false)
  const validate = ({type, input}) => {
    if(type === "url"){
  
    }
    else {
      if(input){
        setStatus(true)
      }
    }
  }

  if (type === "rate" && !isLoading) {
    return (
      <Col xs={24} style={{ margin: "20px 0" }}>
        <h3>
          {required && <span style={{ color: "#f5222d" }}>*</span>} {title}
        </h3>
        <p>{desc}</p>
        <Rate
          count={3}
          allowClear={false}
          value={value}
          onChange={onChange}
          name={name}
        />
      </Col>
    );
  }
  if (type === "input" && !isLoading) {
    return (
      <Col xs={24} style={{ margin: "20px 0" }}>
        <h3>
          {required && <span style={{ color: "#f5222d" }}>*</span>} {title}
        </h3>
        <p>{desc}</p>
        <Form.Item validateStatus={valStatus ? 'success': ''} hasFeedback>
          <Input
            style={{ width: "80%" }}
            value={value}
            onChange={onChange}
            name={name}
          />
        </Form.Item>
      </Col>
    );
  }
  if (type === "textarea" && !isLoading) {
    return (
      <Col xs={24} style={{ margin: "20px 0" }}>
        <h3>
          {required && <span style={{ color: "#f5222d" }}>*</span>} {title}
        </h3>
        <p>{desc}</p>
        <Input.TextArea
          style={{ width: "80%" }}
          value={value}
          autosize={{ minRows: 2, maxRows: 6 }}
          onChange={onChange}
          name={name}
          onBlur={() => validate('text', value)}
        />
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
          value={value}
          dataSource={data}
          style={{ width: "80%" }}
          onChange={onChange}
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

export default MakeInput;
