import { useEffect, useState, useRef } from 'react';
import Equipment from './Equipment';
import { Item, Slot } from '../../types';

const initInventory = (): Slot[] => {
  const inv = [];
  for (let i = 0; i < 28; i++) {
    inv.push({ equipped: null, slot: null });
  }

  return inv;
};

const initEquipment = () => {
  const set: Item[] = [
    {
      equipped: true,
      slot: 'two-handed',
      img: 'bg-yellow-600',
    },
    {
      equipped: true,
      slot: 'body',
      img: 'bg-yellow-600',
    },
    {
      equipped: true,
      slot: 'cape',
      img: 'bg-yellow-600',
    },
    {
      equipped: true,
      slot: 'hands',
      img: 'bg-yellow-600',
    },
    {
      equipped: true,
      slot: 'head',
      img: 'bg-yellow-600',
    },
    {
      equipped: true,
      slot: 'legs',
      img: 'bg-yellow-600',
    },
    {
      equipped: true,
      slot: 'neck',
      img: 'bg-yellow-600',
    },
    {
      equipped: true,
      slot: 'ring',
      img: 'bg-yellow-600',
    },
  ];
  return set;
};

function Inventory() {
  const [equipment, setEquipment] = useState<Item[]>(initEquipment);
  const [inventory, setInventory] = useState<Slot[]>(initInventory);
  const [, setPendingChages] = useState<(() => void)[]>([]);
  const [tickTimer, setTickTimer] = useState<number | null>(null);
  const isTimerRunning = useRef(false);
  const [tickCounter, setTickCounter] = useState(0);

  const addGearSet = () => {
    const set: Item[] = [
      {
        equipped: false,
        slot: 'two-handed',
        img: 'bg-blue-500',
      },
      {
        equipped: false,
        slot: 'body',
        img: 'bg-blue-500',
      },
      {
        equipped: false,
        slot: 'cape',
        img: 'bg-blue-500',
      },
      {
        equipped: false,
        slot: 'hands',
        img: 'bg-blue-500',
      },
      {
        equipped: false,
        slot: 'head',
        img: 'bg-blue-500',
      },
      {
        equipped: false,
        slot: 'legs',
        img: 'bg-blue-500',
      },
      {
        equipped: false,
        slot: 'neck',
        img: 'bg-blue-500',
      },
      {
        equipped: false,
        slot: 'ring',
        img: 'bg-blue-500',
      },
    ];
    setInventory([...set, ...inventory.slice(set.length)]);
  };

  useEffect(() => addGearSet(), []);

  useEffect(() => {
    if (tickTimer === null) return;

    const timer = setTimeout(() => {
      setPendingChages((updates) => {
        updates.forEach((call) => call());
        return [];
      });
      setTickCounter((prev) => prev + 1);
      setTickTimer(null);
      isTimerRunning.current = false;
    }, 600);

    return () => clearTimeout(timer);
  }, [tickTimer]);

  const saveInput = ({ equipped, slot, img }: Item, index: number) => {
    const equippedItem = equipment.find((e) => e.slot === slot);
    if (equippedItem) {
      setEquipment((prev) =>
        prev.map((e) =>
          e.slot === slot ? { equipped: !equipped, slot, img } : e
        )
      );
      setInventory((prev) =>
        prev.map((e, i) => (i === index ? equippedItem : e))
      );
    }
  };

  const handleItemClick = (item: Slot, index: number) => {
    if (item.slot === null) return;
    setPendingChages((prev) => [...prev, () => saveInput(item, index)]);

    if (!isTimerRunning.current) {
      setTickTimer(600);
      isTimerRunning.current = true;
    }
  };

  const handleReset = () => {
    setInventory(initInventory);
    setEquipment(initEquipment);
    addGearSet();
    setPendingChages([]);
    setTickTimer(null);
    setTickCounter(0);
    isTimerRunning.current = false;
  };

  return (
    <div className='text-center'>
      <p>{tickCounter}</p>
      <button
        onClick={handleReset}
        className='p-2 m-2 bg-neutral-600 rounded-sm cursor-pointer hover:brightness-125 transition'
      >
        Reset
      </button>
      <button
        className='p-2 m-2 bg-neutral-600 rounded-sm cursor-pointer hover:brightness-125 transition'
        onClick={addGearSet}
      >
        Add set
      </button>
      <div className='mx-40 flex items-center justify-center gap-20'>
        <Equipment equipment={equipment} />
        <div className='h-100 w-65 border-1 border-blue-500 flex flex-wrap'>
          {inventory.map((item, index) => (
            <div
              key={index}
              className={`border-1 border-black h-1/7 w-1/4 max-h-1/7 hover:bg-red-400 select-none ${
                item.slot === null ? 'bg-gray-500' : item.img
              }`}
              onMouseDown={() => handleItemClick(item, index)}
            >
              <p>{item.slot}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Inventory;
