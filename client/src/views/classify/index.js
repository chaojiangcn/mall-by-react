import React, { Component } from 'react'
//公共组件
import WithHeader from 'components/common-components/withHeader'
import WithFooter from 'components/common-components/withFooter'

import Footer from 'components/common-components/footer'
import ClassifyList from 'components/classify-components/classifyList'

import ClassifyTitle from 'components/classify-components/classifyTitle'

@WithHeader({ifBackShow:false, titleText: '分类' })
@WithFooter
 class cateify extends Component {
	constructor() {
		super()
		this.state = {

			titleArr: [],
			list: []
		}
	};
	componentDidMount() {
		this.getCates()
	};
	getCates() {
		const url = $api.category.getCates
		$apiServer.get(url)
			.then($preAjaxHandler.call(this))
			.then(res => {
				let arr = res.data.map(item => {
					return this.getGoodsList(item.cateId)
				})
				Promise.all(arr).then(rep => {
					// console.log(rep)
					this.setState({
						list: rep
					})
				})
			}).catch($commonErrorHandler.apply(this, [url]))

	};
	getGoodsList(cateId) {
		return $apiServer.get($api.good.getGoodsByCate, { query: { cateId } }).then(res => {
			return res.data
		})
	}
	render() {
		return (
			<div className="classify">
				<div style={{ position: 'fixed', top: '0.8rem', left: '0', right: '0', zIndex: '99' }}><ClassifyTitle titleArr={this.state.list} /></div>
				<div style={{
					position: 'relative',
					top: '.8rem'
				}}>
					{
						this.state.list.map((item, idx) => {
							return (
								<ClassifyList key={item[0].cateId}
									list={item}
									cateId={item[0].cateId}
								/>
							)
						})
					}


				</div>
			</div>
		)
	}
}
export default cateify