import PhotoGallery from "@/components/PhotoGallery";

export const metadata = {
  title: "Vedansh Shetti | Photography",
  description: "A photo gallery featuring images powered by the Unsplash API."
};

export default function Home() {
  return (
    <main className="min-h-screen bg-white text-black">
      <header className="border-b border-gray-100 bg-white sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">
            Vedansh Shetti
          </h1>
          <p className="mt-1 text-sm text-gray-500">
            Photography portfolio powered by the Unsplash API
          </p>
        </div>
      </header>
      <PhotoGallery />
    </main>
  );
}
