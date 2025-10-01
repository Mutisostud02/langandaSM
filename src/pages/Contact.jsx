export default function Contact() {
  function withBase(path) {
    const base = (import.meta?.env?.BASE_URL || "/").replace(/\/$/, "/");
    return `${base}${String(path).replace(/^\//, "")}`;
  }
  const handleMailto = (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    const message = form.elements.message?.value?.trim() || "";

    const to = "info@lagandasportsmanagement.com";
    const subject = encodeURIComponent("New contact (website)");
    const body = encodeURIComponent(
      `Message:\n${message}\n\n(Please note: sender included their name and email in the message)\n— Sent via Laganda Sports Management website`
    );

    window.location.href = `mailto:${to}?subject=${subject}&body=${body}`;
  };

  return (
    <main className="contact-page">
      <section className="contact">
        <div className="container">
          <h1>Contact</h1>
          <div className="contact-flex">
            <div className="contact-media">
              <img
                src={withBase('/athletes/claudio-schwarz-head.jpg')}
                alt="Contact visual"
                loading="lazy"
                className="contact-media-img"
                onLoad={(e) => e.currentTarget.classList.add('loaded')}
              />
              {/* Contact details under image */}
              <div className="contact-info">
                <address>
                  <strong>Laganda Sports Management</strong><br />
                  Eric Perssons väg 5<br />
                  217 62 Malmö, Sweden
                </address>
                <p style={{ marginTop: '8px' }}>
                  Tel: <a href="tel:+46402086122">+46 40 208 61 22</a><br />
                  Email: <a href="mailto:info@lagandasportsmanagement.com">info@lagandasportsmanagement.com</a>
                </p>
              </div>
            </div>
            <div className="contact-form-container">
              <form className="contact-form" onSubmit={handleMailto}>
                <p className="muted" style={{ marginBottom: '8px' }}>Include your name and email in the message below.</p>
                <div className="form-row">
                  <label htmlFor="message">Message</label>
                  <textarea
                    id="message"
                    name="message"
                    rows="6"
                    placeholder="How can we help? (Please include your name and email)"
                    required
                  />
                </div>
                <div className="form-actions">
                  <button type="submit" className="button">
                    Send
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
