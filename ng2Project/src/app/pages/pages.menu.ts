export const PAGES_MENU = [
  {
    path: 'pages',
    children: [
      {
        path: 'report',
        data: {
          menu: {
            title: '报告',
            icon: 'ion-android-home',
            selected: false,
            expanded: false,
            order: 0
          }
        },
        children: [
          {
            path: 'list',
            data: {
              menu: {
                title: '申请工作站',
              }
            }
          },
          {
            path: 'reportlist',
            data: {
              menu: {
                title: '诊断报告列表',
              }
            }
          }
        ]
      },
      {
        path: 'tables',
        data: {
          menu: {
            title: '影像',
            icon: 'ion-grid',
            selected: false,
            expanded: false,
            order: 500,
          }
        },
        children: [
/*          {
            path: 'basictables',
            data: {
              menu: {
                title: 'general.menu.basic_tables',
              }
            }
          },
          {
            path: 'smarttables',
            data: {
              menu: {
                title: 'general.menu.smart_tables',
              }
            }
          },
          {
            path: 'datatables',
            data: {
              menu: {
                title: 'Data Tables',
              }
            }
          },
          {
            path: 'hottables',
            data: {
              menu: {
                title: 'Hot Tables',
              }
            }
          },*/
          {
            path: 'imageTable',
            data: {
              menu: {
                title: '影像诊断工作站',
              }
            }
          },
          {
            path: 'imageGallery',
            data: {
              menu: {
                title: '影像中心',
              }
            }
          }
        ]
      },
      {
        path: 'profile',
        data: {
          menu: {
            title: '个人中心',
            icon: 'ion-android-home',
            pathMatch: 'prefix',
            selected: false,
            expanded: false,
            order: 0,
          },
        },
        children:[
          {
            path:'dataTables',
            data:{
              menu:{
                title:'我的报告'
              }
            }
          },
          // {
          //   path: 'dataTableRecord',
          //   data: {
          //     menu: {
          //       title: '个人影像列表'
          //     }
          //   }
          // },
          {
            path:'personalInform',
            data:{
              menu:{
                title:'个人信息管理'
              }
            }
          },
        ]
      }
    ]
  }
];
