import React from 'react';
import DigitalProductPage from '../components/DigitalProductPage';
import { productPagePrimitivesPreviewPage } from '../content/digitalProducts';

const DigitalProductTemplatePreviewPage: React.FC = () => (
  <DigitalProductPage product={productPagePrimitivesPreviewPage} />
);

export default DigitalProductTemplatePreviewPage;
