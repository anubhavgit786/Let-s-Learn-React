import React from 'react';
import ReactDOM from 'react-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { Toaster } from 'react-hot-toast';
import App from './App';

const queryClient = new QueryClient({
  defaultOptions: { queries: { staleTime: 0 } } 
});

const root = ReactDOM.createRoot(document.getElementById('root'));

const toastStyle = { fontSize : "16px", maxWidth: "500px", padding: "16px 24px", backgroundColor: "var(--color-grey-0)", color: "var(--color-grey-700)" }

const toastOptions = { success : { duration : 3000 }, error: { duration : 6000 }, style:toastStyle };

root.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <Toaster position="top-center" reverseOrder={true} gutter={12} containerStyle={{ margin: "8px"}} toastOptions={toastOptions} />
      <ReactQueryDevtools initialIsOpen={false} />
      <App />
    </QueryClientProvider>
  </React.StrictMode>
);

