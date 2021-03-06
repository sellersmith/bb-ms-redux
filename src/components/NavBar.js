import React, { Component } from 'react'
import css from '../styles/index.css'
import * as actions from '../actions'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import $ from 'jquery'
import _ from 'underscore'
import * as libs from '../libs/libs'

class NavBar extends Component {
	componentWillMount = () => {
		$(document).ready(() => {
			$('#button-upload').click(() => {
				$('#upload-photo').click()
			})
		})
	}

	changeViewTypeGrid = () => {
		const { changeViewType } = this.props
		changeViewType('grid')
	}

	changeViewTypeList = () => {
		const { changeViewType } = this.props
		changeViewType('list')
	}

	onSearch = e => {
		this.props.updateSearchString(e.target.value)
	}

	createFolder = () => {
		this.props.createFolder(
			this.props.currentPath,
			this.props.files
		)
	}

	deleteMultiFiles = e => {
		this.props.deleteMultiFiles(
			this.props.selectedFiles,
			this.props.currentPath
		)
	}

	uploadFile = e => {
		const uploadFiles = e.target.files
		if (uploadFiles) {
			this.props.handleUploadFiles(
				this.props.files,
				uploadFiles
			)
		}
		this.fileInput.value = ''
	}

	render() {
		return (
			<div
				className={`${css['box__footer']} ${css['border-bottom']} ${css[
					'flex'
				]} ${css['center']}`}
			>
				<div className={`${css['menu']} ${css['flex']}`}>
					<div className={`${css['flex3']}`}>
						<div className={`${css['flex']}`}>
							<div className={`${css['menu__item']}`}>
								<button
									className={`${css['btn']} ${this.props
										.viewType === 'grid'
										? css['active']
										: ''} jsn-btn jsn-btn-outline-secondary jsn-btn-sm`}
									onClick={
										this.changeViewTypeGrid
									}
								>
									<i className="fa fa-th-large"></i>
								</button>
								<button
									className={`${css['btn']} ${this.props
										.viewType === 'list'
										? css['active']
										: ''} jsn-btn jsn-btn-outline-secondary jsn-btn-sm`}
									onClick={
										this.changeViewTypeList
									}
								>
									<i className="fa fa-th-list"></i>
								</button>
							</div>
							<div className={`${css['menu__item']}`}>
								<input
									ref={n => {
										return (this.fileInput = n)
									}}
									id="upload-photo"
									style={{
										opacity: 0,
										position: 'absolute',
										zIndex: -1,
										visibility: 'hidden'
									}}
									type="file"
									onChange={this.uploadFile}
									multiple
								/>
								<button
									id="button-upload"
									className={`${css['btn']} jsn-btn jsn-btn-outline-secondary jsn-btn-sm`}
								>
									Upload
								</button>
								<button
									onClick={this.createFolder}
									className={`${css['btn']} jsn-btn jsn-btn-outline-secondary jsn-btn-sm`}
								>
									Create New Folder
								</button>
								{!_.isEmpty(this.props.selectedFiles)
									? <button
										onClick={
											this.deleteMultiFiles
										}
										className={`${css['btn']} jsn-btn jsn-btn-danger jsn-btn-sm`}
									>
										Delete
									</button>
									: null}
							</div>
						</div>
					</div>
					<div className={`${css['search-input']}`}>
						<div className="jsn-input-group">
							<span className="jsn-input-group-addon"><i className="fa fa-search" /></span>
							<input
								type="text"
								className={`jsn-form-control`}
								placeholder="Search"
								onChange={this.onSearch}
								value={this.props.searchString}
							/>
						</div>
					</div>
				</div>
			</div>
		)
	}
}
function mapStateToProps(state) {
	return {
		viewType: state.generalReducer.viewType,
		currentPath: state.fileReducer.currentPath,
		selectedFiles: state.fileReducer.selectedFiles,
		searchString: state.fileReducer.searchString,
		files: libs.getNodeByPath(
			state.fileReducer.treeNodes,
			state.fileReducer.currentPath
		).children
	}
}

function mapDispatchToProps(dispatch) {
	return bindActionCreators(actions, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(NavBar)
