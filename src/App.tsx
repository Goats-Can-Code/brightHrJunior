import React from 'react';
import logo from './logo.svg';
import './App.css';
import './components/FileViewer/FileViewer';
import FileViewer from './components/FileViewer/FileViewer';
import Header from './components/ui/Header/Header';
import Footer from './components/ui/Footer/Footer';

function App() {
  return (
    <div className="App">
        <Header />
        <FileViewer />
        <Footer />
    </div>
  );
}

export default App;
