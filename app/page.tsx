import ProfileSection from '@/components/ui/profile-section';
import ProfileContact from '@/components/ui/profile-contact';
import Starfield from 'react-starfield';
import { ModeToggle } from '@/components/ui/theme-toggle';

export default function Home() {
  return (
    <div className='h-screen w-screen flex justify-center items-center bg-primary-foreground relative'>
      <Starfield
        starCount={500}
        starColor={[255, 255, 255]}
        speedFactor={0.03}
      />
      <div className='absolute top-4 right-4 z-50'>
        <ModeToggle />
      </div>
      <div className='text-center flex flex-col'>
        <ProfileSection />
        <ProfileContact />
      </div>
    </div>
  );
}

//TODO: experience section
//TODO: change date datatype of education and experience
//TODO: timeline component
//TODO: education section
//TODO: delete work
//TODO: delete experience, dan education
//TODO: urutan work item di masonry grid