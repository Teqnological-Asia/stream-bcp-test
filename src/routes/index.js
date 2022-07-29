import React, { Fragment } from 'react';
import { Route, Redirect } from 'react-router-dom';
import AuthenticatedRoute from './AuthenticatedRoute';
import UnauthenticatedRoute from './UnauthenticatedRoute';
import HomeContainer from '../containers/Home/HomeContainer';
import TradeHistoryContainer from '../containers/Trade/TradeHistoryContainer';
import TradeTaxContainer from '../containers/Trade/TradeTaxContainer';
import PaymentHistoryContainer from '../containers/Payment/PaymentHistoryContainer';
import PaymentCancelContainer from '../containers/Payment/PaymentCancelContainer';
import PaymentCancelConfirmContainer from '../containers/Payment/PaymentCancelConfirmContainer';
import PaymentCancelCompleteContainer from '../containers/Payment/PaymentCancelCompleteContainer';
import PaymentContainer from '../containers/Payment/PaymentContainer';
import PaymentWithdrawalContainer from '../containers/Payment/PaymentWithdrawalContainer';
import PaymentWithdrawalCompleteContainer from '../containers/Payment/PaymentWithdrawalCompleteContainer';
import FractionalSellContainer from '../containers/Fractional/FractionalSellContainer';
import FractionalCompleteContainer from '../containers/Fractional/FractionalCompleteContainer';
import FractionalClameContainer from '../containers/Fractional/FractionalClameContainer';
import FractionalCancelContainer from '../containers/Fractional/FractionalCancelContainer';
import FractionalCancelCompleteContainer from '../containers/Fractional/FractionalCancelCompleteContainer';
import DeliveryContainer from '../containers/Delivery/DeliveryContainer';
import DeliveryCompleteContainer from '../containers/Delivery/DeliveryCompleteContainer';
import DeliveryCancelContainer from '../containers/Delivery/DeliveryCancelContainer';
import DeliveryCancelCompleteContainer from '../containers/Delivery/DeliveryCancelCompleteContainer';
import ReportOutputContainer from '../containers/Report/ReportOutputContainer';
import PhysicalContainer from '../containers/Physical/PhysicalContainer';
import PhysicalOrderContainer from '../containers/Physical/PhysicalOrderContainer';
import PhysicalOrderConfirmContainer from '../containers/Physical/PhysicalOrderConfirmContainer';
import PhysicalOrderCompleteContainer from '../containers/Physical/PhysicalOrderCompleteContainer';
import BalanceContainer from '../containers/Balance/BalanceContainer';
import MarginContainer from '../containers/Margin/MarginContainer';
import MarginSelectContainer from '../containers/Margin/MarginSelectContainer';
import MarginOrderContainer from '../containers/Margin/MarginOrderContainer';
import MarginOrderConfirmContainer from '../containers/Margin/MarginOrderConfirmContainer';
import MarginOrderCompleteContainer from '../containers/Margin/MarginOrderCompleteContainer';
import MarginReceiptContainer from '../containers/Margin/MarginReceiptContainer';
import MarginReceiptCompleteContainer from '../containers/Margin/MarginReceiptCompleteContainer';
import MarginDeliveryContainer from '../containers/Margin/MarginDeliveryContainer';
import MarginDeliveryCompleteContainer from '../containers/Margin/MarginDeliveryCompleteContainer';
import UsStockContainer from '../containers/UsStock/UsStockContainer';
import OrderContainer from '../containers/Order/OrderContainer';
import OrderCancelContainer from '../containers/Order/OrderCancelContainer';
import OrderCancelCompleteContainer from '../containers/Order/OrderCancelCompleteContainer';
import OrderCancelUsCompleteContainer from '../containers/Order/OrderCancelCompleteContainer';
import OrderDetailContainer from '../containers/Order/OrderDetailContainer';
import OrderUsDetailContainer from '../containers/Order/OrderUsDetailContainer';
import LoginContainer from '../containers/Login/LoginContainer';
import LogoutContainer from '../containers/Logout/LogoutContainer';
import ReminderContainer from '../containers/Reminder/ReminderContainer';
import ReminderCompleteContainer from '../containers/Reminder/ReminderCompleteContainer';
import LoadingContainer from '../containers/Loading/LoadingContainer';
import CloseAccountContainer from '../containers/CloseAccount/CloseAccountContainer';
import LendingBalanceContainer from '../containers/Trade/TradeLendingBalanceContainer'
import TradeLendingHistory from '../containers/Trade/TradeLendingHistoryContainer';
import UsStockSellContainer from '../containers/UsStock/UsStockSellContainer'
import UsStockSellConfirm from '../containers/UsStock/UsStockSellConfirmContainer'
import UsStockSellComplete from '../containers/UsStock/UsStockSellCompleteContainer'
import OrderCancelUsContainer from '../containers/Order/OrderCancelUsContainer';
// import UsStockPurchaseContainer from '../containers/UsStock/UsStockPurchaseContainer'
import UsStockPurchaseOrderContainer from '../containers/UsStock/UsStockPurchaseOrderContainer'
import UsStockPurchaseOrderConfirmContainer from '../containers/UsStock/UsStockPurchaseOrderConfirmContainer'
import UsStockPurchaseOrderComplete from '../containers/UsStock/UsStockPurchaseOrderComplete'
import LoginCallbackContainer from '../containers/Login/LoginCallbackContainer';
// import TradeTransitionReferenceContainer from '../containers/Trade/TradeTransitionReferenceContainer';
import { AppHelmet } from '../components/Helmet';

