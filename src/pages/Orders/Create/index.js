/* eslint-disable consistent-return */
/* eslint-disable max-len */
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMutation } from 'react-query';
import BackButton from '../../../components/BackButton';
import Input from '../../../components/Form/Input';
import Modal from '../../../components/Modal';
import PageTitle from '../../../components/PageTitle';
import Table from '../../../components/Table';
import Textarea from '../../../components/Form/Textarea';
import {
  AddIcon, Button, ButtonFIxed, Details, Wrapper,
} from './styles';
import OrdersService from '../../../services/OrdersService';
import { formatPrice } from '../../../utils';
import { Toast, triggerToast } from '../../../utils/triggerToast';
import { useGetCustomers } from '../../../hooks/useCustomer';
import Datalist from '../../../components/Form/Datalist';
import { useGetTransactions } from '../../../hooks/useTransactions';
import { useDebounce } from '../../../hooks/useDebounce';
import { useGetVariations } from '../../../hooks/useProducts';
import { unformatPrice } from '../../../utils/unformatPrice';
import { useCreateOrder } from '../../../hooks/useOrders';
import { formatDate } from '../../../utils/formatDate';

function CreateOrder() {
  const navigate = useNavigate();

  const [searchTerm, setSearchTerm] = useState('');
  const debounceSearch = useDebounce(searchTerm, 500);
  const tableHeadsSelectedProducts = ['Nome', 'Preço', 'Cor', 'Tamanho', 'Marca', 'Estoque', 'Quantidade', 'Subtotal'];
  const tableHeads = ['Nome', 'Preço', 'Tamanho', 'Cor', 'Marca', 'Estoque', 'Referência', 'SKU'];
  const [openModal, setOpenModal] = useState(false);
  const [openSummaryModal, setOpenSummaryModal] = useState(false);

  // Form fields
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [orderData, setOrderData] = useState({
    customer_id: null,
    date: null,
    qt_products: 0,
    subtotal: 0,
    discount: 0,
    total: 0,
    obs: null,
    transaction_id: null,
  });
  const [orderProductsList, setOrderProductsList] = useState([]);
  const { handleCreate } = useCreateOrder(orderData, orderProductsList);
  // const { handleCreate } = useCreateOrder();

  const {
    products,
    error: errorProducts,
    isError: isErrorProducts,
    isLoading: isLoadingProducts,
  } = useGetVariations(debounceSearch);

  const {
    customers,
    error: errorCustomer,
    isError: isErrorCustomer,
    isLoading: isLoadingCustomer,
  } = useGetCustomers(null, (res) => res.map((customer) => ({
    key: customer.id,
    value: customer.id,
    label: customer.name,
  })));

  const {
    transactions,
    error: errorTransaction,
    isError: isErrorTransaction,
    isLoading: isLoadingTransaction,
  } = useGetTransactions((res) => res.map((transaction) => ({
    key: transaction.id,
    value: transaction.id,
    label: transaction.type,
  })));

  if (isLoadingCustomer || isLoadingTransaction) {
    return <div>Aguarde...</div>;
  }

  if (isErrorCustomer || isErrorTransaction) {
    return <div>Erro! {errorCustomer.message || errorTransaction.message || errorProducts.message}</div>;
  }

  const updateTotal = () => {
    setOrderData((prevState) => ({
      ...prevState,
      total: prevState.subtotal - prevState.subtotal * (prevState.discount / 100),
    }));
  };

  const handleSubmit = async (ev) => {
    ev.preventDefault();
    handleCreate(orderData, orderProductsList);
  };

  const handleSelectChange = ({ value }, { name }) => {
    setOrderData({ ...orderData, [name]: value });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setOrderData({ ...orderData, [name]: value });
    // console.log(orderData);
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  // Salva no estado os ID's dos produtos selecionados no modal
  const handleSelectProducts = (id, checked) => {
    if (checked) return setSelectedProducts((prevState) => [...prevState, id]);
    return setSelectedProducts((prevState) => [...prevState.filter((item) => item !== id)]);
  };

  // Adiciona ao carrinho os produtos selecionados no modal
  const handleAddToCart = () => {
    const productsToCard = products.filter((product) => selectedProducts.includes(product.id));
    const newArray = productsToCard.map((product) => ({
      id: product.id,
      name: product.name,
      price: product.price,
      color: product.color,
      size: product.size,
      brand: product.brand,
      storage: product.storage,
      quantity: 1,
      subtotal: formatPrice(product.price),
    }));

    setCart((prevState) => [...prevState, ...newArray]);
    setSelectedProducts([]);
    setOpenModal(false);
  };

  const handleUpdateQt = (id, newQt) => {
    const product = cart.filter((item) => item.id === id)[0];
    const index = cart.indexOf(product);
    const newCart = [...cart];
    newCart[index] = {
      ...newCart[index],
      quantity: parseInt(newQt, 10),
      subtotal: formatPrice(parseFloat(newCart[index].price) * newQt),
    };
    setCart(newCart);
  };

  const filteredProductsforModal = products?.filter((product) => !cart.map((item) => item.id).includes(product.id));

  const handleRemoveProduct = (id) => {
    const newProducts = cart.filter((item) => item.id !== id);
    setCart(newProducts);
  };

  const calculateSummary = () => {
    if (!cart.length > 0) return triggerToast('error', 'Adicione produtos ao carrinho');
    const orderProductsListMapped = cart.map((e, i) => ({
      product_variation_id: cart[i].id,
      qt: parseInt(e.quantity, 10),
      total: parseFloat(cart[i].price) * parseFloat(e.quantity),
    }));
    setOrderProductsList(orderProductsListMapped);
    const qtProducts = cart.reduce((acc, curr) => acc + curr.quantity, 0);
    const subtotal = cart.reduce((acc, curr) => acc + unformatPrice(curr.subtotal), 0);
    setOrderData((prevState) => ({
      ...prevState,
      qt_products: qtProducts,
      subtotal,
    }));
    updateTotal();
    setOpenSummaryModal(true);
  };

  return (
    <>
      <Toast />
      <Modal isOpen={openModal} onClickClose={() => setOpenModal(false)} modalStyles={{ height: '90vh' }}>
        <h2 className="mt-10 mb-4">Busque e selecione os produtos desejados</h2>
        <Input
          label="Pesquisar"
          value={searchTerm}
          onChange={handleSearch}
          placeholder="Pesquise pelo nome do produto:"
        />
        {isErrorProducts && <div>Erro! {errorProducts.message}</div>}
        {!isErrorProducts && isLoadingProducts ? (
          <div>Aguarde...</div>
        ) : (
          <Table
            tableHeads={tableHeads}
            tableRows={filteredProductsforModal}
            hasSelection
            handleSelect={handleSelectProducts}
            tableStyles={{ maxHeight: '70%' }}
          />
        )}
        <ButtonFIxed onClick={handleAddToCart}>Finalizar seleção</ButtonFIxed>
      </Modal>
      <Modal isOpen={openSummaryModal} onClickClose={() => setOpenSummaryModal(false)}>
        <h3>Resumo do pedido</h3>
        <Details>
          <div>
            <p>Nome do cliente:</p>
            <span>{customers?.find((i) => i.value === orderData.customer_id)?.label}</span>
          </div>
          <div>
            <p>Data da compra:</p>
            <span>{formatDate(orderData?.date)}</span>
          </div>
          <div>
            <p>Quantidade de produtos:</p>
            <span>{orderData.qt_products}</span>
          </div>
          <div>
            <p>Subtotal da compra:</p>
            <span>{formatPrice(orderData.subtotal)}</span>
          </div>
          <div>
            <p>Desconto:</p>
            <span>{orderData.discount}%</span>
          </div>
          <div>
            <p>Valor final:</p>
            <span>{formatPrice(orderData.total)}</span>
          </div>
          <div>
            <p>Forma de pagamento:</p>
            <span>{transactions.find((i) => i.value === orderData.transaction_id)?.label}</span>
          </div>
          <div>
            <p>Obersações:</p>
            <span>{orderData?.obs}</span>
          </div>
        </Details>
        <Button onClick={handleSubmit}>Confirmar</Button>
        <Button onClick={() => setOpenSummaryModal(false)}>Cancelar</Button>
      </Modal>
      <BackButton />
      <PageTitle>Novo pedido</PageTitle>
      <Wrapper>
        {(isLoadingTransaction || isLoadingCustomer || isLoadingProducts) && <div>Aguarde...</div>}
        {(isErrorTransaction || isErrorCustomer || isErrorProducts) && <div>Erro!</div>}
        {(!isErrorTransaction || !isErrorCustomer || !isErrorProducts)
          && (!isLoadingTransaction || !isLoadingCustomer || !isLoadingProducts) && (
            <form>
              <Datalist
                label="Cliente"
                id="customer_id"
                name="customer_id"
                list="customers"
                placeholder="Selecione uma cliente"
                options={customers}
                creatable={false}
                onChange={handleSelectChange}
              />
              <Input
                label="Data"
                id="date"
                name="date"
                type="date"
                value={orderData.date ? orderData.date : ''}
                onChange={handleChange}
              />
              <Datalist
                label="Forma de pagamento"
                id="transaction_id"
                name="transaction_id"
                list="transactions"
                placeholder="Selecione uma forma de pagamento"
                options={transactions}
                creatable={false}
                onChange={handleSelectChange}
              />
              <Input
                label="Desconto (%)"
                id="discount"
                name="discount"
                type="number"
                value={orderData.discount ? orderData.discount : 0}
                onChange={(event) => {
                  handleChange(event);
                  updateTotal();
                }}
              />
              <Textarea
                label="Observações"
                id="obs"
                name="obs"
                value={orderData.obs ? orderData.obs : ''}
                onChange={handleChange}
              />
              <Button type="button" onClick={() => setOpenModal(true)}>
                <AddIcon />
                Adicionar produtos
              </Button>
              <h2>Produtos selecionados</h2>
              <Table
                tableHeads={tableHeadsSelectedProducts}
                tableRows={cart}
                hasSelection
                handleSelect={handleRemoveProduct}
                qtEditable
                updateQt={handleUpdateQt}
              />
            </form>
        )}
        <Button onClick={calculateSummary}>Finalizar pedido</Button>
      </Wrapper>
    </>
  );
}

export default CreateOrder;
