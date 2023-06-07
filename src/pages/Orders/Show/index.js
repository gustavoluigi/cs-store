import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import BackButton from '../../../components/BackButton';
import PageTitle from '../../../components/PageTitle';
import Table from '../../../components/Table';
import { useGetOrderProductsAndCustomer } from '../../../hooks/useOrders';
import { formatPrice } from '../../../utils';
import { Details } from './styles';

function Order() {
  const tableHeads = ['Nome', 'Preço', 'Quantidade', 'Cor', 'Tamanho', 'Marca', 'Subtotal'];
  const { id: orderId } = useParams();

  const {
    order, orderProducts, error, isError, isLoading,
  } = useGetOrderProductsAndCustomer(orderId);

  useEffect(() => {
    console.log(orderProducts);
  });

  return (
    <>
      <BackButton />
      <PageTitle>Venda</PageTitle>
      {isLoading && <div>Aguarde...</div>}
      {isError && <div>Erro! {error.message}</div>}
      {(!isLoading && !isError && order) && (
        <>
          <Details>
            <div>
              <p>Nome do cliente:</p>
              <span>{order.customer}</span>
            </div>
            <div>
              <p>Data da compra:</p>
              <span>{order.date}</span>
            </div>
            <div>
              <p>Quantidade de produtos:</p>
              <span>{order.qt_products}</span>
            </div>
            <div>
              <p>Subtotal:</p>
              <span>{order.subtotal}</span>
            </div>
            <div>
              <p>Desconto:</p>
              <span>{order.discount === 0 ? '-' : `${order.discount} %`}</span>
            </div>
            <div>
              <p>Valor total da compra:</p>
              <span>{order.total}</span>
            </div>
            <div>
              <p>Forma de pagamento:</p>
              <span>{order.transaction}</span>
            </div>
            <div>
              <p>Obersações:</p>
              <span>{order.obs}</span>
            </div>
          </Details>
          <Table tableHeads={tableHeads} tableRows={orderProducts} />
        </>
      )}
    </>
  );
}

export default Order;
