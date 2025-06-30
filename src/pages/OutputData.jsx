import React, { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase';



export default function OutputData() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const ambilData = async () => {
      const snapshot = await getDocs(collection(db, 'pengambilan'));
      const hasil = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setData(hasil);
    };
    ambilData();
  }, []);

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #e0e7ff 0%, #f8fafc 100%)',
      fontFamily: 'Segoe UI, Arial, sans-serif',
      padding: 40,
      margin: 0
    }}>
      <div style={{
        maxWidth: 1100,
        marginTop: 0,
        margin: '40px auto',
        background: '#fff',
        borderRadius: 18,
        boxShadow: '0 8px 32px rgba(99,102,241,0.12)',
        padding: 36,
        border: '1px solid #e0e7ff'
      }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: 16,
          marginBottom: 32
        }}>
          <div style={{
            background: 'linear-gradient(135deg, #6366f1 0%, #818cf8 100%)',
            borderRadius: '50%',
            width: 56,
            height: 56,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 2px 8px rgba(99,102,241,0.18)'
          }}>
            <svg width="32" height="32" fill="#fff" viewBox="0 0 24 24">
              <path d="M12 12c2.7 0 8 1.34 8 4v2H4v-2c0-2.66 5.3-4 8-4zm0-2a4 4 0 100-8 4 4 0 000 8z"/>
            </svg>
          </div>
          <div>
            <h1 style={{
              margin: 0,
              fontSize: 32,
              fontWeight: 800,
              color: '#3730a3',
              letterSpacing: 1
            }}>
              Data IT-Support
            </h1>
            <div style={{
              color: '#6366f1',
              fontWeight: 500,
              fontSize: 16,
              marginTop: 4
              
            }}>
              Monitoring Barang & Kendala
            </div>
          </div>
        </div>
        <div style={{ overflowX: 'auto' }}>
          <table style={{
            width: '100%',
            borderCollapse: 'separate',
            borderSpacing: 0,
            background: 'linear-gradient(135deg, #eef2ff 0%, #f8fafc 100%)',
            borderRadius: 12,
            overflow: 'hidden',
            boxShadow: '0 2px 8px rgba(55,48,163,0.05)'
          }}>
            <thead>
              <tr style={{ background: '#6366f1', color: '#fff' }}>
                <th style={thStyle}>No</th>
                <th style={thStyle}>Tanggal</th>
                <th style={thStyle}>Diambil Oleh</th>
                <th style={thStyle}>Kode Barang</th>
                <th style={thStyle}>Jenis</th>
                <th style={thStyle}>Kendala</th>
                <th style={thStyle}>Bagian</th>
                <th style={thStyle}>Keterangan</th>
                <th style={thStyle}>Status</th>
              </tr>
            </thead>
            <tbody>
              {data.length === 0 ? (
                <tr>
                  <td colSpan={9} style={{
                    padding: 32,
                    textAlign: 'center',
                    color: '#a1a1aa',
                    fontStyle: 'italic'
                  }}>
                    Tidak ada data.
                  </td>
                </tr>
              ) : (
                data.map((row, i) => (
                  <tr
                    key={row.id}
                    style={{
                      background: i % 2 === 0 ? '#fff' : '#f1f5f9',
                      transition: 'background 0.2s',
                      cursor: 'pointer'
                    }}
                    onMouseOver={e => e.currentTarget.style.background = '#e0e7ff'}
                    onMouseOut={e => e.currentTarget.style.background = i % 2 === 0 ? '#fff' : '#f1f5f9'}
                  >
                    <td style={tdStyle}>{i + 1}</td>
                    <td style={tdStyle}>{row.tgl}</td>
                    <td style={tdStyle}>{row.diambilOleh}</td>
                    <td style={tdStyle}>{row.kodeBarang}</td>
                    <td style={tdStyle}>{row.jenis}</td>
                    <td style={tdStyle}>{row.kendala}</td>
                    <td style={tdStyle}>{row.bagian}</td>
                    <td style={tdStyle}>{row.keterangan}</td>
                    <td style={{
                      ...tdStyle,
                      padding: 0,
                      textAlign: 'center'
                    }}>
                      <span style={{
                        display: 'inline-block',
                        minWidth: 80,
                        padding: '6px 16px',
                        borderRadius: 16,
                        background: row.status === 'Selesai'
                          ? 'linear-gradient(90deg, #bbf7d0 0%, #22d3ee 100%)'
                          : 'linear-gradient(90deg, #fef9c3 0%, #fca5a5 100%)',
                        color: row.status === 'Selesai' ? '#15803d' : '#b45309',
                        fontWeight: 700,
                        fontSize: 14,
                        letterSpacing: 0.5
                      }}>
                        {row.status}
                      </span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

const thStyle = {
  padding: '16px 10px',
  fontWeight: 700,
  fontSize: 17,
  borderBottom: '2px solid #e0e7ff',
  textAlign: 'center',
  letterSpacing: 0.5,
  background: 'linear-gradient(90deg, #6366f1 0%, #818cf8 100%)',
  color: '#fff'
};

const tdStyle = {
  padding: '14px 8px',
  fontSize: 15,
  borderBottom: '1px solid #e5e7eb',
  textAlign: 'center',
  transition: 'background 0.2s'
};
