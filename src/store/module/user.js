export default {
  state: {
    access: '',
    unreadCount: 2,
    avatarImgPath: 'https://dss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=2156833431,1671740038&fm=26&gp=0.jpg',
    token: '',
    authType: '',
    adminName: ''
  },
  getters: {
    getAccess: (state) => state.access,
    getToken: (state) => state.token,
    getAdminName: (state) => state.adminName
  },
  mutations: {
    setUserData(state, data) {
      let { token, authType } = data
      state.token = token
      state.adminName = authType
    }
  }
}
