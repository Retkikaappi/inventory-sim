import { useEffect, useState } from 'react';
import { EquippedGear, Item } from '../../types';

const gearUp = (equipment: Item[]): EquippedGear => {
  const gear: EquippedGear = {
    mainHand: null,
    offHand: null,
    head: null,
    cape: null,
    neck: null,
    ammo: null,
    body: null,
    legs: null,
    hands: null,
    feet: null,
    ring: null,
  };
  equipment.map((e) => {
    switch (e.slot) {
      case 'two-handed':
        gear.mainHand = e;
        gear.offHand = null;
        break;
      case 'ammo':
        gear.ammo = e;
        break;
      case 'head':
        gear.head = e;
        break;
      case 'cape':
        gear.cape = e;
        break;
      case 'neck':
        gear.neck = e;
        break;
      case 'weapon':
        gear.mainHand = e;
        break;
      case 'shield':
        gear.offHand = e;
        break;
      case 'body':
        gear.body = e;
        break;
      case 'legs':
        gear.legs = e;
        break;
      case 'hands':
        gear.hands = e;
        break;
      case 'feet':
        gear.feet = e;
        break;
      case 'ring':
        gear.ring = e;
    }
  });
  return gear;
};

const GearSlot = ({ item }: { item: Item | null }) => (
  <div
    className={`border-1 flex-1 hover:bg-red-600 select-none ${
      item === null ? 'bg-gray-500' : item.img
    }`}
  >
    {item?.slot}
  </div>
);
const Equipment = ({ equipment }: { equipment: Item[] }) => {
  const [eqGear, setEqGear] = useState<EquippedGear>(gearUp(equipment));

  useEffect(() => {
    setEqGear(gearUp(equipment));
  }, [equipment]);

  if (!eqGear) {
    return (
      <div className='h-100 w-65 border-1 border-blue-500 flex flex-wrap content-start'></div>
    );
  }

  return (
    <div className='h-100 w-65 border-1 border-blue-500 flex flex-col justify-center gap-1'>
      <div className='flex flex-row justify-between h-1/7 max-h-1/7 gap-1 mx-10'>
        <div className='flex-1' />

        <GearSlot item={eqGear.head} />
        <div className='flex-1' />
      </div>

      <div className='flex flex-row justify-between h-1/7 max-h-1/7 gap-1 mx-10'>
        <GearSlot item={eqGear.cape} />
        <GearSlot item={eqGear.neck} />
        <GearSlot item={eqGear.ammo} />
      </div>

      <div className='flex flex-row justify-between h-1/7 max-h-1/7 gap-10'>
        <GearSlot item={eqGear.mainHand} />
        <GearSlot item={eqGear.body} />
        <GearSlot item={eqGear.offHand} />
      </div>

      <div className='flex flex-row justify-between h-1/7 max-h-1/7 gap-1 mx-10'>
        <div className='flex-1' />
        <GearSlot item={eqGear.legs} />
        <div className='flex-1' />
      </div>

      <div className='flex flex-row justify-between h-1/7 max-h-1/7 gap-10'>
        <GearSlot item={eqGear.hands} />
        <GearSlot item={eqGear.feet} />
        <GearSlot item={eqGear.ring} />
      </div>
    </div>
  );
};

export default Equipment;
