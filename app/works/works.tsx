import React, { useEffect, useState } from 'react';
import { InfiniteScrollArea } from "@/components/ui/infinite-scroll-area";
import WorkItem from '@/components/ui/work-item';

const Works = ({ showHidden, isLoggedIn }: { showHidden: boolean, isLoggedIn: boolean }) => {
  const [works, setWorks] = useState<any[]>([]);
  const [page, setPage] = useState(1);

  const fetchWorks = async (page: number) => {
    try {
      const response = await fetch(`/api/works?page=${page}&limit=5`);
      const data = await response.json();
      setWorks(prevWorks => page === 1 ? data : [...prevWorks, ...data]);
    } catch (error) {
      console.error('Failed to fetch works:', error);
    }
  };

  const loadMoreWorks = () => {
    setPage(prevPage => prevPage + 1);
  };

  useEffect(() => {
    fetchWorks(page);
  }, [page]);

  useEffect(() => {
  }, [works]);

  return (
    <InfiniteScrollArea className='h-screen w-screen p-8 pt-16 rounded-xl' onBottomReached={loadMoreWorks}>
      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4'>
        <div className='flex flex-col w-full gap-4 sm:gap-2'>
          {Array.isArray(works) && works.filter((_, index) => index % 3 === 0).map((work: any) => (
            <WorkItem key={work.id} work={work} showHidden={showHidden} isLoggedIn={isLoggedIn} />
          ))}
        </div>
        <div className='flex flex-col w-full gap-4 sm:gap-2'>
          {Array.isArray(works) && works.filter((_, index) => index % 3 === 1).map((work: any) => (
            <WorkItem key={work.id} work={work} showHidden={showHidden} isLoggedIn={isLoggedIn} />
          ))}
        </div>
        <div className='flex flex-col w-full gap-4 sm:gap-2'>
          {Array.isArray(works) && works.filter((_, index) => index % 3 === 2).map((work: any) => (
            <WorkItem key={work.id} work={work} showHidden={showHidden} isLoggedIn={isLoggedIn} />
          ))}
        </div>
      </div>
    </InfiniteScrollArea>
  );
};

export default Works;