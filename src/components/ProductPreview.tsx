import React from 'react';
import { PlatformOverview } from './PlatformOverview';

interface ProductPreviewProps {
  onInquireClick: () => void;
}

export const ProductPreview: React.FC<ProductPreviewProps> = ({ onInquireClick }) => {
  return <PlatformOverview onJoinClick={onInquireClick} />;
};
