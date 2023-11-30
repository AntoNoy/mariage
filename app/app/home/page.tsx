"use client"
export default function HomePage({children}: {children: React.ReactNode}) {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      appli
      {children}
    </div>
  );
}
