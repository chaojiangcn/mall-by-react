import React from "react";
import {
  List,
  Button,
  WhiteSpace,
  WingBlank,
  InputItem,
  Toast
} from "antd-mobile";
import { createForm } from "rc-form";

import PropTypes from "prop-types";
import { connect } from "dva";
@connect(({ app }) => ({ app }))
class BindPhone extends React.Component {
  constructor() {
    super();
    this.state = {
      isCodeBtnEnabled: false
    };
  }
  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields(async(err, values) => {
      if (err) {
        console.log(e);
      } else {
        const query = {
          phone: this.props.form.getFieldValue("phone"),
          code: this.props.form.getFieldValue("code")
        };
        query.phone = query.phone.replace(/\s/g, "");
        const url = window.$api.phone.bindPhone;
        try {
          const res = await window.$http.post(url, { query });
          Toast.info(res.msg);
        } catch (err) {
          window.$commonErrorHandler(url)(err);
        }
      }
    });
  };
  sendSms = async () => {
    const query = { phone: this.props.form.getFieldValue("phone") };
    query.phone = query.phone.replace(/\s/g, "");
    const url = window.$api.phone.sendSms;
    try {
      await window.$http.get(url, { query });
    } catch (err) {
      window.$commonErrorHandler(url)(err);
    }
  };
  render() {
    const { isCodeBtnEnabled } = this.state;
    const { getFieldProps } = this.props.form;
    const {user}=this.props.app
    return (
      <div style={{ paddingTop: ".2rem" }}>
        <WingBlank>
          <List>
            <InputItem
              {...getFieldProps("phone")}
              type="phone"
              placeholder="输入手机号"
              defaultValue={
                user && user.phone
                  ? user.phone
                  : null
              }
              clear
              moneyKeyboardAlign="left"
            />
          </List>

          <WhiteSpace />
          <List>
            <div className="flex-box flex-ju-c-bt">
              <div className="flex-1">
                <InputItem
                  {...getFieldProps("code")}
                  type="text"
                  placeholder="验证码"
                  clear
                  moneyKeyboardAlign="left"
                />
              </div>

              <Button
                type="ghost"
                inline
                size="small"
                className="am-button-borderfix"
                disabled={isCodeBtnEnabled}
                onClick={this.sendSms}
                style={{ color: "#fff" }}
              >
                获取验证码
              </Button>
            </div>
          </List>

          <WhiteSpace />
          <List>
            <Button
              onClick={this.handleSubmit}
              type="primary"
              style={{ color: "#fff" }}
            >
              提交
            </Button>
          </List>
        </WingBlank>
      </div>
    );
  }
}
BindPhone.propTypes = {
  dispatch: PropTypes.func,
  app: PropTypes.object
};
const bind_phone = createForm()(BindPhone);

export default (bind_phone);
