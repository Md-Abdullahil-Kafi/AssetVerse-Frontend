// src/pages/NotFound.jsx

export default function NotFound() {
  return (
    <div className="min-h-screen bg-base-200 flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-9xl font-bold text-primary">404</h1>
        <p className="text-3xl mt-8">Page Not Found</p>
        <p className="text-xl mt-4">The page you are looking for does not exist.</p>
        <a href="/" className="btn btn-primary mt-8">Go Home</a>
      </div>
    </div>
  );
}