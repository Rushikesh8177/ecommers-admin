import React, { useEffect, useState } from 'react'
import { getAllBrands } from '../api/Taskapi';

const Brand = () => {
  
  const [brand, setbrand] = useState([]);

  async function fetchData() {
    const response = await getAllBrands();
    console.log(response.data.brands);
    if (response.data.success) {
      setbrand(response.data.brands);
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  return (
   
        <div className="container ">
          <table className="table table-striped">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Task Name</th>
                <th scope="col">Task Stutus</th>
              </tr>
            </thead>
            <tbody>
              {brand .length > 0 ? (
                brand .map((task, i) => (
                  <tr key={i}>
                    <th scope="row">{i + 1}</th>
                    <td>{task.bName}</td>
                    {/* <td>{task.task_description}</td> */}
                    {/* <td><button onClick={() => handleIsComplete(task.id)}>{task.is_complete == 0 ? <span>In progress</span> : <span>Completed</span>}
                    </button></td> */}
                    {/* <td>{task.start_date}</td>
                    <td>{task.end_date}</td> */}
                    {/* <td>
                      <button className="btn btn-success" onClick={() => handleUpdateClick(task)}>Edit</button>
                      <button
                        className="btn btn-danger"
                        onClick={() => handleDeleteClick(task)}
                      >
                        Delete
                      </button>
                    </td> */}
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7" className="text-center">
                    No task available
                  </td>
                </tr>
              )}
            </tbody>

          </table>
    </div>
  );
};
export default Brand
