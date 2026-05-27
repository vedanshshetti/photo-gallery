import PhotoGallery from "@/components/PhotoGallery";
import SiteHeader from "@/components/SiteHeader";

export const metadata = {
  title: "Vedansh Shetti | Photography",
  description: "A photo gallery featuring images powered by the Unsplash API."
};

export default function Home() {
  return (
    <main className="min-h-screen bg-[color:var(--background-color)] text-[color:var(--text-color)]">
      <SiteHeader />
      <PhotoGallery />
    </main>
  );
}
