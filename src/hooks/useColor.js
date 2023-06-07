import { useMutation, useQuery } from 'react-query';

import ColorsService from '../services/ColorsService';
import { triggerToast } from '../utils';

export const useCreateColor = () => {
  const { mutate } = useMutation({
    mutationFn: ColorsService.createColor,
    mutationKey: 'createColor',
  });

  const createColor = (fields) => {
    mutate(fields, {
      onSuccess: (data) => {
        triggerToast('success', 'Cor criado com sucesso');
      },
      onError: (error) => {
        triggerToast('error', error.message);
      },
    });
  };

  return { createColor };
};

export const useGetColors = (select = null) => {
  const response = useQuery(['colors'], () => ColorsService.getColors(), {
    select,
  });

  console.log('response', response.data);

  return response;
};
