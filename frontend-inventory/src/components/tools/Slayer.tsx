import { useState } from 'react';
import duradelTasksRaw from '../../data/duradel.json';
import { TaskData } from '../../types';
import { useQuery } from '@tanstack/react-query';
import { getHiscore } from '../../services/hiscoreService';

const Slayer = () => {
  const [duradelTasks, setDuradelTasks] = useState<TaskData[]>(duradelTasksRaw);
  const [sortAsc, setSortAsc] = useState<boolean>(false);
  const [search, setSearch] = useState<string>('');

  const { data, isFetching, isError, refetch } = useQuery({
    queryKey: ['hiscore', search],
    queryFn: () => getHiscore(search),
    enabled: false,
  });

  const handleArrange = (method: string) => {
    switch (method) {
      case 'name':
        setDuradelTasks(
          [...duradelTasks].sort((a, b) => {
            return sortAsc
              ? a.name > b.name
                ? 1
                : -1
              : a.name < b.name
                ? 1
                : -1;
          })
        );
        setSortAsc(!sortAsc);

        break;
      case 'weight':
        setDuradelTasks(
          [...duradelTasks].sort((a, b) => {
            return sortAsc
              ? Number(b.weight) - Number(a.weight)
              : Number(a.weight) - Number(b.weight);
          })
        );
        setSortAsc(!sortAsc);
        break;
      default:
        break;
    }
  };

  const handleFetch = () => {
    refetch();
  };

  return (
    <div className='flex flex-col justify-center items-center pb-20'>
      <div className='p-4'>
        <input
          value={search}
          onChange={({ target }) => setSearch(target.value)}
          className='bg-white text-black p-1 mx-4'
        />
        <button
          onClick={handleFetch}
          disabled={isFetching}
          className={`bg-neutral-500 rounded-sm p-1 hover:text-blue-500 cursor-pointer disabled:font-bold ring-blue-500 disabled:ring-1`}
        >
          <p className={`${isFetching && 'animate-pulse'}`}>Fetch level</p>
        </button>
        {data?.skills.map((e) =>
          e.name === 'Slayer' ? (
            <p key={e.name}>Slayer level: {e.level}</p>
          ) : null
        )}
      </div>
      <table>
        <thead>
          <tr>
            <th
              onClick={() => handleArrange('name')}
              className='p-1 px-4 border-1 border-black hover:text-blue-500 cursor-pointer'
            >
              Name
            </th>
            <th className='p-1 px-4 border-1 border-black hover:text-blue-500 cursor-pointer'>
              Amount
            </th>
            <th className='p-1 px-4 border-1 border-black hover:text-blue-500 cursor-pointer'>
              Ext. Amount
            </th>
            <th className='p-1 px-4 border-1 border-black hover:text-blue-500 cursor-pointer'>
              Requirement
            </th>
            <th
              onClick={() => handleArrange('weight')}
              className='p-1 px-4 border-1 border-black hover:text-blue-500 cursor-pointer'
            >
              Weight
            </th>
          </tr>
        </thead>
        <tbody>
          {duradelTasks.map((e, index) => (
            <tr key={`tr_${index}`} className='text-center text-sm'>
              <td className='p-1 px-4 text-start border-1 border-black font-semibold'>
                {e.name}
              </td>
              <td className='p-1 px-4 text-start border-1 border-black'>
                {e.amount}
              </td>
              <td className='p-1 px-4 text-start border-1 border-black'>
                {e.extAmount}
              </td>
              <td className='p-1 px-4 text-start border-1 border-black'>
                {e.requirement}
              </td>
              <td className='p-1 px-4 text-start border-1 border-black font-semibold'>
                {e.weight}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Slayer;
