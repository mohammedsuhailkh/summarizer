import './App.css';
import Demo from './components/Demo';
import Footer from './components/Footer';
import Hero from './components/Hero';

const App = () => {
  return (
    <main>
      <div className="main">
        <div className='gradient'/>
      </div>

      <div className="app">
        <Hero/>
        <Demo/>
        <Footer/>
      </div>
    </main>
  )
}

export default App
