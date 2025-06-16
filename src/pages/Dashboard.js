import React, { useEffect, useState } from 'react';
import { collection, onSnapshot } from 'firebase/firestore';
import db from '../utils/firebase';
import { motion } from 'framer-motion';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

export default function Dashboard() {
  const [otData, setOtData] = useState([]);
  const [inventory, setInventory] = useState([]);
  const [alerts, setAlerts] = useState([]);
  const [otPage, setOtPage] = useState(0);
  const [alertPage, setAlertPage] = useState(0);

  const OT_PAGE_SIZE = 3;
  const ALERT_PAGE_SIZE = 2;

  useEffect(() => {
    const unsubOT = onSnapshot(collection(db, 'otSchedule'), snapshot => {
      setOtData(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    });
    const unsubPharmacy = onSnapshot(collection(db, 'pharmacy'), snapshot => {
      setInventory(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    });
    const unsubAlerts = onSnapshot(collection(db, 'alerts'), snapshot => {
      setAlerts(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    });
    return () => {
      unsubOT(); unsubPharmacy(); unsubAlerts();
    };
  }, []);

  useEffect(() => {
    const cycleOT = setInterval(() => {
      setOtPage(p => (p + 1) % Math.ceil(otData.length / OT_PAGE_SIZE || 1));
    }, 5000);
    const cycleAlerts = setInterval(() => {
      setAlertPage(p => (p + 1) % Math.ceil(alerts.length / ALERT_PAGE_SIZE || 1));
    }, 5000);
    return () => {
      clearInterval(cycleOT);
      clearInterval(cycleAlerts);
    };
  }, [otData.length, alerts.length]);

  const sectionStyle = {
    backgroundColor: '#f9fafb',
    border: '1px solid #d1d5db',
    borderRadius: '12px',
    padding: '20px',
    marginBottom: '25px',
    boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
    overflow: 'hidden',
    flex: 1,
    minWidth: 0
  };

  const sliderSettings = {
    autoplay: true,
    autoplaySpeed: 2000,
    infinite: true,
    slidesToShow: 3,
    slidesToScroll: 1,
    arrows: false,
    pauseOnHover: false,
    responsive: [
      { breakpoint: 1024, settings: { slidesToShow: 2 } },
      { breakpoint: 768, settings: { slidesToShow: 1 } }
    ]
  };

  return (
    <div style={{ padding: '40px', fontFamily: 'Segoe UI, sans-serif', backgroundColor: '#f0f4f8', height: '100vh', overflow: 'hidden', display: 'flex', flexDirection: 'row', gap: '20px' }}>
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '20px', overflow: 'hidden' }}>
        {/* OT Schedule */}
        <motion.section style={sectionStyle} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}>
          <h2 style={{ color: '#1e3a8a' }}>🛏️ OT Schedule</h2>
          {otData.length === 0 ? <p>No OT entries.</p> : (
            <ul>
              {otData.slice(otPage * OT_PAGE_SIZE, (otPage + 1) * OT_PAGE_SIZE).map(item => (
                <li key={item.id} style={{ marginBottom: '10px' }}>
                  <strong>{item.time}</strong> — Dr. {item.doctor} ({item.speciality}) for Patient <strong>{item.patientId}</strong> in <strong>{item.otNumber}</strong>{' '}
                  (<span style={{ color: item.status === 'Completed' ? '#16a34a' : '#dc2626' }}>{item.status}</span>)
                </li>
              ))}
            </ul>
          )}
        </motion.section>

        {/* Alerts */}
        <motion.section style={sectionStyle} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}>
          <h2 style={{ color: '#1e3a8a' }}>🚨 Emergency Alerts</h2>
          {alerts.length === 0 ? <p>No alerts.</p> : (
            <ul>
              {alerts.slice(alertPage * ALERT_PAGE_SIZE, (alertPage + 1) * ALERT_PAGE_SIZE).map(alert => (
                <li key={alert.id} style={{ marginBottom: '8px' }}>
                  <strong>{alert.type}</strong> — {alert.status} @ {alert.location}
                </li>
              ))}
            </ul>
          )}
        </motion.section>
      </div>

      {/* Pharmacy Inventory */}
      <motion.section style={{ ...sectionStyle, flex: 1 }} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}>
        <h2 style={{ color: '#1e3a8a' }}>💊 Pharmacy Inventory</h2>
        {inventory.length === 0 ? <p>No inventory data available.</p> : (
          <Slider {...sliderSettings}>
            {inventory.map(item => (
              <div key={item.id} style={{ padding: '10px' }}>
                <div style={{
                  backgroundColor: '#ffffff',
                  borderRadius: '10px',
                  boxShadow: '0 2px 6px rgba(0,0,0,0.1)',
                  padding: '16px'
                }}>
                  <h4 style={{ margin: '0 0 8px', color: '#1e293b' }}>{item.name}</h4>
                  <p style={{ fontSize: '16px', margin: 0 }}><strong>{item.stock}</strong> in stock</p>
                </div>
              </div>
            ))}
          </Slider>
        )}
      </motion.section>
    </div>
  );
}
