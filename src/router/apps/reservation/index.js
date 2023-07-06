export default [
  {
    path: 'reservation',
    component: () => import('@/views/apps/reservation/ReservationView.vue'),
    children: [
      {
        path: '',
        name: 'apps-reservation-dashboard',
        component: () => import('@/component/apps/reservation/dashboard/Index.vue'),
        meta: {
          pageTitle: 'Reservasi',
          title: 'Reservasi',
          breadcrumb: [
            { text: 'Reservasi', active: true }
          ],
        },
      },
      {
        path: 'room',
        name: 'apps-reservation-room',
        component: () => import('@/component/apps/reservation/room/Index.vue'),
        meta: {
          pageTitle: 'Reservasi Ruangan',
          title: 'Reservasi',
          breadcrumb: [
            { text: 'Reservasi', to: {name: 'apps-reservation-dashboard'} },
            { text: 'Reservasi Ruangan', active: true }
          ],
        },
      },
      {
        path: 'dashboard-admin',
        name: 'apps-reservation-dashboard-admin',
        component: () => import('@/component/apps/reservation/dashboard-admin/Index.vue'),
        meta: {
          pageTitle: 'Administrasi Reservasi',
          title: 'Reservasi',
          breadcrumb: [
            { text: 'Reservasi', to: {name: 'apps-reservation-dashboard'} },
            { text: 'Administrasi Reservasi', active: true }
          ],
        },
      }
    ]
  }
]
