// Image lazy loading
export const lazyLoadImages = () => {
  const images = document.querySelectorAll('img[data-src]');
  
  const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.src = img.dataset.src;
        img.removeAttribute('data-src');
        observer.unobserve(img);
      }
    });
  });

  images.forEach(img => imageObserver.observe(img));
};

// Component lazy loading
export const lazyLoadComponent = (component) => {
  return React.lazy(() => import(`../components/${component}`));
};

// Performance monitoring
export const measurePerformance = () => {
  if ('performance' in window) {
    window.addEventListener('load', () => {
      const paint = performance.getEntriesByType('paint');
      const navigation = performance.getEntriesByType('navigation')[0];
      
      console.log('First Paint:', paint[0].startTime);
      console.log('First Contentful Paint:', paint[1].startTime);
      console.log('DOM Complete:', navigation.domComplete);
      console.log('Load Event:', navigation.loadEventEnd);
    });
  }
};

// Resource hints
export const addResourceHints = () => {
  const hints = [
    {
      rel: 'preconnect',
      href: 'https://fonts.googleapis.com'
    },
    {
      rel: 'preconnect',
      href: 'https://fonts.gstatic.com',
      crossorigin: true
    },
    {
      rel: 'preload',
      href: '/assets/images/hero-image.png',
      as: 'image'
    }
  ];

  hints.forEach(hint => {
    const link = document.createElement('link');
    Object.entries(hint).forEach(([key, value]) => {
      link[key] = value;
    });
    document.head.appendChild(link);
  });
};

// Image optimization
export const optimizeImage = (url, { width, height, quality = 75 }) => {
  // This is a placeholder for actual image optimization service
  // Replace with your actual image optimization service URL
  return \`https://imagecdn.example.com/optimize?url=\${encodeURIComponent(url)}&w=\${width}&h=\${height}&q=\${quality}\`;
};