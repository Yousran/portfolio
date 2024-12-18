"use client";
import React, { useState, useEffect } from 'react';
import Timeline from '@/components/ui/timeline';
import { ContextMenu, ContextMenuContent, ContextMenuItem, ContextMenuTrigger } from '@/components/ui/context-menu';
import Starfield from 'react-starfield';
import Navbar from '@/components/ui/navbar';
import CreateExperience from './create-experience';

const Page = () => {
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [showHidden, setShowHidden] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            fetch('/api/verify', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ token }),
            })
            .then(response => response.json())
            .then(data => {
                if (data.valid) {
                    setIsLoggedIn(true);
                    console.log('logged in');
                } else {
                    setIsLoggedIn(false);
                    console.log('not logged in');
                }
            })
            .catch(() => setIsLoggedIn(false));
        }
    }, []);

    const handleOpenDialog = () => setIsDialogOpen(true);

    const toggleShowHidden = () => setShowHidden(!showHidden);

    return (
        <ContextMenu>
            <ContextMenuTrigger>
                <div className="h-screen w-screen flex justify-center items-center bg-primary-foreground">
                    <Starfield
                        starCount={500}
                        starColor={[255, 255, 255]}
                        speedFactor={0.03}
                    />
                    <Navbar title='Experiences' />
                    <Timeline
                        showHidden={showHidden}
                        isLoggedIn={isLoggedIn}
                        fetchItemsEndpoint="/api/experiences"
                        updateEndpoint="/api/experiences/update"
                        updateShowEndpoint="/api/experiences/update-show"
                    />
                </div>
            </ContextMenuTrigger>
            {isLoggedIn && (
                <ContextMenuContent>
                    <ContextMenuItem onClick={handleOpenDialog}>Add Experience</ContextMenuItem>
                    <ContextMenuItem onClick={toggleShowHidden}>{showHidden ? 'Hide Hidden' : 'Show Hidden'}</ContextMenuItem>
                </ContextMenuContent>
            )}
            <CreateExperience open={isDialogOpen} onOpenChange={setIsDialogOpen} />
        </ContextMenu>
    );
};

export default Page;