import React from 'react';

export function Navbar({ onOpenModal, backendStatus }) {
    return (
        <header className="app-header glass-panel">
            <div className="brand">
                <div className="brand-logo">💳</div>
                <div>
                    <h1 className="brand-title">Fin<span>Pulse</span></h1>
                    <p className="brand-sub">React 18 & Python Flask AI Benchmark</p>
                </div>
            </div>

            <div className="header-right">
                <div className={`status-pill ${backendStatus}`}>
                    <span className="dot"></span>
                    <span>{backendStatus === 'online' ? 'Python API: Online (Port 5001)' : 'Offline (Local State)'}</span>
                </div>
                <button className="btn btn-primary" onClick={onOpenModal}>
                    + Record Transaction
                </button>
            </div>
        </header>
    );
}