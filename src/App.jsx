import { useState } from 'react';
import './App.css';

function App() {
  // State for our password and settings
  const [password, setPassword] = useState('');
  const [length, setLength] = useState(12);
  const [includeUppercase, setIncludeUppercase] = useState(true);
  const [includeLowercase, setIncludeLowercase] = useState(true);
  const [includeNumbers, setIncludeNumbers] = useState(true);
  const [includeSymbols, setIncludeSymbols] = useState(true);
  const [strength, setStrength] = useState('');

  // Generate password function
  const generatePassword = () => {
    // Define character sets
    const uppercase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const lowercase = 'abcdefghijklmnopqrstuvwxyz';
    const numbers = '0123456789';
    const symbols = '!@#$%^&*()_+-=';
    
    // Build character pool based on selections
    let chars = '';
    if (includeUppercase) chars += uppercase;
    if (includeLowercase) chars += lowercase;
    if (includeNumbers) chars += numbers;
    if (includeSymbols) chars += symbols;
    
    // Check if at least one option is selected
    if (chars === '') {
      alert('Please select at least one character type!');
      return;
    }
    
    // Generate password
    let newPassword = '';
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * chars.length);
      newPassword += chars[randomIndex];
    }
    
    setPassword(newPassword);
    checkStrength(newPassword);
  };

  // Check password strength
  const checkStrength = (pass) => {
    let score = 0;
    if (pass.length >= 8) score++;
    if (pass.length >= 12) score++;
    if (/[A-Z]/.test(pass)) score++;
    if (/[a-z]/.test(pass)) score++;
    if (/[0-9]/.test(pass)) score++;
    if (/[^A-Za-z0-9]/.test(pass)) score++;
    
    if (score < 3) setStrength('weak');
    else if (score < 5) setStrength('medium');
    else setStrength('strong');
  };

  // Copy password to clipboard
  const copyPassword = () => {
    if (!password) {
      alert('Generate a password first!');
      return;
    }
    navigator.clipboard.writeText(password);
    alert('Password copied!');
  };

  return (
    <div className="container">
      <h1 className="title">Password Generator</h1>
      
      {/* Display generated password */}
      <div className="password-display">
        <span className="password">{password || 'Click Generate'}</span>
        <button className="copy-btn" onClick={copyPassword}>
          Copy
        </button>
      </div>

      {/* Password length slider */}
      <div className="controls">
        <div className="length-control">
          <label className="length-label">
            Length: <span className="length-value">{length}</span>
          </label>
          <input
            type="range"
            min="4"
            max="32"
            value={length}
            onChange={(e) => setLength(e.target.value)}
            className="slider"
          />
        </div>

        {/* Character options */}
        <div className="checkboxes">
          <label className="checkbox">
            <input
              type="checkbox"
              checked={includeUppercase}
              onChange={(e) => setIncludeUppercase(e.target.checked)}
            />
            Uppercase Letters
          </label>
          
          <label className="checkbox">
            <input
              type="checkbox"
              checked={includeLowercase}
              onChange={(e) => setIncludeLowercase(e.target.checked)}
            />
            Lowercase Letters
          </label>
          
          <label className="checkbox">
            <input
              type="checkbox"
              checked={includeNumbers}
              onChange={(e) => setIncludeNumbers(e.target.checked)}
            />
            Numbers
          </label>
          
          <label className="checkbox">
            <input
              type="checkbox"
              checked={includeSymbols}
              onChange={(e) => setIncludeSymbols(e.target.checked)}
            />
            Symbols
          </label>
        </div>
      </div>

      {/* Generate button */}
      <button className="generate-btn" onClick={generatePassword}>
        Generate Password
      </button>

      {/* Show strength if password exists */}
      {password && (
        <div className={`strength ${strength}`}>
          Strength: {strength.toUpperCase()}
        </div>
      )}
    </div>
  );
}

export default App;