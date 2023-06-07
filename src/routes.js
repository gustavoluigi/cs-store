import { useRoutes } from 'react-router-dom';
import Private from './layout/Private';
import Login from './pages/Auth/Login';
import Register from './pages/Auth/Register';
import CreateCustomer from './pages/Customers/Create';
import Customers from './pages/Customers/List';
import ShowCustomer from './pages/Customers/Show';
import Dashboard from './pages/Dashboard';
import CreateOrder from './pages/Orders/Create';
import EditOrder from './pages/Orders/Edit';
import Orders from './pages/Orders/List';
import Order from './pages/Orders/Show';
import CreateProduct from './pages/Products/Create';
import Products from './pages/Products/List';
import CreateProductVariation from './pages/Products/ProductVariation/Create';
import ShowProductVariation from './pages/Products/ProductVariation/Show';
import Product from './pages/Products/Show';
import Reports from './pages/Reports';
import MonthStatsPDF from './pages/Reports/MonthStatsPDF';

export default function Router() {
  return useRoutes([
    {
      path: '/',
      element: <Login />,
    },
    {
      path: 'cadastrar',
      element: <Register />,
    },
    {
      path: 'dashboard',
      element: <Private />,
      children: [
        {
          path: '',
          element: <Dashboard />,
        },
      ],
    },
    {
      path: 'vendas',
      element: <Private />,
      children: [
        {
          index: true,
          path: '',
          element: <Orders />,
        },
        {
          path: 'criar',
          element: <CreateOrder />,
        },
        {
          path: ':id',
          element: <Order />,
        },
        {
          path: ':id/editar',
          element: <EditOrder />,
        },
      ],
    },
    {
      path: 'produtos',
      element: <Private />,
      children: [
        {
          index: true,
          path: '',
          element: <Products />,
        },
        {
          path: 'criar',
          element: <CreateProduct />,
        },
        {
          path: ':id/variacoes',
          element: <ShowProductVariation />,
        },
        {
          path: ':id',
          element: <Product />,
        },
        {
          path: ':id/variacoes/criar',
          element: <CreateProductVariation />,
        },
      ],
    },

    {
      path: 'clientes',
      element: <Private />,
      children: [
        {
          index: true,
          path: '',
          element: <Customers />,
        },
        {
          path: 'criar',
          element: <CreateCustomer />,
        },
        {
          path: ':id',
          element: <ShowCustomer />,
        },
      ],
    },

    {
      path: 'relatorios',
      element: <Private />,
      children: [
        {
          path: '',
          element: <Reports />,
        },
      ],
    },
    {
      path: 'relatorio-mensal/:month/:year',
      element: <MonthStatsPDF />,
    },
  ]);
}
