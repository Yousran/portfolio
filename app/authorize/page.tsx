"use client";

import React, { useState } from 'react';
import Starfield from 'react-starfield';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Navbar from "@/components/ui/navbar";
import { Toaster } from '@/components/ui/sonner';
import { toast } from 'sonner';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [token, setToken] = useState(localStorage.getItem('token') || '');

  const handleLogin = async () => {
    try {
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      if (response.ok) {
        const data = await response.json();
        setToken(data.token);
        localStorage.setItem('token', data.token);
        toast.success('Login successful!');
        setUsername('');
        setPassword('');
      } else {
        const errorMessage = await response.json();
        toast.error(errorMessage.message);
      }
    } catch (error) {
      toast.error('Login failed. Please try again.');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setToken('');
    toast.success('Logout successful!');
  };

  return (
    <div className='h-screen w-screen flex justify-center items-center bg-primary-foreground relative'>
      <Starfield
        starCount={500}
        starColor={[255, 255, 255]}
        speedFactor={0.03}
      />
      <Navbar title='Login' />
      <div className='text-center flex flex-col'>
        <Input
          type='text'
          placeholder='Username'
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className='mb-4'
          disabled={!!token}
        />
        <Input
          type='password'
          placeholder='Password'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className='mb-4'
          disabled={!!token}
        />
        <div className='flex justify-between gap-4'>
          {token && (
            <Button 
              variant='destructive' 
              onClick={handleLogout}
              className='w-full'
            >
              Logout
            </Button>
          )}
            <Button 
              variant='default' 
              onClick={handleLogin}
              className='w-full'
              disabled={!!token}
            >
            Login
            </Button>
        </div>
      </div>
      <Toaster position="bottom-right" />
    </div>
  );
};

export default Login;