import React, { useEffect, useState } from 'react';
import { InfiniteScrollArea } from "@/components/ui/infinite-scroll-area";

const Works = () => {
  const [works, setWorks] = useState<any[]>([]);
  const [page, setPage] = useState(1);

  const fetchWorks = async (page: number) => {
    try {
      const response = await fetch(`/api/works?page=${page}&limit=5`);
      const data = await response.json();
      console.log(`Fetched ${data.length} works`);
      setWorks(prevWorks => [...prevWorks, ...data]);
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

  return (
    <InfiniteScrollArea className='h-[50%] p-4' onBottomReached={loadMoreWorks}>
      {Array.isArray(works) && works.map((work: any) => (
        <div key={work.id} className='m-4'>
          {work.File && (
            <img src={work.File.path} className='w-64 h-auto rounded-lg' alt={work.File.original_name} />
          )}
        </div>
      ))}
    </InfiniteScrollArea>
  );
};

export default Works;