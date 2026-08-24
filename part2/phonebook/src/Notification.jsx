const Notification = ({ message, isError }) => {
  if (message === null || message === '' ) {
    return null
  }
  const messageType = isError ? 'error' : 'success'

  return (
    <div className={`notification ${messageType}`}>
      {message}
    </div>
  )
}

export default Notification