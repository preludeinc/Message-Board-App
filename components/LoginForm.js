import { Button, Card, Col, Form, Row } from 'react-bootstrap';
import { Formik } from 'formik';
import * as yup from "yup";

const schema = yup.object().shape({
  username: yup
    .string()
    .trim()
    .min(3, 'Your email/username must be at least ${min} characters.')
    .max(15, 'Your email/username cannot be more than ${max} characters.')
    .required('Username or email is required.'),
  password: yup
    .string()
    .trim()
    .min(8, 'Your password must be at least ${min} characters.')
    .max(64, 'Your password must be no more than ${max} characters')
    .required('A password is required.')
});

const LoginForm = ({ logInUser }) => {

  const handleFormData = (values, { resetForm, setSubmitting }) => {
    logInUser(values);
    // resets the Form to prevent a double submit
    resetForm();
    // this is set to false so submission can be finished 
    setSubmitting(false);
  }

  return (
    <Card className="mb-4">
      <Card.Body>
        <Card.Title>Log In:</Card.Title>
        <Formik
          validationSchema={schema}
          onSubmit={handleFormData}
          initialValues={{ username: '', password: '' }}
        >
          {({
            handleSubmit,
            handleChange,
            handleBlur,
            values,
            touched,
            errors
          }) => (
            <Form noValidate onSubmit={handleSubmit}>
              <Row className="align-items-center">
                <Form.Group as={Col} controlId="username">
                  <Form.Label>Enter a Username or Email:</Form.Label>
                  <Form.Control
                    placeholder="Your Username or Email"
                    value={values.username}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    isValid={touched.username && !errors.username}
                    isInvalid={touched.username && errors.username}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.username}
                  </Form.Control.Feedback>
                </Form.Group>
                <Form.Group as={Col} md={6} controlId="password">
                  <Form.Label>Enter a Password:</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Your password"
                    value={values.password}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    isValid={touched.password && !errors.password}
                    isInvalid={touched.password && errors.password}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.password}
                  </Form.Control.Feedback>
                </Form.Group>
                <Col>
                  <Button variant="primary" type="submit" className="mt-3">
                    Submit
                  </Button>
                </Col>
              </Row>
            </Form>
          )}
        </Formik>
      </Card.Body>
    </Card>
  );
}

export default LoginForm;
