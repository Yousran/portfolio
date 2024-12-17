import React, { useEffect, useState } from 'react';

const Works = () => {
  const [works, setWorks] = useState([]);
  const fetchWorks = async () => {
    try {
      const response = await fetch('/api/works');
      const data = await response.json();
      // console.log('Data from API:', data);
      setWorks(data);
    } catch (error) {
      console.error('Failed to fetch works:', error);
    }
  };

  useEffect(() => {
    fetchWorks();
  }, []);

  // useEffect(() => {
  //   console.log('Works state:', works);
  // }, [works]);

  return (
    <div className='h-full flex flex-col justify-start gap-4 flex-wrap'>
      {Array.isArray(works) && works.map((work: any) => (
        <div key={work.id}>
          {work.File && (
            <img src={work.File.path} className='w-64 h-auto rounded-lg' alt={work.File.original_name} />
          )}
        </div>
      ))}
    </div>
  );
};

export default Works;