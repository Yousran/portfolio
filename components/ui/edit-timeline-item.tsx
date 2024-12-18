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

interface EditTimelineItemProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    item: any;
    endpoint: string;
    labels: {
        date: string;
        title: string;
        description: string;
        image: string;
        link: string;
    };
}

const EditTimelineItem = ({ open, onOpenChange, item, endpoint, labels }: EditTimelineItemProps) => {
    const [date, setDate] = useState(item.date);
    const [title, setTitle] = useState(item.title);
    const [description, setDescription] = useState(item.description);
    const [picture, setPicture] = useState('');
    const [link, setLink] = useState(item.link);

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

        const response = await fetch(`${endpoint}?id=${item.id}`, {
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
            console.error('Failed to update item:', await response.text());
        }
    };

    return (
        <AlertDialog open={open} onOpenChange={onOpenChange}>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Edit Item</AlertDialogTitle>
                    <AlertDialogDescription>
                        Please update the details for the item.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <form onSubmit={handleSubmit}>
                    <div className="space-y-4">
                        <div>
                            <Label htmlFor="date">{labels.date}</Label>
                            <Input id="date" value={date} onChange={(e) => setDate(e.target.value)} required />
                        </div>
                        <div>
                            <Label htmlFor="title">{labels.title}</Label>
                            <Input id="title" value={title} onChange={(e) => setTitle(e.target.value)} required />
                        </div>
                        <div>
                            <Label htmlFor="description">{labels.description}</Label>
                            <Textarea id="description" value={description} onChange={(e) => setDescription(e.target.value)} required />
                        </div>
                        <div>
                            <Label htmlFor="file">{labels.image}</Label>
                            <Input id="file" type="file" onChange={handleFileChange} />
                        </div>
                        <div>
                            <Label htmlFor="link">{labels.link}</Label>
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

export default EditTimelineItem;