export const routes = [
  {
    path: '/account',
    component: HomeContainer,
    isAuthenticated: true
  },
  {
    path: '/account/balance',
    component: BalanceContainer,
    isAuthenticated: true
  },
  {
    path: '/account/trade/history',
    component: TradeHistoryContainer,
    isAuthenticated: true
  },
  {
    path: '/account/trade/lendinghistory',
    component: TradeLendingHistory,
    isAuthenticated: true
  },
  {
    path: '/account/trade/tax',
    component: TradeTaxContainer,
    isAuthenticated: true
  },
  {
    path: '/account/trade/lendingbalance',
    component: LendingBalanceContainer,
    isAuthenticated: true
  },
  // {
  //   path: '/account/trade/transition-reference',
  //   component: TradeTransitionReferenceContainer,
  //   isAuthenticated: true
  // },
  {
    path: '/account/login/callback',
    component: LoginCallbackContainer,
    isAuthenticated: false
  },
  {
    path: '/account/payment/history',
    component: PaymentHistoryContainer,
    isAuthenticated: true
  },
  {
    path: '/account/payment/cancel',
    component: PaymentCancelContainer,
    isAuthenticated: true
  },
  {
    path: '/account/payment/:id/cancel/confirm',
    component: PaymentCancelConfirmContainer,
    isAuthenticated: true
  },
  {
    path: '/account/payment/:id/cancel/complete',
    component: PaymentCancelCompleteContainer,
    isAuthenticated: true
  },
  {
    path: '/account/payment',
    component: PaymentContainer,
    isAuthenticated: true
  },
  {
    path: '/account/payment/withdrawal',
    component: PaymentWithdrawalContainer,
    isAuthenticated: true
  },
  {
    path: '/account/payment/withdrawal/complete',
    component: PaymentWithdrawalCompleteContainer,
    isAuthenticated: true
  },
  {
    path: '/account/fractional/sell',
    component: FractionalSellContainer,
    isAuthenticated: true
  },
  {
    path: '/account/fractional/complete',
    component: FractionalCompleteContainer,
    isAuthenticated: true
  },
  {
    path: '/account/fractional/clame',
    component: FractionalClameContainer,
    isAuthenticated: true
  },
  {
    path: '/account/fractional/cancel',
    component: FractionalCancelContainer,
    isAuthenticated: true
  },
  {
    path: '/account/fractional/cancel/complete',
    component: FractionalCancelCompleteContainer,
    isAuthenticated: true
  },
  {
    path: '/account/delivery',
    component: DeliveryContainer,
    isAuthenticated: true
  },
  {
    path: '/account/delivery/complete',
    component: DeliveryCompleteContainer,
    isAuthenticated: true
  },
  {
    path: '/account/delivery/cancel',
    component: DeliveryCancelContainer,
    isAuthenticated: true
  },
  {
    path: '/account/delivery/cancel/complete',
    component: DeliveryCancelCompleteContainer,
    isAuthenticated: true
  },
  {
    path: '/account/report/output',
    component: ReportOutputContainer,
    isAuthenticated: true
  },
  {
    path: '/account/physical',
    component: PhysicalContainer,
    isAuthenticated: true
  },
  {
    path: '/account/physical/:code/order',
    component: PhysicalOrderContainer,
    isAuthenticated: true
  },
  {
    path: '/account/physical/:code/order/confirm',
    component: PhysicalOrderConfirmContainer,
    isAuthenticated: true
  },
  {
    path: '/account/physical/:code/order/complete',
    component: PhysicalOrderCompleteContainer,
    isAuthenticated: true
  },
  {
    path: '/account/margin',
    component: MarginContainer,
    isAuthenticated: true
  },
  {
    path: '/account/margin/:code/select',
    component: MarginSelectContainer,
    isAuthenticated: true
  },
  {
    path: '/account/margin/:code/order',
    component: MarginOrderContainer,
    isAuthenticated: true
  },
  {
    path: '/account/margin/:code/order/confirm',
    component: MarginOrderConfirmContainer,
    isAuthenticated: true
  },
  {
    path: '/account/margin/:code/order/complete',
    component: MarginOrderCompleteContainer,
    isAuthenticated: true
  },
  {
    path: '/account/margin/:code/receipt',
    component: MarginReceiptContainer,
    isAuthenticated: true
  },
  {
    path: '/account/margin/:code/receipt/complete',
    component: MarginReceiptCompleteContainer,
    isAuthenticated: true
  },
  {
    path: '/account/margin/:code/delivery',
    component: MarginDeliveryContainer,
    isAuthenticated: true
  },
  {
    path: '/account/margin/:code/delivery/complete',
    component: MarginDeliveryCompleteContainer,
    isAuthenticated: true
  },
  {
    path: '/account/us-stock',
    component: UsStockContainer,
    isAuthenticated: true
  },
  {
    path: '/account/order',
    component: OrderContainer,
    isAuthenticated: true
  },
  {
    path: '/account/order_us/:id/cancel',
    component: OrderCancelUsContainer,
    isAuthenticated: true
  },
  {
    path: '/account/order/:id/cancel',
    component: OrderCancelContainer,
    isAuthenticated: true
  },
  {
    path: '/account/order_us/:id/cancel/complete',
    component: OrderCancelUsCompleteContainer,
    isAuthenticated: true
  },
  {
    path: '/account/order/:id/cancel/complete',
    component: OrderCancelCompleteContainer,
    isAuthenticated: true
  },
  {
    path: '/account/order_us/:id/detail',
    component: OrderUsDetailContainer,
    isAuthenticated: true
  },
  {
    path: '/account/order/:id/detail',
    component: OrderDetailContainer,
    isAuthenticated: true
  },
  {
    path: '/account/close-account',
    component: CloseAccountContainer,
    isAuthenticated: true
  },
  {
    path: '/account/login',
    component: LoginContainer,
    isAuthenticated: false
  },
  {
    path: '/account/logout',
    component: LogoutContainer,
    isAuthenticated: false
  },
  {
    path: '/account/reminder',
    component: ReminderContainer,
    isAuthenticated: false
  },
  {
    path: '/account/reminder/complete',
    component: ReminderCompleteContainer,
    isAuthenticated: false
  },
  {
    path: '/account/us-stock/:code/sell',
    component: UsStockSellContainer,
    isAuthenticated: true
  },
  {
    path: '/account/us-stock/:code/sell/confirm',
    component: UsStockSellConfirm,
    isAuthenticated: true
  },
  {
    path: '/account/us-stock/:code/sell/complete',
    component: UsStockSellComplete,
    isAuthenticated: true
  },
  // {
  //   path: '/account/us-stock/purchase',
  //   component: UsStockPurchaseContainer,
  //   isAuthenticated: true
  // },
  {
    path: '/account/us-stock/:code/purchase',
    component: UsStockPurchaseOrderContainer,
    isAuthenticated: true
  },
  {
    path: '/account/us-stock/:code/purchase/confirm',
    component: UsStockPurchaseOrderConfirmContainer,
    isAuthenticated: true
  },
  {
    path: '/account/us-stock/:code/purchase/complete',
    component: UsStockPurchaseOrderComplete,
    isAuthenticated: true
  }
];

export default function configRoutes() {
  const routeComponents = routes.map((route, key) => {
    if (route.isAuthenticated) {
      return <AuthenticatedRoute exact path={route.path} component={route.component} key={key} />;
    } else {
      return <UnauthenticatedRoute exact path={route.path} component={route.component} key={key} />;
    }
  });

  const openaccountRoute = props => {
    if (document.referrer) {
      sessionStorage.setItem('prevPath', document.referrer)
    }
    sessionStorage.setItem('path', props.location.pathname + props.location.search)
    window.location.href = '/op/index.html'
    return null
  }

  return (
    <Fragment>
      <AppHelmet/>
      <LoadingContainer/>
      {routeComponents}
      <Route exact path="/" render={() => (<Redirect to="/account" />) } />
      <Route path="/openaccount" component={openaccountRoute} />
    </Fragment>
  );
}
