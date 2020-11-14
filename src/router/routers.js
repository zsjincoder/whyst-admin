import Main from '@/components/main'
// import parentView from '@/components/parent-view'

/**
 * iview-admin中meta除了原生参数外可配置的参数:
 * meta: {
 *  title: { String|Number|Function }
 *         显示在侧边栏、面包屑和标签栏的文字
 *         使用'{{ 多语言字段 }}'形式结合多语言使用，例子看多语言的路由配置;
 *         可以传入一个回调函数，参数是当前路由对象，例子看动态路由和带参路由
 *  hideInBread: (false) 设为true后此级路由将不会出现在面包屑中，示例看QQ群路由配置
 *  hideInMenu: (false) 设为true后在左侧菜单不会显示该页面选项
 *  notCache: (false) 设为true后页面在切换标签后不会缓存，如果需要缓存，无需设置这个字段，而且需要设置页面组件name属性和路由配置的name一致
 *  access: (null) 可访问该页面的权限数组，当前路由设置的权限会影响子路由
 *  icon: (-) 该页面在左侧菜单、面包屑和标签导航处显示的图标，如果是自定义图标，需要在图标名称前加下划线'_'
 *  beforeCloseName: (-) 设置该字段，则在关闭当前tab页时会去'@/router/before-close.js'里寻找该字段名对应的方法，作为关闭前的钩子函数
 * }
 */

export default [
  {
    path: '/login',
    name: 'login',
    meta: {
      title: 'Login - 登录',
      hideInMenu: true
    },
    component: () => import('@/view/login/login.vue')
  },
  {
    path: '/',
    name: '_home',
    redirect: '/login',
    component: Main,
    meta: {
      hideInMenu: true,
      notCache: true
    },
    children: [
      {
        path: '/home',
        name: 'home',
        meta: {
          hideInMenu: true,
          title: '首页',
          notCache: true,
          icon: 'md-home'
        },
        component: () => import('@/view/single-page/home')
      }
    ]
  },
  {
    path: '/user',
    name: 'user',
    meta: {
      hideInBread: true
    },
    component: Main,
    children: [
      {
        path: 'user_page',
        name: 'user_page',
        meta: {
          hideInMenu: false,
          title: '用户列表',
          notCache: false,
          icon: 'ios-color-filter'
        },
        component: () => import('@/view/main/user/User')
      }
    ]
  },
  {
    path: '/banner',
    name: 'banner',
    meta: {
      hideInBread: true
    },
    component: Main,
    children: [
      {
        path: 'banner_page',
        name: 'banner_page',
        meta: {
          hideInMenu: false,
          title: 'banner-管理',
          notCache: false,
          icon: 'md-images'
        },
        component: () => import('@/view/main/banner/Banner')
      }
    ]
  },
  {
    path: '/announcement',
    name: 'announcement',
    meta: {
      hideInBread: true
    },
    component: Main,
    children: [
      {
        path: 'announcement_page',
        name: 'announcement_page',
        meta: {
          hideInMenu: false,
          title: '公告管理',
          notCache: false,
          icon: 'ios-paper-outline'
        },
        component: () => import('@/view/main/announcement/Announcement')
      }
    ]
  },
  {
    path: '/question',
    name: 'question',
    meta: {
      hideInBread: true
    },
    component: Main,
    children: [
      {
        path: 'question_page',
        name: 'question_page',
        meta: {
          hideInMenu: false,
          title: '常见问题管理',
          notCache: false,
          icon: 'md-help-circle'
        },
        component: () => import('@/view/main/question/Question')
      }
    ]
  },
  {
    path: '/store',
    name: 'store',
    meta: {
      hideInBread: true
    },
    component: Main,
    children: [
      {
        path: 'store_page',
        name: 'store_page',
        meta: {
          hideInMenu: false,
          title: '门店管理',
          notCache: false,
          icon: 'ios-home'
        },
        component: () => import('@/view/main/store/Store')
      }
    ]
  },
  {
    path: '/order',
    name: 'order',
    meta: {
      hideInBread: true
    },
    component: Main,
    children: [
      {
        path: 'order_page',
        name: 'order_page',
        meta: {
          hideInMenu: false,
          title: '订单管理',
          notCache: false,
          icon: 'ios-desktop'
        },
        component: () => import('@/view/main/order/Order')
      }
    ]
  },
  {
    path: '/writeOffLog',
    name: 'writeOffLog',
    meta: {
      hideInBread: true
    },
    component: Main,
    children: [
      {
        path: 'writeOffLog_page',
        name: 'writeOffLog_page',
        meta: {
          hideInMenu: false,
          title: '核销日志',
          notCache: false,
          icon: 'ios-desktop'
        },
        component: () => import('@/view/main/writeOffLog/WriteOffLog')
      }
    ]
  },
  {
    path: '/withdraw',
    name: 'withdraw',
    meta: {
      hideInBread: true
    },
    component: Main,
    children: [
      {
        path: 'withdraw_page',
        name: 'withdraw_page',
        meta: {
          hideInMenu: false,
          title: '提现管理',
          notCache: false,
          icon: 'ios-jet'
        },
        component: () => import('@/view/main/withdraw/Withdraw')
      }
    ]
  },
  {
    path: '/commodity',
    name: 'commodity',
    meta: {
      // hideInBread: true
      title: '商品管理',
      hideInMenu: false,
      icon: 'ios-grid'
    },
    component: Main,
    children: [
      {
        path: 'inventory',
        name: 'inventory',
        meta: {
          hideInMenu: false,
          title: '库存单元',
          notCache: false,
          icon: 'ios-keypad'
        },
        component: () => import('@/view/main/commodity/inventory/Inventory')
      },
      {
        path: 'unit',
        name: 'unit',
        meta: {
          hideInMenu: false,
          title: '单元管理',
          notCache: false,
          icon: 'ios-keypad-outline'
        },
        component: () => import('@/view/main/commodity/unit/Unit')
      },
      {
        path: 'specification',
        name: 'specification',
        meta: {
          hideInMenu: false,
          title: '规格管理',
          notCache: false,
          icon: 'md-keypad'
        },
        component: () => import('@/view/main/commodity/specification/Specification')
      }
    ]
  },
  {
    path: '/401',
    name: 'error_401',
    meta: {
      hideInMenu: true
    },
    component: () => import('@/view/error-page/401.vue')
  },
  {
    path: '/500',
    name: 'error_500',
    meta: {
      hideInMenu: true
    },
    component: () => import('@/view/error-page/500.vue')
  },
  {
    path: '*',
    name: 'error_404',
    meta: {
      hideInMenu: true
    },
    component: () => import('@/view/error-page/404.vue')
  }
]
