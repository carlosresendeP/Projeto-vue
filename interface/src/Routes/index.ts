import { createRouter, createWebHistory } from "vue-router";
import MainLayout from "../layouts/MainLayout.vue";
import ClientsPage from "../pages/ClientsPage.vue";
import DemandsPage from "../pages/DemandsPage.vue";
import KanbanPage from "../pages/KanbanPage.vue";
import ReportsPage from "../pages/ReportsPage.vue";

//variavel que recebe as rotas
const routes = [
  {
    path: '/',
    component: MainLayout,
    redirect: '/clients',
    children: [
      { path: 'clients', component: ClientsPage },
      { path: 'demands', component: DemandsPage },
      { path: 'kanban', component: KanbanPage },
      { path: 'reports', component: ReportsPage },
    ],
  },
]

const router = createRouter({
    history: createWebHistory(),
    routes
})


export default router