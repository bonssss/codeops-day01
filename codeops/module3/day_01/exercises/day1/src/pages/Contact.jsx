import { useState } from 'react'

function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    contact: '',
    topic: 'Order Support',
    message: '',
  })
  const [sent, setSent] = useState(false)
  const [openFaq, setOpenFaq] = useState(null)

  const faqs = [
    {
      q: 'How fast is delivery to my sub-city?',
      a: 'Average delivery takes 25–35 minutes across our primary hubs in Bole, Kazanchis, Megenagna, and Piassa. All orders are packed in custom thermal bags to preserve peak temperature.',
    },
    {
      q: 'How does TeleBirr payment work?',
      a: 'During checkout, simply provide your TeleBirr-registered phone number. Our system issues a secure payment prompt directly to your phone for instant one-touch confirmation.',
    },
    {
      q: 'Do you cater for office lunches and family events?',
      a: 'Yes! We cater corporate meetings, family gatherings, and holiday feasts. Send us a message via the form above or call our direct hotline for customized group packages.',
    },
    {
      q: 'Can I adjust the spice level in traditional dishes?',
      a: 'Absolutely. You can specify mild, medium, or traditional extra-spicy preferences in the optional notes field during checkout.',
    },
  ]

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!formData.name || !formData.contact || !formData.message) return
    setSent(true)
  }

  const handleReset = () => {
    setFormData({
      name: '',
      contact: '',
      topic: 'Order Support',
      message: '',
    })
    setSent(false)
  }

  const toggleFaq = (index) => {
    setOpenFaq(openFaq === index ? null : index)
  }

  return (
    <div className="contact-page">
      {/* Contact Header */}
      <section className="contact-hero">
        <span className="section-kicker">WE ARE HERE TO HELP</span>
        <h1 className="contact-title">
          Get in Touch With <span className="hero-accent-text">Addis Eats</span> 💬
        </h1>
        <p className="contact-subtitle">
          Have a question about your order, catering inquiry, dietary request, or partnership idea?
          Our Addis Ababa support team is ready 7 days a week.
        </p>
      </section>

      {/* Main Content Grid */}
      <section className="contact-main-grid">
        {/* Left Column: Contact Cards */}
        <div className="contact-info-column">
          <div className="contact-card highlight">
            <h3>📍 Main Kitchen & Headquarters</h3>
            <p>Bole Road, Near Medhanialem Mall, Addis Ababa, Ethiopia</p>
            <span className="contact-badge">Central Dispatch Hub</span>
          </div>

          <div className="contact-details-list">
            <div className="contact-detail-row">
              <span className="detail-icon">📞</span>
              <div>
                <strong>Customer Care Phone</strong>
                <p>+251 911 234 567 / +251 977 123 456</p>
              </div>
            </div>

            <div className="contact-detail-row">
              <span className="detail-icon">✉️</span>
              <div>
                <strong>Direct Email</strong>
                <p>support@addiseats.et / contact@addiseats.et</p>
              </div>
            </div>

            <div className="contact-detail-row">
              <span className="detail-icon">⏰</span>
              <div>
                <strong>Operating & Delivery Hours</strong>
                <p>Monday – Sunday: 7:30 AM – 11:00 PM</p>
              </div>
            </div>

            <div className="contact-detail-row">
              <span className="detail-icon">🛵</span>
              <div>
                <strong>Active Sub-City Delivery Zones</strong>
                <p>Bole • Kazanchis • Megenagna • Piassa & surroundings</p>
              </div>
            </div>
          </div>

          <div className="contact-social-card">
            <h4>Quick Channels</h4>
            <div className="social-links-row">
              <span className="social-pill">📱 Telegram: @AddisEats</span>
              <span className="social-pill">💬 WhatsApp: +251 911 234 567</span>
              <span className="social-pill">📸 Instagram: @AddisEats.et</span>
            </div>
          </div>
        </div>

        {/* Right Column: Contact Message Form */}
        <div className="contact-form-column">
          <div className="contact-form-card">
            {sent ? (
              <div className="order-success-message">
                <h3>🎉 Message Sent Successfully!</h3>
                <p>Thank you, <strong>{formData.name}</strong>!</p>
                <p>
                  We have received your message regarding <em>{formData.topic}</em>.
                  Our support team will reach out to <strong>{formData.contact}</strong> within 15 minutes.
                </p>
                <button
                  type="button"
                  className="submit-btn"
                  onClick={handleReset}
                  style={{ marginTop: '1rem', backgroundColor: '#2563eb' }}
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="delivery-form" noValidate>
                <h3>Send Us a Direct Message</h3>
                <p className="form-helper-text">Fill out the form below and we will get back to you promptly.</p>

                <div className="form-group">
                  <label htmlFor="contact-name">Full Name</label>
                  <input
                    id="contact-name"
                    type="text"
                    name="name"
                    placeholder="e.g. Almaz Bekele"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="contact-info">Phone (TeleBirr) or Email</label>
                  <input
                    id="contact-info"
                    type="text"
                    name="contact"
                    placeholder="e.g. 0911223344 or almaz@example.com"
                    value={formData.contact}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="contact-topic">Subject / Topic</label>
                  <select
                    id="contact-topic"
                    name="topic"
                    value={formData.topic}
                    onChange={handleChange}
                  >
                    <option value="Order Support">Order Support & Inquiries</option>
                    <option value="Catering & Large Events">Catering & Large Events</option>
                    <option value="Menu & Dietary Questions">Menu & Dietary Questions</option>
                    <option value="Partnership & Career">Partnership & Delivery Driver Careers</option>
                    <option value="General Feedback">General Feedback & Suggestions</option>
                  </select>
                </div>

                <div className="form-group">
                  <label htmlFor="contact-message">Your Message</label>
                  <textarea
                    id="contact-message"
                    name="message"
                    rows={4}
                    placeholder="Tell us how we can help you today..."
                    value={formData.message}
                    onChange={handleChange}
                    required
                  />
                </div>

                <button
                  type="submit"
                  className="submit-btn"
                  disabled={!formData.name.trim() || !formData.contact.trim() || !formData.message.trim()}
                >
                  Send Message 🚀
                </button>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* Interactive FAQ Section */}
      <section className="contact-faq-section">
        <div className="section-header-center">
          <span className="section-kicker">FREQUENTLY ASKED QUESTIONS</span>
          <h2>Got Questions? We Have Answers</h2>
          <p>Quick details about delivery, payment methods, and special requests.</p>
        </div>

        <div className="faq-accordion-list">
          {faqs.map((faq, idx) => (
            <div
              key={idx}
              className={`faq-item ${openFaq === idx ? 'open' : ''}`}
              onClick={() => toggleFaq(idx)}
            >
              <div className="faq-question">
                <h4>{faq.q}</h4>
                <span className="faq-toggle-icon">{openFaq === idx ? '−' : '+'}</span>
              </div>
              {openFaq === idx && (
                <div className="faq-answer">
                  <p>{faq.a}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}

export default Contact
