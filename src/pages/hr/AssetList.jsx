// src/pages/hr/AssetList.jsx

import { useAssets } from "../../hooks/useAssets";
import { useHRAnalytics } from "../../hooks/useHRAnalytics";
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { Link } from "react-router-dom";

export default function AssetList() {
  const { data: assetsData, isLoading: assetsLoading } = useAssets();
  const { data: analytics, isLoading: analyticsLoading } = useHRAnalytics();

  const assets = assetsData?.assets || [];
  const pagination = assetsData?.pagination;

  const COLORS = ["#0088FE", "#FF8042"];

  return (
    <div>
      <h1 className="text-3xl font-bold text-primary mb-8">Asset List (Dashboard)</h1>

      {/* Analytics Charts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
        <div className="card bg-base-100 shadow-xl p-6">
          <h2 className="text-xl font-semibold mb-4">Asset Type Distribution</h2>
          {analyticsLoading ? (
            <p>Loading...</p>
          ) : (
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={analytics?.pieData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, value }) => `${name}: ${value}`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {analytics?.pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          )}
        </div>

        <div className="card bg-base-100 shadow-xl p-6">
          <h2 className="text-xl font-semibold mb-4">Top 5 Requested Assets</h2>
          {analyticsLoading ? (
            <p>Loading...</p>
          ) : (
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={analytics?.barData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="requests" fill="#8884d8" />
              </BarChart>
            </ResponsiveContainer>
          )}
        </div>
      </div>

      {/* Asset Table */}
      <div className="card bg-base-100 shadow-xl">
        <div className="card-body">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-semibold">Company Assets</h2>
            <Link to="/hr/add-asset" className="btn btn-primary">Add Asset</Link>
          </div>

          {assetsLoading ? (
            <p>Loading assets...</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="table table-zebra w-full">
                <thead>
                  <tr>
                    <th>Image</th>
                    <th>Name</th>
                    <th>Type</th>
                    <th>Quantity</th>
                    <th>Date Added</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {assets.map((asset) => (
                    <tr key={asset._id}>
                      <td>
                        <div className="avatar">
                          <div className="w-12 rounded">
                            <img src={asset.productImage} alt={asset.productName} />
                          </div>
                        </div>
                      </td>
                      <td>{asset.productName}</td>
                      <td>{asset.productType}</td>
                      <td>{asset.productQuantity}</td>
                      <td>{new Date(asset.dateAdded).toLocaleDateString()}</td>
                      <td>
                        <button className="btn btn-sm btn-warning mr-2">Edit</button>
                        <button className="btn btn-sm btn-error">Delete</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* Pagination */}
          {pagination && (
            <div className="flex justify-center mt-6">
              <div className="btn-group">
                <button className="btn" disabled={pagination.current === 1}>
                  Previous
                </button>
                {[...Array(pagination.pages)].map((_, i) => (
                  <button
                    key={i}
                    className={`btn ${pagination.current === i + 1 ? "btn-active" : ""}`}
                  >
                    {i + 1}
                  </button>
                ))}
                <button className="btn" disabled={pagination.current === pagination.pages}>
                  Next
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}