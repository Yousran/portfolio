"use client";

import React, { useState, useEffect } from 'react';
import Starfield from 'react-starfield';
import Works from './works';
import CreateWorks from './create-works';
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from "@/components/ui/context-menu";
import Navbar from "@/components/ui/navbar";

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
        } else {
          setIsLoggedIn(false);
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
          <Navbar title='Works' />
          <Works showHidden={showHidden} isLoggedIn={isLoggedIn} />
        </div>
      </ContextMenuTrigger>
      {isLoggedIn && (
        <ContextMenuContent>
          <ContextMenuItem onClick={handleOpenDialog}>Add Works</ContextMenuItem>
          <ContextMenuItem onClick={toggleShowHidden}>{showHidden ? 'Hide Hidden' : 'Show Hidden'}</ContextMenuItem>
        </ContextMenuContent>
      )}
      <CreateWorks open={isDialogOpen} onOpenChange={setIsDialogOpen} />
    </ContextMenu>
  );
};

export default Page;