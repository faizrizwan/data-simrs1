import React, { useState } from 'react';
import { collection, query, where, getDocs, doc, updateDoc } from 'firebase/firestore';
import { db } from '../firebase';

export default function Form() {
  const [kodeBarang, setKodeBarang] = useState('');
  const [status, setStatus] = useState('');
  const [docId, setDocId] = useState(null);
  const [selesaiPada, setSelesaiPada] = useState('');

  const cariData = async () => {
    const q = query(collection(db, 'pengambilan'), where('kodeBarang', '==', kodeBarang));
    const snapshot = await getDocs(q);

    if (!snapshot.empty) {
      const docRef = snapshot.docs[0];
      setDocId(docRef.id);
      setStatus(docRef.data().status || '');
      setSelesaiPada(docRef.data().selesaiPada || '');
      alert('Data ditemukan!');
    } else {
      alert('Data tidak ditemukan!');
    }
  };

  const tandaiSelesai = async () => {
    if (!docId) return alert('Data belum ditemukan');
    const tanggalSelesai = new Date().toISOString();

    await updateDoc(doc(db, 'pengambilan', docId), {
      status: 'Selesai',
      selesaiPada: tanggalSelesai,
    });

    setStatus('Selesai');
    setSelesaiPada(tanggalSelesai);
    alert('Status berhasil diubah menjadi Selesai');
  };

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontFamily: 'Segoe UI, sans-serif',

    }}>
      <form
        onSubmit={e => { e.preventDefault(); cariData(); }}
        style={{
          background: '#fff',
          borderRadius: 20,
          boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.18)',
          padding: 32,
          minWidth: 340,
          width: '100%',
          maxWidth: 400,
        }}
      >
        <h2 style={{ textAlign: 'center', marginBottom: 32, color: '#1976d2', letterSpacing: 1 }}>Edit Status Pengambilan</h2>
        <div style={{ marginBottom: 24 }}>
          <label htmlFor="kodeBarang" style={{ fontWeight: 500, color: '#1976d2', marginBottom: 8, display: 'block' }}>
            Kode Barang
          </label>
          <input
            id="kodeBarang"
            type="text"
            placeholder="Masukkan kode barang"
            value={kodeBarang}
            onChange={e => setKodeBarang(e.target.value)}
            style={{
              width: '100%',
              padding: '14px 16px',
              border: '1.5px solid #bdbdbd',
              borderRadius: 10,
              fontSize: 16,
              outline: 'none',
              transition: 'border 0.2s',
              boxSizing: 'border-box',
              background: '#f7fbff'
            }}
            onFocus={e => e.target.style.border = '1.5px solid #1976d2'}
            onBlur={e => e.target.style.border = '1.5px solid #bdbdbd'}
            autoComplete="off"
          />
        </div>
        <button
          type="submit"
          style={{
            padding: 14,
            width: '100%',
            background: 'linear-gradient(90deg, #1976d2 60%, #64b5f6 100%)',
            color: '#fff',
            border: 'none',
            borderRadius: 10,
            fontWeight: 600,
            fontSize: 16,
            cursor: 'pointer',
            boxShadow: '0 2px 8px rgba(25, 118, 210, 0.08)',
            marginBottom: docId ? 0 : 8,
            transition: 'background 0.2s'
          }}
        >
          Cari Data
        </button>

        {docId && (
          <div style={{
            marginTop: 32,
            background: '#f5faff',
            borderRadius: 14,
            padding: 20,
            boxShadow: '0 1px 8px rgba(25, 118, 210, 0.06)'
          }}>
            <p style={{ fontSize: 16, marginBottom: 12 }}>
              Status saat ini:{' '}
              <strong style={{ color: status === 'Selesai' ? '#43a047' : '#fbc02d' }}>
                {status}
              </strong>
            </p>
            <p style={{ fontSize: 14, color: '#888', marginBottom: 18 }}>
              Selesai pada: {selesaiPada ? new Date(selesaiPada).toLocaleString() : '-'}
            </p>
            <button
              onClick={tandaiSelesai}
              style={{
                padding: 12,
                width: '100%',
                background: status === 'Selesai'
                  ? 'linear-gradient(90deg, #b2dfdb 60%, #e0f2f1 100%)'
                  : 'linear-gradient(90deg, #43a047 60%, #66bb6a 100%)',
                color: status === 'Selesai' ? '#1976d2' : '#fff',
                border: 'none',
                borderRadius: 10,
                fontWeight: 600,
                fontSize: 16,
                cursor: status === 'Selesai' ? 'not-allowed' : 'pointer',
                transition: 'background 0.2s'
              }}
              disabled={status === 'Selesai'}
            >
              Tandai sebagai Selesai
            </button>
          </div>
        )}
      </form>
    </div>
  );
}
