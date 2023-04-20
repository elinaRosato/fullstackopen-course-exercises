import Contact from './Contact'

const ContactList =  ({ personsToShow, deletePerson }) => {
  return(
    <ul>
      {personsToShow.map(person => 
        <Contact key={person.id} name={person.name} number={person.number} id={person.id} deletePerson={deletePerson}/>
      )}
    </ul>
  )
}

export default ContactList