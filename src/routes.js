/*!

=========================================================
* Material Dashboard React - v1.9.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-react
* Copyright 2020 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/material-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
// @material-ui/icons
import Dashboard from '@material-ui/icons/Dashboard';
import Person from '@material-ui/icons/Person';
// core components/views for Admin layout
import DashboardPage from 'views/Dashboard/Dashboard.js';
import UserProfile from 'views/UserProfile/UserProfile.js';
import TableList from 'views/TableList/TableList.js';

const dashboardRoutes = [
  {
    path: '/dashboard',
    name: 'Inicio',
    icon: Dashboard,
    component: DashboardPage,
    layout: '/admin',
  },
  {
    path: '/user',
    name: 'Perfil',
    icon: Person,
    component: UserProfile,
    layout: '/admin',
  },
  {
    path: '/schedule',
    name: 'Mi horario',
    icon: 'content_paste',
    component: TableList,
    layout: '/admin',
  },
];

export default dashboardRoutes;
