import 'boxicons/css/boxicons.min.css';

export default function Home() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <i className='bx bxl-github bx-lg'></i>
        <i className='bx bxl-linkedin bx-lg'></i>
        <i className='bx bxl-twitter bx-lg'></i>
      </main>
      <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center">
        <i className='bx bxs-heart bx-lg'></i>
        <i className='bx bxs-star bx-lg'></i>
      </footer>
    </div>
  );
}