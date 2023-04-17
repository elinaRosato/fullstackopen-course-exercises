const Header = ({ course }) => <h2>{course}</h2>

const Part = ({ part }) => <p>{part.name} {part.exercises}</p>

const Content = ({ parts }) => (
  <>
    {parts.map(part => <Part key={part.id} part={part} />)}
  </>
)

const Total = ({ total }) => <p>total of {total} exercises </p>

const Course = ({ course }) => {
  return (
    <div>
      <Header course={course.name} />
      <Content parts={course.parts} />
      <Total total={course.parts.reduce((sum, part) => sum + part.exercises, 0)}/>
    </div>
  )
}

export default Course