const vux = {
	state: {
		isLoading: false,
		direction: 'forward',
		// true 不是app环境 false 手机app环境
		apptype: false
	},
	mutations: {
		SET_DEMOPOSTION: (state, top) => {
			console.log('top')
			console.log(top)
			state.top = top
		},
		SET_LOADINGS: (state, isLoading) => {
			state.isLoading = isLoading
		},
		SET_DIRATION: (state, direction) => {
			state.direction = direction
		},
		SET_APPTYPE: (state, type) => {
			state.apptype = type
		}
	},
	actions: {
		updateDemoPosition({
			commit
		}, top) {
			commit('SET_DEMOPOSTION', top)
		},
		updateLoadingStatus({
			commit
		}, isLoading) {
			commit('SET_LOADINGS', isLoading)
		},
		updateDirection({
			commit
		}, direction) {
			commit('SET_DIRATION', direction)
		},
		updateAppType({
			commit
		}, type) {
			commit('SET_APPTYPE', type)
		}
	}
}

export default vux