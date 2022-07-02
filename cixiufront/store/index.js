import Vue from 'vue'
import Vuex from 'vuex'
import categoryApis from "@/core/apis/resources/common.js";
Vue.use(Vuex)
	
const store = new Vuex.Store({
    state: {
        tabbarList: [], // tabbar
		newsClassification: [], // 作品分类
		inheritedClassification: [], // 传承人分类
    },
    mutations: {
        SET_TABBARLIST(state, payload) {
			state.tabbarList = payload;
		},
		SET_CLASSIFICATION(state, payload) {
			state.newsClassification = payload?.filter(item => item.d_type === "作品分类");
		},
		SET_CLASSIFICATIONS(state, payload) {
			state.inheritedClassification = payload?.filter(item => item.d_type === "传统艺人分类");
		}
    },
    actions: {
		GET_CLASSIFICATION({ commit, state }) {
			!state.newsClassification.length && categoryApis.getCategoryList({
				datatype: 1,
				size: 100
			}).then(response => {
				if (response.code !== 0) return false;
				let templist = response?.data?.config || [];
				commit("SET_CLASSIFICATION", templist);
				commit("SET_CLASSIFICATIONS", templist);
			});
		},
    },
    getters:{
        tabbarList(state, getters){
            return state.tabbarList
        },
		newsClassification(state, getters){
		    return state.newsClassification
		},
		inheritedClassification(state, getters){
            return state.inheritedClassification
        },
    }
})
export default store