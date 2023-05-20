import * as React from "react";
import { useState, useEffect, Fragment } from "react";
import type { HeadFC, PageProps } from "gatsby";
import { Container } from "../components/Container/Container";
import { Link, Switch, TextField, Checkbox, Button } from "nerdux-ui-system";
import BackArrowIcon from "../Icons/BackArrowIcon";
import { Error } from "../Icons/Error";
import * as styles from "./index.module.scss";
import { useFormik } from "formik";
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
  const [isLoading, setIsLoading] = useState(false);
  const [disabled, setDisabled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [disabledBackground, setDisabledBackground] = useState(false);

  const handleTryAgain = () => {
    setFormSubmitted(false);
    setError5xx(false);
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
    console.log("errors", errors);
    if (values.username.trim().length < 2 || /\d/.test(values.username)) {
      errors.username = "Name is required";
    }
    if (!values.email.trim().length) {
      errors.email = "Email is required";
    } else if (
      !/^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/.test(
        values.email.trim()
      )
    ) {
      errors.email = "Invalid email format";
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
      setIsLoading(true);
      console.log("values:", values);
      fetch("https://training.nerdbord.io/api/v1/leads", {
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
          console.log("response.status", response.status);
          console.log("response.statusText", response.statusText);
          if (response.status >= 200 && response.status < 300) {
            setFormSubmitted(true);
            setIsLoading(false);
          } else if (response.status >= 400 && response.status < 500) {
            console.log("dupa", response.statusText);
            setErrorMessage(response.statusText);
            setIsLoading(false);
          }
        })
        .catch((error) => {
          console.log("error:", error);
          setError5xx(true);
          setIsLoading(false);
        });
    },
  });

  useEffect(() => {
    if (!formSubmitted) {
      formik.resetForm();
    }
  }, [formSubmitted]);

  return (
    <body className={disabledBackgroundClass}>
      <Container>
        <aside
          className={`${styles.container__left} ${disabledBackgroundClass}`}
        >
          <img
            className={`${gameboysClasses} ${styles.gameboysUpSlide}`}
            src={"../images/gameboys.png"}
            alt="gameboys"
          />
          <div className={styles.gameboysMobileUp}>
            <span className={hiddenClass}>
              <GameboysMobile />
            </span>
          </div>
        </aside>
        {!formSubmitted && !error5xx && (
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
                    <p
                      data-testid="error-message"
                      className={styles.errorMessage}
                    >
                      {errorMessage}
                    </p>
                  </div>
                )}
                <div className={styles.textfield__container}>
                  <TextField
                    value={formik.values.username}
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    id="username-input"
                    name="username"
                    label="Name"
                    placeholder="e.g. Richard Parker"
                    disabled={disabled}
                    error={
                      formik.touched.username && formik.errors.username
                        ? formik.errors.username
                        : undefined
                    }
                  />
                  <TextField
                    value={formik.values.email}
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    id="email-input"
                    name="email"
                    label="Email"
                    placeholder="e.g. richard@gmail.com"
                    disabled={disabled}
                    error={
                      formik.touched.email && formik.errors.email
                        ? formik.errors.email
                        : undefined
                    }
                  />
                </div>
                <div className={styles.checkbox__container}>
                  <Checkbox
                    id="checkbox-1"
                    name="acceptance"
                    label={
                      <span data-testid="checkbox-consent">
                        I have read and accept the
                        <Link
                          to="https://www.example.com/privacy-policy"
                          disabled={disabled}
                        >
                          privacy policy
                        </Link>
                      </span>
                    }
                    disabled={disabled}
                    onChange={formik.handleChange}
                    checked={formik.values.acceptance}
                    error={
                      formik.touched.acceptance && formik.errors.acceptance
                        ? formik.errors.acceptance
                        : undefined
                    }
                  />
                </div>
                <div className={styles.button__container}>
                  <Button
                    type="submit"
                    onClick={() => {
                      formik.handleSubmit();
                    }}
                    disabled={!formik.isValid || disabled}
                    variant={"primary"}
                    isLoading={isLoading}
                  >
                    Sign me up!
                  </Button>
                </div>
              </form>
            </main>
          </section>
        )}
        {formSubmitted && (
          <div className={styles.container__center}>
            <span data-testid="success-message" className={styles.formMessage}>
              Thank you {formik.values.username}, for signing up!
            </span>
            <span className={styles.formMessageInfo}>
              On the provided email {formik.values.email}, you will receive a
              message when the Gameboy launches!
            </span>
          </div>
        )}
        {!formSubmitted && error5xx && (
          <div className={styles.container__center}>
            <span className={styles.formMessage}>Something went wrong.</span>
            <div
              className={`${styles.button__container} ${styles.tryAgainButton__container}`}
            >
              <Button
                type="button"
                onClick={handleTryAgain}
                variant={"primary"}
              >
                <span className={styles.backArrowIcon}>
                  <Fragment>{BackArrowIcon()}</Fragment>
                </span>
                Try again
              </Button>
            </div>
          </div>
        )}
        <aside
          className={`${styles.container__right} ${disabledBackgroundClass}`}
        >
          <img
            className={`${gameboysClasses} ${styles.gameboysDownSlide}`}
            src={"../images/gameboys.png"}
            alt="gameboys"
          />
          <img
            className={`${gameboysClasses} ${styles.gameboysUpSlide}`}
            src={"../images/gameboys.png"}
            alt="gameboys"
          />
          <img
            className={`${gameboysClasses} ${styles.gameboysDownSlide}`}
            src={"../images/gameboys.png"}
            alt="gameboys"
          />
          <img
            className={`${gameboysClasses} ${styles.gameboysUpSlide}`}
            src={"../images/gameboys.png"}
            alt="gameboys"
          />
          <div className={styles.gameboysMobileDown}>
            <span className={hiddenClass}>
              <GameboysMobile />
            </span>
          </div>
        </aside>
      </Container>
    </body>
  );
}

export default IndexPage;
