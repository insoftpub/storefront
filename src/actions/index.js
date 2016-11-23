import ProductsActions from './ProductsActions';
import CategoriesActions from './CategoriesActions';
import UserActions from './UserActions';
import ProgressActions from './ProgressActions';
import NavigationActions from './NavigationActions';
import CartActions from './CartActions';
import SessionActions from './SessionActions';
import OrdersActions from './OrdersActions';
import EmailActions from './EmailActions';
import ErrorActions from './ErrorActions';

export default {
    products: ProductsActions,
    user: UserActions,
    categories: CategoriesActions,
    progress: ProgressActions,
    navigate: NavigationActions,
    cart: CartActions,
    session: SessionActions,
    email: EmailActions,
    error: ErrorActions,
    orders: OrdersActions
};
