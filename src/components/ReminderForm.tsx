import { useState } from 'react';

const ReminderForm = ({ addReminder }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [frequency, setFrequency] = useState('Once');

  const handleSubmit = (e) => {
    e.preventDefault();
    addReminder({ title, description, date, time, frequency });
    setTitle('');
    setDescription('');
    setDate('');
    setTime('');
    setFrequency('Once');
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 border rounded-lg shadow-md">
      <h2 className="text-lg font-bold mb-2">Add Reminder</h2>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">Title</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="mt-1 p-2 w-full border rounded-md"
          required
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">Description</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="mt-1 p-2 w-full border rounded-md"
          required
        ></textarea>
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">Date</label>
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="mt-1 p-2 w-full border rounded-md"
          required
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">Time</label>
        <input
          type="time"
          value={time}
          onChange={(e) => setTime(e.target.value)}
          className="mt-1 p-2 w-full border rounded-md"
          required
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">Frequency</label>
        <select
          value={frequency}
          onChange={(e) => setFrequency(e.target.value)}
          className="mt-1 p-2 w-full border rounded-md"
        >
          <option value="Once">Once</option>
          <option value="Daily">Daily</option>
          <option value="Weekly">Weekly</option>
          <option value="Hourly">Hourly</option>
        </select>
      </div>
      <button type="submit" className="mt-2 p-2 bg-blue-500 text-white rounded-md">
        Add Reminder
      </button>
    </form>
  );
};

export default ReminderForm;
