import * as React from "react";
import type { HeadFC, PageProps } from "gatsby";
import { Container } from "../components/Container/Container";
import { Link, Switch, TextField, Checkbox, Button } from "nerdux-ui-system";
import Gameboys from "../../public/gameboys.png";
import * as styles from "./index.module.scss";
import { useState } from "react";
const IndexPage: React.FC<PageProps> = () => {
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [error, setError] = useState(false);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setFormSubmitted(true);
  };

  const handleTryAgain = () => {
    setFormSubmitted(false);
  };
  return (
    <Container>
      <aside className={styles.container__left}>
        <img className={styles.gameboysUp} src={Gameboys} alt="gameboys" />
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
                  onChange={() => {}}
                  id="switch-1"
                  checked={true}
                  disabled={false}
                />
              </div>
              <div className={styles.textfield__container}>
                <div className={styles.textfield__containerItem}>
                  <TextField
                    value=""
                    onChange={() => {}}
                    id="username-input"
                    name="username"
                    label="Name"
                    placeholder="e.g. Richard Parker"
                  />
                </div>
                <TextField
                  value=""
                  onChange={() => {}}
                  id="email-input"
                  name="email"
                  label="Email"
                  placeholder="e.g. richard@gmail.com"
                />
              </div>
              <div className={styles.checkbox__container}>
                <Checkbox
                  id="checkbox-1"
                  name="checkbox"
                  onChange={() => {}}
                  checked={true}
                  label="I have read and accept the"
                />
                <div className={styles.checkbox__containerLink}>
                  <Link to="#"> privacy policy</Link>
                </div>
              </div>
              <Button type="submit" onClick={() => {}}>
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
            Try again
          </Button>
        </div>
      )}
      <aside className={styles.container__right}>
        <img className={styles.gameboysDown} src={Gameboys} alt="gameboys" />
        <img className={styles.gameboysUp} src={Gameboys} alt="gameboys" />
        <img className={styles.gameboysDown} src={Gameboys} alt="gameboys" />
        <img className={styles.gameboysUp} src={Gameboys} alt="gameboys" />
      </aside>
    </Container>
  );
};

export default IndexPage;

export const Head: HeadFC = () => <title>Home Page</title>;
