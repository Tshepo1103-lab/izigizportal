import { useState } from 'react'
import './App.css'

interface LeadData {
  FirstName: string;
  LastName: string;
  CellNumber: string;
  Email: string;
  Parameters: {
    Key: string;
    Value: string;
  }[];
}

function App() {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState<LeadData>({
    FirstName: '',
    LastName: '',
    CellNumber: '',
    Email: '',
    Parameters: [
      { Key: 'LeadCampaignCode', Value: 'KRLKP0001' },
      { Key: 'DateOfBirth', Value: '' },
      { Key: 'CarMake', Value: '' },
      { Key: 'CarModel', Value: '' },
      { Key: 'CarYear', Value: '' },
      { Key: 'CarUsage', Value: 'Private' },
      { Key: 'PreferedTimeOfCall', Value: '' }
    ]
  });

  const handleInputChange = (field: keyof LeadData, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleParameterChange = (key: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      Parameters: prev.Parameters.map(param => 
        param.Key === key ? { ...param, Value: value } : param
      )
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      console.log('Submitting form data:', formData);
      
      const response = await fetch('/api/lead/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
        mode: 'cors', // Explicitly set CORS mode
      });

      console.log('Response status:', response.status);
      console.log('Response headers:', response.headers);

      if (response.ok) {
        const responseData = await response.json();
        console.log('Success response:', responseData);
        alert('Thank you! We will call you back soon.');
        setIsFormOpen(false);
        // Reset form
        setFormData({
          FirstName: '',
          LastName: '',
          CellNumber: '',
          Email: '',
          Parameters: [
            { Key: 'LeadCampaignCode', Value: 'KRLKP0001' },
            { Key: 'DateOfBirth', Value: '' },
            { Key: 'CarMake', Value: '' },
            { Key: 'CarModel', Value: '' },
            { Key: 'CarYear', Value: '' },
            { Key: 'CarUsage', Value: 'Private' },
            { Key: 'PreferedTimeOfCall', Value: '' }
          ]
        });
      } else {
        const errorText = await response.text();
        console.error('Server error response:', errorText);
        throw new Error(`Server error: ${response.status} - ${errorText}`);
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      
      // More specific error messages
      if (error instanceof TypeError && error.message.includes('Failed to fetch')) {
        alert('Network error: Unable to connect to the server. This might be a CORS issue or the server is down.');
      } else if (error instanceof Error) {
        alert(`Error: ${error.message}`);
      } else {
        alert('Sorry, there was an error submitting your request. Please try again.');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="app">
      {/* Header */}
      <header className="header">
        <div className="container">
          <div className="nav-brand">insuranceexpert</div>
          <nav className="nav-menu">
            <a href="#home">Home</a>
            <a href="#insurance">Insurance</a>
            <a href="#car-insurance">Car Insurance</a>
            <a href="#business-insurance">Business Insurance</a>
          </nav>
          <button 
            className="cta-button"
            onClick={() => setIsFormOpen(true)}
          >
            Call Me Back
          </button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <div className="hero-text">
            <h1>Best Auto insurance</h1>
            <h2>Compare quotes now</h2>
            <p>The greatest online comparison site for auto insurance in South Africa, we work for consumers by assisting you in locating the best offers.</p>
            <button 
              className="cta-button"
              onClick={() => setIsFormOpen(true)}
            >
              Call Me Back
            </button>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="main-content">
        <div className="container">
          <div className="content-grid">
            <div className="content-text">
              <h2>Compare Online Car Insurance Quote and Save Time and Money</h2>
              <p>Compare car insurance quotes from multiple providers to find the best deal for your needs. Save money on your monthly premiums while ensuring you have the right coverage for your vehicle.</p>
              
              <h3>How to get car insurance quotes online</h3>
              <ul>
                <li>Get a quote from an insurer or third-party comparison tool</li>
                <li>Compare free insurance data</li>
                <li>Choose the best insurance that ideal for your budget</li>
                <li>Get covered in minutes</li>
              </ul>
              
              <p>By comparing quotes, you can save up to 31% on your car insurance premiums while finding the coverage that best fits your needs and budget.</p>
              <button className="read-more-btn">Read More</button>
            </div>
            
            <div className="content-images">
              <div className="image-circles">
                <div className="circle-image circle-1"></div>
                <div className="circle-image circle-2"></div>
              </div>
              <div className="experience-badge">
                <span>9+ Year Experience</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="stats-section">
        <div className="stats-content">
          <h2>Get the Best Car Insurance Quotes and Save!</h2>
          <p>Car insurance in South Africa is essential for maintaining your policy and staying safe on the roads. Get comprehensive coverage that protects you and your vehicle.</p>
          
          <div className="stats-grid">
            <div className="stat-item">
              <span className="stat-number">8+</span>
              <span className="stat-label">Years Partnership</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">300+</span>
              <span className="stat-label">Covered Clients</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">128+</span>
              <span className="stat-label">Professional Agents</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">10/10</span>
              <span className="stat-label">Best Service</span>
            </div>
          </div>
        </div>
      </section>

      {/* Footer Cards */}
      <section className="footer-cards">
        <div className="container">
          <div className="cards-grid">
            <div className="footer-card">
              <div className="card-icon">✓</div>
              <h3>GET A QUOTE AND START SAVING RIGHT AWAY</h3>
            </div>
            <div className="footer-card">
              <div className="card-icon">%</div>
              <h3>Save up to 31% on insurance</h3>
              <p>South Africa</p>
            </div>
            <div className="footer-card">
              <div className="card-icon">⏰</div>
              <h3>Get contacted in minutes</h3>
              <p>minutes after applying</p>
            </div>
          </div>
        </div>
      </section>

      {/* Callback Form Modal */}
      {isFormOpen && (
        <div className="modal-overlay" onClick={() => setIsFormOpen(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>Request a Call Back</h2>
              <button 
                className="close-btn"
                onClick={() => setIsFormOpen(false)}
              >
                ×
              </button>
            </div>
            
            <form onSubmit={handleSubmit} className="callback-form">
              <div className="form-row">
                <div className="form-group">
                  <label>First Name *</label>
                  <input
                    type="text"
                    value={formData.FirstName}
                    onChange={(e) => handleInputChange('FirstName', e.target.value)}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Last Name *</label>
                  <input
                    type="text"
                    value={formData.LastName}
                    onChange={(e) => handleInputChange('LastName', e.target.value)}
                    required
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Cell Number *</label>
                  <input
                    type="tel"
                    value={formData.CellNumber}
                    onChange={(e) => handleInputChange('CellNumber', e.target.value)}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Email *</label>
                  <input
                    type="email"
                    value={formData.Email}
                    onChange={(e) => handleInputChange('Email', e.target.value)}
                    required
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Date of Birth *</label>
                  <input
                    type="date"
                    value={formData.Parameters.find(p => p.Key === 'DateOfBirth')?.Value || ''}
                    onChange={(e) => handleParameterChange('DateOfBirth', e.target.value)}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Preferred Time of Call *</label>
                  <select
                    value={formData.Parameters.find(p => p.Key === 'PreferedTimeOfCall')?.Value || ''}
                    onChange={(e) => handleParameterChange('PreferedTimeOfCall', e.target.value)}
                    required
                  >
                    <option value="">Select time</option>
                    <option value="08h00">08h00</option>
                    <option value="09h00">09h00</option>
                    <option value="10h00">10h00</option>
                    <option value="11h00">11h00</option>
                    <option value="12h00">12h00</option>
                    <option value="13h00">13h00</option>
                    <option value="14h00">14h00</option>
                    <option value="15h00">15h00</option>
                    <option value="16h00">16h00</option>
                    <option value="17h00">17h00</option>
                  </select>
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Car Make *</label>
                  <input
                    type="text"
                    value={formData.Parameters.find(p => p.Key === 'CarMake')?.Value || ''}
                    onChange={(e) => handleParameterChange('CarMake', e.target.value)}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Car Model *</label>
                  <input
                    type="text"
                    value={formData.Parameters.find(p => p.Key === 'CarModel')?.Value || ''}
                    onChange={(e) => handleParameterChange('CarModel', e.target.value)}
                    required
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Car Year *</label>
                  <input
                    type="text"
                    value={formData.Parameters.find(p => p.Key === 'CarYear')?.Value || ''}
                    onChange={(e) => handleParameterChange('CarYear', e.target.value)}
                    placeholder="e.g., 2022"
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Car Usage</label>
                  <select
                    value={formData.Parameters.find(p => p.Key === 'CarUsage')?.Value || 'Private'}
                    onChange={(e) => handleParameterChange('CarUsage', e.target.value)}
                  >
                    <option value="Private">Private</option>
                    <option value="Business">Business</option>
                    <option value="Private/Business">Private/Business</option>
                  </select>
                </div>
              </div>

              <div className="form-actions">
                <button 
                  type="button" 
                  className="cancel-btn"
                  onClick={() => setIsFormOpen(false)}
                >
                  Cancel
                </button>
                <button 
                  type="submit" 
                  className="submit-btn"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Submitting...' : 'Submit Request'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}

export default App
