
export default function HeroSection() {
  return (
    <div
      className="bg-cover bg-center h-[400px] flex items-center justify-center"
      style={{ backgroundImage: "url('/light.jpg')" }}
    >
      <div className="bg-black bg-opacity-80 text-white p-6 rounded">
        <h1 className="text-3xl font-bold mb-2">Welcome to TechSpace!</h1>
        <p>Discover awesome articles, tutorials, and news here.</p>
      </div>
    </div>
  );
}
