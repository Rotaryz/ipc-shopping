module.exports = [
  {
    path: '/pages/loading/loading', // loading
    name: 'Loading',
    config: {
      navigationBarBackgroundColor: '#FFFFFF'
    }
  },
  {
    path: '/pages/home/home', // 首页
    name: 'Home',
    config: {}
  },
  {
    path: '/pages/employee/employee', // 员工
    name: 'Employee',
    config: {
      navigationBarTitleText: '员工管理',
      onReachBottomDistance: 50
    }
  },
  {
    path: '/pages/code-add/code-add', // 添加员工
    name: 'CodeAdd',
    config: {
      navigationBarTitleText: '员工管理',
      disableScroll: true
    }
  },
  {
    path: '/pages/example/example',
    name: 'Example',
    config: {
      enablePullDownRefresh: true,
      navigationBarTitleText: '示例'
    }
  }
]
