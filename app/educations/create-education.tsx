import React, { useState } from 'react';
import { format } from 'date-fns';
import { Calendar } from '@/components/ui/calendar';
import { 
    Popover,
    PopoverContent,
    PopoverTrigger,
} from '@/components/ui/popover';
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
import 'boxicons/css/boxicons.min.css'

const CreateEducation = ({ open, onOpenChange }: { open: boolean; onOpenChange: (open: boolean) => void }) => {
    const [date, setDate] = useState<Date | null>(null);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [picture, setPicture] = useState('');
    const [link, setLink] = useState('');
    const [popoverOpen, setPopoverOpen] = useState(false);

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

        const formattedDate = date ? format(date, "yyyy-MM-dd'T'HH:mm:ss.SSSxxx") : null;
        const requestBody: any = { date: formattedDate, title, description };

        if (picture) {
            requestBody.picture = picture;
        }

        if (link) {
            requestBody.link = link;
        }
        const response = await fetch('/api/educations/store', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`,
            },
            body: JSON.stringify(requestBody),
        });

        if (response.ok) {
            setDate(null);
            setTitle('');
            setDescription('');
            setPicture('');
            setLink('');
            onOpenChange(false);
            window.location.reload();
        } else {
            console.error('Failed to submit form:', await response.text());
        }
    };

    const handleDateSelect = (day: Date) => {
        setDate(day);
        setPopoverOpen(false);
    };

    return (
        <AlertDialog open={open} onOpenChange={onOpenChange}>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Add New Education</AlertDialogTitle>
                    <AlertDialogDescription>
                        Please fill in the details for the new education.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <form onSubmit={handleSubmit}>
                    <div className="space-y-4">
                        <div>
                            <Label htmlFor="date">Date</Label>
                            <Popover open={popoverOpen} onOpenChange={setPopoverOpen} modal>
                                <PopoverTrigger asChild>
                                    <Button
                                        variant={"outline"}
                                        className={`w-full justify-start text-left font-normal ${!date ? "text-muted-foreground" : ""}`}
                                    >
                                        <i className='bx bx-calendar mr-2 h-4 w-4'></i>
                                        {date ? format(date, "dd-MMM-yyyy") : <span>Pick a date</span>}
                                    </Button>
                                </PopoverTrigger>
                                <PopoverContent className="w-auto p-0 z-50">
                                    <Calendar
                                        mode="single"
                                        selected={date || undefined}
                                        onSelect={(day) => day && handleDateSelect(day)}
                                        initialFocus
                                    />
                                </PopoverContent>
                            </Popover>
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

export default CreateEducation;