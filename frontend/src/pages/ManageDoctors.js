import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const ManageDoctors = () => {
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    fetchDoctors();
  }, []);

  const fetchDoctors = async () => {
    setLoading(true);
    setError('');
    try {
      const response = await fetch('http://localhost:5000/api/doctors');
      if (!response.ok) {
        throw new Error('Failed to fetch doctors');
      }
      const data = await response.json();
      setDoctors(data);
    } catch (err) {
      setError(err.message || 'Something went wrong');
    }
    setLoading(false);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this doctor?')) {
      try {
        const response = await fetch(`http://localhost:5000/api/doctors/${id}`, {
          method: 'DELETE',
        });
        if (!response.ok) {
          throw new Error('Failed to delete doctor');
        }
        fetchDoctors(); // Refresh list after deletion
      } catch (err) {
        alert(err.message || 'Could not delete doctor');
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-indigo-800">👨‍⚕️ Manage Doctors</h1>
        <button
          onClick={() => navigate('/admin/add-doctor')}
          className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded shadow"
        >
          ➕ Add New Doctor
        </button>
      </div>

      {loading ? (
        <p className="text-center text-gray-600">Loading doctors...</p>
      ) : error ? (
        <p className="text-center text-red-600">{error}</p>
      ) : doctors.length === 0 ? (
        <p className="text-center text-gray-600">No doctors available. Add some.</p>
      ) : (
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {doctors.map((doc) => (
            <div
              key={doc._id || doc.id} // depending on backend's id field
              className="bg-white shadow rounded-lg p-4 flex flex-col justify-between hover:shadow-xl transition"
            >
              <div>
                <h2 className="text-lg font-bold text-indigo-700 mb-1">{doc.name}</h2>
                <p className="text-sm text-gray-600 mb-1"><strong>UID:</strong> {doc.uid}</p>
                <p className="text-sm"><strong>Email:</strong> {doc.email}</p>
                <p className="text-sm"><strong>Phone:</strong> {doc.phone}</p>
                <p className="text-sm"><strong>Department:</strong> {doc.department}</p>
                <p className="text-sm"><strong>Specialization:</strong> {doc.specialization}</p>
                <p className="text-sm"><strong>Qualification:</strong> {doc.qualification}</p>
                <p className="text-sm"><strong>Availability:</strong> {doc.availability}</p>
                <p className="text-sm"><strong>Experience:</strong> {doc.experience} years</p>
              </div>
              <div className="flex justify-end gap-2 mt-4">
                <button
                  onClick={() => navigate(`/admin/edit-doctor/${doc._id || doc.id}`)}
                  className="text-blue-600 hover:underline text-sm"
                >
                  📝 Edit
                </button>
                <button
                  onClick={() => handleDelete(doc._id || doc.id)}
                  className="text-red-600 hover:underline text-sm"
                >
                  🗑 Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ManageDoctors;
