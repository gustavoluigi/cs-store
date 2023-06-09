/* eslint-disable max-len */
import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  useMutation, useQueries, useQueryClient,
} from 'react-query';
import Input from '../../../../components/Form/Input';
import { Wrapper } from '../../../../components/Layout/Wrapper';
import PageTitle from '../../../../components/PageTitle';
import ProductsService from '../../../../services/ProductsService';
import { Toast, triggerToast } from '../../../../utils/triggerToast';
import { Button, ButtonFloat, EditIcon } from './styles';
import Datalist from '../../../../components/Form/Datalist';
import ColorsService from '../../../../services/ColorsService';
import BackButton from '../../../../components/BackButton';
import { useCreateSize, useGetSizes } from '../../../../hooks/useSize';
import { useCreateColor, useGetColors } from '../../../../hooks/useColor';
import { useDeleteVariation, useEditVariation, useGetVariation } from '../../../../hooks/useProducts';

function ShowProductVariation() {
  const navigate = useNavigate();
  const { id: productId } = useParams();
  const queryClient = useQueryClient();
  const [isEditing, setIsEditing] = useState(false);
  const [productData, setProductData] = useState({});
  const { editVariation } = useEditVariation();
  const { deleteVariation } = useDeleteVariation();
  const { createSize } = useCreateSize();
  const { data: sizes, ...restSizes } = useGetSizes((res) => res.map((size) => ({
    key: size.id,
    value: size.id,
    label: size.name,
  })));
  const { createColor } = useCreateColor();
  const { data: colors, ...restColors } = useGetColors((res) => res.map((color) => ({
    key: color.id,
    value: color.id,
    label: color.name,
  })));

  const { variation: product, ...restProduct } = useGetVariation(productId, (data) => setProductData(data));

  console.log('productvariation');

  if (restProduct.isLoading || restColors.isLoading || restSizes.isLoading) {
    return <div>Aguarde...</div>;
  }
  if (restProduct.isError || restColors.isError || restSizes.isError) {
    if (restProduct.isError) return <div>Erro produto! {restProduct.isError.message}</div>;
    if (restColors.isError) return <div>Erro color! {restColors.isError.message}</div>;
    if (restSizes.isError) return <div>Erro size! {restSizes.isError.message}</div>;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newVariation = {
      id: productData.id,
      color_id: productData.color.value,
      size_id: productData.size.value,
      storage: parseInt(productData.storage, 10),
      ref: productData.ref,
      sku: productData.sku,
    };

    editVariation(newVariation);
    setIsEditing(false);
  };

  const handleEnableEdit = () => {
    setIsEditing(true);
  };

  const handleDelete = async () => {
    deleteVariation(productId);
  };

  const handleSelectChange = ({ value, label }, { name, action }) => {
    if (action === 'create-option') {
      if (name === 'color') createColor({ name: value });
      if (name === 'size') createSize({ name: value });
    } else {
      if (name === 'color') setProductData({ ...productData, color: { value, label } });
      if (name === 'size') setProductData({ ...productData, size: { value, label } });
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProductData({ ...productData, [name]: value });
  };

  return (
    <>
      <Toast />
      <BackButton />
      <ButtonFloat danger onClick={handleDelete}>
        <EditIcon />
        Deletar variação
      </ButtonFloat>
      <ButtonFloat onClick={handleEnableEdit}>
        <EditIcon />
        Editar variação
      </ButtonFloat>
      <PageTitle>{product.name}</PageTitle>
      <Wrapper>
        <form onSubmit={handleSubmit}>
          <Datalist
            label="Tamanho"
            id="size"
            name="size"
            list="sizes"
            placeholder="Selecione uma marca"
            isDisabled={!isEditing}
            defaultValue={{ label: product.size.label, value: product.size.value }}
            options={sizes}
            onChange={handleSelectChange}
          />
          <Datalist
            label="Cor"
            id="color"
            name="color"
            list="colors"
            placeholder="Selecione uma cor"
            isDisabled={!isEditing}
            defaultValue={{ label: product.color.label, value: product.color.value }}
            options={colors}
            onChange={handleSelectChange}
          />
          <Input
            label="Estoque"
            id="storage"
            name="storage"
            type="text"
            readOnly={!isEditing}
            value={productData.storage ? productData.storage : ''}
            onChange={handleChange}
          />
          <Input
            label="Referência"
            id="ref"
            name="ref"
            type="text"
            readOnly={!isEditing}
            value={productData.ref ? productData.ref : ''}
            onChange={handleChange}
          />
          <Input
            label="SKU"
            id="sku"
            name="sku"
            type="text"
            readOnly={!isEditing}
            value={productData.sku ? productData.sku : ''}
            onChange={handleChange}
          />
          {isEditing && <Button type="submit">Salvar</Button>}
        </form>
      </Wrapper>

    </>

  );
}

export default ShowProductVariation;
