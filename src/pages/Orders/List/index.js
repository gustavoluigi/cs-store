/* eslint-disable max-len */
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Wrapper } from '../../../components/Layout/Wrapper';
import PageTitle from '../../../components/PageTitle';
import Table from '../../../components/Table';
import { AddIcon, Button } from './styles';
import { useDebounce } from '../../../hooks/useDebounce';
import { useGetOrdersandCustomer } from '../../../hooks/useOrders';
import Input from '../../../components/Form/Input';

function Orders() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const debounceSearch = useDebounce(searchTerm, 500);
  const tableHeads = ['Data', 'Cliente', 'Qt. Produtos', 'Subtotal', 'Desconto', 'Total', 'Obs', 'Pagamento'];

  const {
    orders, error, isError, isLoading,
  } = useGetOrdersandCustomer(debounceSearch);

  // console.log('orders', orders);
  // console.log('error', error);
  // console.log('isError', isError);
  // console.log('isLoading', isLoading);

  const handleTableClick = (orderId) => {
    navigate(`../${orderId}`);
  };

  const handleAddClick = () => {
    navigate('../criar');
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  return (
    <>
      <Button onClick={handleAddClick}>
        <AddIcon />
        Nova venda
      </Button>
      <PageTitle>Vendas</PageTitle>
      <Wrapper>
        <Input
          label="Pesquisar"
          value={searchTerm}
          onChange={handleSearch}
          placeholder="Pesquise pelo nome do cliente:"
        />
        {isLoading && <div>Aguarde...</div>}
        {isError && <div>Erro! {error.message}</div>}
        {!isLoading && !isError && (
        <Table tableHeads={tableHeads} tableRows={orders} handleClick={handleTableClick} />
        )}
      </Wrapper>
    </>
  );
}

export default Orders;
