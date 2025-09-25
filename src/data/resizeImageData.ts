export const resizeFaqData = [
  {
    question: 'Is the image resizer really free to use?',
    answer: 'Yes, our image resizer is completely free to use. You can resize as many images as you want without any cost or registration required.',
  },
  {
    question: 'What image formats are supported for resizing?',
    answer: 'We support all major image formats including JPG, PNG, and GIF. The maximum file size is 40MB per image.',
  },
  {
    question: 'Will resizing reduce the quality of my image?',
    answer:
      'Our resizer uses advanced algorithms to maintain the best possible quality. When making images smaller, quality is preserved. When enlarging, we use interpolation techniques to minimize quality loss.',
  },
  {
    question: 'Can I maintain the aspect ratio while resizing?',
    answer: 'Yes! You can check the "Maintain aspect ratio" option, and when you change either width or height, the other dimension will automatically adjust to keep the original proportions.',
  },
  {
    question: 'What are the maximum dimensions I can resize to?',
    answer: 'You can resize images up to 5000×5000 pixels. For larger dimensions, consider using professional image editing software.',
  },
  {
    question: 'Can I use preset sizes for common dimensions?',
    answer: 'Absolutely! We provide common preset sizes like 1920×1080 (Full HD), 1280×720 (HD), 800×600, and more. You can also restore the original dimensions with one click.',
  },
  {
    question: 'How do I download my resized image?',
    answer: 'After resizing your image, click the green "Download" button. Your resized image will be saved as a high-quality JPEG file to your device.',
  },
  {
    question: 'Can I resize multiple images at once?',
    answer: 'Currently, you can resize one image at a time. However, the process is very quick and you can easily resize multiple images by uploading them one by one.',
  },
  {
    question: 'What happens if I resize an image to be larger than the original?',
    answer:
      'When enlarging images, we use advanced interpolation algorithms to add pixels intelligently. While some quality loss is inevitable when making images larger, our tool minimizes this effect.',
  },
  {
    question: 'Can I use this tool on mobile devices?',
    answer: 'Yes! Our image resizer is fully responsive and works perfectly on mobile devices, tablets, and desktops. The interface adapts to your screen size for the best experience.',
  },
];

export const resizeValueItems = [
  {
    iconName: 'MoneyOff',
    title: 'Free image resizing',
    description: 'Save time, money, and peace of mind with CropsImage free image resizer.',
  },
  {
    iconName: 'HighQuality',
    title: 'Quality preservation',
    description: 'Resize images while maintaining the best possible quality using advanced algorithms.',
  },
  {
    iconName: 'AutoFixHigh',
    title: 'Smart resizing',
    description: 'Easily resize photos online with intelligent aspect ratio maintenance and preset sizes.',
  },
];

export const resizeHowToData = {
  title: 'How to Use the Image Resizer',
  subtitle: 'Follow these simple steps to resize your images professionally in just a few clicks',
  videoSrc: '',
  videoPoster: '',
  proTip: 'For best results, use high-resolution images and experiment with different sizes to find the perfect dimensions for your needs.',
  steps: [
    {
      iconName: 'CloudUpload',
      title: 'Open image resizer',
      description: 'Use the button below to go to CropsImage',
      details: ['Click on the upload area', 'Drag and drop your image', 'Select from your device'],
    },
    {
      iconName: 'PhotoSizeSelectLarge',
      title: 'Upload a photo',
      description: 'Upload a photo or several photos you want to resize.',
      details: ['Supports JPG, PNG, and GIF formats', 'Maximum file size: 40MB', 'Works with photos, graphics, and screenshots'],
    },
    {
      iconName: 'Tune',
      title: 'Pick a size',
      description: 'Select Resize from the left sidebar and set a custom size.',
      details: ['Enter custom width and height', 'Choose from preset sizes', 'Maintain aspect ratio option'],
    },
    {
      iconName: 'AspectRatio',
      title: 'Resize image',
      description: 'Adjust the image to the new size by dragging its corners. Click the apply button. Then, use the Apply button to save.',
      details: ['Real-time preview of changes', 'Maintain quality during resize', 'Apply button to confirm changes'],
    },
    {
      iconName: 'CropFree',
      title: 'Change canvas size',
      description: 'Click on an empty space in the editor to deselect your photo, and use the Canvas Crop button on top to edit canvas size.',
      details: ['Adjust canvas dimensions', 'Crop to specific aspect ratios', 'Fine-tune the final output'],
    },
    {
      iconName: 'Download',
      title: 'Save',
      description: 'Use the Download button on the top right corner to download your resized image.',
      details: ['High-quality output', 'Instant download', 'Ready to use immediately'],
    },
  ],
};
