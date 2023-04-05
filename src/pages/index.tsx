import * as React from "react";
import { useState, Fragment } from "react";
import type { HeadFC, PageProps } from "gatsby";
import { Container } from "../components/Container/Container";
import { Link, Switch, TextField, Checkbox, Button } from "nerdux-ui-system";
import BackArrowIcon from "../Icons/BackArrowIcon";
import { Error } from "../Icons/Error";
import * as styles from "./index.module.scss";
import { useFormik } from "formik";
import Gameboys from "../images/gameboys.png";
import { GameboysMobile } from "../Icons/GameboysMobile";

interface FormValues {
  username: string;
  email: string;
  acceptance: boolean;
}

interface FormErrors {
  username?: string;
  email?: string;
  acceptance?: string;
}

function IndexPage() {
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [error5xx, setError5xx] = useState(false);
  const [disabled, setDisabled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [disabledBackground, setDisabledBackground] = useState(false);

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

  const validate = (values: {
    username: string;
    email: string;
    acceptance: boolean;
  }) => {
    const errors: FormErrors = {};
    if (values.username.length < 2) {
      errors.username = "Name is required";
    }
    if (!values.email.length) {
      errors.email = "Email is required";
    }
    if (!values.acceptance) {
      errors.acceptance = "Acceptance of the privacy policy is required.";
    }
    return errors;
  };

  const formik = useFormik<FormValues>({
    initialValues: {
      username: "",
      email: "",
      acceptance: false,
    },
    validate,
    onSubmit: (values) => {
      fetch("http://139.59.154.199:49160/api/v1/leads", {
        method: "POST",
        headers: {
          Authorization: "secret_token",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: values.username,
          email: values.email,
          consentsAccepted: values.acceptance,
        }),
      })
        .then((response) => {
          if (response.ok) {
            setFormSubmitted(true);
          } else if (response.status >= 400 && response.status < 500) {
            setErrorMessage(response.statusText);
          }
        })
        .catch((error) => {
          console.error("Error:", error);
          setError5xx(true);
        });
    },
  });

  return (
    <Container>
      <aside className={`${styles.container__left} ${disabledBackgroundClass}`}>
        <img
          className={`${gameboysClasses} ${styles.gameboysUpSlide}`}
          src={Gameboys}
          alt="gameboys"
        />
        <div className={`${styles.gameboysMobileUp} ${hiddenClass}`}>
          <GameboysMobile />
        </div>
      </aside>
      {!formSubmitted && (
        <section className={styles.container__center}>
          <header className={styles.titleHeader}>
            <h1>
              Join the Gameboy
              <br />
              <span>waiting list</span>
            </h1>
          </header>
          <main>
            <form onSubmit={formik.handleSubmit}>
              <div className={styles.switch__container}>
                <p>I swear, I’m a classic gameboy fan</p>
                <Switch
                  onChange={handleSwitch}
                  id="switch-1"
                  checked={true}
                  disabled={false}
                />
              </div>
              {errorMessage && (
                <div className={styles.errorMessage__container}>
                  <Error />
                  <p className={styles.errorMessage}>{errorMessage}</p>
                </div>
              )}
              <div className={styles.textfield__container}>
                <TextField
                  value={formik.values.username}
                  onChange={formik.handleChange}
                  id="username-input"
                  name="username"
                  label="Name"
                  placeholder="e.g. Richard Parker"
                  disabled={disabled}
                  error={formik.errors.username}
                />
                <TextField
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  id="email-input"
                  name="email"
                  label="Email"
                  placeholder="e.g. richard@gmail.com"
                  disabled={disabled}
                  error={formik.errors.email}
                />
              </div>
              <div className={styles.checkbox__container}>
                <Checkbox
                  id="checkbox-1"
                  name="acceptance"
                  label={
                    <span>
                      I have read and accept the
                      <Link to="#" disabled={disabled}>
                        privacy policy
                      </Link>
                    </span>
                  }
                  disabled={disabled}
                  onChange={formik.handleChange}
                  checked={formik.values.acceptance}
                  error={formik.errors.acceptance}
                />
              </div>
              <Button type="button" onClick={() => {}} disabled={disabled}>
                Sign me up!
              </Button>
            </form>
          </main>
        </section>
      )}
      {formSubmitted && (
        <div className={styles.container__center}>
          <span className={styles.formMessage}>
            Thank you {formik.values.username}, for signing up!
          </span>
          <span className={styles.formMessageInfo}>
            On the provided email {formik.values.email}, you will receive a
            message when the Gameboy launches!
          </span>
        </div>
      )}
      {error5xx && (
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
          className={`${gameboysClasses} ${styles.gameboysDownSlide}`}
          src={Gameboys}
          alt="gameboys"
        />
        <img
          className={`${gameboysClasses} ${styles.gameboysUpSlide}`}
          src={Gameboys}
          alt="gameboys"
        />
        <img
          className={`${gameboysClasses} ${styles.gameboysDownSlide}`}
          src={Gameboys}
          alt="gameboys"
        />
        <img
          className={`${gameboysClasses} ${styles.gameboysUpSlide}`}
          src={Gameboys}
          alt="gameboys"
        />
        <div className={`${styles.gameboysMobileDown} ${hiddenClass}`}>
          <GameboysMobile />
        </div>
      </aside>
    </Container>
  );
}

export default IndexPage;
