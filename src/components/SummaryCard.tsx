import React from 'react';

const SummaryCard = ({ summary }) => (
  <div className="bg-white p-4 rounded-lg shadow-md mb-4">
    <h3 className="text-lg font-semibold mb-2">Summary</h3>
    <p className="text-gray-700">{summary}</p>
  </div>
);

export default SummaryCard;
