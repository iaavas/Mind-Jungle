import '@styles/globals.css';
import React from 'react';
import Nav from '@components/Nav';

import Provider from '@components/Provider';

export const metadata = {
  title: 'Mind Jungle',
  description:
    'Roam freely and share the wildest of your ideas in our vibrant community',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en'>
      <body>
        {/* @ts-ignore */}
        <Provider>
          <div className='main'>
            <div className='gradient'></div>
          </div>
          <main className='app'>
            <Nav />
            {children}
          </main>
        </Provider>
      </body>
    </html>
  );
}
