// src/pages/employee/MyTeam.jsx

import { useQuery } from "@tanstack/react-query";
import api from "../../lib/axios";

export default function MyTeam() {
  const { data: team = [], isLoading } = useQuery({
    queryKey: ["myTeam"],
    queryFn: async () => {
      const { data } = await api.get("/employee/my-team");
      return data.team;
    },
  });

  return (
    <div className="max-w-6xl mx-auto p-4">
      <h1 className="text-3xl font-bold text-primary mb-8">My Team</h1>

      {isLoading ? (
        <div className="text-center py-8">
          <span className="loading loading-spinner loading-lg"></span>
        </div>
      ) : team.length === 0 ? (
        <p className="text-center py-8 text-gray-500">No team members yet</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {team.map((member) => (
            <div key={member._id} className="card bg-base-100 shadow-xl">
              <div className="card-body items-center text-center">
                <div className="avatar mb-4">
                  <div className="w-24 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                    <img src={member.profileImage} alt={member.name} />
                  </div>
                </div>
                <h3 className="text-xl font-bold">{member.name}</h3>
                <p className="text-sm opacity-70">{member.email}</p>
                <p className="text-sm mt-2">
                  DOB: {new Date(member.dateOfBirth).toLocaleDateString()}
                </p>
                <p className="text-sm mt-2">
                  Assets Used: {member.usedAssets || 0}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}