import HomeContainer from "@/feature/home/container/HomeContainer";
import { getOptionalSession } from "@/repository/auth/dal";

export default async function HomePage() {
  const session = await getOptionalSession();

  return <HomeContainer isAuthenticated={Boolean(session)} />;
}
