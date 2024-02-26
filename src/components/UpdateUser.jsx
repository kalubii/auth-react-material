import CloseIcon from '@mui/icons-material/Close'
import { Box, TextField } from '@mui/material'
import AppBar from '@mui/material/AppBar'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import IconButton from '@mui/material/IconButton'
import Slide from '@mui/material/Slide'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import * as React from 'react'

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />
})

export default function UpdateUser({ user, onClose, updateUser }) {
  const [open, setOpen] = React.useState(true)

  const handleClose = () => {
    setOpen(false)
    onClose()
  }

  const [state, setState] = React.useState({
    username: user.username,
    email: user.email,
    password: user.password
  })

  const handleSubmit = (e) => {
    e.preventDefault()

    updateUser(user.userId, {
      username: state.username,
      email: state.email,
      password: state.password
    })

    handleClose()
  }

  const handleUserNameChange = () => {
    setState({ ...state, username: event.target.value })
  }

  const handleEmailChange = (event) => {
    setState({ ...state, email: event.target.value })
  }

  const handlePasswordChange = (event) => {
    setState({ ...state, password: event.target.value })
  }

  return (
    <React.Fragment>
      <Dialog
        fullScreen
        open={open}
        onClose={handleClose}
        TransitionComponent={Transition}>
        <AppBar sx={{ position: 'relative' }}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={handleClose}
              aria-label="close">
              <CloseIcon />
            </IconButton>
            <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
              New user
            </Typography>
            <Button autoFocus color="inherit" onClick={handleClose}>
              save
            </Button>
          </Toolbar>
        </AppBar>
        <Box
          component="form"
          onSubmit={handleSubmit}
          noValidate
          sx={{ mt: 1, mx: 25 }}>
          <TextField
            margin="normal"
            required
            id="username"
            label="Username"
            fullWidth
            name="username"
            autoComplete="username"
            autoFocus
            value={state.username}
            onChange={handleUserNameChange}
          />
          <TextField
            margin="normal"
            required
            id="email"
            label="Email address"
            fullWidth
            name="email"
            autoComplete="email"
            autoFocus
            value={state.email}
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
            value={state.password}
            onChange={handlePasswordChange}
          />

          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}>
            Save
          </Button>
        </Box>
      </Dialog>
    </React.Fragment>
  )
}
