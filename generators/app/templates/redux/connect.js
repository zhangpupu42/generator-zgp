import wrapActionCreators from './wrapActionCreators.js'
import {
	assign,
	warning,
	shallowEqual
} from './util.js'

const defaultMapStateToProps = state => ({}) // eslint-disable-line no-unused-vars
const defaultMapDispatchToProps = dispatch => ({
	dispatch
})

export function connect(mapStateToProps, mapDispatchToProps, option = {isComponent:false}) {
	const shouldSubscribe = Boolean(mapStateToProps)
	const mapState = mapStateToProps || defaultMapStateToProps
	const app = getApp()

	let mapDispatch
	if (typeof mapDispatchToProps === 'function') {
		mapDispatch = mapDispatchToProps
	} else if (!mapDispatchToProps) {
		mapDispatch = defaultMapDispatchToProps
	} else {
		mapDispatch = wrapActionCreators(mapDispatchToProps)
	}
	return function wrapWithConnect(pageConfig) {
		
		const LIFECYCLE = {
			ONLOAD: option.isComponent ? 'attached' : 'onLoad',
			ONUNLOAD: option.isComponent ? 'detached' : 'onUnload'
		}

		const {
			[LIFECYCLE.ONLOAD]: _onLoad,
			[LIFECYCLE.ONUNLOAD]: _onUnload,
		} = pageConfig

		function handleChange(options) {
			if (!this.unsubscribe) {
				return
			}
			const state = this.store.getState()
			const mappedState = mapState(state, options);
			if (!this.data || shallowEqual(this.data, mappedState)) {
				return;
			}
			this.setData(mappedState)
		}

		function onLoad(options, self=null) {
			let _this = self ? self : this
			_this.store = app.store;
			if (!_this.store) {
				warning("Store对象不存在!")
			}
			if (shouldSubscribe) {
				_this.unsubscribe = _this.store.subscribe(handleChange.bind(_this, options));
				handleChange.call(_this, options)
			}
			typeof _onLoad === 'function' && _onLoad.call(_this, options)
		}

		function onUnload(self=null) {
			let _this = self ? self : this
			typeof _onUnload === 'function' && _onUnload.call(_this)
			typeof _this.unsubscribe === 'function' && _this.unsubscribe()
		}

		function attached(options){
			onLoad(options, this)
		}
		function detached(){
			onUnload(this)
		}
		let lifeHook = {}
		if(option.isComponent){
			lifeHook = {
				attached,
				detached
			}
		}else{
			lifeHook = {
				onLoad,
				onUnload
			}
		}
		return assign({}, pageConfig, mapDispatch(app.store.dispatch), lifeHook)
	}
}

export function connectComponent(mapStateToProps, mapDispatchToProps) {
	return connect(mapStateToProps, mapDispatchToProps, {
		isComponent: true
	})
}
