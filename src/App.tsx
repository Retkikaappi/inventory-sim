import { useEffect, useState } from 'react';

type Inventory = {
  clicked: boolean;
};

function App() {
  const [inventory, setInventory] = useState<Inventory[]>(
    Array(28).fill({
      clicked: false,
    })
  );
  const [pendingInv, setPendingInv] = useState<Inventory[]>(inventory);

  console.log(inventory);

  useEffect(() => {
    setInventory(pendingInv);
  }, [pendingInv]);

  // setInterval(() => {
  //   setInventory(pendingInv);
  // }, 600);
  const handleItemClick = (item, index) => {
    setPendingInv(
      pendingInv.map((e, i) => {
        return i === index ? { clicked: !e.clicked } : { clicked: e.clicked };
      })
    );
  };

  const handleReset = () => {
    setInventory(Array(28).fill({ clicked: false }));
    setPendingInv(Array(28).fill({ clicked: false }));
  };

  return (
    <div className='border-1'>
      <div className='m-20 border-1 border-red-800 flex flex-col items-center justify-center'>
        <button onClick={handleReset} className='p-2 m-2 bg-neutral-500'>
          reset
        </button>
        <div className='h-100 w-65 border-1 border-blue-500 flex flex-wrap'>
          {inventory.map((item, index) => (
            <div
              key={index}
              className={`border-1 flex-1/4 hover:bg-red-600 select-none  ${
                inventory[index].clicked === true
                  ? 'bg-amber-700'
                  : 'bg-green-700'
              }`}
              onClick={() => handleItemClick(item, index)}
            ></div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;

