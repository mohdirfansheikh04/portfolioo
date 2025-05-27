import { useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import headerImg from "../assets/img/header-img.svg";
import { BsArrowRightCircle } from 'react-icons/bs';
import 'animate.css';
import TrackVisibility from 'react-on-screen';

export const Banner = () => {
  const [loopNum, setLoopNum] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [text, setText] = useState('');
  const [delta, setDelta] = useState(300 - Math.random() * 100);
  const [index, setIndex] = useState(1);
  const toRotate = [ "Web Developer", "Mern Stack Developer", "UI/UX Designer" ];
  const period = 2000;

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    let ticker = setInterval(() => {
      tick();
    }, delta);

    return () => { clearInterval(ticker) };
  }, [text])

  const tick = () => {
    let i = loopNum % toRotate.length;
    let fullText = toRotate[i];
    let updatedText = isDeleting ? fullText.substring(0, text.length - 1) : fullText.substring(0, text.length + 1);

    setText(updatedText);

    if (isDeleting) {
      setDelta(prevDelta => prevDelta / 2);
    }

    if (!isDeleting && updatedText === fullText) {
      setIsDeleting(true);
      setIndex(prevIndex => prevIndex - 1);
      setDelta(period);
    } else if (isDeleting && updatedText === '') {
      setIsDeleting(false);
      setLoopNum(loopNum + 1);
      setIndex(1);
      setDelta(500);
    } else {
      setIndex(prevIndex => prevIndex + 1);
    }
  }

  return (
    <section className="banner" id="home">
      <Container>
        <Row className="aligh-items-center">
          <Col xs={12} md={6} xl={7}>
            <TrackVisibility>
              {({ isVisible }) =>
              <div className={isVisible ? "animate__animated animate__fadeIn" : ""}>
                <span className="tagline">Welcome to my Portfolio</span>
                <h1>{`Hi! I'm Mohd Irfan `} <span className="txt-rotate" data-period="1000" data-rotate='[ "Web Developer", "MERN Stack Developer", "UI/UX Designer" ]'><span className="wrap">{text}</span></span></h1>
                  <p>I'm a BCA student with hands-on experience in web development and cloud computing. I've completed internships and projects using React, AWS, MongoDB, and PHP, and earned certifications in MERN stack, AI, and Cybersecurity from IBM, Simplilearn, and Udemy. Skilled in both frontend and backend technologies.</p>
                  <a href="https://www.linkedin.com/in/mohd-irfan-a7129a2a2?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app" style={{'textDecoration': 'none'}} target="_blank" rel="noopener noreferrer"><button onClick={() => console.log('connect')}>Let’s Connect <BsArrowRightCircle size={25} /></button></a>
              </div>}
            </TrackVisibility>
          </Col>
          <Col xs={12} md={6} xl={5}>
            <TrackVisibility>
              {({ isVisible }) =>
                <div className={isVisible ? "animate__animated animate__zoomIn" : ""}>
                  <img src={headerImg} alt="Header Img"/>
                </div>}
            </TrackVisibility>
          </Col>
        </Row>
      </Container>
    </section>
  )
}