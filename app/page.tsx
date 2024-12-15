import ProfileSection from '@/components/ui/profile-section';
import ProfileContact from '@/components/ui/profile-contact';
import Starfield from 'react-starfield';

export default function Home() {
  return (
    
    <div className='h-screen w-screen flex justify-center items-center bg-primary-foreground'>
      <Starfield
        starCount={500}
        starColor={[255, 255, 255]}
        speedFactor={0.03}
      />
      <div className='text-center flex flex-col'>
        <ProfileSection />
        <ProfileContact />
      </div>
    </div>
  );
}