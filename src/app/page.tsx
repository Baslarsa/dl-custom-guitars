import { Spotlight } from "@/components/ui/spotlight";
import HomePageHero from "./components/HomePageHero";
import Container from "./components/layout/Container";

export default function Home() {
  return (
    <main>
      <HomePageHero />
      <div>
        <Container className="h-screen w-full">hej</Container>
      </div>
    </main>
  );
}
