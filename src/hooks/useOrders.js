import { useMutation, useQuery } from 'react-query';
import { useNavigate } from 'react-router-dom';
import CustomersService from '../services/CustomersService';
import OrdersService from '../services/OrdersService';
import { triggerToast } from '../utils';

export const useGetOrdersandCustomer = (debounceSearch, year, month) => {
  const {
    data: orders,
    error,
    isError,
    isLoading,
    isFetched,
  } = useQuery(['orders', { debounceSearch, year, month }], () => OrdersService.getOrdersandCustomer(debounceSearch, year, month));

  return {
    orders,
    error,
    isError,
    isLoading,
    isFetched,
  };
};

export const useGetOrderProductsAndCustomer = (orderId) => {
  const {
    data,
    error,
    isError,
    isLoading,
  } = useQuery(['order', orderId], () => OrdersService.getOrderProductsAndCustomer(orderId));

  return {
    order: data?.order,
    orderProducts: data?.orderProducts,
    error,
    isError,
    isLoading,
  };
};

export const useGetOrders = () => {
  const {
    data,
    error,
    isError,
    isLoading,
    isFetched,
  } = useQuery('orders', () => OrdersService.getOrders());

  return {
    orders: data,
    error,
    isError,
    isLoading,
    isFetched,
  };
};
export const useGetOrdersByDate = (year, month) => {
  const {
    data,
    error,
    isError,
    isLoading,
    isFetched,
  } = useQuery('orders', () => OrdersService.getOrdersByDate(year, month));

  return {
    orders: data,
    error,
    isError,
    isLoading,
    isFetched,
  };
};

export const useCreateOrder = (order, products) => {
  const navigate = useNavigate();
  const { mutate } = useMutation(OrdersService.createOrder);

  const handleCreate = () => {
    mutate({ order, products }, {
      onSuccess: (data) => {
        triggerToast('success', 'Venda cadastrada com sucesso');
        setTimeout(() => {
          navigate(`/vendas/${data.id}`);
        }, 2000);
      },
      onError: (error) => {
        triggerToast('error', error.message);
      },
    });
  };

  return { handleCreate };
};
