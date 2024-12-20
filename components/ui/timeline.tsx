import React, { useEffect, useState, useCallback } from 'react';
import TimelineItem from '@/components/ui/timeline-item';
import { ScrollArea } from '@/components/ui/scroll-area';

interface TimelineProps {
    showHidden: boolean;
    isLoggedIn: boolean;
    fetchItemsEndpoint: string;
    updateEndpoint: string;
    updateShowEndpoint: string;
    deleteEndpoint: string;
}

const Timeline = ({ showHidden, isLoggedIn, fetchItemsEndpoint, updateEndpoint, updateShowEndpoint, deleteEndpoint }: TimelineProps) => {
    const [items, setItems] = useState<any[]>([]);

    const fetchItems = useCallback(async () => {
        try {
            const response = await fetch(fetchItemsEndpoint);
            const data = await response.json();
            setItems(Array.isArray(data) ? data : []);
        } catch (error) {
            console.error('Failed to fetch:', error);
        }
    }, [fetchItemsEndpoint]);

    useEffect(() => {
        fetchItems();
    }, [fetchItems]);

    return (
        <ScrollArea className='h-screen w-screen p-8 pt-16'>
            <div className='h-full w-full flex justify-center'>
                <div className='ms-2 w-full sm:w-[50%]'>
                    <ol className="relative border-l border-primary">
                        {items.map((item, index) => (
                            <TimelineItem 
                                key={index} 
                                item={item} 
                                showHidden={showHidden} 
                                isLoggedIn={isLoggedIn}
                                deleteEndpoint={deleteEndpoint}
                                updateEndpoint={updateEndpoint}
                                updateShowEndpoint={updateShowEndpoint} 
                            />
                        ))}
                    </ol>
                </div>
            </div>
        </ScrollArea>
    );
};

export default Timeline;