import { createFileRoute } from '@tanstack/react-router';
import Slayer from '../../components/tools/Slayer';

export const Route = createFileRoute('/tools/slayer')({
  component: RouteComponent,
});

function RouteComponent() {
  return <Slayer />;
}

