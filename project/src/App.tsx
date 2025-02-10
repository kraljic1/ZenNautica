import React, { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Features from './sections/Features';
import Wave from './components/Wave';
import GoogleAnalytics from './components/GoogleAnalytics';

// Lazy load non-critical sections
const Fleet = lazy(() => import('./sections/Fleet'));
const VideoSection = lazy(() => import('./sections/VideoSection'));
const Destinations = lazy(() => import('./sections/Destinations'));
const FAQ = lazy(() => import('./sections/FAQ'));
const MapSection = lazy(() => import('./components/MapSection'));
const Footer = lazy(() => import('./sections/Footer'));
const InquiryPage = lazy(() => import('./components/InquiryPage'));
const NotFound = lazy(() => import('./components/NotFound'));

// Loading fallback component
const LoadingFallback = () => (
  <div className="min-h-[200px] flex items-center justify-center">
    <div className="animate-pulse text-gray-400">Loading...</div>
  </div>
);

function App() {
  return (
    <Router>
      <GoogleAnalytics />
      <Routes>
        <Route path="/inquiry" element={
          <Suspense fallback={<LoadingFallback />}>
            <InquiryPage />
          </Suspense>
        } />
        <Route path="/" element={
          <div className="min-h-screen bg-white">
            <Navbar />
            <Hero />
            <Wave color="white" />
            <Features />
            <Wave color="#f3f4f6" />
            <Suspense fallback={<LoadingFallback />}>
              <Fleet />
            </Suspense>
            <Wave inverted color="#f9fafb" />
            <Suspense fallback={<LoadingFallback />}>
              <VideoSection />
            </Suspense>
            <Wave color="white" />
            <Suspense fallback={<LoadingFallback />}>
              <Destinations />
            </Suspense>
            <Wave inverted color="#f3f4f6" />
            <Suspense fallback={<LoadingFallback />}>
              <FAQ />
            </Suspense>
            <Wave inverted color="#111827" />
            <Suspense fallback={<LoadingFallback />}>
              <MapSection />
            </Suspense>
            <Wave inverted color="#111827" />
            <Suspense fallback={<LoadingFallback />}>
              <Footer />
            </Suspense>
          </div>
        } />
        <Route path="*" element={
          <Suspense fallback={<LoadingFallback />}>
            <NotFound />
          </Suspense>
        } />
      </Routes>
    </Router>
  );
}

export default App;