import React from 'react';

const RemindersList = ({ reminders, deleteReminder }) => {
  return (
    <div className="p-4 border rounded-lg shadow-md">
      <h2 className="text-lg font-bold mb-2">Your Reminders</h2>
      <ul className="space-y-4">
        {reminders.map((reminder, index) => (
          <li key={index} className="p-4 border rounded-lg shadow-md flex justify-between">
            <div>
              <h3 className="text-md font-semibold">{reminder.title}</h3>
              <p>{reminder.description}</p>
              <p>
                {new Date(reminder.date).toLocaleDateString()} {reminder.time}
              </p>
              <p>Frequency: {reminder.frequency}</p>
            </div>
            <button
              onClick={() => deleteReminder(index)}
              className="ml-4 p-2 bg-red-500 text-white rounded-md"
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RemindersList;
