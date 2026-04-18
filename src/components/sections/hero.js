import React, { useState, useEffect, useRef } from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import styled from 'styled-components';
import { navDelay, loaderDelay } from '@utils';
import { usePrefersReducedMotion } from '@hooks';

const StyledHeroSection = styled.section`
  ${({ theme }) => theme.mixins.flexCenter};
  flex-direction: column;
  align-items: flex-start;
  min-height: 100vh;
  height: 100vh;
  padding: 0;

  @media (max-height: 700px) and (min-width: 700px), (max-width: 360px) {
    height: auto;
    padding-top: var(--nav-height);
  }

  h1 {
    margin: 0 0 30px 4px;
    color: var(--green);
    font-family: var(--font-mono);
    font-size: clamp(var(--fz-sm), 5vw, var(--fz-md));
    font-weight: 400;

    @media (max-width: 480px) {
      margin: 0 0 20px 2px;
    }
  }

  h3 {
    margin-top: 5px;
    color: var(--slate);
    line-height: 0.9;
  }

  p {
    margin: 20px 0 0;
    max-width: 540px;
  }

  .email-link {
    ${({ theme }) => theme.mixins.bigButton};
    margin-top: 50px;
  }
`;

const Hero = () => {
  const [isMounted, setIsMounted] = useState(false);
  const prefersReducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion) {
      return;
    }
    const timeout = setTimeout(() => setIsMounted(true), navDelay);
    return () => clearTimeout(timeout);
  }, []);

  const ref0 = useRef(null);
  const ref1 = useRef(null);
  const ref2 = useRef(null);
  const ref3 = useRef(null);
  const ref4 = useRef(null);

  const one = <h1>Hi, my name is</h1>;
  const two = <h2 className="big-heading">Omar Ahmadi</h2>;
  const three = <h3 className="big-heading">Security Engineer in Healthcare.</h3>;
  const four = (
    <>
      <p>
        I'm a Security Engineer at a healthcare PBM, focused on privileged access management, cloud
        security, and threat intelligence. I work with CyberArk PAM, Wiz, Okta, and Microsoft
        Defender to protect sensitive data and keep critical systems running.
      </p>
    </>
  );
  const five = (
    <a
      className="email-link"
      href="https://www.linkedin.com/in/oahmadi/"
      target="_blank"
      rel="noreferrer">
      Find me on LinkedIn
    </a>
  );

  const items = [
    { el: one, ref: ref0 },
    { el: two, ref: ref1 },
    { el: three, ref: ref2 },
    { el: four, ref: ref3 },
    { el: five, ref: ref4 },
  ];

  return (
    <StyledHeroSection>
      {prefersReducedMotion ? (
        <>
          {items.map(({ el }, i) => (
            <div key={i}>{el}</div>
          ))}
        </>
      ) : (
        <TransitionGroup component={null}>
          {isMounted &&
            items.map(({ el, ref }, i) => (
              <CSSTransition key={i} nodeRef={ref} classNames="fadeup" timeout={loaderDelay}>
                <div ref={ref} style={{ transitionDelay: `${i + 1}00ms` }}>
                  {el}
                </div>
              </CSSTransition>
            ))}
        </TransitionGroup>
      )}
    </StyledHeroSection>
  );
};

export default Hero;
