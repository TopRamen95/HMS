import React, { useState } from 'react';

const AddDoctor = () => {
  const [doctor, setDoctor] = useState({
    uid: '',
    name: '',
    email: '',
    phone: '',
    department: '',
    specialization: '',
    qualification: '',
    experience: '',
  });

  const [status, setStatus] = useState('');

  const handleChange = (e) => {
    let { name, value } = e.target;

    // Auto-add Dr. prefix for name
    if (name === 'name' && value && !value.startsWith('Dr.')) {
      value = `Dr. ${value}`;
    }

    // Auto-add DR prefix for UID
    if (name === 'uid' && value && !value.startsWith('DR')) {
      value = `DR${value}`;
    }

    setDoctor((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('');

    if (!doctor.name || !doctor.email || !doctor.department) {
      setStatus('Please fill in all required fields.');
      return;
    }

    try {
      const response = await fetch('http://localhost:8000/api/doctors', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...doctor,
          experience: parseInt(doctor.experience) || 0,
        }),
      });

      if (!response.ok) {
        const data = await response.json();
        setStatus(data.error || 'Failed to add doctor.');
        return;
      }

      setStatus('✅ Doctor added successfully!');
      setDoctor({
        uid: '',
        name: '',
        email: '',
        phone: '',
        department: '',
        specialization: '',
        qualification: '',
        experience: '',
      });
    } catch (err) {
      console.error('Error adding doctor:', err);
      setStatus('❌ Failed to add doctor.');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 to-purple-200 p-8">
      <h2 className="text-3xl font-bold text-center text-indigo-800 mb-6">Add New Doctor 🩺</h2>

      <form
        onSubmit={handleSubmit}
        className="max-w-xl mx-auto bg-white p-6 rounded-xl shadow-md space-y-4"
      >
        {[
          { label: 'UID (Starts with DR)', name: 'uid' },
          { label: 'Name (Starts with Dr.)', name: 'name' },
          { label: 'Email', name: 'email', type: 'email' },
          { label: 'Phone', name: 'phone' },
          { label: 'Department', name: 'department' },
          { label: 'Specialization', name: 'specialization' },
          { label: 'Qualification', name: 'qualification' },
          { label: 'Experience (years)', name: 'experience', type: 'number' },
        ].map((field) => (
          <div key={field.name}>
            <label className="block font-medium text-sm text-gray-700">
              {field.label}
            </label>
            <input
              type={field.type || 'text'}
              name={field.name}
              value={doctor[field.name]}
              onChange={handleChange}
              className="w-full px-4 py-2 mt-1 border rounded-lg focus:ring-2 focus:ring-indigo-400"
              required={['name', 'email', 'department'].includes(field.name)}
            />
          </div>
        ))}

        <button
          type="submit"
          className="w-full bg-indigo-600 text-white py-3 rounded-lg hover:bg-indigo-700 transition"
        >
          Add Doctor
        </button>

        {status && <p className={`text-center mt-4 text-sm ${status.startsWith('✅') ? 'text-green-700' : 'text-red-600'}`}>{status}</p>}
      </form>
    </div>
  );
};

export default AddDoctor;
