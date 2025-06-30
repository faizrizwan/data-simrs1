import React, { useState, useEffect } from 'react';
import { collection, addDoc, doc, updateDoc, getDoc } from 'firebase/firestore';
import { db } from '../firebase';
import { useNavigate, useParams } from 'react-router-dom';
import '../style.css';

const fieldLabels = {
  tgl: 'Tanggal Pengambilan',
  diambilOleh: 'Diambil Oleh',
  kodeBarang: 'Kode Barang',
  jenis: 'Jenis Barang',
  kendala: 'Kendala',
  bagian: 'Bagian',
  keterangan: 'Keterangan',
  status: 'Status'
};

export default function FormPengambilan() {
  const [form, setForm] = useState({
    tgl: '',
    diambilOleh: '',
    kodeBarang: '',
    jenis: '',
    kendala: '',
    bagian: '',
    keterangan: '',
    status: ''
  });

  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      const fetchData = async () => {
        const docRef = doc(db, 'pengambilan', id);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setForm(docSnap.data());
        }
      };
      fetchData();
    }
  }, [id]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (id) {
        await updateDoc(doc(db, 'pengambilan', id), form);
        alert('Data berhasil diupdate');
      } else {
        await addDoc(collection(db, 'pengambilan'), form);
        alert('Data berhasil disimpan');
      }
      navigate('/dashboard');
    } catch (err) {
      alert('Gagal simpan: ' + err.message);
    }
  };

  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: 'Segoe UI, sans-serif',      }}
    >
      <form
        onSubmit={handleSubmit}
        style={{
          background: '#fff',
          borderRadius: 20,
          boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.18)',
          maxWidth: 440,
          width: '100%',
          padding: 32,
          display: 'flex',
          flexDirection: 'column',
          gap: 22,
          border: '1px solid #e5e9f2'
        }}
      >
        <h2
          style={{
            textAlign: 'center',
            marginBottom: 16,
            color: '#1e293b',
            letterSpacing: 1,
            fontWeight: 700,
            fontSize: 24
          }}
        >
          {id ? 'Edit Pengambilan Barang' : 'Form Pengambilan Barang'}
        </h2>
        {Object.keys(fieldLabels).map((field) => (
          <div key={field} style={{ display: 'flex', flexDirection: 'column', gap: 7 }}>
            <label
              htmlFor={field}
              style={{
                fontWeight: 600,
                color: '#334155',
                fontSize: 15,
                marginBottom: 2,
                letterSpacing: 0.2
              }}
            >
              {fieldLabels[field]}
            </label>
            {field === 'status' ? (
              <select
                id={field}
                name={field}
                value={form[field]}
                onChange={handleChange}
                required
                style={{
                  padding: '12px 14px',
                  borderRadius: 10,
                  border: '1.5px solid #cbd5e1',
                  background: '#f1f5f9',
                  fontSize: 15,
                  outline: 'none',
                  transition: 'border 0.2s',
                  boxShadow: '0 1px 2px rgba(0,0,0,0.03)'
                }}
                onFocus={e => e.target.style.border = '1.5px solid #2563eb'}
                onBlur={e => e.target.style.border = '1.5px solid #cbd5e1'}
              >
                <option value="">Pilih Status</option>
                <option value="proses">Proses</option>
                <option value="selesai">Selesai</option>
              </select>
            ) : field === 'kendala' || field === 'keterangan' ? (
              <textarea
                id={field}
                name={field}
                value={form[field]}
                onChange={handleChange}
                placeholder={`Masukkan ${fieldLabels[field]}`}
                rows={3}
                style={{
                  padding: '12px 14px',
                  borderRadius: 10,
                  border: '1.5px solid #cbd5e1',
                  background: '#f1f5f9',
                  fontSize: 15,
                  resize: 'vertical',
                  outline: 'none',
                  transition: 'border 0.2s',
                  boxShadow: '0 1px 2px rgba(0,0,0,0.03)'
                }}
                onFocus={e => e.target.style.border = '1.5px solid #2563eb'}
                onBlur={e => e.target.style.border = '1.5px solid #cbd5e1'}
              />
            ) : (
              <input
                id={field}
                name={field}
                type={field === 'tgl' ? 'date' : 'text'}
                value={form[field]}
                onChange={handleChange}
                placeholder={fieldLabels[field]}
                required={field !== 'kendala' && field !== 'keterangan'}
                style={{
                  padding: '12px 14px',
                  borderRadius: 10,
                  border: '1.5px solid #cbd5e1',
                  background: '#f1f5f9',
                  fontSize: 15,
                  outline: 'none',
                  transition: 'border 0.2s',
                  boxShadow: '0 1px 2px rgba(0,0,0,0.03)'
                }}
                onFocus={e => e.target.style.border = '1.5px solid #2563eb'}
                onBlur={e => e.target.style.border = '1.5px solid #cbd5e1'}
              />
            )}
          </div>
        ))}
        <button
          type="submit"
          style={{
            marginTop: 8,
            padding: '13px 0',
            borderRadius: 10,
            border: 'none',
            background: 'linear-gradient(90deg, #2563eb 0%, #60a5fa 100%)',
            color: '#fff',
            fontWeight: 700,
            fontSize: 17,
            letterSpacing: 1,
            cursor: 'pointer',
            boxShadow: '0 2px 8px rgba(37,99,235,0.10)',
            transition: 'background 0.2s, transform 0.1s'
          }}
          onMouseOver={e => e.target.style.background = 'linear-gradient(90deg, #1d4ed8 0%, #3b82f6 100%)'}
          onMouseOut={e => e.target.style.background = 'linear-gradient(90deg, #2563eb 0%, #60a5fa 100%)'}
          onMouseDown={e => e.target.style.transform = 'scale(0.97)'}
          onMouseUp={e => e.target.style.transform = 'scale(1)'}
        >
          {id ? 'Update' : 'Simpan'}
        </button>
      </form>
    </div>
  );
}
