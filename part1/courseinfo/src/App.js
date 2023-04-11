const App = () => {
  const course = 'Half Stack application development'
  const parts = [
    {
      name: 'Fundamentals of React',
      exercises: 10
    },
    {
      name: 'Using props to pass data',
      exercises: 7
    },
    {
      name: 'State of a component',
      exercises: 14
    }
  ]

  const Header = (props) => {
    return (
      <h1>{props.course}</h1>
    )
  }
  const Content = (props) => {
    return (
      <>
        <Part1 part1={props.parts[0]} />
        <Part2 part2={props.parts[1]} />
        <Part3 part3={props.parts[2]} />
      </>
    )
  }
  const Total = (props) => {
    return (
      <p>Number of exercises {props.total}</p>
    )
  }

  const Part1 = (props) => {
    return (
      <p>
          {props.part1.name} {props.part1.exercises}
      </p>
    )
  }
  const Part2 = (props) => {
    return (
      <p>
          {props.part2.name} {props.part2.exercises}
      </p>
    )
  }
  const Part3 = (props) => {
    return (
      <p>
          {props.part3.name} {props.part3.exercises}
      </p>
    )
  }

  return (
    <>
      <Header course={course} />
      <Content parts={parts} />
      <Total total={parts[0].exercises + parts[1].exercises + parts[2].exercises} />
    </>
  )
}

export default App
