import { createFileRoute } from '@tanstack/react-router';
import Inventory from '../components/Inventory';

export const Route = createFileRoute('/inventory')({
  component: InventoryComponent,
});

function InventoryComponent() {
  return <Inventory />;
}
