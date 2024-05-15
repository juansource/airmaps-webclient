// store.js
import { createStore } from 'vuex';

export default createStore({
  state: {
    currentProjectId: null
  },
  mutations: {
    setCurrentProjectId(state, projectId) {
        console.log('Mutation called: Setting currentProjectId to', projectId); // For debugging
        state.currentProjectId = projectId;
    }
  },
  actions: {
    selectProject({ commit }, projectId) {
        // console.log('Action called: selectProject with', projectId); // For debugging
        commit('setCurrentProjectId', projectId);
      }
  },
  getters: {
    getCurrentProjectId: state => state.currentProjectId
  }
});