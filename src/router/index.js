import Vue from 'vue'
import Router from 'vue-router'
import Container from './../components/Container'
import Home from './../components/Home'
import MutationModel from './../components/models/MutationModel'
import PatientModel from './../components/models/PatientModel'
import XrefModel from '../components/models/XrefModel'
import MrefModel from '../components/models/MrefModel'
import CategoricalModel from '../components/models/CategoricalModel'
import MutationsContainer from './../components/mutations/MutationsContainer'
import PatientsContainer from './../components/patients/PatientsContainer'
import NotFound from './../components/NotFound'

Vue.use(Router)

export default new Router({
  mode: 'history',
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
    {
      path: '/Mutation/:id',
      name: 'Mutation',
      component: MutationModel,
      props: (route) => ({
        mutation: route.params.mutation,
        id: route.params.id
      })
    },
    {
      path: '/Patient/:id',
      name: 'Patient',
      component: PatientModel,
      props: (route) => ({
        patient: route.params.patient,
        id: route.params.id
      })
    },
    {
      path: '/:entity/:name/:attribute',
      name: 'XREF',
      component: XrefModel,
      props: (route) => ({
        entity: route.params.entity,
        name: route.params.name,
        attribute: route.params.attribute
      })
    },
    {
      path: '/:entity/:label/:attribute',
      name: 'MREF',
      component: MrefModel,
      props: (route) => ({
        entity: route.params.entity,
        label: route.params.label,
        attribute: route.params.attribute
      })
    },
    {
      path: '/:entity/:name/:attribute',
      name: 'CATEGORICAL',
      component: CategoricalModel,
      props: (route) => ({
        entity: route.params.entity,
        name: route.params.name,
        attribute: route.params.attribute
      })
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
