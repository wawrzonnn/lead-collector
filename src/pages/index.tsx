import * as React from "react";
import { useState, Fragment } from "react";
import type { HeadFC, PageProps } from "gatsby";
import { Container } from "../components/Container/Container";
import { Link, Switch, TextField, Checkbox, Button } from "nerdux-ui-system";
import Gameboys from "../images/gameboys.png";
import BackArrowIcon from "../Icons/BackArrowIcon";
import * as styles from "./index.module.scss";

function IndexPage() {
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [error, setError] = useState(false);
  const [disabled, setDisabled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [disabledBackground, setDisabledBackground] = useState(false);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setFormSubmitted(true);
  };

  const handleTryAgain = () => {
    setFormSubmitted(false);
  };

  const handleSwitch = () => {
    setDisabled(!disabled);
    setHidden(!hidden);
    setDisabledBackground(!disabledBackground);
  };

  const hiddenClass = hidden ? styles.hidden : "";
  const disabledBackgroundClass = disabledBackground
    ? styles.disabledBackground
    : "";
  const gameboysClasses = [[styles.gameboys], [hiddenClass]].join(" ");
  return (
    <Container>
      <aside className={`${styles.container__left} ${disabledBackgroundClass}`}>
        <img
          className={`${gameboysClasses} ${styles.gameboysUp}`}
          src={Gameboys}
          alt="gameboys"
        />
      </aside>
      {!formSubmitted && !error && (
        <section className={styles.container__center}>
          <header className={styles.titleHeader}>
            <h1>
              Join the Gameboy
              <br />
              <span>waiting list</span>
            </h1>
          </header>
          <main>
            <form onSubmit={handleSubmit}>
              <div className={styles.switch__container}>
                <p>I swear, I’m a classic gameboy fan</p>
                <Switch
                  onChange={handleSwitch}
                  id="switch-1"
                  checked={true}
                  disabled={false}
                />
              </div>
              <div className={styles.textfield__container}>
                <TextField
                  value=""
                  onChange={() => {}}
                  id="username-input"
                  name="username"
                  label="Name"
                  placeholder="e.g. Richard Parker"
                  disabled={disabled}
                />
                <TextField
                  value=""
                  onChange={() => {}}
                  id="email-input"
                  name="email"
                  label="Email"
                  placeholder="e.g. richard@gmail.com"
                  disabled={disabled}
                />
              </div>
              <div className={styles.checkbox__container}>
                <Checkbox
                  id="checkbox-1"
                  name="checkbox"
                  onChange={() => {}}
                  checked={true}
                  label="I have read and accept the"
                  disabled={disabled}
                />
                <div className={styles.checkbox__containerLink}>
                  <Link to="#" disabled={disabled}>
                    {" "}
                    privacy policy
                  </Link>
                </div>
              </div>
              <Button type="submit" onClick={() => {}} disabled={disabled}>
                Sign me up!
              </Button>
            </form>
          </main>
        </section>
      )}
      {formSubmitted && !error && (
        <div className={styles.container__center}>
          <span className={styles.formMessage}>
            Thank you [Name], for signing up!
          </span>
          <span className={styles.formMessageInfo}>
            On the provided email [email], you will receive a message when the
            Gameboy launches!
          </span>
        </div>
      )}
      {error && (
        <div className={styles.container__center}>
          <span className={styles.formMessage}>Something went wrong.</span>
          <Button type="button" onClick={handleTryAgain}>
            <Fragment>{BackArrowIcon()}</Fragment>Try again
          </Button>
        </div>
      )}
      <aside
        className={`${styles.container__right} ${disabledBackgroundClass}`}
      >
        <img
          className={`${gameboysClasses} ${styles.gameboysDown}`}
          src={Gameboys}
          alt="gameboys"
        />
        <img
          className={`${gameboysClasses} ${styles.gameboysUp}`}
          src={Gameboys}
          alt="gameboys"
        />
        <img
          className={`${gameboysClasses} ${styles.gameboysDown}`}
          src={Gameboys}
          alt="gameboys"
        />
        <img
          className={`${gameboysClasses} ${styles.gameboysUp}`}
          src={Gameboys}
          alt="gameboys"
        />
      </aside>
    </Container>
  );
}

export default IndexPage;

export const Head: HeadFC = () => <title>Home Page</title>;
