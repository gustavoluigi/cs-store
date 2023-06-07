import { useQuery } from 'react-query';
import TransactionsService from '../services/TransactionsService';

export const useGetTransactions = (select = null) => {
  const {
    data: transactions, error, isError, isLoading,
  } = useQuery(['transactions'], () => TransactionsService.getTransactions(), {
    select,
  });

  return {
    transactions, error, isError, isLoading,
  };
};
