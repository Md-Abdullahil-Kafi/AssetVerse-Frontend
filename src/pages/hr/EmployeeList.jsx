import { useEmployeeList } from "../../hooks/useEmployeeList";
import Swal from "sweetalert2";
import api from "../../lib/axios";

export default function EmployeeList() {
  const { data: employees = [], isLoading, refetch } = useEmployeeList();

  const handleRemove = async (employeeEmail) => {
    const result = await Swal.fire({
      title: "Remove Employee?",
      text: "This employee will be removed from your company.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, remove",
      cancelButtonText: "Cancel",
      confirmButtonColor: "#ef4444",
    });

    if (result.isConfirmed) {
      try {
        await api.delete(`/employee/remove/${employeeEmail}`);
        Swal.fire("Removed!", "Employee removed successfully", "success");
        refetch();
      } catch (err) {
        Swal.fire("Failed!", "Failed to remove employee", "error");
      }
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-4">
      <h1 className="text-3xl font-bold text-primary mb-8">Employee List</h1>

      {isLoading ? (
        <div className="text-center py-12">
          <span className="loading loading-spinner loading-lg"></span>
        </div>
      ) : employees.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-xl text-gray-500 bg-base-200 py-8 px-12 rounded-xl">
            No employees in your company yet
          </p>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="table table-zebra w-full">
            <thead>
              <tr className="bg-primary text-white">
                <th>Profile</th>
                <th>Name</th>
                <th>Email</th>
                <th>Date of Birth</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {employees.map((employee) => (
                <tr key={employee._id} className="hover">
                  <td>
                    <div className="avatar">
                      <div className="w-12 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                        <img 
                          src={employee.profileImage || "https://media.istockphoto.com/id/1337144146/vector/default-avatar-profile-icon-vector.jpg?s=612x612&w=0&k=20&c=BIbFwuv7FxTWvh5S3vB6bkT0Qv8Vn8N5Ffseq84ClGI="} 
                          alt={employee.name} 
                        />
                      </div>
                    </div>
                  </td>
                  <td className="font-medium">{employee.name}</td>
                  <td>{employee.email}</td>
                  <td>
                    {employee.dateOfBirth 
                      ? new Date(employee.dateOfBirth).toLocaleDateString() 
                      : "Not set"}
                  </td>
                  <td>
                    <button 
                      onClick={() => handleRemove(employee.email)}
                      className="btn btn-error btn-sm"
                    >
                      Remove
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}