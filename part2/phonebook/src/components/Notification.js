const Notification = ({ message }) => {
  if (message === null) {
    return null
  }
  console.log(message)
  const notificationStyle = {
    color: 'green',
    background: 'lightgreen',
    fontSize: 20,
    borderStyle: 'solid',
    borderRadius: 5,
    padding: 10,
    margin: 10
  }
  return (
    <div style={notificationStyle}>
      {message}
    </div>
  )
}

export default Notification
