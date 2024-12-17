import React, { useEffect, useState } from 'react';
import { InfiniteScrollArea } from "@/components/ui/infinite-scroll-area";
import WorkItem from '@/components/ui/work-item';

const Works = ({ showHidden }: { showHidden:boolean }) => {
  const [works, setWorks] = useState<any[]>([]);
  const [page, setPage] = useState(1);
  // const [totalWorks, setTotalWorks] = useState(0);

  const fetchWorks = async (page: number) => {
    try {
      const response = await fetch(`/api/works?page=${page}&limit=5`);
      const data = await response.json();
      // console.log(`Fetched ${data.works.length} works`);
      setWorks(prevWorks => [...prevWorks, ...data]);
      // setTotalWorks(data.total);
      // console.log('Total works:', data.total);
    } catch (error) {
      console.error('Failed to fetch works:', error);
    }
  };

  const loadMoreWorks = () => {
    // console.log('Works load more');
    // if (works.length < totalWorks) {
      // console.log('Loading more works');
      setPage(prevPage => prevPage + 1);
    // }
  };

  useEffect(() => {
    fetchWorks(page);
    // console.log('Page: ', page);
  }, [page]);

  useEffect(() => {
    // console.log('Works Length:', works.length);
  }, [works]);

  return (
<InfiniteScrollArea className='h-screen w-screen p-8' onBottomReached={loadMoreWorks}>
  <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4'>
    <div className='flex flex-col gap-4 w-full'>
      {Array.isArray(works) && works.filter((_, index) => index % 3 === 0).map((work: any) => (
        <WorkItem key={work.id} work={work} showHidden={showHidden} />
      ))}
    </div>
    <div className='flex flex-col gap-4 w-full'>
      {Array.isArray(works) && works.filter((_, index) => index % 3 === 1).map((work: any) => (
        <WorkItem key={work.id} work={work} showHidden={showHidden} />
      ))}
    </div>
    <div className='flex flex-col gap-4 w-full'>
      {Array.isArray(works) && works.filter((_, index) => index % 3 === 2).map((work: any) => (
        <WorkItem key={work.id} work={work} showHidden={showHidden} />
      ))}
    </div>
  </div>
</InfiniteScrollArea>
  );
};

export default Works;