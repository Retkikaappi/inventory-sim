import { createRootRoute, Link, Outlet } from '@tanstack/react-router';
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools';

export const Route = createRootRoute({
  component: () => (
    <>
      <div className='p-2 flex gap-2'>
        <Link
          activeProps={{ className: `navlink-active` }}
          to='/'
          className='font-bold'
        >
          Home
        </Link>{' '}
        <Link
          activeProps={{ className: `navlink-active` }}
          to='/about'
          className='font-bold'
        >
          About
        </Link>
        <Link
          activeProps={{ className: `navlink-active` }}
          to='/inventory'
          className='font-bold'
        >
          Inventory
        </Link>
      </div>
      <hr />
      <Outlet />
      <TanStackRouterDevtools />
    </>
  ),
});
