import Home from '../views/pages/Home';
import Register from '../views/pages/Register';
import Login from '../views/pages/Login';
import Profile from '../views/pages/profile/Profile';
import ManageUser from '../views/pages/quan-tri/ManageUser';
import ShopCoffee from '../views/pages/shop-coffee/ShopCoffee';

export const routes = [
    {
        path: '/manage_user',
        element: <ManageUser />
    },
    {
        path: '/shop_coffee/:id',
        element: <ShopCoffee />
    },
    {
        path: '/shop_coffee',
        element: <ShopCoffee />
    },
    {
        path: '/profile/:id',
        element: <Profile />
    },
    {
        path: '/profile',
        element: <Profile />
    },
    {
        path: '/register',
        element: <Register />
    },
    {
        path: '/login',
        element: <Login />
    },
    {
        path: '/',
        element: <Home />
    },
]