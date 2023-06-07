import { useMutation, useQuery } from 'react-query';

import SizesService from '../services/SizesService';
import { triggerToast } from '../utils';

export const useCreateSize = () => {
  const { mutate } = useMutation({
    mutationFn: SizesService.createSize,
    mutationKey: 'createSize',
  });

  const createSize = (fields) => {
    mutate(fields, {
      onSuccess: (data) => {
        triggerToast('success', 'Tamanho criado com sucesso');
      },
      onError: (error) => {
        triggerToast('error', error.message);
      },
    });
  };

  return { createSize };
};

export const useGetSizes = (select = null) => {
  const response = useQuery(['sizes'], () => SizesService.getSizes(), {
    select,
  });

  return response;
};
