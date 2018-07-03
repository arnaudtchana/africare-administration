export function RoutesConfig ($stateProvider, $urlRouterProvider) {
  'ngInject'

  var getView = (viewName) => {
    return `./views/app/pages/${viewName}/${viewName}.page.html`
  }

  var getLayout = (layout) => {
    return `./views/app/pages/layout/${layout}.page.html`
  }

  $urlRouterProvider.otherwise('/')

  $stateProvider
    .state('app', {
      abstract: true,
      views: {
        'layout': {
          templateUrl: getLayout('layout')
        },
        'header@app': {
          templateUrl: getView('header')
        },
        'footer@app': {
          templateUrl: getView('footer')
        },
        main: {}
      },
      data: {
        bodyClass: 'hold-transition skin-blue sidebar-mini'
      }
    })
    .state('app.landing', {
      url: '/',
      data: {
        auth: true
      },
      views: {
        'main@app': {
          templateUrl: getView('landing')
        }
      }
    })
    .state('app.tablessimple', {
      url: '/tables-simple',
      data: {
        auth: true
      },
      views: {
        'main@app': {
          template: '<tables-simple></tables-simple>'
        }
      }
    })
    .state('app.uiicons', {
      url: '/ui-icons',
      data: {
        auth: true
      },
      views: {
        'main@app': {
          template: '<ui-icons></ui-icons>'
        }
      }
    })
    .state('app.uimodal', {
      url: '/ui-modal',
      data: {
        auth: true
      },
      views: {
        'main@app': {
          template: '<ui-modal></ui-modal>'
        }
      }
    })
    .state('app.uitimeline', {
      url: '/ui-timeline',
      data: {
        auth: true
      },
      views: {
        'main@app': {
          template: '<ui-timeline></ui-timeline>'
        }
      }
    })
    .state('app.uibuttons', {
      url: '/ui-buttons',
      data: {
        auth: true
      },
      views: {
        'main@app': {
          template: '<ui-buttons></ui-buttons>'
        }
      }
    })
    .state('app.uigeneral', {
      url: '/ui-general',
      data: {
        auth: true
      },
      views: {
        'main@app': {
          template: '<ui-general></ui-general>'
        }
      }
    })
    .state('app.formsgeneral', {
      url: '/forms-general',
      data: {
        auth: true
      },
      views: {
        'main@app': {
          template: '<forms-general></forms-general>'
        }
      }
    })
    .state('app.chartjs', {
      url: '/charts-chartjs',
      data: {
        auth: true
      },
      views: {
        'main@app': {
          template: '<charts-chartjs></charts-chartjs>'
        }
      }
    })
    .state('app.comingsoon', {
      url: '/comingsoon',
      data: {
        auth: true
      },
      views: {
        'main@app': {
          template: '<coming-soon></coming-soon>'
        }
      }
    })
    .state('app.profile', {
      url: '/profile',
      data: {
        auth: true
      },
      views: {
        'main@app': {
          template: '<user-profile></user-profile>'
        }
      },
      params: {
        alerts: null
      }
    })
    .state('app.userlist', {
      url: '/user-lists',
      data: {
        auth: true
      },
      views: {
        'main@app': {
          template: '<user-lists></user-lists>'
        }
      }
    })
      .state('app.medecinlist', {
          url: '/medecin-lists',
          data: {
              auth: true
          },
          views: {
              'main@app': {
                  template: '<medecin-lists></medecin-lists>'
              }
          }
      })
      .state('app.maladielist', {
          url: '/maladie-lists',
          data: {
              auth: true
          },
          views: {
              'main@app': {
                  template: '<maladie-lists></maladie-lists>'
              }
          }
      })
      .state('app.allergielist', {
          url: '/allergie-lists',
          data: {
              auth: true
          },
          views: {
              'main@app': {
                  template: '<allergie-lists></allergie-lists>'
              }
          }
      })
      .state('app.vaccinlist', {
          url: '/vaccin-lists',
          data: {
              auth: true
          },
          views: {
              'main@app': {
                  template: '<vaccin-lists></vaccin-lists>'
              }
          }
      })
      .state('app.typevaccinlist', {
          url: '/typevaccin-lists',
          data: {
              auth: true
          },
          views: {
              'main@app': {
                  template: '<typevaccin-lists></typevaccin-lists>'
              }
          }
      })
      .state('app.hopitallist', {
          url: '/hopital-lists',
          data: {
              auth: true
          },
          views: {
              'main@app': {
                  template: '<hopital-lists></hopital-lists>'
              }
          }
      })
    .state('app.useredit', {
      url: '/user-edit/:userId',
      data: {
        auth: true
      },
      views: {
        'main@app': {
          template: '<user-edit></user-edit>'
        }
      },
      params: {
        alerts: null,
        userId: null
      }
    })
      .state('app.maladieedit', {
          url: '/maladie-edit/:maladieId',
          data: {
              auth: true
          },
          views: {
              'main@app': {
                  template: '<maladie-edit></maladie-edit>'
              }
          },
          params: {
              alerts: null,
              maladieId: null
          }
      })
      .state('app.allergieedit', {
          url: '/allergie-edit/:allergieId',
          data: {
              auth: true
          },
          views: {
              'main@app': {
                  template: '<allergie-edit></allergie-edit>'
              }
          },
          params: {
              alerts: null,
              allergieId: null
          }
      })
      .state('app.vaccinedit', {
          url: '/vaccin-edit/:vaccinId',
          data: {
              auth: true
          },
          views: {
              'main@app': {
                  template: '<vaccin-edit></vaccin-edit>'
              }
          },
          params: {
              alerts: null,
              vaccinId: null
          }
      })
      .state('app.typevaccinedit', {
          url: '/typevaccin-edit/:typevaccinId',
          data: {
              auth: true
          },
          views: {
              'main@app': {
                  template: '<typevaccin-edit></typevaccin-edit>'
              }
          },
          params: {
              alerts: null,
              typevaccinId: null
          }
      })
      .state('app.hopitaledit', {
          url: '/hopital-edit/:hopitalId',
          data: {
              auth: true
          },
          views: {
              'main@app': {
                  template: '<hopital-edit></hopital-edit>'
              }
          },
          params: {
              alerts: null,
              hopitalId: null
          }
      })
    .state('app.userroles', {
      url: '/user-roles',
      data: {
        auth: true
      },
      views: {
        'main@app': {
          template: '<user-roles></user-roles>'
        }
      }
    })
    .state('app.userpermissions', {
      url: '/user-permissions',
      data: {
        auth: true
      },
      views: {
        'main@app': {
          template: '<user-permissions></user-permissions>'
        }
      }
    })
    .state('app.userpermissionsadd', {
      url: '/user-permissions-add',
      data: {
        auth: true
      },
      views: {
        'main@app': {
          template: '<user-permissions-add></user-permissions-add>'
        }
      },
      params: {
        alerts: null
      }
    })
      .state('app.medecinadd', {
          url: '/medecin-add',
          data: {
              auth: true
          },
          views: {
              'main@app': {
                  template: '<medecin-add></medecin-add>'
              }
          },
          params: {
              alerts: null
          }
      })
      .state('app.allergieadd', {
          url: '/allergie-add',
          data: {
              auth: true
          },
          views: {
              'main@app': {
                  template: '<allergie-add></allergie-add>'
              }
          },
          params: {
              alerts: null
          }
      })
      .state('app.maladieadd', {
          url: '/maladie-add',
          data: {
              auth: true
          },
          views: {
              'main@app': {
                  template: '<maladie-add></maladie-add>'
              }
          },
          params: {
              alerts: null
          }
      })
      .state('app.vaccinadd', {
          url: '/vaccin-add',
          data: {
              auth: true
          },
          views: {
              'main@app': {
                  template: '<vaccin-add></vaccin-add>'
              }
          },
          params: {
              alerts: null
          }
      })
      .state('app.typevaccinadd', {
          url: '/typevaccin-add',
          data: {
              auth: true
          },
          views: {
              'main@app': {
                  template: '<typevaccin-add></typevaccin-add>'
              }
          },
          params: {
              alerts: null
          }
      })
      .state('app.hopitaladd', {
          url: '/hopital-add',
          data: {
              auth: true
          },
          views: {
              'main@app': {
                  template: '<hopital-add></hopital-add>'
              }
          },
          params: {
              alerts: null
          }
      })
    .state('app.userpermissionsedit', {
      url: '/user-permissions-edit/:permissionId',
      data: {
        auth: true
      },
      views: {
        'main@app': {
          template: '<user-permissions-edit></user-permissions-edit>'
        }
      },
      params: {
        alerts: null,
        permissionId: null
      }
    })
    .state('app.userrolesadd', {
      url: '/user-roles-add',
      data: {
        auth: true
      },
      views: {
        'main@app': {
          template: '<user-roles-add></user-roles-add>'
        }
      },
      params: {
        alerts: null
      }
    })
    .state('app.userrolesedit', {
      url: '/user-roles-edit/:roleId',
      data: {
        auth: true
      },
      views: {
        'main@app': {
          template: '<user-roles-edit></user-roles-edit>'
        }
      },
      params: {
        alerts: null,
        roleId: null
      }
    })
    .state('app.widgets', {
      url: '/widgets',
      data: {
        auth: true
      },
      views: {
        'main@app': {
          template: '<widgets></widgets>'
        }
      }
    })
    .state('login', {
      url: '/login',
      views: {
        'layout': {
          templateUrl: getView('login')
        },
        'header@app': {},
        'footer@app': {}
      },
      data: {
        bodyClass: 'hold-transition login-page'
      },
      params: {
        registerSuccess: null,
        successMsg: null
      }
    })
    .state('loginloader', {
      url: '/login-loader',
      views: {
        'layout': {
          templateUrl: getView('login-loader')
        },
        'header@app': {},
        'footer@app': {}
      },
      data: {
        bodyClass: 'hold-transition login-page'
      }
    })
    .state('register', {
      url: '/register',
      views: {
        'layout': {
          templateUrl: getView('register')
        },
        'header@app': {},
        'footer@app': {}
      },
      data: {
        bodyClass: 'hold-transition register-page'
      }
    })
    .state('userverification', {
      url: '/userverification/:status',
      views: {
        'layout': {
          templateUrl: getView('user-verification')
        }
      },
      data: {
        bodyClass: 'hold-transition login-page'
      },
      params: {
        status: null
      }
    })
    .state('forgot_password', {
      url: '/forgot-password',
      views: {
        'layout': {
          templateUrl: getView('forgot-password')
        },
        'header@app': {},
        'footer@app': {}
      },
      data: {
        bodyClass: 'hold-transition login-page'
      }
    })
    .state('reset_password', {
      url: '/reset-password/:email/:token',
      views: {
        'layout': {
          templateUrl: getView('reset-password')
        },
        'header@app': {},
        'footer@app': {}
      },
      data: {
        bodyClass: 'hold-transition login-page'
      }
    })
    .state('app.logout', {
      url: '/logout',
      views: {
        'main@app': {
          controller: function ($rootScope, $scope, $auth, $state, AclService) {
            $auth.logout().then(function () {
              delete $rootScope.me
              AclService.flushRoles()
              AclService.setAbilities({})
              $state.go('login')
            })
          }
        }
      }
    })
}
