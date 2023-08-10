// component
import SvgColor from '../../../components/svg-color';

// ----------------------------------------------------------------------

const icon = (name) => <SvgColor src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />;

const navConfig = [
  {
    title: 'dashboard',
    path: '/dashboard/app',
    icon: icon('ic_analytics'),
  },
  {
    title: 'property',
    path: '/dashboard/products',
    icon: icon('ic_cart'),
  },
  {
    title: 'login',
    path: '/login',
    icon: icon('ic_lock'),
  },
  {
    title: 'register',
    path: '/dashboard/register',
    icon: icon('ic_lock'),
  },
  {
    title: 'profile',
    path: '/dashboard/profile',
    icon: icon('ic_lock'),
  },
  {
    title: 'expenses',
    path: '/dashboard/expenses',
    icon: icon('ic_lock'),
  },
  {
    title: 'incomes',
    path: '/dashboard/incomes',
    icon: icon('ic_lock'),
  },
  {
    title: 'property',
    path: '/dashboard/propertys',
    icon: icon('ic_lock'),
  },
  {
    title: 'upload',
    path: '/dashboard/upload',
    icon: icon('ic_lock'),
  },
 
];

export default navConfig;
