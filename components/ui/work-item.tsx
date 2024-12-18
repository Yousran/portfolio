import React, { useState, useEffect } from 'react';
import { 
  ContextMenu, 
  ContextMenuTrigger, 
  ContextMenuContent, 
  ContextMenuItem 
} from './context-menu';
import EditWorks from '@/app/works/edit-works';
import { 
  AlertDialog, 
  AlertDialogTrigger, 
  AlertDialogContent, 
  AlertDialogHeader, 
  AlertDialogFooter, 
  AlertDialogCancel, 
  AlertDialogAction, 
  AlertDialogTitle 
} from '@/components/ui/alert-dialog';

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
    show: boolean;
  };
  showHidden: boolean;
  isLoggedIn: boolean;
}

const WorkItem: React.FC<WorkItemProps> = ({ work, showHidden, isLoggedIn }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isVisible, setIsVisible] = useState(work.show);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isAlertOpen, setIsAlertOpen] = useState(false);

  const handleClick = () => {
    window.open(work.link, '_blank');
  };

  const handleEdit = (work: WorkItemProps['work']) => {
    setIsEditOpen(true);
  };

  const handleHideShow = async (work: WorkItemProps['work']) => {
    const newVisibility = !isVisible;
    const response = await fetch(`/api/works/update-show?id=${work.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
      },
      body: JSON.stringify({ show: newVisibility }),
    });

    if (response.ok) {
      setIsVisible(newVisibility);
    } else {
      console.error('Failed to update show status:', await response.text());
    }
  };

  const handleDelete = async (work: WorkItemProps['work']) => {
    const response = await fetch(`/api/works/destroy?id=${work.id}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
      },
    });

    if (response.ok) {
      window.location.reload();
    } else {
      console.error('Failed to delete work:', await response.text());
    }
  };

  useEffect(() => {
    const img = new Image();
    img.src = work.File.path;
    img.onload = () => {
      setIsLoaded(true);
    };
  }, [work.File.path]);

  if (!isVisible && !showHidden) return null;

  return (
    <>
      {isLoggedIn ? (
        <ContextMenu>
          <ContextMenuTrigger>
            <div 
              key={work.id} 
              className={`relative h-fit cursor-pointer rounded-xl overflow-hidden ${!isVisible ? 'opacity-30' : ''}`} 
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
            <ContextMenuItem onSelect={() => setIsAlertOpen(true)}>Delete</ContextMenuItem>
          </ContextMenuContent>
        </ContextMenu>
      ) : (
        <div 
          key={work.id} 
          className={`relative h-fit cursor-pointer rounded-xl overflow-hidden ${!isVisible ? 'opacity-30' : ''}`} 
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
      )}
      <EditWorks open={isEditOpen} onOpenChange={setIsEditOpen} work={work} />
      <AlertDialog open={isAlertOpen} onOpenChange={setIsAlertOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure you want to delete this work?</AlertDialogTitle>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setIsAlertOpen(false)}>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={() => handleDelete(work)}>Delete</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default WorkItem;