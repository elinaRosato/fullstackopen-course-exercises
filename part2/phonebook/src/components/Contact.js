const Contact =  ({ name, number, id, deletePerson }) => {
  return(
    <li>
      {name} {number}
      <button onClick={deletePerson} id={id} name={name}>delete</button>
    </li>
  )
}

export default Contact