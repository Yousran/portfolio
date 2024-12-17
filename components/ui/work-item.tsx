import React, { useState, useEffect } from 'react';
import { 
  ContextMenu, 
  ContextMenuTrigger, 
  ContextMenuContent, 
  ContextMenuItem 
} from './context-menu';
import EditWorks from '@/app/works/edit-works';

interface WorkItemProps {
  work: {
    id: string;
    File: {
      path: string;
      tiny_path: string;
      original_name: string;
    };
    title: string;
    link: string;
  };
}

const WorkItem: React.FC<WorkItemProps> = ({ work }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [isEditOpen, setIsEditOpen] = useState(false);

  const handleClick = () => {
    window.open(work.link, '_blank');
  };

  const handleEdit = (work: WorkItemProps['work']) => {
    setIsEditOpen(true);
  };

  const handleHideShow = (work: WorkItemProps['work']) => {
    setIsVisible(!isVisible);
    console.log(`${isVisible ? 'Hide' : 'Show'} clicked for work:`, work.title);
  };

  useEffect(() => {
    const img = new Image();
    img.src = work.File.path;
    img.onload = () => {
      setIsLoaded(true);
    };
  }, [work.File.path]);

  if (!isVisible) return null;

  return (
    <>
      <ContextMenu>
        <ContextMenuTrigger>
          <div 
            key={work.id} 
            className='relative h-fit cursor-pointer rounded-xl overflow-hidden' 
            onClick={handleClick}
          >
            {work.File && (
              <>
                <img 
                  src={work.File.tiny_path} 
                  className={`w-full h-auto ${isLoaded ? 'hidden' : 'blur-sm'} transition-opacity`} 
                  alt={work.File.original_name} 
                />
                <img 
                  src={work.File.path} 
                  className={`w-full h-auto ${isLoaded ? 'block' : 'hidden'}`} 
                  alt={work.File.original_name} 
                />
                <div className='absolute inset-0 bg-black bg-opacity-50 opacity-0 hover:opacity-100 flex items-center justify-center rounded-lg transition-opacity'>
                  <span className='text-primary-foreground dark:text-primary text-lg'>{work.title}</span>
                </div>
              </>
            )}
          </div>
        </ContextMenuTrigger>
        <ContextMenuContent>
          <ContextMenuItem onSelect={() => handleEdit(work)}>Edit</ContextMenuItem>
          <ContextMenuItem onSelect={() => handleHideShow(work)}>{isVisible ? 'Hide' : 'Show'}</ContextMenuItem>
        </ContextMenuContent>
      </ContextMenu>
      <EditWorks open={isEditOpen} onOpenChange={setIsEditOpen} work={work} />
    </>
  );
};

export default WorkItem;