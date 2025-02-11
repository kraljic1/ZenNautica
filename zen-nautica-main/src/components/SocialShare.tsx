import React from 'react';
import { Facebook, Twitter, Linkedin, Link2, Instagram } from 'lucide-react';

interface SocialShareProps {
  url: string;
  title: string;
  description: string;
  className?: string;
}

const SocialShare: React.FC<SocialShareProps> = ({ url, title, description, className = '' }) => {
  const encodedUrl = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);
  const encodedDescription = encodeURIComponent(description);

  // Add UTM parameters for better analytics tracking
  const getUrlWithUtm = (source: string) => {
    return `${url}?utm_source=${source}&utm_medium=social&utm_campaign=share`;
  };

  const shareLinks = {
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(getUrlWithUtm('facebook'))}`,
    twitter: `https://twitter.com/intent/tweet?url=${encodeURIComponent(getUrlWithUtm('twitter'))}&text=${encodedTitle}`,
    linkedin: `https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(getUrlWithUtm('linkedin'))}&title=${encodedTitle}&summary=${encodedDescription}`,
    instagram: 'https://www.instagram.com/zennauticamalinska/',
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(url);
      // Use a more accessible notification method
      const notification = document.createElement('div');
      notification.setAttribute('role', 'alert');
      notification.className = 'fixed bottom-4 right-4 bg-green-600 text-white px-6 py-3 rounded-lg shadow-lg';
      notification.textContent = 'Link copied to clipboard!';
      document.body.appendChild(notification);
      setTimeout(() => notification.remove(), 3000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  return (
    <div className={`flex items-center space-x-4 ${className}`} role="group" aria-label="Share this page">
      <span className="text-gray-600 dark:text-gray-300 text-sm font-medium">Share:</span>
      <div className="flex space-x-2">
        <a
          href={shareLinks.facebook}
          target="_blank"
          rel="noopener noreferrer"
          className="p-2 rounded-full bg-[#1877F2] text-white hover:bg-[#0d6efd] transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#1877F2]"
          aria-label="Share on Facebook"
          onClick={() => {
            // Track social share event
            if (typeof window !== 'undefined' && 'gtag' in window) {
              (window as any).gtag('event', 'share', {
                method: 'Facebook',
                content_type: 'page',
                item_id: url,
              });
            }
          }}
        >
          <Facebook size={18} aria-hidden="true" />
        </a>
        <a
          href={shareLinks.instagram}
          target="_blank"
          rel="noopener noreferrer"
          className="p-2 rounded-full bg-gradient-to-br from-[#833AB4] via-[#FD1D1D] to-[#F77737] text-white hover:opacity-90 transition-opacity focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#FD1D1D]"
          aria-label="Follow us on Instagram"
          onClick={() => {
            if (typeof window !== 'undefined' && 'gtag' in window) {
              (window as any).gtag('event', 'social_follow', {
                method: 'Instagram',
                content_type: 'profile',
                item_id: shareLinks.instagram,
              });
            }
          }}
        >
          <Instagram size={18} aria-hidden="true" />
        </a>
        <a
          href={shareLinks.twitter}
          target="_blank"
          rel="noopener noreferrer"
          className="p-2 rounded-full bg-[#1DA1F2] text-white hover:bg-[#0c85d0] transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#1DA1F2]"
          aria-label="Share on Twitter"
          onClick={() => {
            if (typeof window !== 'undefined' && 'gtag' in window) {
              (window as any).gtag('event', 'share', {
                method: 'Twitter',
                content_type: 'page',
                item_id: url,
              });
            }
          }}
        >
          <Twitter size={18} aria-hidden="true" />
        </a>
        <a
          href={shareLinks.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          className="p-2 rounded-full bg-[#0A66C2] text-white hover:bg-[#084482] transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#0A66C2]"
          aria-label="Share on LinkedIn"
          onClick={() => {
            if (typeof window !== 'undefined' && 'gtag' in window) {
              (window as any).gtag('event', 'share', {
                method: 'LinkedIn',
                content_type: 'page',
                item_id: url,
              });
            }
          }}
        >
          <Linkedin size={18} aria-hidden="true" />
        </a>
        <button
          onClick={copyToClipboard}
          className="p-2 rounded-full bg-gray-600 text-white hover:bg-gray-700 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-600"
          aria-label="Copy link to clipboard"
        >
          <Link2 size={18} aria-hidden="true" />
        </button>
      </div>
    </div>
  );
};

export default SocialShare;