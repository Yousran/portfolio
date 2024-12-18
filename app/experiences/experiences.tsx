import React, { useEffect, useState } from 'react';
import ExperienceItem from '@/components/ui/experience-item';
import { ScrollArea } from '@/components/ui/scroll-area';

const Experience = ({ showHidden, isLoggedIn}:{ showHidden:boolean, isLoggedIn:boolean}) => {
    const [experiences, setExperiences] = useState<any[]>([]);

    const fetchExperiences = async () => {
        try {
            const response = await fetch('/api/experiences');
            const data = await response.json();
            setExperiences(data);
        } catch (error) {
            console.error('Failed to fetch experiences:', error);
        }
    };

    useEffect(() => {
        fetchExperiences();
    }, []);

    return (
        <ScrollArea className='h-screen w-screen p-8 pt-16'>
            <div className='h-full w-full flex justify-center'>
                <div className='ms-2 w-full sm:w-[50%]'>
                    <ol className="relative border-l border-primary">
                        {experiences.map((exp, index) => (
                            <ExperienceItem key={index} item={exp} showHidden={showHidden} isLoggedIn={isLoggedIn} />
                        ))}
                    </ol>
                </div>
            </div>
        </ScrollArea>
    );
};

export default Experience;
