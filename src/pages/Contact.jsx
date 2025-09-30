export default function Contact() {
  const handleMailto = (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    const name = form.elements.name?.value?.trim() || "";
    const email = form.elements.email?.value?.trim() || "";
    const message = form.elements.message?.value?.trim() || "";

    const to = "info@lagandasportsmanagement.com";
    const subject = encodeURIComponent(
      `New contact from ${name || "Website User"}`
    );
    const body = encodeURIComponent(
      `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}\n\n— Sent via Laganda Sports Management website`
    );

    window.location.href = `mailto:${to}?subject=${subject}&body=${body}`;
  };

  return (
    <main className="contact-page">
      <section className="contact">
        <div className="container">
          <h1>Contact</h1>
          <div className="contact-main-layout">
            <div className="contact-form-container">
              <form className="contact-form" onSubmit={handleMailto}>
                <div className="form-row">
                  <label htmlFor="name">Name</label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    placeholder="Your name"
                    required
                  />
                </div>
                <div className="form-row">
                  <label htmlFor="email">Email</label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="you@example.com"
                    required
                  />
                </div>
                <div className="form-row">
                  <label htmlFor="message">Message</label>
                  <textarea
                    id="message"
                    name="message"
                    rows="6"
                    placeholder="How can we help?"
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
