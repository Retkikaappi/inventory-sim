import duradelTasksRaw from '../../data/duradel.json';
import { taskData } from '../../types';

const Slayer = () => {
  const duradelTasks: taskData[] = duradelTasksRaw;
  return (
    <div className='flex justify-center'>
      <table>
        <thead>
          <tr className='border-1 border-black'>
            <th className='p-1 px-4'>Name</th>
            <th className='p-1 px-4'>Amount</th>
            <th className='p-1 px-4'>Ext. Amount</th>
            <th className='p-1 px-4'>Requirement</th>
            <th className='p-1 px-4'>Weight</th>
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
