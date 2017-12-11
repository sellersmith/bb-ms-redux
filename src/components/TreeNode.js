import React, { Component } from 'react'
import css from '../styles/index.css'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as actions from '../actions'
import _ from 'underscore'
import * as libs from '../libs/libs'

/**
 * Partially use redux,
 * with files and api, we GET (modify store) them from store, use redux
 * with {isExpanded} and {children}, those 2 variables does not affect store, do not use redux
 */
class TreeNode extends Component {
	browseFiles = () => {
		const path = this.props.path ? this.props.path : '/'
		this.props.fetchFiles(path, this.props.config.getAllFiles)
		this.props.setPathToLocal(path)
	}

	toggleTreeNode = e => {
		e.stopPropagation()
		if (!this.props.isExpanded) {
			this.props.checkAndExpand(
				this.props.path,
				this.props.config.getAllFiles
			)
		}
		else {
			this.props.collapseTreeNode(this.props.path)
		}
	}

	render() {
		if (this.props.isExpanded) {
			return (
				<div>
					<div
						className={`${css['tree-view__item']} ${this.props
							.path === this.props.currentPath
							? css['active']
							: ''}`}
					>
						<div className={`${css['detail']}`}>
							<i
								onClick={this.toggleTreeNode}
								className="fa fa-minus-square-o"
							/>
							<span
								onClick={this.browseFiles}
								className={`${css['marg-0']}`}
							>
								{' '}{this.props.name}
							</span>
						</div>
					</div>
					<div className={`${css['tree-view__sub-item']}`}>
						{_.map(this.props.children, child => {
							return (
								<ConnectedTreeNode
									path={`${this.props.path}${child.name}/`}
									key={child.name}
									{...child}
								/>
							)
						})}
					</div>
				</div>
			)
		} else {
			return (
				<div
					className={`${css['tree-view__item']} ${this.props.path ===
					this.props.currentPath
						? css['active']
						: ''}`}
					key={this.props.name}
				>
					{this.props.type === 'dir'
						? <div className={`${css['detail']}`}>
								<i
									onClick={this.toggleTreeNode}
									className="fa fa-plus-square-o"
								/>
								<span
									onClick={this.browseFiles}
									className={`${css['marg-0']}`}
								>
									{' '}{this.props.name}
								</span>
							</div>
						: null}
				</div>
			)
		}
	}
}

function mapStateToProps(state) {
	return {
		treeNodes: state.fileReducer.treeNodes,
		config: state.generalReducer.config,
		currentPath: state.fileReducer.currentPath
	}
}

function mapDispatchToProps(dispatch) {
	return bindActionCreators(actions, dispatch)
}

const ConnectedTreeNode = connect(mapStateToProps, mapDispatchToProps)(TreeNode)

export default ConnectedTreeNode
