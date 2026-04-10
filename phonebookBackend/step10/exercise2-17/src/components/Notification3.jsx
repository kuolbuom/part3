const Notification3 = ({ showMessage }) => {
  if (showMessage === null) {
    return null
  }

  return (
    <div className="error3">
      {showMessage}
    </div>
  )
}

export default Notification3