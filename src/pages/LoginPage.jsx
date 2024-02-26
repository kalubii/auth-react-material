import { CheckCircleOutline, Lock } from '@mui/icons-material'
import {
  Alert,
  Avatar,
  Box,
  Button,
  Checkbox,
  Container,
  CssBaseline,
  FormControlLabel,
  Grid,
  TextField,
  Typography
} from '@mui/material'
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../providers/AuthProvider'

const LoginPage = () => {
  const { login } = useAuth()
  const [etat, setEtat] = useState({ username: '', password: '' })
  const [message, setMessage] = useState('')

  const handleEmailChange = (event) => {
    setEtat({ ...etat, username: event.target.value })
  }

  const handlePasswordChange = (event) => {
    setEtat({ ...etat, password: event.target.value })
  }

  const navigate = useNavigate()

  const handleSubmit = (event) => {
    event.preventDefault()

    const user = login({ username: etat.username, password: etat.password })

    if (user) {
      setTimeout(() => {
        navigate('/Dashboard')
      }, 1500) //  5000 millisecondes =  5 secondes
    } else {
      setMessage('Incorrect username or password')
    }
  }

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          marginBottom: 3
        }}>
        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
          <Lock />
        </Avatar>

        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            id="username"
            label="Email Address"
            fullWidth
            name="username"
            autoComplete="username"
            autoFocus
            value={etat.username}
            onChange={handleEmailChange}
          />
          <TextField
            margin="normal"
            required
            name="password"
            label="Password"
            fullWidth
            type="password"
            id="password"
            autoComplete="current-password"
            value={etat.password}
            onChange={handlePasswordChange}
          />

          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          />

          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}>
            Sign In
          </Button>
          {message && (
            <Alert
              icon={<CheckCircleOutline fontSize="inherit" />}
              severity="error">
              {message}
            </Alert>
          )}
          <Grid container>
            <Grid item xs>
              <Link href="#" variant="body2">
                Forgot password?
              </Link>
            </Grid>
            <Grid item>
              <Link to="/inscription" variant="body2">
                {' '}
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  )
}

export default LoginPage
