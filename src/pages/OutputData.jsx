import React, { useEffect, useState } from 'react';
import { collection, onSnapshot } from 'firebase/firestore';
import { db } from '../firebase';

export default function OutputData() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, 'pengambilan'), (snapshot) => {
      const hasil = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setData(hasil);
    });
    return () => unsubscribe();
  }, []);

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #f0f4ff 0%, #f8fafc 100%)',
      fontFamily: 'Segoe UI, Arial, sans-serif',
      padding: 24,
      margin: 0
    }}>
      <div style={{
        maxWidth: 1100,
        margin: '32px auto',
        background: '#fff',
        borderRadius: 20,
        boxShadow: '0 6px 32px rgba(99,102,241,0.10)',
        padding: 28,
        border: '1px solid #e0e7ff'
      }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: 18,
          marginBottom: 28
        }}>
          <div style={{
            background: 'linear-gradient(135deg, #6366f1 0%, #818cf8 100%)',
            borderRadius: '50%',
            width: 54,
            height: 54,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 2px 8px rgba(99,102,241,0.13)'
          }}>
            <svg width="30" height="30" fill="#fff" viewBox="0 0 24 24">
              <path d="M12 12c2.7 0 8 1.34 8 4v2H4v-2c0-2.66 5.3-4 8-4zm0-2a4 4 0 100-8 4 4 0 000 8z"/>
            </svg>
          </div>
          <div>
            <h1 style={{
              margin: 0,
              fontSize: 30,
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
        <div style={{
          overflowX: 'auto',
          borderRadius: 12,
          boxShadow: '0 1px 6px rgba(99,102,241,0.06)'
        }}>
          <table style={{
            width: '100%',
            borderCollapse: 'separate',
            borderSpacing: 0,
            background: 'linear-gradient(135deg, #f3f4f6 0%, #f8fafc 100%)',
            borderRadius: 12,
            overflow: 'hidden'
          }}>
            <thead>
              <tr>
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
                        padding: '7px 18px',
                        borderRadius: 18,
                        background: row.status === 'Selesai'
                          ? 'linear-gradient(90deg, #bbf7d0 0%, #22d3ee 100%)'
                          : 'linear-gradient(90deg, #fef9c3 0%, #fca5a5 100%)',
                        color: row.status === 'Selesai' ? '#15803d' : '#b45309',
                        fontWeight: 700,
                        fontSize: 14,
                        letterSpacing: 0.5,
                        boxShadow: '0 1px 4px rgba(34,211,238,0.07)'
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
        <div style={{
          marginTop: 18,
          textAlign: 'center',
          color: '#64748b',
          fontSize: 13
        }}>
          &copy; {new Date().getFullYear()} IT Support Monitoring
        </div>
      </div>
      {/* Responsive style */}
      <style>{`
        @media (max-width: 700px) {
          table, thead, tbody, th, td, tr {
            display: block;
          }
          thead tr {
            display: none;
          }
          tbody tr {
            margin-bottom: 18px;
            border-radius: 12px;
            box-shadow: 0 2px 8px rgba(99,102,241,0.07);
            background: #fff !important;
          }
          td {
            text-align: left !important;
            padding-left: 40% !important;
            position: relative;
            min-height: 40px;
            border-bottom: none !important;
            border-top: 1px solid #e5e7eb;
          }
          td:before {
            position: absolute;
            left: 16px;
            top: 50%;
            transform: translateY(-50%);
            width: 38%;
            white-space: nowrap;
            font-weight: 700;
            color: #6366f1;
            font-size: 14px;
          }
          td:nth-of-type(1):before { content: "No"; }
          td:nth-of-type(2):before { content: "Tanggal"; }
          td:nth-of-type(3):before { content: "Diambil Oleh"; }
          td:nth-of-type(4):before { content: "Kode Barang"; }
          td:nth-of-type(5):before { content: "Jenis"; }
          td:nth-of-type(6):before { content: "Kendala"; }
          td:nth-of-type(7):before { content: "Bagian"; }
          td:nth-of-type(8):before { content: "Keterangan"; }
          td:nth-of-type(9):before { content: "Status"; }
        }
      `}</style>
    </div>
  );
}

const thStyle = {
  padding: '15px 8px',
  fontWeight: 700,
  fontSize: 16,
  borderBottom: '2px solid #e0e7ff',
  textAlign: 'center',
  letterSpacing: 0.5,
  background: 'linear-gradient(90deg, #6366f1 0%, #818cf8 100%)',
  color: '#fff',
  borderTopLeftRadius: 12,
  borderTopRightRadius: 12
};

const tdStyle = {
  padding: '13px 8px',
  fontSize: 15,
  borderBottom: '1px solid #e5e7eb',
  textAlign: 'center',
  transition: 'background 0.2s'
};
