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
    path: '/pages/employee/employee', // 员工
    name: 'Employee',
    config: {
      navigationBarTitleText: '员工管理'
    }
  },
  {
    path: '/pages/example/example',
    name: 'Example',
    config: {
      enablePullDownRefresh: true,
      navigationBarTitleText: '示例'
    }
  },
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
  }
]
