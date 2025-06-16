import React, { useEffect, useState } from 'react';
import { collection, onSnapshot, updateDoc, doc, addDoc } from 'firebase/firestore';
import db from '../utils/firebase';
import { motion } from 'framer-motion';

export default function Pharmacy() {
  const [inventory, setInventory] = useState([]);
  const [name, setName] = useState('');
  const [stock, setStock] = useState('');

  useEffect(() => {
    const unsub = onSnapshot(collection(db, 'pharmacy'), (snapshot) => {
      setInventory(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    });
    return () => unsub();
  }, []);

  const handleAdd = async (e) => {
    e.preventDefault();
    if (!name || !stock) return alert('All fields required');
    await addDoc(collection(db, 'pharmacy'), {
      name: name.trim(),
      stock: parseInt(stock)
    });
    setName('');
    setStock('');
  };

  const updateStock = async (id, delta) => {
    const item = inventory.find(i => i.id === id);
    const updatedStock = item.stock + delta;
    if (updatedStock < 0) return alert('Stock cannot go negative');
    await updateDoc(doc(db, 'pharmacy', id), { stock: updatedStock });
  };

  const sectionStyle = {
    backgroundColor: '#f9fafb',
    border: '1px solid #d1d5db',
    borderRadius: '12px',
    padding: '20px',
    marginBottom: '25px',
    boxShadow: '0 2px 8px rgba(0,0,0,0.05)'
  };

  return (
    <div style={{ padding: '40px', fontFamily: 'Segoe UI, sans-serif' }}>
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
        <h1 style={{ fontSize: '2rem', color: '#1e3a8a', marginBottom: '20px' }}>💊 Pharmacy Management</h1>

        {/* Add Medicine Form */}
        <div style={sectionStyle}>
          <form onSubmit={handleAdd} style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', alignItems: 'center' }}>
            <input
              type="text"
              placeholder="Medicine Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              style={{ padding: '10px', borderRadius: '8px', border: '1px solid #d1d5db', minWidth: '200px' }}
            />
            <input
              type="number"
              placeholder="Stock"
              value={stock}
              onChange={(e) => setStock(e.target.value)}
              required
              min={0}
              style={{ padding: '10px', borderRadius: '8px', border: '1px solid #d1d5db', width: '100px' }}
            />
            <button
              type="submit"
              style={{
                padding: '10px 16px',
                borderRadius: '8px',
                backgroundColor: '#2563eb',
                color: 'white',
                border: 'none',
                fontWeight: 'bold',
                cursor: 'pointer'
              }}
            >
              Add Medicine
            </button>
          </form>
        </div>

        {/* Inventory List */}
        <div style={sectionStyle}>
          <h3 style={{ color: '#1e3a8a', marginBottom: '16px' }}>Inventory List</h3>
          {inventory.length === 0 ? (
            <p>No medicine data available.</p>
          ) : (
            <ul style={{ listStyle: 'none', paddingLeft: 0 }}>
              {inventory.map(item => (
                <li
                  key={item.id}
                  style={{
                    marginBottom: '12px',
                    padding: '10px 15px',
                    backgroundColor: '#ffffff',
                    borderRadius: '8px',
                    border: '1px solid #e2e8f0',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                  }}
                >
                  <div>
                    <strong>{item.name}</strong>: {item.stock} units
                  </div>
                  <div>
                    <button
                      onClick={() => updateStock(item.id, 10)}
                      style={{
                        marginRight: '8px',
                        padding: '6px 12px',
                        backgroundColor: '#22c55e',
                        color: 'white',
                        border: 'none',
                        borderRadius: '6px',
                        cursor: 'pointer'
                      }}
                    >
                      +10
                    </button>
                    <button
                      onClick={() => updateStock(item.id, -10)}
                      style={{
                        padding: '6px 12px',
                        backgroundColor: '#ef4444',
                        color: 'white',
                        border: 'none',
                        borderRadius: '6px',
                        cursor: 'pointer'
                      }}
                    >
                      -10
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </motion.div>
    </div>
  );
}
