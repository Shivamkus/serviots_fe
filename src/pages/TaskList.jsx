import React, { useState, useEffect } from "react";
import axiosInstance from "../utils/axiosInstance";
import { toast } from "react-toastify";

export default function TaskList() {
  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  const [tasks, setTasks] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [totalItems, setTotalItems] = useState(0);

  const [modalOpen, setModalOpen] = useState(false);
  const [editTask, setEditTask] = useState(null);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    status: true,
  });

  const [confirmOpen, setConfirmOpen] = useState(false);
  const [taskToDelete, setTaskToDelete] = useState(null);

  // Fetch tasks
  const getList = async () => {
    try {
      const res = await axiosInstance.get(
        `/tasks?page=${page}&limit=${itemsPerPage}&searchTerm=${searchTerm}`
      );
      if (res.status === 200) {
        setTasks(res.data.data);
        setTotalPages(res.data.totalPages);
        setTotalItems(res.data.totalItems);
      }
    } catch (error) {
      console.error("Error fetching tasks:", error.message);
    }
  };

  useEffect(() => {
    getList();
  }, [page, itemsPerPage, searchTerm]);

  

  // open models
  const openModal = (task = null) => {
    setEditTask(task);
    setFormData(
      task
        ? {
            title: task.title,
            description: task.description,
            status: task.status,
          }
        : { title: "", description: "", status: true }
    );
    setModalOpen(true);
  };

  // handel submit for create and edit task
  const handleModalSubmit = async (e) => {
    e.preventDefault();
    try {
      let res;
      if (editTask) {
        res = await axiosInstance.put(`/tasks/${editTask._id}`, formData);
      } else {
        res = await axiosInstance.post("/tasks", formData);
      }
      getList();
      setModalOpen(false);
      setEditTask(null);
      toast.success(res.data.message);
      setFormData({ title: "", description: "", status: true });
    } catch (error) {
      console.error("Error saving task:", error.message);
    }
  };

  // oepn delete confirm 
  const openConfirm = (task) => {
    setTaskToDelete(task);
    setConfirmOpen(true);
  };

  // delete task
  const handleConfirmDelete = async () => {
    try {
      const res = await axiosInstance.delete(`/tasks/${taskToDelete._id}`);
      getList();
      setConfirmOpen(false);
      setTaskToDelete(null);
      toast.success(res.data.message);
    } catch (error) {
      console.error("Error deleting task:", error.message);
    }
  };

  return (
    <div className="w-full p-6 min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold">Task List</h1>
        <button
          onClick={() => openModal()}
          className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700"
        >
          + Add Task
        </button>
      </div>

      <div className="mb-4">
        <input
          type="text"
          placeholder="Search tasks..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full md:w-80 px-4 py-2 border rounded-md shadow-sm focus:ring-indigo-300 focus:border-indigo-400 outline-none"
        />
      </div>

      <div className="overflow-x-auto bg-white shadow-xl rounded-lg">
        <table className="w-full text-left border-collapse">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-3 border-b">ID</th>
              <th className="p-3 border-b">Title</th>
              <th className="p-3 border-b">Description</th>
              <th className="p-3 border-b">Status</th>
              <th className="p-3 border-b">Actions</th>
            </tr>
          </thead>
          <tbody>
            {tasks.map((task, idx) => (
              <tr key={task._id} className="hover:bg-gray-50">
                <td className="p-3 border-b">
                  {idx + 1 + (page - 1) * itemsPerPage}
                </td>
                <td className="p-3 border-b">{task.title}</td>
                <td className="p-3 border-b">{task.description}</td>
                <td className="p-3 border-b">
                  <span
                    className={`px-2 py-1 rounded text-sm ${
                      task.status
                        ? "bg-green-100 text-green-700"
                        : "bg-yellow-100 text-yellow-700"
                    }`}
                  >
                    {task.status ? "Active" : "Inactive"}
                  </span>
                </td>
                <td className="p-3 border-b">
                  <button
                    onClick={() => openModal(task)}
                    className="text-blue-600 hover:underline mr-3"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => openConfirm(task)}
                    className="text-red-600 hover:underline"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
            {tasks.length === 0 && (
              <tr>
                <td colSpan="5" className="text-center p-4 text-gray-500">
                  No tasks found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex flex-col md:flex-row justify-between items-center mt-6 gap-2">
        <div className="flex justify-center items-center gap-2">
          <button
            onClick={() => setPage((p) => Math.max(p - 1, 1))}
            disabled={page === 1}
            className={`px-3 py-1 border rounded-md ${
              page === 1 ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            Prev
          </button>
          {[...Array(totalPages)].map((_, i) => (
            <button
              key={i}
              onClick={() => setPage(i + 1)}
              className={`px-3 py-1 border rounded-md ${
                page === i + 1 ? "bg-indigo-600 text-white" : "bg-white"
              }`}
            >
              {i + 1}
            </button>
          ))}
          <button
            onClick={() => setPage((p) => Math.min(p + 1, totalPages))}
            disabled={page === totalPages}
            className={`px-3 py-1 border rounded-md ${
              page === totalPages ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            Next
          </button>
        </div>
        <div className="flex items-center gap-2">
          <span>
            Page {page} of {totalPages}
          </span>
          <span>Total: {totalItems}</span>
          <select
            value={itemsPerPage}
            onChange={(e) => setItemsPerPage(Number(e.target.value))}
            className="px-2 py-1 border rounded-md"
          >
            <option value={1}>1</option>
            <option value={4}>4</option>
            <option value={10}>10</option>
            <option value={20}>20</option>
            <option value={50}>50</option>
            <option value={100}>100</option>
          </select>
        </div>
      </div>

      {/* Add/Edit Modal */}
      {modalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
          <div className="bg-white rounded-lg p-6 w-96 shadow-lg">
            <h2 className="text-xl font-semibold mb-4">
              {editTask ? "Edit Task" : "Add Task"}
            </h2>
            <form onSubmit={handleModalSubmit} className="flex flex-col gap-4">
              <input
                type="text"
                placeholder="Title"
                value={formData.title}
                onChange={(e) =>
                  setFormData({ ...formData, title: e.target.value })
                }
                className="px-4 py-2 rounded-md border border-gray-600 outline-none"
                required
              />
              <textarea
                placeholder="Description"
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
                className="px-4 py-2 rounded-md border border-gray-600 outline-none"
                required
              />
              {/* Status Select */}
              <select
                value={formData.status}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    status: e.target.value === "true",
                  })
                }
                className="px-4 py-2 rounded-md border border-gray-600 outline-none"
              >
                <option value={true}>Active</option>
                <option value={false}>Inactive</option>
              </select>
              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="px-4 py-2 rounded-md border hover:bg-gray-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-md bg-indigo-600 text-white hover:bg-indigo-700"
                >
                  {editTask ? "Update" : "Add"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {confirmOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
          <div className="bg-white rounded-lg p-6 w-96 shadow-lg">
            <h2 className="text-lg font-semibold mb-4">Confirm Delete</h2>
            <p className="mb-4">
              Are you sure you want to delete the task "{taskToDelete?.title}"?
            </p>
            <div className="flex justify-end gap-2">
              <button
                onClick={() => setConfirmOpen(false)}
                className="px-4 py-2 rounded-md border hover:bg-gray-100"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmDelete}
                className="px-4 py-2 rounded-md bg-red-600 text-white hover:bg-red-700"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
