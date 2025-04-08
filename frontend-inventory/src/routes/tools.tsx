import { createFileRoute, Link, Outlet } from '@tanstack/react-router';

export const Route = createFileRoute('/tools')({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div>
      <div className='flex justify-center'>
        <Link
          activeProps={{ className: `navlink-active` }}
          to='/tools/slayer'
          className='font-bold'
        >
          Slayer
        </Link>
      </div>

      <Outlet />
    </div>
  );
}

