const Contact =  ({ name, number, id, deletePerson }) => {
  return(
    <li>
      {name} {number}
      <button onClick={deletePerson} id={id}>delete</button>
    </li>
  )
}

export default Contact