

import Navbar from './Navbar';

export default function Layout({ children }) {
  return (
    <>
      <Navbar />
      <main className="max-w-3xl mx-auto p-4">
        {children}
      </main>
    </>
  );
}
