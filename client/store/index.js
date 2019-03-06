import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const state = {
  pageSize: 3,
  modalShow: false,
  students: [{
    name: 'Tom',
      email: 'Tom@tom.com',
      status: true
    }, {
      name: 'Matt',
      email: 'Matt@Matt.com',
      status: false
    }, {
      name: 'Joe',
      email: 'Joe@Joe.com',
      status: true
    }, {
      name: 'Sam',
      email: 'Sam@Sam.com',
      status: true
  }],
  courses: [{
    title: 'Python',
    code: 'P0328',
  }, {
    title: 'JavaScript',
    code: 'JS9857',
  }, {
    title: 'HTML',
    code: 'H857',
  }, {
    title: 'PHP',
    code: 'PP856',
  }]
}

const mutations = {
  INIT_STORE(state) {
    if(localStorage.getItem('store')) {
      this.replaceState(
        Object.assign(state, JSON.parse(localStorage.getItem('store')))
      );
    }
  },
  ADD_STUDENT(state, newStudent){
     state.students.push(newStudent)
  },
  ADD_COURSE(state, newCourse){
    state.courses.push(newCourse)
  },
  EDIT_ITEM(state, payload){
  },
  REMOVE_ITEM(state, payload){
    if (payload.page === 'courses') {
      var courses = state.courses
      courses.splice(courses.indexOf(payload.index), 1)
    }
    else if (payload.page === 'users') {
      var students = state.students
      students.splice(students.indexOf(payload.index), 1)
    }
  },
  PAGE_SIZE(state, pageSize) {
     state.pageSize = pageSize
   },
   MODAL_ACTION(state) {
     state.modalShow ? state.modalShow = false : state.modalShow = true
   },
}

const actions = {
  addStudent({commit}, student){
    commit('ADD_STUDENT', student)
  },
  editItem({commit}, payload){
    commit('EDIT_ITEM', payload)
  },
  removeItem({commit}, payload){
    commit('REMOVE_ITEM', payload)
  },
  addCourse({commit}, course){
    commit('ADD_COURSE', course)
  },
  getPageSize({commit}, val){
    commit('PAGE_SIZE', val)
  },
  modalAction({commit}){
    commit('MODAL_ACTION')
  }
}
const getters = {
  pageSize: state => state.pageSize,
  students: state => state.students,
  courses: state => state.courses,
  searchWord: state => state.searchWord,
  modalShow: state => state.modalShow,
}


const store = new Vuex.Store({
  state,
  mutations,
  getters,
  actions
})

// Init store from localStorage on load
store.commit("INIT_STORE");

// Update localstorage for every mutation
store.subscribe((_mutation, state) => {
  localStorage.setItem("store", JSON.stringify(state));
});
export default store
