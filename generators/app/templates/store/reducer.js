import { INITIAL_STATE } from './store.js'
let app = getApp()
let indexReducer = (state = INITIAL_STATE, action) => {
	switch (action.type) {
		// UnreadInfo：更新未读数
		case 'Test_Event': {
			console.log('Test_Event');
			let tempState = Object.assign({}, state)
			let vals = action.payload
			tempState.testVal = vals
			return Object.assign({}, state, tempState)
		}
		case 'Test_Event1': {
			console.log('Test_Event1');
			app = getApp();
			let store = app.store;
			console.log(store)
			let tempState = Object.assign({}, state)
			let vals = action.payload
			tempState.testVal1 = vals
			// 在这里直接 dispatch 另一个函数必须使用异步
			setTimeout(()=>{
				store.dispatch({
					type: 'Test_Event2',
					payload:{
						val1: 'test Test_Event1 value1',
						val2: 'test Test_Event1 value2'
					}
				})
			},0)
			return Object.assign({}, state, tempState)
		}
		case 'Test_Event2': {
			console.log('Test_Event2');
			let tempState = Object.assign({}, state)
			let vals = action.payload
			tempState.testVal2 = vals
			return Object.assign({}, state, tempState)
		}
		case 'Test_Event3': {
			console.log('Test_Event3');
			let tempState = Object.assign({}, state)
			let vals = action.payload
			tempState.testVal3 = vals
			return Object.assign({}, state, tempState)
		}
		default:
			return state
	}
}

export default indexReducer
