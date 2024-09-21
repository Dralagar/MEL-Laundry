import { useRouter } from 'next/router';
import MissionPage from '../mission/page';
import VisionPage from '../vision/page';
import ValuesPage from '../values/page';

const DynamicTabPage = () => {
  const router = useRouter();
  const { tab } = router.query;

  if (!tab) return <p>Loading...</p>;

  switch (tab) {
    case 'mission':
      return <MissionPage />;
    case 'vision':
      return <VisionPage />;
    case 'values':
      return <ValuesPage />;
    default:
      return <p>Page not found</p>;
  }
};

export default DynamicTabPage;
