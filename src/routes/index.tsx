import { createFileRoute } from "@tanstack/react-router";
import Portfolio from "@/components/portfolio/Portfolio";
import { Toaster } from "@/components/ui/sonner";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Gunjit Gyawali — Software Developer & Full-Stack Engineer" },
      {
        name: "description",
        content:
          "Portfolio of Gunjit Gyawali, a software developer crafting fast, elegant web and mobile products end to end. Explore projects, experience, services and get in touch.",
      },
      { property: "og:title", content: "Gunjit Gyawali — Software Developer" },
      {
        property: "og:description",
        content:
          "Software developer building refined, human-first digital products. Explore selected work, experience and services.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Gunjit Gyawali — Software Developer" },
      {
        name: "twitter:description",
        content: "Portfolio, projects and services by Gunjit Gyawali.",
      },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <>
      <Portfolio />
      <Toaster position="bottom-right" theme="dark" richColors closeButton />
    </>
  );
}
