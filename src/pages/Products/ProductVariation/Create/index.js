/* eslint-disable max-len */
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useMutation, useQueries } from 'react-query';
import Input from '../../../../components/Form/Input';
import { Wrapper } from '../../../../components/Layout/Wrapper';
import PageTitle from '../../../../components/PageTitle';
import ProductsService from '../../../../services/ProductsService';
import { Toast, triggerToast } from '../../../../utils/triggerToast';
import { Button } from './styles';
import Datalist from '../../../../components/Form/Datalist';
import SizesService from '../../../../services/SizesService';
import ColorsService from '../../../../services/ColorsService';
import BackButton from '../../../../components/BackButton';
import { useCreateVariation, useGetProduct } from '../../../../hooks/useProducts';
import { useCreateSize, useGetSizes } from '../../../../hooks/useSize';
import { useCreateColor, useGetColors } from '../../../../hooks/useColor';

function CreateProductVariation() {
  const { id: productId } = useParams();
  const [productName, setProductName] = useState('');
  const [productData, setProductData] = useState({
    size: {
      label: null,
      value: null,
    },
    color: {
      label: null,
      value: null,
    },
    storage: null,
    ref: null,
    sku: null,
  });
  const { createVariation } = useCreateVariation();
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

  console.log(colors);

  const { product, ...restProduct } = useGetProduct(productId, (data) => setProductName(data.name));

  if (restColors.isLoading || restSizes.isLoading) {
    return <div>Aguarde...</div>;
  }
  if (restColors.isError || restSizes.isError) {
    if (restColors.isError) return <div>Erro color! {restColors.isError.message}</div>;
    if (restSizes.isError) return <div>Erro size! {restSizes.isError.message}</div>;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newVariation = {
      product_id: productId,
      color_id: productData.color.value,
      size_id: productData.size.value,
      storage: +productData.storage,
      ref: productData.ref,
      sku: productData.sku,
    };
    createVariation(newVariation);
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
      <PageTitle>{productName || ''}</PageTitle>
      <Wrapper>
        <form onSubmit={handleSubmit}>
          <Datalist
            label="Tamanho"
            id="size"
            name="size"
            list="sizes"
            placeholder="Selecione um tamanho"
            options={sizes}
            onChange={handleSelectChange}
          />
          <Datalist
            label="Cor"
            id="color"
            name="color"
            list="colors"
            placeholder="Selecione uma cor"
            options={colors}
            onChange={handleSelectChange}
          />
          <Input
            label="Estoque"
            id="storage"
            name="storage"
            type="text"
            value={productData.storage ? productData.storage : ''}
            onChange={handleChange}
          />
          <Input
            label="Referência"
            id="ref"
            name="ref"
            type="text"
            value={productData.ref ? productData.ref : ''}
            onChange={handleChange}
          />
          <Input
            label="SKU"
            id="sku"
            name="sku"
            type="text"
            value={productData.sku ? productData.sku : ''}
            onChange={handleChange}
          />
          <Button type="submit">Criar variação</Button>
        </form>
      </Wrapper>
    </>
  );
}

export default CreateProductVariation;
