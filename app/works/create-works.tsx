import React, { useState } from 'react';
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"

const CreateWorks = ({ open, onOpenChange }: { open: boolean; onOpenChange: (open: boolean) => void }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [picture, setPicture] = useState('');
  const [link, setLink] = useState('');


  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      // console.log('Selected file:', selectedFile.name);
  
      const formData = new FormData();
      formData.append('file', selectedFile);
  
      // console.log('Uploading file:', selectedFile);
  
      const uploadResponse = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });
  
      if (uploadResponse.ok) {
        const fileData = await uploadResponse.json();
        // console.log('File uploaded successfully:', fileData);
        setPicture(fileData.id);
      } else {
        console.error('Failed to upload file:', await uploadResponse.text());
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const requestBody = { title, description, picture, link };
    // console.log('Submitting form with data:', requestBody);

    const response = await fetch('/api/works/store', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestBody),
    });

    if (response.ok) {
      // console.log('Form submitted successfully');
      setTitle('');
      setDescription('');
      setPicture('');
      setLink('');
      onOpenChange(false);
    } else {
      console.error('Failed to submit form:', await response.text());
    }
  };

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Add New Work</AlertDialogTitle>
          <AlertDialogDescription>
            Please fill in the details for the new work.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <Label htmlFor="title">Title</Label>
              <Input id="title" value={title} onChange={(e) => setTitle(e.target.value)} required />
            </div>
            <div>
              <Label htmlFor="description">Description</Label>
              <Textarea id="description" value={description} onChange={(e) => setDescription(e.target.value)} required />
            </div>
            <div>
              <Label htmlFor="file">Image</Label>
              <Input id="file" type="file" onChange={handleFileChange} required />
            </div>
            <div>
              <Label htmlFor="link">Link</Label>
              <Input id="link" value={link} onChange={(e) => setLink(e.target.value)} required />
            </div>
          </div>
          <AlertDialogFooter className='mt-4'>
            <AlertDialogCancel onClick={() => onOpenChange(false)}>Cancel</AlertDialogCancel>
            <Button type="submit">Submit</Button>
          </AlertDialogFooter>
        </form>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default CreateWorks;