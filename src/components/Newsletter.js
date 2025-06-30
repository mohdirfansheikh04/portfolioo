import { useState } from "react";
import { Col, Row, Alert } from "react-bootstrap";
import { useMediaQuery } from "react-responsive";

export const Newsletter = () => {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState(""); // sending | error | success
  const [message, setMessage] = useState("");

  const isMobile = useMediaQuery({ maxWidth: 767 });

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || email.indexOf("@") === -1) {
      setStatus("error");
      setMessage("Please enter a valid email address.");
      return;
    }

    setStatus("sending");
    try {
      const res = await fetch(
        "https://portfoliobackend-std9.onrender.com/subscribe",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email }),
        }
      );

      const data = await res.json();

      if (res.ok) {
        setStatus("success");
        setMessage(data.message);
        setEmail("");
      } else {
        setStatus("error");
        setMessage(data.message || "Something went wrong.");
      }
    } catch (error) {
      setStatus("error");
      setMessage("Server not responding.");
    }
  };

  return (
    <Col lg={12}>
      <div className="newsletter-bx wow slideInUp">
        <Row>
          <Col lg={12} md={6} xl={5}>
            <h3>
              Subscribe to our Newsletter
              <br />& Never miss latest updates
            </h3>
            {status === "sending" && <Alert>Sending...</Alert>}
            {status === "error" && <Alert variant="danger">{message}</Alert>}
            {status === "success" && <Alert variant="success">{message}</Alert>}
          </Col>
          <Col md={6} xl={7}>
            <form onSubmit={handleSubmit}>
              {isMobile ? (
                <div>
                  <div className="new-email-bx">
                    <input
                      value={email}
                      type="email"
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Email Address"
                    />
                  </div>
                  <button type="submit" className="btn btn-danger">
                    Submit
                  </button>
                </div>
              ) : (
                <div>
                  <div className="new-email-bx">
                    <input
                      value={email}
                      type="email"
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Email Address"
                    />
                    <button type="submit" className="btn btn-danger">
                      Submit
                    </button>
                  </div>
                </div>
              )}

              {/* <div className="new-email-bx">
                <input
                  value={email}
                  type="email"
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email Address"
                />
              </div>
              <button type="submit" className="btn btn-danger">
                Submit
              </button> */}
            </form>
          </Col>
        </Row>
      </div>
    </Col>
  );
};
