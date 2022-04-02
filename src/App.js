import axios from "axios";
import { useState, useEffect } from "react";
import "./App.css";
import AddTask from "./components/AddTask";
import Header from "./components/Header";
import Tasks from "./components/Tasks";

function App() {
  const [tasks, setTasks] = useState([]);

  const [showAddTask, setShowAddTask] = useState(false);


  const baseUrl = "http://localhost:5000/tasks";

  // CRUD OPERATIONS(Create, Update, Delete)
  //FETCH Tasks

const fetchTasks =  async()=>{
  try{
      const res = await fetch(baseUrl);
      const data = await res.json();
     
      setTasks(data);
  }catch (err){
    console.log(err)
  }
};
useEffect(() => {
  fetchTasks();
    
  }, []);

  //fetch tasks with Axıos


  
    
    
  
  
  //ADD TASK
  // const addTask = async(newTask) =>{
  //   const res = await fetch (baseUrl, {
  //     method: 'POST',
  //     headers: {
  //       'Content-Type' : 'application/json'
  //     },
  //     body : JSON.stringify(newTask)
  //   })
  //   await res.json()
  //   console.log(res);
  //   fetchTasks();
  // };




  //ADD TASK WİTH AXIOS
  const addTask = async (newTask) =>{
    const res = await axios.post(baseUrl, newTask);
    console.log(res);
    fetchTasks();
  };








  // DELETE TASK
  const deleteTask = (deletedTaskId) => {
    // console.log("delete Task", deletedTaskId);
    setTasks(tasks.filter((task) => task.id !== deletedTaskId));
  };

  // ADD TASK
  // const addTask = (newTask) => {
  //   const id = Math.floor(Math.random() * 1000 + 1);
  //   const addNewTask = { id, ...newTask };
  //   setTasks([...tasks, addNewTask]);
  // };

  // TOGGLE DONE
  const toggleDone = (toggleDoneId) => {
    // console.log("double click", toggleDoneId);
    setTasks(
      tasks.map((task) =>
        task.id === toggleDoneId ? { ...task, isDone: !task.isDone } : task
      )
    );
  };

  // TOGGLESHOW
  const toggleShow = () => setShowAddTask(!showAddTask);

  return (
    <div className="container">
      <Header
        title="TASK TRACKER"
        showAddTask={showAddTask}
        toggleShow={toggleShow}
      />

      {showAddTask && <AddTask addTask={addTask} />}

      {tasks.length > 0 ? (
        <Tasks tasks={tasks} deleteTask={deleteTask} toggleDone={toggleDone} />
      ) : (
        <h2 style={{ textAlign: "center" }}>NO TASK TO SHOW</h2>
      )}
    </div>
  );
}

export default App;
