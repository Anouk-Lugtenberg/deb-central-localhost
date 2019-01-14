import Vue from 'vue'
import Router from 'vue-router'
import Container from './../components/Container'
import Home from './../components/Home'
import MutationModel from './../components/models/MutationModel'
import PatientModel from './../components/models/PatientModel'
import PubMedModel from '../components/models/PublicationModel/PublicationModel'
import MutationsContainer from './../components/mutations/MutationsContainer'
import PatientsContainer from './../components/patients/PatientsContainer'
import ReferencesContainer from './../components/references/ReferencesContainer'
import NotFound from './../components/NotFound'
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
        },
        {
          path: '/References/page/:pageNumURL',
          name: 'ReferencesContainer',
          component: ReferencesContainer,
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
    {
      path: '/References',
      redirect: 'References/page/1'
    },
    /*
    paths for the model views of the application
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
      path: '/PubMed/:id',
      name: 'PubMed',
      component: PubMedModel,
      props: (route) => ({
        id: route.params.id
      })
    },
    /*
    Path for not found, * redirects every page which couldn't be found to /404
     */
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
