import React, { useState } from 'react';

function TimeOffRequestForm({ employeeId, onRequestCreated }) {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [reason, setReason] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await fetch(`http://localhost:3000/employees/${employeeId}/time_off_requests`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ time_off_request: { start_date: startDate, end_date: endDate, reason } }),
    });

    if (res.ok) {
      const newRequest = await res.json();
      onRequestCreated(newRequest);
      setStartDate('');
      setEndDate('');
      setReason('');
    } else {
      alert('Error creating request');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mt-4 space-y-3">
      <h4 className="text-lg font-semibold text-gray-700">New Time Off Request</h4>

      <input
        type="date"
        value={startDate}
        onChange={(e) => setStartDate(e.target.value)}
        required
        className="block w-full p-2 border rounded-md shadow-sm focus:ring focus:ring-blue-200"
      />

      <input
        type="date"
        value={endDate}
        onChange={(e) => setEndDate(e.target.value)}
        required
        className="block w-full p-2 border rounded-md shadow-sm focus:ring focus:ring-blue-200"
      />

      <input
        value={reason}
        onChange={(e) => setReason(e.target.value)}
        placeholder="Reason"
        required
        className="block w-full p-2 border rounded-md shadow-sm focus:ring focus:ring-blue-200"
      />

      <button
        type="submit"
        className="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition"
      >
        Submit
      </button>
    </form>
  );
}

export default TimeOffRequestForm;
