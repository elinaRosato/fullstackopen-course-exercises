const Notification = ({ message }) => {
  if (message.content === null) {
    return null
  }
  const notificationStyle = {
    color: message.type === 'success' ? 'green' : 'red',
    background: 'lightgray',
    fontSize: 20,
    borderStyle: 'solid',
    borderRadius: 5,
    padding: 10,
    margin: 10
  }
  return (
    <div style={notificationStyle}>
      {message.content}
    </div>
  )
}

export default Notification
