import Vue from 'vue'
import Router from 'vue-router'
import Container from './../components/Container'
import Home from './../components/Home'
import MutationModel from './../components/models/MutationModel'
import PatientModel from './../components/models/PatientModel'
import MutationsContainer from './../components/mutations/MutationsContainer'
import PatientsContainer from './../components/patients/PatientsContainer'
import NotFound from './../components/NotFound'
import GenomeBrowser from '../components/genomeBrowser/GenomeBrowser'
import { INITIAL_STATE } from '../store/state'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: INITIAL_STATE.baseUrl,
  routes: [
    {
      path: '/',
      redirect: '/home',
      component: Container,
      children: [
        {
          path: '/home',
          name: 'Home',
          component: Home
        },
        {
          path: '/Mutations/page/:pageNumURL',
          name: 'MutationsContainer',
          component: MutationsContainer,
          props: (route) => ({
            pageNumURL: route.params.pageNumURL
          })
        },
        {
          path: '/Patients/page/:pageNumURL',
          name: 'PatientsContainer',
          component: PatientsContainer,
          props: (route) => ({
            pageNumURL: route.params.pageNumURL
          })
        }
      ]
    },
    /*
    redirects for clicking on mutation/patients links in page-header
     */
    {
      path: '/Mutations',
      redirect: '/Mutations/page/1'
    },
    {
      path: '/Patients',
      redirect: '/Patients/page/1'
    },
    /*
    redirect for app in molgenis
     */
    {
      path: '/Mutation/:id',
      name: 'Mutation',
      component: MutationModel,
      props: (route) => ({
        id: route.params.id
      })
    },
    {
      path: '/Patient/:id',
      name: 'Patient',
      component: PatientModel,
      props: (route) => ({
        id: route.params.id
      })
    },
    {
      path: '/GenomeBrowser',
      component: GenomeBrowser
    },
    {
      path: '/404',
      component: NotFound
    },
    {
      path: '*',
      redirect: '/404'
    }
  ]
})
