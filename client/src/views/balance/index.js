import React, { Component } from 'react'
import { Row, Col } from 'antd'
import { Link } from 'react-router-dom'
import TitleBar from 'components/common-components/titleBar.js'
import Login from 'components/common-components/login.js'
import Signup from 'components/common-components/signup.js'

//图标
import iconNext from 'static/img/ic-next2.png'
import iconWechat from 'static/img/ic-wx-pay.png'
//引入mobx相关
import { observer } from 'mobx-react'
import store from 'store'
import event from 'utils/event'
const Balance = observer(class Balance extends Component {
    constructor() {
        super()
        this.state = {
            sendTime: '尽快',
            ifLoginShow: false,
            ifSignupShow: false
        }

    };

    componentDidMount() {
        event.on('showLogin',bool=>{
            this.setState({ifLoginShow:bool})
        })
        event.on('showSignup',bool=>{
            this.setState({ifSignupShow:bool})
        })
    };
   
   
    render() {
        const { ifLoginShow, ifSignupShow } = this.state
        return (
            <div className="balance" style={{ position: 'relative' }}>
                <TitleBar titleText="结算" />
                {
                    ifLoginShow ? <Login /> : null
                }
                {
                    ifSignupShow ? <Signup /> : null
                }
                <div className="hr-40"></div>
                <div className="flex-box flex-ju-c-bt h-100 bg-fff pd-h-20 ">
                    <span>请选择地址</span>
                    <img className="icon-1" src={iconNext} alt="" />
                </div>

                <Row className=" h-100 bg-fff pd-h-20 bd-top">
                    <Col span={4} >
                        <img className=" icon-2 " src={iconWechat} alt="" />
                    </Col>
                    <Col span={20} ><span>微信支付</span></Col>
                </Row>
                <div className="flex-box flex-ju-c-bt h-100 bg-fff  pd-h-20 bd-top">
                    <span>发票类型</span>
                    <div className="flex-box">
                        <span >不需要发票</span>
                        <img className="icon-1" src={iconNext} alt="" />
                    </div>
                </div>
                <Link to={`/sendTime`}>
                    <div className="flex-box flex-ju-c-bt h-100 bg-fff  pd-h-20 bd-top">
                        <span>送货时间</span>
                        <div className="flex-box">
                            <span>{this.state.sendTime}</span>
                            <img className="icon-1" src={iconNext} alt="" />
                        </div>
                    </div>
                </Link>
                <div className="hr"></div>
                <div className="bg-fff  ">
                    {
                        Object.keys(store.balance.balance).map((item, idx) => {
                            return (
                                <div key={idx} className="pd-20">
                                    <Row>
                                        <Col span={5}>
                                            <img src={JSON.parse(store.balance.balance[item].imgs)[0]} alt="" />
                                        </Col>
                                        <Col span={19} className="pd-lf-20">
                                            <p>{store.balance.balance[item].goodName}</p>
                                            <div className="flex-box flex-ju-c-bt">
                                                <span>售价：¥{store.balance.balance[item].price}元x{store.balance.balance[item].number}</span>
                                                <span>{store.balance.balance[item].price * store.balance.balance[item].number}元</span>
                                            </div>
                                        </Col>
                                    </Row>
                                </div>
                            )
                        })
                    }
                </div>
                <Row className="balance-footer bg-fff">
                    <Col span={14} className="flex-box price">
                        共{store.balance.balanceNum}件,合计：{store.balance.balancePrice}元
                    </Col>
                    <Col onClick={()=>{this.setState({ifLoginShow:true})}} span={10} className="flex-box pay">去付款</Col>
                </Row>
            </div>
        )
    }
})
export default Balance