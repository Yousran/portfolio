"use client";

import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import 'boxicons/css/boxicons.min.css';
import {
    ContextMenu,
    ContextMenuContent,
    ContextMenuItem,
    ContextMenuTrigger,
} from "@/components/ui/context-menu";
import { format } from 'date-fns';
import EditTimelineItem from '@/components/ui/edit-timeline-item';
import { 
    AlertDialog, 
    AlertDialogDescription,
    AlertDialogContent, 
    AlertDialogHeader, 
    AlertDialogFooter, 
    AlertDialogCancel, 
    AlertDialogAction, 
    AlertDialogTitle
} from '@/components/ui/alert-dialog';
import { Toaster } from '@/components/ui/sonner';
import { toast } from 'sonner';


interface ItemProps {
    item: {
        id: string;
        date: string;
        title: string;
        description: string;
        File?: {
            path: string;
            tiny_path: string;
            original_name: string;
        };
        link?: string;
        show: boolean;
    };
    updateEndpoint: string;
    updateShowEndpoint: string;
    deleteEndpoint: string;
    showHidden: boolean;
    isLoggedIn: boolean;
}

const TimelineItem: React.FC<ItemProps> = ({ item, showHidden, isLoggedIn, updateEndpoint, updateShowEndpoint, deleteEndpoint }) => {
    const [isLoaded, setIsLoaded] = useState(false);
    const [isVisible, setIsVisible] = useState(item.show);
    const [isEditOpen, setIsEditOpen] = useState(false);
    const [isAlertOpen, setIsAlertOpen] = useState(false);

    const handleClick = () => {
        window.open(item.link, '_blank');
    };

    const handleEdit = (item: ItemProps['item']) => {
        setIsEditOpen(true);
    };

    const handleHideShow = async (item: ItemProps['item']) => {
        const newVisibility = !isVisible;
        const response = await fetch(`${updateShowEndpoint}?id=${item.id}`, {
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
            const error = await response.json();
            toast.error(error.error);
            // console.error('Failed to update show status:', await response.text());
        }
    };

    const handleDelete = async (item: ItemProps['item']) => {
        const response = await fetch(`${deleteEndpoint}?id=${item.id}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`,
            },
        });

        if (response.ok) {
            window.location.reload();
        } else {
            const error = await response.json();
            toast.error(error.error);
            // console.error('Failed to delete item:', await response.text());
        }
    };

    useEffect(() => {
        if (item.File) {
            const img = new Image();
            img.src = item.File.path;
            img.onload = () => setIsLoaded(true);
            img.onerror = () => setIsLoaded(false);
        } else {
            setIsLoaded(true);
        }
    }, [item.File]);

    if (!isVisible && !showHidden) return null;

    return (
        <>
            {isLoggedIn ? (
                <ContextMenu>
                    <li
                        className={`mb-10 ml-4 hover:bg-secondary rounded-lg p-1 ${!isVisible ? 'opacity-30' : ''}`}
                    >
                        <ContextMenuTrigger>
                            <div className="absolute w-3 h-3 rounded-full mt-8 -left-1.5 bg-primary"></div>
                            <div>
                                <div className='relative h-fit'>
                                    {item.File && (
                                        <>
                                            <img
                                                src={item.File.tiny_path}
                                                className={`w-full h-auto rounded-xl mb-4 ${isLoaded ? 'hidden' : 'blur-sm'} transition-opacity`}
                                                alt={item.File.original_name}
                                            />
                                            <img
                                                src={item.File.path}
                                                className={`w-full h-auto rounded-xl mb-4 ${isLoaded ? 'block' : 'hidden'}`}
                                                alt={item.File.original_name}
                                            />
                                        </>
                                    )}
                                    <div>
                                        {item.date && (
                                            <time className="mb-1 text-sm font-normal leading-none text-gray-600 dark:text-gray-400">{format(new Date(item.date), "dd-MMM-yyyy")}</time>
                                        )}
                                        <h3 className="text-lg font-semibold text-primary overflow-hidden text-ellipsis whitespace-nowrap">{item.title}</h3>
                                        <p className="mb-4 text-base font-normal text-gray-600 dark:text-gray-400 overflow-hidden text-ellipsis" style={{ display: '-webkit-box', WebkitLineClamp: 4, WebkitBoxOrient: 'vertical' }}>{item.description}</p>
                                        {item.link && (
                                            <Button variant="outline" onClick={handleClick}>
                                                Show Details
                                                <i className='bx bx-right-arrow-alt text-xl ml-2'></i>
                                            </Button>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </ContextMenuTrigger>
                    </li>
                    <ContextMenuContent>
                        <ContextMenuItem onSelect={() => handleEdit(item)}>Edit</ContextMenuItem>
                        <ContextMenuItem onSelect={() => handleHideShow(item)}>{isVisible ? 'Hide' : 'Show'}</ContextMenuItem>
                        <ContextMenuItem onSelect={() => setIsAlertOpen(true)}>Delete</ContextMenuItem>
                    </ContextMenuContent>
                </ContextMenu>
            ) : (
                <li
                    className={`mb-10 ml-4 ${!isVisible ? 'opacity-30' : ''}`}
                >
                    <div className="absolute w-3 h-3 rounded-full mt-8 -left-1.5 bg-primary"></div>
                    <div>
                        <div className='relative h-fit'>
                            {item.File && (
                                <>
                                    <img
                                        src={item.File.tiny_path}
                                        className={`w-full h-auto rounded-xl mb-4 ${isLoaded ? 'hidden' : 'blur-sm'} transition-opacity`}
                                        alt={item.File.original_name}
                                    />
                                    <img
                                        src={item.File.path}
                                        className={`w-full h-auto rounded-xl mb-4 ${isLoaded ? 'block' : 'hidden'}`}
                                        alt={item.File.original_name}
                                    />
                                </>
                            )}
                            <div>
                                {item.date && (
                                    <time className="mb-1 text-sm font-normal leading-none text-gray-600 dark:text-gray-400">{format(new Date(item.date), "dd-MMM-yyyy")}</time>
                                )}
                                
                                <h3 className="text-lg font-semibold text-primary overflow-hidden text-ellipsis whitespace-nowrap">{item.title}</h3>
                                <p className="mb-4 text-base font-normal text-gray-600 dark:text-gray-400 overflow-hidden text-ellipsis" style={{ display: '-webkit-box', WebkitLineClamp: 4, WebkitBoxOrient: 'vertical' }}>{item.description}</p>
                                {item.link && (
                                    <Button variant="outline" onClick={handleClick}>
                                        Show Details
                                        <i className='bx bx-right-arrow-alt text-xl ml-2'></i>
                                    </Button>
                                )}
                            </div>
                        </div>
                    </div>
                </li>
            )}
            <EditTimelineItem
                open={isEditOpen}
                onOpenChange={setIsEditOpen}
                item={item}
                endpoint={updateEndpoint}
                labels={{
                    date: "Experience Date",
                    title: "Experience Title",
                    description: "Experience Description",
                    image: "Experience Image",
                    link: "Experience Link"
                }}
            />
            <AlertDialog open={isAlertOpen} onOpenChange={setIsAlertOpen}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Are you sure you want to delete this item?</AlertDialogTitle>
                        <AlertDialogDescription>This action can't be undone</AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel onClick={() => setIsAlertOpen(false)}>Cancel</AlertDialogCancel>
                        <AlertDialogAction onClick={() => handleDelete(item)}>Delete</AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
            <Toaster position="bottom-right" />
        </>
    );
};

export default TimelineItem;