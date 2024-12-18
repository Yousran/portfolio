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
import EditExperience from '@/app/experiences/edit-experience';

interface ExperienceItemProps {
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
    showHidden: boolean;
    isLoggedIn: boolean;
}

const ExperienceItem: React.FC<ExperienceItemProps> = ({ item, showHidden, isLoggedIn }) => {
    const [isLoaded, setIsLoaded] = useState(false);
    const [isVisible, setIsVisible] = useState(item.show);
    const [isEditOpen, setIsEditOpen] = useState(false);

    const handleClick = () => {
        window.open(item.link, '_blank');
    };

    const handleEdit = (item: ExperienceItemProps['item']) => {
        setIsEditOpen(true);
    };

    const handleHideShow = async (item: ExperienceItemProps['item']) => {
        const newVisibility = !isVisible;
        const response = await fetch(`/api/experiences/update-show?id=${item.id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ show: newVisibility }),
        });

        if (response.ok) {
            setIsVisible(newVisibility);
        } else {
            console.error('Failed to update show status:', await response.text());
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
                                        <time className="mb-1 text-sm font-normal leading-none text-gray-600 dark:text-gray-400">{format(item.date, "dd-MMM-yyyy")}</time>
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
                                <time className="mb-1 text-sm font-normal leading-none text-gray-600 dark:text-gray-400">{format(item.date, "dd-MMM-yyyy")}</time>
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
            <EditExperience open={isEditOpen} onOpenChange={setIsEditOpen} experience={item} />
        </>
    );
};

export default ExperienceItem;