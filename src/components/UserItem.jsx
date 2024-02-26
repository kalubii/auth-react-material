import ArchiveIcon from '@mui/icons-material/Archive'
import EditIcon from '@mui/icons-material/Edit'
import FileCopyIcon from '@mui/icons-material/FileCopy'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import MoreHorizIcon from '@mui/icons-material/MoreHoriz'
import { TableCell, TableRow } from '@mui/material'
import Button from '@mui/material/Button'
import Divider from '@mui/material/Divider'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import { alpha, styled } from '@mui/material/styles'
import * as React from 'react'
import UpdateUser from './UpdateUser'

const StyledMenu = styled((props) => (
  <Menu
    elevation={0}
    anchorOrigin={{
      vertical: 'bottom',
      horizontal: 'right'
    }}
    transformOrigin={{
      vertical: 'top',
      horizontal: 'right'
    }}
    {...props}
  />
))(({ theme }) => ({
  '& .MuiPaper-root': {
    borderRadius: 6,
    marginTop: theme.spacing(1),
    minWidth: 180,
    color:
      theme.palette.mode === 'light'
        ? 'rgb(55, 65, 81)'
        : theme.palette.grey[300],
    boxShadow:
      'rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px',
    '& .MuiMenu-list': {
      padding: '4px 0'
    },
    '& .MuiMenuItem-root': {
      '& .MuiSvgIcon-root': {
        fontSize: 18,
        color: theme.palette.text.secondary,
        marginRight: theme.spacing(1.5)
      },
      '&:active': {
        backgroundColor: alpha(
          theme.palette.primary.main,
          theme.palette.action.selectedOpacity
        )
      }
    }
  }
}))

function CustomizedMenus({ onEdit, onArchive }) {
  const [anchorEl, setAnchorEl] = React.useState(null)
  const open = Boolean(anchorEl)
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }

  return (
    <div>
      <Button
        id="demo-customized-button"
        aria-controls={open ? 'demo-customized-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        variant="contained"
        disableElevation
        onClick={handleClick}
        endIcon={<KeyboardArrowDownIcon />}>
        Options
      </Button>
      <StyledMenu
        id="demo-customized-menu"
        MenuListProps={{
          'aria-labelledby': 'demo-customized-button'
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}>
        <MenuItem
          onClick={() => {
            onEdit()
            handleClose()
          }}
          disableRipple>
          <EditIcon />
          Edit
        </MenuItem>
        <MenuItem onClick={handleClose} disableRipple>
          <FileCopyIcon />
          Duplicate
        </MenuItem>
        <Divider sx={{ my: 0.5 }} />
        <MenuItem
          onClick={() => {
            handleClose()
            onArchive()
          }}
          disableRipple>
          <ArchiveIcon />
          Archive
        </MenuItem>
        <MenuItem onClick={handleClose} disableRipple>
          <MoreHorizIcon />
          More
        </MenuItem>
      </StyledMenu>
    </div>
  )
}

const UserItem = ({ user, removeUser, updateUser }) => {

  const [inEditMode, setInEditMode] = React.useState(false)

  const handleOnEdit = () => {
    setInEditMode(true)
  }

  const handleOnArchive = () => {
    removeUser(user.userId)
  }

  const handleClose = () => {
    setInEditMode(false)
  }

  return (
    <>
      {inEditMode && (
        <UpdateUser user={user} updateUser={updateUser} onClose={handleClose} />
      )}
      <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
        <TableCell component="th" scope="row">
          {user.username}
        </TableCell>
        <TableCell component="th" scope="row">
          {user.email}
        </TableCell>
        <TableCell component="th" scope="row">
          {user.password}
        </TableCell>
        <TableCell component="th" scope="row">
          <CustomizedMenus onEdit={handleOnEdit} onArchive={handleOnArchive} />
        </TableCell>
      </TableRow>
    </>
  )
}

export default UserItem
