import React, { useState } from 'react'
import { Snackbar, IconButton } from '@material-ui/core'
import { PropTypes } from 'prop-types'
import { CloseOutlined } from '@material-ui/icons'
const ErrorSnackbar = ({ errorMessage, setIsErrorShown }) => {

  const [shown, setShown] = useState(true)

  const handleClose = (e, reason) => {
    if (reason === 'clickaway') {
      return
    }
    setShown(false)
    setIsErrorShown(false)
  }

  const action = (
    <>
      <IconButton
        size='small'
        aria-label='close'
        color='inherit'
        onClick={handleClose}
      >
        <CloseOutlined fontSize='small' />
      </IconButton>
    </>
  )


  return (
    <Snackbar
      open={shown}
      autoHideDuration={6000}
      onClose={handleClose}
      message={`Something went wrong: ${errorMessage}`}
      action={action}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
    />)
}


ErrorSnackbar.propTypes = {
  errorMessage: PropTypes.string,
  setIsErrorShown: PropTypes.func
}


export default ErrorSnackbar