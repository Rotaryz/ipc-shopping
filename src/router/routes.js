module.exports = [
  // {
  //   path: '/pages/example/example',
  //   name: 'Example',
  //   config: {
  //     enablePullDownRefresh: true,
  //     navigationBarTitleText: '示例'
  //   }
  // },
  {
    path: '/pages/home/home', // 首页
    name: 'Home',
    config: {
      navigationBarTitleText: '异业联盟'
    }
  },
  {
    path: '/pages/loading/loading', // loading
    name: 'Loading',
    config: {
      // navigationBarBackgroundColor: '#FFFFFF',
      // navigationBarTextStyle: 'black'
      navigationBarTitleText: '登录',
      backgroundTextStyle: 'light',
      navigationBarBackgroundColor: '#1A1D3D',
      disableScroll: true
    }
  },
  {
    path: '/pages/union-manage/union-manage', // 联盟管理
    name: 'UnionManage',
    config: {
      navigationBarTitleText: '联盟管理',
      backgroundColor: '#1A1D3D',
      backgroundTextStyle: 'light',
      enablePullDownRefresh: true
    }
  },
  {
    path: '/pages/union-create-active/union-create-active', // 联盟新建编辑活动
    name: 'UnionCA', // 名字不能超过<17
    config: {}
  },
  {
    path: '/pages/union-check-list/union-check-list', // 联盟审核列表
    name: 'UnionCheckList',
    config: {
      navigationBarTitleText: '审核列表',
      backgroundColor: '#1A1D3D',
      backgroundTextStyle: 'light',
      enablePullDownRefresh: true
    }
  },
  {
    path: '/pages/union-sort/union-sort', // 联盟-排序
    name: 'UnionSort',
    config: {
      navigationBarTitleText: '排序'
    }
  },
  {
    path: '/pages/employee/employee', // 员工
    name: 'Employee',
    config: {
      navigationBarTitleText: '员工管理',
      onReachBottomDistance: 50,
      backgroundColor: '#f6f7fa',
      enablePullDownRefresh: true
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
    path: '/pages/withdrawal-result/withdrawal-result', // 提现进度
    name: 'WithdrawResult',
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
    path: '/pages/merchant-data/merchant-data', // 商家活动数据页面
    name: 'MerchantData',
    config: {
      navigationBarTitleText: '活动数据',
      navigationBarBackgroundColor: '#1A1D3D',
      navigationBarTextStyle: 'white',
      enablePullDownRefresh: true,
      // 这儿添加要用的小程序组件
      usingComponents: {
        'ec-canvas': '../../../static/ec-canvas/ec-canvas'
      }
    }
  },
  {
    path: '/pages/staff-data/staff-data', // 员工活动数据页面
    name: 'StaffData',
    config: {
      navigationBarTitleText: '活动数据',
      navigationBarBackgroundColor: '#1A1D3D',
      navigationBarTextStyle: 'white',
      enablePullDownRefresh: true,
      // 这儿添加要用的小程序组件
      usingComponents: {
        'ec-canvas': '../../../static/ec-canvas/ec-canvas'
      }
    }
  },
  {
    path: '/pages/leader-data/leader-data', // 盟主活动数据页面
    name: 'LeaderData',
    config: {
      navigationBarTitleText: '活动数据',
      navigationBarBackgroundColor: '#1A1D3D',
      navigationBarTextStyle: 'white',
      enablePullDownRefresh: true,
      // 这儿添加要用的小程序组件
      usingComponents: {
        'ec-canvas': '../../../static/ec-canvas/ec-canvas'
      }
    }
  },
  {
    path: '/pages/activity-manage/activity-manage', // 商家活动管理页面
    name: 'ActivityManage',
    config: {
      navigationBarTitleText: '活动管理',
      navigationBarBackgroundColor: '#1A1D3D',
      navigationBarTextStyle: 'white',
      enablePullDownRefresh: true
    }
  },
  {
    path: '/pages/merchant-activity/merchant-activity', // 商家活动页面
    name: 'MerchantActivity',
    config: {
      navigationBarTitleText: '活动管理',
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
  },
  {
    path: '/pages/audit/audit', // 盟主-审核-详情
    name: 'Audit',
    config: {}
  },
  {
    path: '/pages/upload-coupon/upload-coupon', // 上传优惠卷
    name: 'UploadCoupon',
    config: {
      navigationBarTitleText: '上传优惠劵',
      navigationBarBackgroundColor: '#1A1D3D',
      navigationBarTextStyle: 'white',
      enablePullDownRefresh: true
    }
  },
  {
    path: '/pages/staff-activity/staff-activity', // 员工活动列表
    name: 'StaffActivity',
    config: {
      navigationBarTitleText: '活动管理',
      navigationBarBackgroundColor: '#1A1D3D',
      navigationBarTextStyle: 'white',
      enablePullDownRefresh: true
    }
  },
  {
    path: '/pages/staff-code/staff-code', // 员工活动二维码
    name: 'StaffCode',
    config: {
      navigationBarTitleText: '活动管理',
      navigationBarBackgroundColor: '#1A1D3D',
      navigationBarTextStyle: 'white'
    }
  },
  {
    path: '/pages/allocation-card/allocation-card', // 商家分配销卡
    name: 'AllocationCard',
    config: {
      navigationBarTitleText: '分配销卡数',
      navigationBarBackgroundColor: '#1A1D3D',
      navigationBarTextStyle: 'white'
    }
  },
  {
    path: '/pages/activity-detail/activity-detail', // 异业卡活动详情
    name: 'ActivityDetail',
    config: {
      navigationBarTitleText: '活动详情',
      navigationBarBackgroundColor: '#1A1D3D',
      navigationBarTextStyle: 'white'
    }
  }
]
