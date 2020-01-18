import Vue from 'vue'
import Vuex from 'vuex'
import homeServe from '../service/Home.service';
Vue.use(Vuex)
/*const state = () => {
  return {
    baseInfo: {},
    testList: [],
  }
}*/
export default function () {
  return new Vuex.Store({
    state: {
      baseInfo: {},
      testList: []
    },
    getters: {
      getBaseInfo: state => state.baseInfo,
      getTestList: state => state.testList,
    },
    mutations: {
      setBaseInfo (state, baseInfo) {
        // 变更状态
        state.baseInfo = baseInfo;
      },
      setTestList (state, testList) {
        // 变更状态
        state.testList = testList;
      }
    },
    actions: {
      getHomeDatas({ commit }) {
        return homeServe.getBaseInfo().then(res => {
          commit('setBaseInfo', res)
        });
      },
      getTestList({ commit }) {
        return homeServe.getTestList().then(res => {
          commit('setTestList', res)
        });
      }
    },
    modules: {
    }
  });
}
