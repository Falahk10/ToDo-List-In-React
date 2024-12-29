import { useState, useEffect } from 'react'
import Navbar from './components/Navbar'
import { v4 as uuidv4 } from 'uuid';
import { MdDelete } from "react-icons/md";
import { FaEdit } from "react-icons/fa";


function App() {

  const [todo, setTodo] = useState("")
  const [todos, setTodos] = useState([])
  const [showFinished, setShowFinished] = useState(false)

  const toggleFinished = (e) => {
    setShowFinished(!showFinished)
  }

  useEffect(() => {
    let todoString = localStorage.getItem("todos")
    if (todoString) {
      let todos = JSON.parse(localStorage.getItem("todos"))
      setTodos(todos)
    }
  }, [])

  useEffect(() => {
    saveToLS();
  }, [todos])

  const saveToLS = (params) => {
    localStorage.setItem("todos", JSON.stringify(todos))
    let store = JSON.parse(localStorage.getItem("todos")) 
    console.log(store);
  }

  const handleChange = (e) => {
    setTodo(e.target.value)
  }

  const handleAdd = () => {
    setTodos([...todos, { id: uuidv4(), todo, isCompleted: false }])   
    setTodo("")
    console.log("done");   
  }

  const handleCheckbox = (e) => {
    let id = e.target.name;
    let index = todos.findIndex(item => {
      return item.id == id;
    })
    let newTodos = [...todos];
    newTodos[index].isCompleted = !newTodos[index].isCompleted;
    setTodos(newTodos);
    console.log("done");
  }


  const handleEdit = (e, id) => {
    let t = todos.filter(item => item.id == id)
    setTodo(t[0].todo)
    let newTodos = todos.filter(item => {
      return item.id !== id
    });
    setTodos(newTodos);
    console.log("done");
  }

  const handleDelete = (e, id) => {
    let newTodos = todos.filter(item => {
      return item.id !== id
    });
    setTodos(newTodos);
    console.log("done");
  }




  return (
    <>
      <Navbar />
      <div className="md:container mx-3 md:mx-auto my-5 rounded-xl p-5 bg-violet-100 min-h-[70vh] md:w-[35%]">
        <h1 className='font-bold text-center text-3xl'>iTask - Manage your Todos in One Place</h1>
        <div className="addTodo my-5 flex flex-col gap-4">
          <h2 className='text-2xl font-bold'>Add a Todo</h2>
          <div className="flex gap-2">
            <input onChange={handleChange} value={todo} type="text" className='w-full rounded-full px-5 py-1' />
            <button onClick={handleAdd} disabled={todo.length <= 3} className='bg-violet-800 cursor-pointer hover:bg-violet-950 p-4 py-2 text-white disabled:bg-violet-700 rounded-full text-sm font-bold'>Save</button>
          </div>
        </div>
        <input className='my-4' id='show' onChange={toggleFinished}  type="checkbox" checked={showFinished} /> 
        <label className='mx-2' htmlFor="show">Show Finished</label>
        <div className='h-[1px] opacity-15 w-[90%] my-2 mx-auto bg-black'></div>
        <h2 className='text-2xl font-bold'>Your Todos</h2>
        <div className="todos">
          {todos.length == 0 && <div className='m-5'>No Todos to Display</div>}
          {todos.map(item => {

            return (showFinished || !item.isCompleted) && (
              <div key={item.id} className="todo flex justify-between my-3">
                <div className='flex gap-5'>
                  <input onChange={handleCheckbox} type="checkbox" checked={item.isCompleted} name={item.id} id='' />
                  <div className={item.isCompleted ? "line-through" : ""}>{item.todo}</div>
                </div>
                <div className="buttons flex h-full">
                  <button onClick={(e) => handleEdit(e, item.id)} className='bg-violet-800 hover:bg-violet-950 p-2 py-1 text-white rounded-md mx-1 text-sm font-bold'><FaEdit />
                  </button>
                  <button onClick={(e) => { handleDelete(e, item.id) }} className='bg-violet-800 hover:bg-violet-950 p-2 py-1 text-white rounded-md mx-1 text-sm font-bold'><MdDelete />
                  </button>
                </div>
              </div>)
          })}
        </div>
      </div>
    </>
  )
}

export default App
