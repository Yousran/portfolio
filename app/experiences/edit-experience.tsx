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

const EditExperience = ({ open, onOpenChange, experience }: { open: boolean; onOpenChange: (open: boolean) => void; experience: any }) => {
    const [date, setDate] = useState(experience.date);
    const [title, setTitle] = useState(experience.title);
    const [description, setDescription] = useState(experience.description);
    const [picture, setPicture] = useState('');
    const [link, setLink] = useState(experience.link);

    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const selectedFile = e.target.files[0];
            const formData = new FormData();
            formData.append('file', selectedFile);

            const uploadResponse = await fetch('/api/upload', {
                method: 'POST',
                body: formData,
            });

            if (uploadResponse.ok) {
                const fileData = await uploadResponse.json();
                setPicture(fileData.id);
            } else {
                console.error('Failed to upload file:', await uploadResponse.text());
            }
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const requestBody = { date, title, description, picture, link };

        const response = await fetch(`/api/experiences/update?id=${experience.id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(requestBody),
        });

        if (response.ok) {
            setDate('');
            setTitle('');
            setDescription('');
            setPicture('');
            setLink('');
            onOpenChange(false);
            window.location.reload();
        } else {
            console.error('Failed to update experience:', await response.text());
        }
    };

    return (
        <AlertDialog open={open} onOpenChange={onOpenChange}>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Edit Experience</AlertDialogTitle>
                    <AlertDialogDescription>
                        Please update the details for the experience.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <form onSubmit={handleSubmit}>
                    <div className="space-y-4">
                        <div>
                            <Label htmlFor="date">Date</Label>
                            <Input id="date" value={date} onChange={(e) => setDate(e.target.value)} required />
                        </div>
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
                            <Input id="file" type="file" onChange={handleFileChange} />
                        </div>
                        <div>
                            <Label htmlFor="link">Link</Label>
                            <Input id="link" value={link} onChange={(e) => setLink(e.target.value)} />
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

export default EditExperience;