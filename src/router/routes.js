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
    path: '/pages/asset/asset', // 收入 income
    name: 'Asset',
    config: {
      navigationBarTitleText: '收入',
      disableScroll: true
    }
  },
  {
    path: '/pages/withdraw/withdraw', // 提现
    name: 'Withdraw',
    config: {
      navigationBarTitleText: '提现',
      disableScroll: true,
      backgroundColor: '#F6F7FA'
    }
  },
  {
    path: '/pages/bind-card/bind-card', // 绑定银行卡
    name: 'BindCard',
    config: {
      navigationBarTitleText: '绑定银行卡',
      disableScroll: true,
      backgroundColor: '#F6F7FA'
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
