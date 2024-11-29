import Image from "next/image";

export default function Home() {
  return (
    <div className="text-center">
      <h1 className="text-4xl font-bold mb-4">Welcome to Superbike Rental</h1>
      <p className="text-lg mb-8">Rent the best superbikes at affordable prices.</p>
      <Image
        src="/path-to-your-image.jpg" // Replace with your image path
        alt="Superbike"
        width={600}
        height={400}
        className="rounded-lg shadow-lg"
      />
      <div className="mt-8">
        <a href="/auth/signin" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition">
          Get Started
        </a>
      </div>
    </div>
  );
}