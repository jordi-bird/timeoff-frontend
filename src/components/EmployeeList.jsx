import React from 'react';
import TimeOffRequestForm from './TimeOffRequestForm';

function EmployeeList({ employees, onRequestCreated, onRequestStatusChange }) {
  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4 text-gray-800">Employees</h2>
      {employees.map(emp => (
        <div
          key={emp.id}
          className="bg-white shadow-md rounded-xl p-4 mb-6 border border-gray-200"
        >
          <div className="mb-2">
            <h3 className="text-lg font-bold text-blue-800">{emp.name}</h3>
            <p className="text-sm text-gray-600">{emp.email}</p>
          </div>

          <div className="mt-4">
            <h4 className="text-md font-semibold text-gray-700 mb-2">Time Off Requests</h4>
            <ul className="space-y-2">
              {emp.time_off_requests.map(req => (
                <li
                  key={req.id}
                  className="bg-gray-100 rounded-md px-3 py-2 flex items-center justify-between"
                >
                  <div className="text-sm">
                    <span className="font-medium">{req.start_date}</span> –{' '}
                    <span className="font-medium">{req.end_date}</span>{' '}
                    | {req.reason} | <strong className="capitalize">{req.status}</strong>
                  </div>
                  {req.status === 'pending' && (
                    <div className="space-x-2">
                      <button
                        className="text-green-600 hover:underline"
                        onClick={() => onRequestStatusChange(req.id, 'approved')}
                      >
                        ✅ Approve
                      </button>
                      <button
                        className="text-red-600 hover:underline"
                        onClick={() => onRequestStatusChange(req.id, 'rejected')}
                      >
                        ❌ Reject
                      </button>
                    </div>
                  )}
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-4">
            <TimeOffRequestForm
              employeeId={emp.id}
              onRequestCreated={(newReq) => onRequestCreated(emp.id, newReq)}
            />
          </div>
        </div>
      ))}
    </div>
  );
}

export default EmployeeList;
