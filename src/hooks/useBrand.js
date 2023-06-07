import { useMutation, useQuery } from 'react-query';

import BrandsService from '../services/BrandsService';
import { triggerToast } from '../utils';

export const useCreateBrand = () => {
  const { mutate } = useMutation({
    mutationFn: BrandsService.createBrand,
    mutationKey: 'createBrand',
  });

  const createBrand = (fields) => {
    mutate(fields, {
      onSuccess: (data) => {
        triggerToast('success', 'Marca criado com sucesso');
      },
      onError: (error) => {
        triggerToast('error', error.message);
      },
    });
  };

  return { createBrand };
};

export const useGetBrands = (select = null) => {
  const response = useQuery(['brands'], () => BrandsService.getBrands(), {
    select,
  });

  return response;
};
