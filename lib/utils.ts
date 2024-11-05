// src/lib/utils.ts
export const downloadPoster = async (element: HTMLElement | null) => {
    if (!element) return;
  
    try {
      // Dynamically import html2canvas
      const html2canvas = (await import('html2canvas')).default;
      
      // Create canvas
      const canvas = await html2canvas(element, {
        scale: 2, // Higher quality
        logging: false,
        useCORS: true,
        backgroundColor: null
      });
  
      // Convert to image
      const image = canvas.toDataURL('image/png');
      
      // Create download link
      const link = document.createElement('a');
      link.href = image;
      link.download = `beatprint-${Date.now()}.png`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error('Error downloading poster:', error);
      throw new Error('Failed to download poster');
    }
  };
  
  export const sharePoster = async (imageBlob?: Blob) => {
    try {
      if (navigator.share) {
        const shareData: ShareData = {
          title: 'My Beatprint Stats',
          text: 'Check out my music taste!',
          url: window.location.href
        };
  
        if (imageBlob) {
          const file = new File([imageBlob], 'beatprint.png', { type: 'image/png' });
          shareData.files = [file];
        }
  
        await navigator.share(shareData);
      } else {
        // Fallback to copying link
        await navigator.clipboard.writeText(window.location.href);
        alert('Link copied to clipboard!');
      }
    } catch (error) {
      console.error('Error sharing:', error);
      throw new Error('Failed to share poster');
    }
  };