const RemindersList = ({ reminders, deleteReminder }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {reminders.map((reminder, index) => (
          <div key={index} className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4">
            <div className="border-b border-gray-200 text-md font-semibold">
              {reminder.title}
            </div>
              <div>{reminder.description}</div>
              <div>
                {new Date(reminder.date).toLocaleDateString()} {reminder.time}
              </div>
              <div>Frequency: {reminder.frequency}</div>
            
            <button
              onClick={() => deleteReminder(index)}
              className="ml-4 mt-2 p-2 bg-primary text-white rounded-md"
            >
              Delete
            </button>
          </div>
        ))}
    </div>
  );
};

export default RemindersList;

           