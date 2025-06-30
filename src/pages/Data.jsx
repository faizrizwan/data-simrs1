import React, { useEffect, useState } from 'react';
import { collection, getDocs, deleteDoc, doc } from 'firebase/firestore';
import { db } from '../firebase';

const styles = {
    container: {
        padding: 32,
        background: 'linear-gradient(135deg, #f8fafc 0%, #e0e7ff 100%)',
        minHeight: '100vh',
        fontFamily: 'Segoe UI, sans-serif',
    },
   
    table: {
        width: '100%',
        borderCollapse: 'separate',
        borderSpacing: 0,
        background: '#fff',
        borderRadius: 12,
        overflow: 'hidden',
        boxShadow: '0 4px 24px rgba(55,48,163,0.08)',
    },
    th: {
        background: '#6366f1',
        color: '#fff',
        padding: 14,
        fontWeight: 600,
        fontSize: 16,
        border: 'none',
    },
    td: {
        padding: 12,
        borderBottom: '1px solid #e5e7eb',
        fontSize: 15,
        color: '#374151',
        textAlign: 'center',
    },
    trHover: {
        transition: 'background 0.2s',
        cursor: 'pointer',
    },
    button: {
        background: 'linear-gradient(90deg, #6366f1 0%, #818cf8 100%)',
        color: '#fff',
        border: 'none',
        borderRadius: 6,
        padding: '7px 18px',
        fontWeight: 600,
        cursor: 'pointer',
        boxShadow: '0 2px 8px rgba(99,102,241,0.12)',
        transition: 'background 0.2s, transform 0.1s',
    },
};

export default function Data() {
    const [data, setData] = useState([]);

    const fetchData = async () => {
        const snapshot = await getDocs(collection(db, 'pengambilan'));
        const docs = snapshot.docs.map((doc, i) => ({
            id: doc.id,
            no: i + 1,
            ...doc.data(),
        }));
        setData(docs);
    };

    useEffect(() => {
        fetchData();
    }, []);

    const handleDelete = async (id) => {
        const konfirmasi = window.confirm('Yakin ingin menghapus data ini?');
        if (konfirmasi) {
            await deleteDoc(doc(db, 'pengambilan', id));
            fetchData();
        }
    };

    return (
        <div style={styles.container}>
            <h1>Data Pengambilan Barang</h1>
            <table style={styles.table}>
                <thead>
                    <tr>
                        <th style={styles.th}>No</th>
                        <th style={styles.th}>Tanggal</th>
                        <th style={styles.th}>Diambil Oleh</th>
                        <th style={styles.th}>Kode Barang</th>
                        <th style={styles.th}>Jenis</th>
                        <th style={styles.th}>Kendala</th>
                        <th style={styles.th}>Bagian</th>
                        <th style={styles.th}>Keterangan</th>
                        <th style={styles.th}>Status</th>
                        <th style={styles.th}>Aksi</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map(item => (
                        <tr
                            key={item.id}
                            style={{
                                ...styles.trHover,
                                background: item.no % 2 === 0 ? '#f1f5f9' : '#fff',
                            }}
                            onMouseOver={e => (e.currentTarget.style.background = '#e0e7ff')}
                            onMouseOut={e => (e.currentTarget.style.background = item.no % 2 === 0 ? '#f1f5f9' : '#fff')}
                        >
                            <td style={styles.td}>{item.no}</td>
                            <td style={styles.td}>{item.tgl}</td>
                            <td style={styles.td}>{item.diambilOleh}</td>
                            <td style={styles.td}>{item.kodeBarang}</td>
                            <td style={styles.td}>{item.jenis}</td>
                            <td style={styles.td}>{item.kendala}</td>
                            <td style={styles.td}>{item.bagian}</td>
                            <td style={styles.td}>{item.keterangan}</td>
                            <td style={styles.td}>{item.status}</td>
                            <td style={styles.td}>
                                <button
                                    style={styles.button}
                                    onClick={() => handleDelete(item.id)}
                                    onMouseDown={e => (e.currentTarget.style.transform = 'scale(0.96)')}
                                    onMouseUp={e => (e.currentTarget.style.transform = 'scale(1)')}
                                >
                                    Hapus
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
