
import React, { useState } from 'react';
import axios from 'axios';

function App() {
  const [leads, setLeads] = useState([]);

  const fetchLeads = async () => {
    const res = await axios.get('/api/leads');
    setLeads(res.data);
  };

  return (
    <div>
      <h1>Salesforce Leads</h1>
      <button onClick={fetchLeads}>Fetch Leads</button>
      <table border="1">
        <thead>
          <tr>
            <th>Name</th><th>Email</th><th>Status</th><th>Created Date</th>
          </tr>
        </thead>
        <tbody>
          {leads.map((lead, i) => (
            <tr key={i}>
              <td>{lead.Name}</td><td>{lead.Email}</td>
              <td>{lead.Status}</td><td>{lead.CreatedDate}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;
