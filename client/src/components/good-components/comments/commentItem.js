
import React, { Component } from 'react'
import { Row, Col, Rate } from 'antd'
import ImgWraper from 'components/common-components/imgWraper.js'

export default class CommentItem extends Component {
    render() {
        const rate = this.props.rate
        return (
            <div className="comment-item">
                <Row>
                    <Col span={4}>
                        <ImgWraper className="avatar-com" data-errorImgSrc={require('assets/img/default-avatar.jpeg')} src={rate.avatar} />
                    </Col>
                    <Col span={20}>
                        <div className="flex-box flex-ju-c-bt">
                            <span>{rate.name}</span>
                            <Rate disabled defaultValue={parseFloat(rate.rateScore)} />
                        </div>
                        <p>{rate.time}</p>
                        <p>{rate.comment}</p>
                    </Col>
                </Row>
            </div>
        )
    }
}