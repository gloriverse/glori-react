import React from 'react'
import { Button, Form, Icon, Message, Segment } from 'semantic-ui-react'
import Link from 'next/link'
import catchErrors from '../utils/catchErrors'
import axios from 'axios'
import baseUrl from '../utils/baseUrl'
import { handleLogin } from '../utils/auth'

function Signup() {
  const INITIAL_USER = {
    name: '',
    email: '',
    password: ''
  }

  const [user, setUser] = React.useState(INITIAL_USER);
  const [disabled, setDisabled] = React.useState(true);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState('')

  React.useEffect(() => {
    const isUser = Object.values(user).every(el => Boolean(el))
    isUser ? setDisabled(false) : setDisabled(true)
  }, [user])

  function handleChange(event) {
    const { name, value } = event.target
    setUser(prevState => ({ ...prevState, [name]: value }))

  }
  async function handleSubmit() {
    event.preventDefault();
    try {
      setLoading(true)
      setError('')
      //make a request to signup user
      const url = `${baseUrl}/api/signup`
      const payload = { ...user }
      const response = await axios.post(url, payload)
      handleLogin(response.data)
    } catch (error) {
      catchErrors(error, setError)
      console.error(error)
    } finally {
      setLoading(false)
    }
  }
  return <>
    <Message
      attached
      icon="settings"
      header="Get Started!"
      content="Create a new account"

      color="teal"
    />
    <Form error={Boolean(error)} loading={loading} onSubmit={handleSubmit}>
      <Message
        error
        header="Ooops!"
        content={error}
      />
      <Segment>
        <Form.Input
          fluid
          icon="user"
          iconPosition="left"
          label="Name"
          placeholder="Name"
          name="name"
          value={user.name}
          onChange={handleChange}
        />
        <Form.Input
          fluid
          icon="envelope"
          iconPosition="left"
          label="Email"
          placeholder="Email"
          name="email"
          value={user.email}
          type="email"
          onChange={handleChange}
        />
        <Form.Input
          fluid
          icon="lock"
          iconPosition="left"
          label="Password"
          placeholder="Password"
          name="password"
          value={user.password}
          type="password"
          onChange={handleChange}
        />
        <Button
          disabled={disabled || loading}
          icon="signup"
          type="submit"
          color="orange"
          content="Signup"
        />
      </Segment>
    </Form>
    <Message attached="bottom" warning>
      <Icon name="help" />
      Existing user?{""}
      <Link href="/login">
        <a>Login here</a>
      </Link>{""}instead.
    </Message>
  </>;
}

export default Signup;
