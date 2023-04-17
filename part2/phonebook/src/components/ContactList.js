import Contact from './Contact'

const ContactList =  ({ personsToShow }) => {
  return(
    <ul>
      {personsToShow.map(person => <Contact key={person.name} name={person.name} number={person.number}/> )}
    </ul>
  )
}

export default ContactList