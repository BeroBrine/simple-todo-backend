import { useEffect, useState } from "react"
const App = () => {
  const [todo, setTodo] = useState({
    title: "well fuck",
    description: "what are we doing over here bruh"
  })
  console.log("render before useEffect");
  useEffect(() => {
    console.log("rendering inside the use Effect")
    setInterval(() => {
      setTodo({
        id: `this is the id ${Math.random()}`,
        title: "well who are you",
        description: "pata nhi",
      })
    }, 1000)
    console.log("hi from use effect")
  }, [])

  console.log("render");

  return (
    <>
      <span>{todo.id}</span>
      <br />
      <span>{todo.title}</span>
      <br />
      <span>{todo.description}</span>
    </>
  )
}
export default App
