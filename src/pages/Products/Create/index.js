/* eslint-disable max-len */
import { useState } from 'react';
import Datalist from '../../../components/Form/Datalist';
import Input from '../../../components/Form/Input';
import Textarea from '../../../components/Form/Textarea';
import { Wrapper } from '../../../components/Layout/Wrapper';
import PageTitle from '../../../components/PageTitle';
import { Toast } from '../../../utils/triggerToast';
import { Button } from './styles';
import { useCreateBrand, useGetBrands } from '../../../hooks/useBrand';
import { useCreateProduct } from '../../../hooks/useProducts';

function CreateProduct() {
  const { createProduct } = useCreateProduct();
  const { createBrand } = useCreateBrand();
  const { data: brands, ...restBrands } = useGetBrands((res) => res.map((brand) => ({
    key: brand.id,
    value: brand.id,
    label: brand.name,
  })));
  const [product, setProduct] = useState({
    name: null,
    price: null,
    desc: null,
    brand_id: null,
    storage: null,
    ref: null,
    sku: null,
  });

  const handleSelectChange = ({ value }, { name, action }) => {
    if (action === 'create-option') {
      if (name === 'brand_id') createBrand({ name: value });
    }
    setProduct({ ...product, [name]: value });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct({
      ...product,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    createProduct(product);
  };

  return (
    <>
      <Toast />
      <PageTitle>Novo produto</PageTitle>
      <Wrapper>
        {restBrands.isLoading && <p>Carregando...</p>}
        {!restBrands.isLoading && (
          <form onSubmit={handleSubmit}>
            <Input
              label="Nome"
              id="name"
              name="name"
              type="text"
              value={product.name ? product.name : ''}
              onChange={handleChange}
            />
            <Input
              label="Preço"
              id="price"
              name="price"
              type="text"
              value={product.price ? product.price : ''}
              onChange={handleChange}
            />
            <Textarea
              label="Descrição"
              id="desc"
              name="desc"
              type="text"
              value={product.desc ? product.desc : ''}
              onChange={handleChange}
            />
            <Datalist
              label="Marca"
              id="brand"
              name="brand_id"
              list="brands"
              placeholder="Selecione uma marca"
              options={brands}
              onChange={handleSelectChange}
            />
            {/* <Datalist
            label="Cor"
            id="color"
            name="color_id"
            list="colors"
            placeholder="Selecione uma cor"
            options={colors}
            onChange={handleSelectChange}
          />
          <Datalist
            label="Tamanho"
            id="size"
            name="size_id"
            list="sizes"
            placeholder="Selecione um tamanho"
            options={sizes}
            onChange={handleSelectChange}
          />
          <Input
            label="Quantidade em estoque"
            id="storage"
            name="storage"
            type="number"
            value={product.storage ? product.storage : ''}
            onChange={handleChange}
          />
          <Input
            label="Referência"
            id="ref"
            name="ref"
            type="text"
            value={product.ref ? product.ref : ''}
            onChange={handleChange}
          />
          <Input
            label="SKU"
            id="sku"
            name="sku"
            type="text"
            value={product.sku ? product.sku : ''}
            onChange={handleChange}
          /> */}
            <Button type="submit">Criar produto</Button>
          </form>
        )}
      </Wrapper>
    </>
  );
}

export default CreateProduct;
