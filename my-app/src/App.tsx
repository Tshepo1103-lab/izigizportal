import { useState } from 'react'
import dayjs from 'dayjs'
import { 
  Layout, 
  Button, 
  Form, 
  Input, 
  Select, 
  DatePicker, 
  Modal, 
  Card, 
  Row, 
  Col, 
  Typography, 
  Space, 
  Statistic,
  Avatar,
  Divider,
  message
} from 'antd'
import { 
  PhoneOutlined, 
  MailOutlined, 
  CarOutlined, 
  SafetyOutlined,
  TrophyOutlined,
  ClockCircleOutlined,
  CheckCircleOutlined
} from '@ant-design/icons'
import './App.css'

const { Header, Content } = Layout
const { Title, Paragraph, Text } = Typography
const { Option } = Select

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

  const handleSubmit = async () => {
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
        message.success('Thank you! We will call you back soon.');
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
        message.error('Network error: Unable to connect to the server. This might be a CORS issue or the server is down.');
      } else if (error instanceof Error) {
        message.error(`Error: ${error.message}`);
      } else {
        message.error('Sorry, there was an error submitting your request. Please try again.');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Layout className="app">
      {/* Header */}
      <Header className="header" style={{ 
        background: '#fff', 
        boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1000,
        padding: '0 24px'
      }}>
        <div style={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center',
          width: '100%',
          padding: '0 24px',
          height: '100%'
        }}>
          <Title level={3} style={{ margin: 0, color: '#1890ff' }}>
            insuranceexpert
          </Title>
          <Space size="large">
            <a href="#home" style={{ color: '#333' }}>Home</a>
            <a href="#insurance" style={{ color: '#333' }}>Insurance</a>
            <a href="#car-insurance" style={{ color: '#333' }}>Car Insurance</a>
            <a href="#business-insurance" style={{ color: '#333' }}>Business Insurance</a>
          </Space>
          <Button 
            type="primary" 
            size="large"
            icon={<PhoneOutlined />}
            onClick={() => setIsFormOpen(true)}
            style={{ 
              background: '#ffd700', 
              borderColor: '#ffd700',
              color: '#000',
              fontWeight: 'bold'
            }}
          >
            Call Me Back
          </Button>
        </div>
      </Header>

      {/* Hero Section */}
      <Content style={{ marginTop: '64px' }}>
        <div 
          className="hero-section"
          style={{
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            minHeight: '80vh',
            display: 'flex',
            alignItems: 'center',
            position: 'relative',
            overflow: 'hidden',
            width: '100vw',
            marginLeft: 'calc(-50vw + 50%)'
          }}
        >
          <div style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' viewBox=\'0 0 1200 600\'%3E%3Crect fill=\'%23222\' width=\'1200\' height=\'600\'/%3E%3Ccircle fill=\'%23ffd700\' cx=\'200\' cy=\'400\' r=\'100\'/%3E%3Ccircle fill=\'%23ffd700\' cx=\'800\' cy=\'300\' r=\'80\'/%3E%3C/svg%3E")',
            backgroundSize: 'cover',
            opacity: 0.1
          }} />
          <div style={{
            width: '100%',
            padding: '0 24px',
            position: 'relative',
            zIndex: 1
          }}>
            <Row gutter={[48, 48]} align="middle">
              <Col xs={24} lg={12}>
                <Card style={{ 
                  background: 'rgba(255, 255, 255, 0.95)',
                  backdropFilter: 'blur(10px)',
                  borderRadius: '16px',
                  boxShadow: '0 20px 40px rgba(0,0,0,0.1)'
                }}>
                  <Title level={1} style={{ color: '#000', marginBottom: '16px' }}>
                    Best Auto Insurance
                  </Title>
                  <Title level={2} style={{ color: '#1890ff', marginBottom: '24px' }}>
                    Compare quotes now
                  </Title>
                  <Paragraph style={{ fontSize: '16px', color: '#666', marginBottom: '32px' }}>
                    The greatest online comparison site for auto insurance in South Africa, we work for consumers by assisting you in locating the best offers.
                  </Paragraph>
                  <Button 
                    type="primary" 
                    size="large"
                    icon={<PhoneOutlined />}
                    onClick={() => setIsFormOpen(true)}
                    style={{ 
                      background: '#ffd700', 
                      borderColor: '#ffd700',
                      color: '#000',
                      fontWeight: 'bold',
                      height: '48px',
                      paddingLeft: '32px',
                      paddingRight: '32px'
                    }}
                  >
                    Call Me Back
                  </Button>
                </Card>
              </Col>
              <Col xs={24} lg={12}>
                <div style={{ textAlign: 'center' }}>
                  <Avatar 
                    size={200} 
                    style={{ 
                      background: 'linear-gradient(45deg, #ffd700, #ffed4e)',
                      marginBottom: '24px'
                    }}
                    icon={<CarOutlined style={{ fontSize: '80px', color: '#000' }} />}
                  />
                </div>
              </Col>
            </Row>
          </div>
        </div>

        {/* Main Content */}
        <div style={{ padding: '80px 0', background: '#fff', width: '100%' }}>
          <div style={{ width: '100%', padding: '0 24px' }}>
            <Row gutter={[48, 48]} align="middle">
              <Col xs={24} lg={16}>
                <Title level={2} style={{ color: '#000', marginBottom: '24px' }}>
                  Compare Online Car Insurance Quote and Save Time and Money
                </Title>
                <Paragraph style={{ fontSize: '16px', color: '#666', marginBottom: '32px' }}>
                  Compare car insurance quotes from multiple providers to find the best deal for your needs. Save money on your monthly premiums while ensuring you have the right coverage for your vehicle.
                </Paragraph>
                
                <Title level={3} style={{ color: '#000', marginBottom: '16px' }}>
                  How to get car insurance quotes online
                </Title>
                <Space direction="vertical" size="middle" style={{ marginBottom: '32px' }}>
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    <CheckCircleOutlined style={{ color: '#52c41a', marginRight: '12px' }} />
                    <Text>Get a quote from an insurer or third-party comparison tool</Text>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    <CheckCircleOutlined style={{ color: '#52c41a', marginRight: '12px' }} />
                    <Text>Compare free insurance data</Text>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    <CheckCircleOutlined style={{ color: '#52c41a', marginRight: '12px' }} />
                    <Text>Choose the best insurance that ideal for your budget</Text>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    <CheckCircleOutlined style={{ color: '#52c41a', marginRight: '12px' }} />
                    <Text>Get covered in minutes</Text>
                  </div>
                </Space>
                
                <Paragraph style={{ fontSize: '16px', color: '#666', marginBottom: '24px' }}>
                  By comparing quotes, you can save up to 31% on your car insurance premiums while finding the coverage that best fits your needs and budget.
                </Paragraph>
                <Button type="primary" size="large">
                  Read More
                </Button>
              </Col>
              
              <Col xs={24} lg={8}>
                <div style={{ textAlign: 'center' }}>
                  <Space direction="vertical" size="large" style={{ width: '100%' }}>
                    <Avatar 
                      size={120} 
                      style={{ 
                        background: 'linear-gradient(45deg, #ffd700, #ffed4e)',
                        margin: '0 auto'
                      }}
                      icon={<CarOutlined style={{ fontSize: '50px', color: '#000' }} />}
                    />
                    <Avatar 
                      size={120} 
                      style={{ 
                        background: 'linear-gradient(45deg, #1890ff, #40a9ff)',
                        margin: '0 auto'
                      }}
                      icon={<SafetyOutlined style={{ fontSize: '50px', color: '#fff' }} />}
                    />
                  </Space>
                  <Card style={{ 
                    marginTop: '24px',
                    background: '#ffd700',
                    border: 'none',
                    borderRadius: '25px'
                  }}>
                    <Text strong style={{ color: '#000' }}>9+ Year Experience</Text>
                  </Card>
                </div>
              </Col>
            </Row>
          </div>
        </div>

        {/* Stats Section */}
        <div 
          className="stats-section"
          style={{
            background: 'linear-gradient(135deg, #1e3c72 0%, #2a5298 100%)',
            padding: '80px 0',
            color: 'white',
            width: '100vw',
            marginLeft: 'calc(-50vw + 50%)'
          }}
        >
          <div style={{ width: '100%', padding: '0 24px', textAlign: 'center' }}>
            <Title level={2} style={{ color: 'white', marginBottom: '16px' }}>
              Get the Best Car Insurance Quotes and Save!
            </Title>
            <Paragraph style={{ fontSize: '18px', color: 'rgba(255,255,255,0.9)', marginBottom: '50px' }}>
              Car insurance in South Africa is essential for maintaining your policy and staying safe on the roads. Get comprehensive coverage that protects you and your vehicle.
            </Paragraph>
            
            <Row gutter={[32, 32]}>
              <Col xs={12} sm={6}>
                <Statistic
                  title="Years Partnership"
                  value={8}
                  suffix="+"
                  valueStyle={{ color: '#ffd700', fontSize: '48px' }}
                />
              </Col>
              <Col xs={12} sm={6}>
                <Statistic
                  title="Covered Clients"
                  value={300}
                  suffix="+"
                  valueStyle={{ color: '#ffd700', fontSize: '48px' }}
                />
              </Col>
              <Col xs={12} sm={6}>
                <Statistic
                  title="Professional Agents"
                  value={128}
                  suffix="+"
                  valueStyle={{ color: '#ffd700', fontSize: '48px' }}
                />
              </Col>
              <Col xs={12} sm={6}>
                <Statistic
                  title="Best Service"
                  value="10/10"
                  valueStyle={{ color: '#ffd700', fontSize: '48px' }}
                />
              </Col>
            </Row>
          </div>
        </div>

        {/* Footer Cards */}
        <div style={{ padding: '80px 0', background: '#f8f9fa', width: '100%' }}>
          <div style={{ width: '100%', padding: '0 24px' }}>
            <Row gutter={[32, 32]}>
              <Col xs={24} md={8}>
                <Card 
                  hoverable
                  style={{ 
                    textAlign: 'center',
                    borderRadius: '16px',
                    boxShadow: '0 8px 24px rgba(0,0,0,0.1)'
                  }}
                >
                  <CheckCircleOutlined style={{ fontSize: '48px', color: '#ffd700', marginBottom: '16px' }} />
                  <Title level={4} style={{ marginBottom: '16px' }}>
                    GET A QUOTE AND START SAVING RIGHT AWAY
                  </Title>
                </Card>
              </Col>
              <Col xs={24} md={8}>
                <Card 
                  hoverable
                  style={{ 
                    textAlign: 'center',
                    borderRadius: '16px',
                    boxShadow: '0 8px 24px rgba(0,0,0,0.1)'
                  }}
                >
                  <TrophyOutlined style={{ fontSize: '48px', color: '#ffd700', marginBottom: '16px' }} />
                  <Title level={4} style={{ marginBottom: '16px' }}>
                    Save up to 31% on insurance
                  </Title>
                  <Text type="secondary">South Africa</Text>
                </Card>
              </Col>
              <Col xs={24} md={8}>
                <Card 
                  hoverable
                  style={{ 
                    textAlign: 'center',
                    borderRadius: '16px',
                    boxShadow: '0 8px 24px rgba(0,0,0,0.1)'
                  }}
                >
                  <ClockCircleOutlined style={{ fontSize: '48px', color: '#ffd700', marginBottom: '16px' }} />
                  <Title level={4} style={{ marginBottom: '16px' }}>
                    Get contacted in minutes
                  </Title>
                  <Text type="secondary">minutes after applying</Text>
                </Card>
              </Col>
            </Row>
          </div>
      </div>
      </Content>

      {/* Callback Form Modal */}
      <Modal
        title={
          <div style={{ textAlign: 'center' }}>
            <PhoneOutlined style={{ marginRight: '8px', color: '#1890ff' }} />
            Request a Call Back
      </div>
        }
        open={isFormOpen}
        onCancel={() => setIsFormOpen(false)}
        footer={null}
        width={800}
        style={{ top: 20 }}
      >
        <Form
          layout="vertical"
          onFinish={handleSubmit}
          style={{ marginTop: '24px' }}
          initialValues={formData}
        >
          <Row gutter={16}>
            <Col xs={24} sm={12}>
              <Form.Item
                label="First Name"
                required
                rules={[{ required: true, message: 'Please enter your first name' }]}
              >
                <Input
                  value={formData.FirstName}
                  onChange={(e) => handleInputChange('FirstName', e.target.value)}
                  placeholder="Enter your first name"
                  size="large"
                />
              </Form.Item>
            </Col>
            <Col xs={24} sm={12}>
              <Form.Item
                label="Last Name"
                required
                rules={[{ required: true, message: 'Please enter your last name' }]}
              >
                <Input
                  value={formData.LastName}
                  onChange={(e) => handleInputChange('LastName', e.target.value)}
                  placeholder="Enter your last name"
                  size="large"
                />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col xs={24} sm={12}>
              <Form.Item
                label="Cell Number"
                required
                rules={[{ required: true, message: 'Please enter your cell number' }]}
              >
                <Input
                  value={formData.CellNumber}
                  onChange={(e) => handleInputChange('CellNumber', e.target.value)}
                  placeholder="Enter your cell number"
                  size="large"
                  prefix={<PhoneOutlined />}
                />
              </Form.Item>
            </Col>
            <Col xs={24} sm={12}>
              <Form.Item
                label="Email"
                required
                rules={[
                  { required: true, message: 'Please enter your email' },
                  { type: 'email', message: 'Please enter a valid email' }
                ]}
              >
                <Input
                  value={formData.Email}
                  onChange={(e) => handleInputChange('Email', e.target.value)}
                  placeholder="Enter your email"
                  size="large"
                  prefix={<MailOutlined />}
                />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col xs={24} sm={12}>
              <Form.Item
                label="Date of Birth"
                required
                rules={[{ required: true, message: 'Please select your date of birth' }]}
              >
                <DatePicker
                  value={formData.Parameters.find(p => p.Key === 'DateOfBirth')?.Value ? 
                    dayjs(formData.Parameters.find(p => p.Key === 'DateOfBirth')?.Value || '') : null}
                  onChange={(date) => handleParameterChange('DateOfBirth', date ? date.format('YYYY/MM/DD') : '')}
                  style={{ width: '100%' }}
                  size="large"
                />
              </Form.Item>
            </Col>
            <Col xs={24} sm={12}>
              <Form.Item
                label="Preferred Time of Call"
                required
                rules={[{ required: true, message: 'Please select preferred time' }]}
              >
                <Select
                  value={formData.Parameters.find(p => p.Key === 'PreferedTimeOfCall')?.Value || ''}
                  onChange={(value) => handleParameterChange('PreferedTimeOfCall', value)}
                  placeholder="Select time"
                  size="large"
                >
                  <Option value="08h00">08h00</Option>
                  <Option value="09h00">09h00</Option>
                  <Option value="10h00">10h00</Option>
                  <Option value="11h00">11h00</Option>
                  <Option value="12h00">12h00</Option>
                  <Option value="13h00">13h00</Option>
                  <Option value="14h00">14h00</Option>
                  <Option value="15h00">15h00</Option>
                  <Option value="16h00">16h00</Option>
                  <Option value="17h00">17h00</Option>
                </Select>
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col xs={24} sm={12}>
              <Form.Item
                label="Car Make"
                required
                rules={[{ required: true, message: 'Please enter car make' }]}
              >
                <Input
                  value={formData.Parameters.find(p => p.Key === 'CarMake')?.Value || ''}
                  onChange={(e) => handleParameterChange('CarMake', e.target.value)}
                  placeholder="e.g., Toyota, BMW, Mercedes"
                  size="large"
                  prefix={<CarOutlined />}
                />
              </Form.Item>
            </Col>
            <Col xs={24} sm={12}>
              <Form.Item
                label="Car Model"
                required
                rules={[{ required: true, message: 'Please enter car model' }]}
              >
                <Input
                  value={formData.Parameters.find(p => p.Key === 'CarModel')?.Value || ''}
                  onChange={(e) => handleParameterChange('CarModel', e.target.value)}
                  placeholder="e.g., Corolla, X3, C-Class"
                  size="large"
                />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col xs={24} sm={12}>
              <Form.Item
                label="Car Year"
                required
                rules={[{ required: true, message: 'Please enter car year' }]}
              >
                <Input
                  value={formData.Parameters.find(p => p.Key === 'CarYear')?.Value || ''}
                  onChange={(e) => handleParameterChange('CarYear', e.target.value)}
                  placeholder="e.g., 2022"
                  size="large"
                />
              </Form.Item>
            </Col>
            <Col xs={24} sm={12}>
              <Form.Item
                label="Car Usage"
                rules={[{ required: true, message: 'Please select car usage' }]}
              >
                <Select
                  value={formData.Parameters.find(p => p.Key === 'CarUsage')?.Value || 'Private'}
                  onChange={(value) => handleParameterChange('CarUsage', value)}
                  size="large"
                >
                  <Option value="Private">Private</Option>
                  <Option value="Business">Business</Option>
                  <Option value="Private/Business">Private/Business</Option>
                </Select>
              </Form.Item>
            </Col>
          </Row>

          <Divider />

          <Form.Item style={{ marginBottom: 0, textAlign: 'right' }}>
            <Space>
              <Button 
                onClick={() => setIsFormOpen(false)}
                size="large"
              >
                Cancel
              </Button>
              <Button 
                type="primary" 
                htmlType="submit" 
                loading={isSubmitting}
                size="large"
                icon={<PhoneOutlined />}
                style={{ 
                  background: '#ffd700', 
                  borderColor: '#ffd700',
                  color: '#000',
                  fontWeight: 'bold'
                }}
              >
                {isSubmitting ? 'Submitting...' : 'Submit Request'}
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Modal>
    </Layout>
  )
}

export default App
