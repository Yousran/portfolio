"use client";

import React, { useState } from 'react';
import Starfield from 'react-starfield';
import Works from './works';
import CreateWorks from './create-works';
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from "@/components/ui/context-menu"

const Page = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleOpenDialog = () => setIsDialogOpen(true);
  const handleCloseDialog = () => setIsDialogOpen(false);

  return (
    <ContextMenu>
      <ContextMenuTrigger>
        <div className="h-screen flex justify-center items-center bg-primary-foreground">
          <Starfield
            starCount={500}
            starColor={[255, 255, 255]}
            speedFactor={0.03}
          />
          <Works />
        </div>
      </ContextMenuTrigger>
      <ContextMenuContent>
        <ContextMenuItem onClick={handleOpenDialog}>Add Works</ContextMenuItem>
      </ContextMenuContent>
      <CreateWorks open={isDialogOpen} onOpenChange={setIsDialogOpen} />
    </ContextMenu>
  );
};

export default Page;