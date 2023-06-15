import { useQuery, useMutation, useQueryClient } from 'react-query';
import { useNavigate } from 'react-router-dom';
import ProductsService from '../services/ProductsService';
import { triggerToast } from '../utils';

export const useGetProduct = (productId, onSuccess = null) => {
  const {
    data: product,
    error,
    isError,
    isLoading,
  } = useQuery({
    queryKey: ['product', productId],
    queryFn: () => ProductsService.getProduct(productId),
    onSuccess,
  });

  return {
    product,
    error,
    isError,
    isLoading,
  };
};

export const useGetProducts = (debounceSearch) => {
  const {
    data: products,
    error,
    isError,
    isLoading,
  } = useQuery(['products', { debounceSearch }], () => ProductsService.listProducts(debounceSearch));

  return {
    products,
    error,
    isError,
    isLoading,
  };
};

export const useCreateProduct = (fields) => {
  const navigate = useNavigate();
  const { mutate } = useMutation({
    mutationFn: ProductsService.createProduct,
    mutationKey: 'createProduct',
  });

  const createProduct = (product) => {
    mutate(product, {
      onSuccess: (data) => {
        triggerToast('success', 'Produto cadastrado com sucesso');
        setTimeout(() => {
          navigate(`/produtos/${data.id}`);
        }, 2000);
      },
      onError: (err) => {
        console.log(err);
        triggerToast('error', err.message);
      },
    });
  };

  return { createProduct };
};

export const useEditProduct = () => {
  const { mutate } = useMutation({
    mutationFn: ProductsService.editProduct,
    mutationKey: 'editProduct',
  });

  const editProduct = (fields) => {
    mutate(fields, {
      onSuccess: (data) => {
        triggerToast('success', 'Produto editado com sucesso');
      },
      onError: (err) => {
        triggerToast('error', err.message);
      },
    });
  };

  return { editProduct };
};

export const useDeleteProduct = () => {
  const { navigate } = useNavigate();
  const queryClient = useQueryClient();
  const { mutate } = useMutation({
    mutationFn: ProductsService.deleteProduct,
    mutationKey: 'deleteProduct',
  });

  const deleteProduct = (productId) => {
    mutate(productId, {
      onSuccess: () => {
        triggerToast('success', 'Produto deletado com sucesso');
        queryClient.refetchQueries(['products']);
        navigate('/produtos');
      },
      onError: (err) => {
        triggerToast('error', err.message);
      },
    });
  };

  return { deleteProduct };
};

export const useListProducts = (debounceSearch) => {
  const {
    data: products,
    error,
    isError,
    isLoading,
  } = useQuery(['listVariations', { debounceSearch }], () => ProductsService.listVariations(debounceSearch));

  return {
    products,
    error,
    isError,
    isLoading,
  };
};

export const useGetVariations = (productId) => {
  const {
    data: variations,
    error,
    isError,
    isLoading,
  } = useQuery(['variations', { productId }], () => ProductsService.getVariations(productId));

  return {
    variations,
    error,
    isError,
    isLoading,
  };
};

export const useGetVariation = (variationId, onSuccess = null) => {
  const {
    data: variation,
    error,
    isError,
    isLoading,
  } = useQuery({
    queryKey: ['variation', { variationId }],
    queryFn: () => ProductsService.getVariation(variationId),
    onSuccess,
  });

  return {
    variation,
    error,
    isError,
    isLoading,
  };
};

export const useEditVariation = () => {
  const { mutate } = useMutation({
    mutationFn: ProductsService.editVariation,
    mutationKey: 'editVariation',
  });

  const editVariation = (fields) => {
    mutate(fields, {
      onSuccess: (data) => {
        triggerToast('success', 'Variação editada com sucesso');
      },
      onError: (err) => {
        triggerToast('error', err.message);
      },
    });
  };

  return { editVariation };
};

export const useDeleteVariation = () => {
  const { navigate } = useNavigate();
  const queryClient = useQueryClient();
  const { mutate } = useMutation({
    mutationFn: ProductsService.deleteVariation,
    mutationKey: 'deleteVariation',
  });

  const deleteVariation = (variationId) => {
    mutate(variationId, {
      onSuccess: () => {
        triggerToast('success', 'Variação deletada com sucesso');
        queryClient.refetchQueries(['variations']);
        navigate(-1);
      },
      onError: (err) => {
        triggerToast('error', err.message);
      },
    });
  };

  return { deleteVariation };
};

export const useCreateVariation = () => {
  const navigate = useNavigate();
  const { mutate } = useMutation({
    mutationFn: ProductsService.createVariation,
    mutationKey: 'createVariation',
  });

  const createVariation = (fields) => {
    mutate(fields, {
      onSuccess: (data) => {
        triggerToast('success', 'Variação cadastrada com sucesso');
        setTimeout(() => {
          navigate(-1);
        }, 2000);
      },
      onError: (err) => {
        triggerToast('error', err.message);
      },
    });
  };

  return { createVariation };
};
