module.exports = [
  {
    path: '/pages/loading/loading', // loading
    name: 'Loading',
    config: {
      navigationBarBackgroundColor: '#FFFFFF',
      navigationBarTextStyle: 'black'
    }
  },
  {
    path: '/pages/home/home', // 首页
    name: 'Home',
    config: {}
  },
  {
    path: '/pages/union-manage/union-manage', // 联盟管理
    name: 'UnionManage',
    config: {
      navigationBarTitleText: '联盟管理'
    }
  },
  {
    path: '/pages/union-create-active/union-create-active', // 联盟新建编辑活动
    name: 'UnionCA',
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
    path: '/pages/asset/asset', // 收入
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
  // {
  //   path: '/pages/example/example',
  //   name: 'Example',
  //   config: {
  //     enablePullDownRefresh: true,
  //     navigationBarTitleText: '示例'
  //   }
  // },
  {
    path: '/pages/merchant-data/merchant-data', // 商家活动数据页面
    name: 'MerchantData',
    config: {
      navigationBarTitleText: '活动数据',
      navigationBarBackgroundColor: '#1A1D3D',
      navigationBarTextStyle: 'white'
    }
  },
  {
    path: '/pages/staff-data/staff-data', // 员工活动数据页面
    name: 'StaffData',
    config: {
      navigationBarTitleText: '活动数据',
      navigationBarBackgroundColor: '#1A1D3D',
      navigationBarTextStyle: 'white'
    }
  },
  {
    path: '/pages/leader-data/leader-data', // 盟主活动数据页面
    name: 'LeaderData',
    config: {
      navigationBarTitleText: '活动数据',
      navigationBarBackgroundColor: '#1A1D3D',
      navigationBarTextStyle: 'white'
    }
  },
  {
    path: '/pages/error/error', // 异常
    name: 'Error',
    config: {
      disableScroll: true
    }
  }
]
