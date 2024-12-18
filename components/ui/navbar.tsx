"use client";
import { ModeToggle } from '@/components/ui/theme-toggle';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipProvider } from '@/components/ui/tooltip';
import 'boxicons/css/boxicons.min.css';
import { TooltipTrigger } from '@radix-ui/react-tooltip';
import { motion } from 'framer-motion';
import React from 'react';

interface NavbarProps {
  title?: string;
}

export default function Navbar({ title }: NavbarProps) {
  const router = useRouter();

  return (
    <nav className="absolute top-0 z-50 w-full p-4 bg-transparent flex justify-between items-center">
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <motion.div whileHover={{ scale: 1.2 }} transition={{ duration: 0.2, ease: "easeInOut" }}>
              <Button
                variant="ghost"
                className="opacity-50 hover:opacity-100"
                onClick={() => router.back()}
                size={'icon'}
              >
                <i className='bx bx-arrow-back text-3xl'></i>
              </Button>
            </motion.div>
          </TooltipTrigger>
          <TooltipContent>
            Back
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
      {title && <h1 className='text-3xl text-primary'>{title}</h1>}
      <motion.div whileHover={{ scale: 1.2 }} transition={{ duration: 0.2, ease: "easeInOut" }} className="opacity-50 hover:opacity-100">
        <ModeToggle />
      </motion.div>
    </nav>
  );
}