import React, { useEffect, useState } from 'react';
import EmployeeList from './components/EmployeeList';
import EmployeeForm from './components/EmployeeForm';

function App() {
  const [employees, setEmployees] = useState([]);

  const fetchEmployees = () => {
    fetch('http://localhost:3000/employees')
      .then(res => res.json())
      .then(data => setEmployees(data))
      .catch(err => console.error('Fetch error:', err));
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  const handleEmployeeCreated = (employee) => {
    setEmployees(prev => [...prev, { ...employee, time_off_requests: [] }]);
  };

  const handleRequestCreated = (employeeId, newRequest) => {
    setEmployees(prev =>
      prev.map(emp =>
        emp.id === employeeId
          ? { ...emp, time_off_requests: [...emp.time_off_requests, newRequest] }
          : emp
      )
    );
  };

  const handleRequestStatusChange = (requestId, newStatus) => {
    fetch(`http://localhost:3000/time_off_requests/${requestId}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status: newStatus }),
    })
      .then(res => res.json())
      .then(updatedRequest => {
        setEmployees(prev =>
          prev.map(emp => ({
            ...emp,
            time_off_requests: emp.time_off_requests.map(req =>
              req.id === updatedRequest.id ? updatedRequest : req
            ),
          }))
        );
      });
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-6 text-center text-blue-700">
          Employee Time Off Manager
        </h1>
        <div className="mb-8">
          <EmployeeForm onEmployeeCreated={handleEmployeeCreated} />
        </div>
        <EmployeeList
          employees={employees}
          onRequestCreated={handleRequestCreated}
          onRequestStatusChange={handleRequestStatusChange}
        />
      </div>
    </div>
  );
}

export default App;
