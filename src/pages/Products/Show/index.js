import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Input from '../../../components/Form/Input';
import Textarea from '../../../components/Form/Textarea';
import { Wrapper } from '../../../components/Layout/Wrapper';
import PageTitle from '../../../components/PageTitle';
import { Toast } from '../../../utils/triggerToast';
import {
  AddIcon, Button, ButtonFloat, EditIcon,
} from './styles';
import Table from '../../../components/Table';
import Datalist from '../../../components/Form/Datalist';
import {
  useDeleteProduct, useEditProduct, useGetProduct, useGetVariations,
} from '../../../hooks/useProducts';
import { useCreateBrand, useGetBrands } from '../../../hooks/useBrand';

function Product() {
  const navigate = useNavigate();
  const { editProduct } = useEditProduct();
  const { deleteProduct } = useDeleteProduct();
  const { createBrand } = useCreateBrand();
  const { data: brands, ...restBrands } = useGetBrands((res) => res.map((brand) => ({
    key: brand.id,
    value: brand.id,
    label: brand.name,
  })));
  const { id: productId } = useParams();
  const [isEditing, setIsEditing] = useState(false);
  const tableHeads = ['Tamanho', 'Cor', 'Estoque', 'Ref', 'SKU'];
  const [productData, setProductData] = useState({
    name: '',
    price: 0,
    brand_id: '',
    brands: {
      name: '',
    },
    desc: '',
  });
  const { product, ...restProduct } = useGetProduct(productId, (data) => setProductData(data));
  const { variations, ...restVariations } = useGetVariations(productId);

  if (restProduct.isLoading || restVariations.isLoading || restBrands.isLoading) {
    return <div>Aguarde...</div>;
  }
  if (restProduct.isError || restVariations.isError || restBrands.isError) {
    if (restProduct.isError) return <div>Erro! {restProduct.isError.message}</div>;
    if (restVariations.isError) return <div>Erro! {restVariations.isError.message}</div>;
    if (restBrands.isError) return <div>Erro! {restBrands.isError.message}</div>;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newFields = {
      id: productData.id,
      name: productData.name,
      price: parseFloat(productData.price),
      brand_id: productData.brand_id,
      desc: productData.desc,
    };
    editProduct(newFields);
    setIsEditing(false);
  };

  const handleEnableEdit = () => {
    setIsEditing(true);
  };

  const handleDelete = async () => {
    console.log(variations);
    if (window.confirm('Deseja realmente excluir este produto e todas as suas variações?')) {
      deleteProduct({ productId, variations });
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'price') return setProductData({ ...productData, [name]: value });
    return setProductData({ ...productData, [name]: value });
  };

  const handleSelectChange = ({ value }, { name, action }) => {
    if (action === 'create-option') {
      createBrand({ name: value });
    }
    setProductData({ ...productData, [name]: value });
  };

  const handleClick = (variationId) => {
    navigate(`/produtos/${variationId}/variacoes`);
  };
  const handleAddVariation = () => {
    navigate(`/produtos/${productId}/variacoes/criar`);
  };

  return (
    <>
      <Toast />
      <ButtonFloat danger onClick={handleDelete}>
        <EditIcon />
        Deletar produto
      </ButtonFloat>
      <ButtonFloat onClick={handleAddVariation}>
        <AddIcon />
        Adicionar variação
      </ButtonFloat>
      <ButtonFloat onClick={handleEnableEdit}>
        <EditIcon />
        Editar produto
      </ButtonFloat>

      <PageTitle>{product.name}</PageTitle>
      <Wrapper>
        {!restProduct.isLoading && !restVariations.isLoading && !restBrands.isLoading && (
          <>
            <form onSubmit={handleSubmit}>
              <Input
                label="Nome"
                id="name"
                name="name"
                type="text"
                readOnly={!isEditing}
                value={productData.name ? productData.name : ''}
                onChange={handleChange}
              />
              <Input
                label="Preço"
                id="price"
                name="price"
                type="text"
                readOnly={!isEditing}
                value={productData.price ? productData.price : ''}
                onChange={handleChange}
              />
              <Datalist
                label="Marca"
                id="brand"
                name="brand_id"
                list="brands"
                placeholder="Selecione uma marca"
                isDisabled={!isEditing}
                defaultValue={{ label: product.brands.name, value: product.brand_id }}
                options={brands}
                onChange={handleSelectChange}
              />
              <Textarea
                label="Descrição"
                id="desc"
                name="desc"
                type="text"
                readOnly={!isEditing}
                value={productData.desc ? productData.desc : ''}
                onChange={handleChange}
              />
              {isEditing && <Button type="submit">Salvar</Button>}
            </form>
            <Table tableHeads={tableHeads} tableRows={variations} handleClick={handleClick} />
          </>
        )}
      </Wrapper>
    </>
  );
}

export default Product;
