import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import OverlayCopy from '../pages/components/OverlayOpacity';

// Mock framer-motion to avoid animation issues in tests
jest.mock('framer-motion', () => ({
  motion: {
    div: ({ children, style, className, ...props }) => (
      <div className={className} style={style} {...props}>
        {children}
      </div>
    ),
  },
  useScroll: () => ({
    scrollYProgress: { get: () => 0.5 }
  }),
  useTransform: (value, input, output) => ({ get: () => output[1] }),
}));

// Mock ButtonLightningAnimation component
jest.mock('../pages/components/ButtonLightningAnimation', () => {
  return function MockButtonLightningAnimation({ text, activateMenuIsActive }) {
    return (
      <button data-testid="lightning-button" onClick={activateMenuIsActive}>
        {text}
      </button>
    );
  };
});

describe('OverlayCopy Component', () => {
  const defaultProps = {
    subheading: 'Test Subheading',
    heading: 'Test Heading',
    isCtaButton: false,
    isHeader: false,
    data: {
      ctaText: {
        en: 'Click Here',
        th: 'คลิกที่นี่'
      }
    },
    lang: 'en',
    activateMenuIsActive: jest.fn(),
    title: 'Test Title',
    media: 'desktop'
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('Basic Rendering', () => {
    it('renders without crashing', () => {
      render(<OverlayCopy {...defaultProps} />);
      expect(screen.getByText('Test Heading')).toBeInTheDocument();
      expect(screen.getByText('Test Subheading')).toBeInTheDocument();
    });

    it('renders heading when isHeader is false', () => {
      render(<OverlayCopy {...defaultProps} />);
      expect(screen.getByText('Test Heading')).toBeInTheDocument();
      expect(screen.queryByText('Test Title')).not.toBeInTheDocument();
    });

    it('renders title when isHeader is true', () => {
      const props = { ...defaultProps, isHeader: true };
      render(<OverlayCopy {...props} />);
      expect(screen.getByText('Test Title')).toBeInTheDocument();
      expect(screen.queryByText('Test Heading')).not.toBeInTheDocument();
    });

    it('renders subheading correctly', () => {
      render(<OverlayCopy {...defaultProps} />);
      expect(screen.getByText('Test Subheading')).toBeInTheDocument();
    });
  });

  describe('CTA Button Functionality', () => {
    it('renders ButtonLightningAnimation when isCtaButton is true', () => {
      const props = { ...defaultProps, isCtaButton: true };
      render(<OverlayCopy {...props} />);
      expect(screen.getByTestId('lightning-button')).toBeInTheDocument();
      expect(screen.getByText('Click Here')).toBeInTheDocument();
    });

    it('does not render ButtonLightningAnimation when isCtaButton is false', () => {
      render(<OverlayCopy {...defaultProps} />);
      expect(screen.queryByTestId('lightning-button')).not.toBeInTheDocument();
    });

    it('passes correct text based on language', () => {
      const props = { ...defaultProps, isCtaButton: true, lang: 'th' };
      render(<OverlayCopy {...props} />);
      expect(screen.getByText('คลิกที่นี่')).toBeInTheDocument();
    });

    it('passes activateMenuIsActive function to ButtonLightningAnimation', () => {
      const mockActivateMenu = jest.fn();
      const props = { 
        ...defaultProps, 
        isCtaButton: true, 
        activateMenuIsActive: mockActivateMenu 
      };
      render(<OverlayCopy {...props} />);
      
      const button = screen.getByTestId('lightning-button');
      button.click();
      expect(mockActivateMenu).toHaveBeenCalledTimes(1);
    });
  });

  describe('CSS Classes and Styling', () => {
    it('applies correct base classes', () => {
      const { container } = render(<OverlayCopy {...defaultProps} />);
      const mainDiv = container.firstChild;
      
      expect(mainDiv).toHaveClass('hero-content', 'absolute', 'left-0', 'top-0', 'flex');
    });

    it('applies pt-32 class when isCtaButton is true', () => {
      const props = { ...defaultProps, isCtaButton: true };
      const { container } = render(<OverlayCopy {...props} />);
      const mainDiv = container.firstChild;
      
      expect(mainDiv).toHaveClass('pt-32');
    });

    it('does not apply pt-32 class when isCtaButton is false', () => {
      const { container } = render(<OverlayCopy {...defaultProps} />);
      const mainDiv = container.firstChild;
      
      expect(mainDiv).not.toHaveClass('pt-32');
    });

    it('applies h-screen class when isCtaButton is true', () => {
      const props = { ...defaultProps, isCtaButton: true };
      const { container } = render(<OverlayCopy {...props} />);
      const mainDiv = container.firstChild;
      
      expect(mainDiv).toHaveClass('h-screen');
    });

    it('applies h-[45%] class when isCtaButton is false', () => {
      const { container } = render(<OverlayCopy {...defaultProps} />);
      const mainDiv = container.firstChild;
      
      expect(mainDiv).toHaveClass('h-[45%]');
    });

    it('applies justify-center class when isCtaButton is true', () => {
      const props = { ...defaultProps, isCtaButton: true };
      const { container } = render(<OverlayCopy {...props} />);
      const mainDiv = container.firstChild;
      
      expect(mainDiv).toHaveClass('justify-center');
    });

    it('applies justify-end class when isCtaButton is false', () => {
      const { container } = render(<OverlayCopy {...defaultProps} />);
      const mainDiv = container.firstChild;
      
      expect(mainDiv).toHaveClass('justify-end');
    });
  });

  describe('Media Prop Handling', () => {
    it('handles desktop media prop', () => {
      const props = { ...defaultProps, media: 'desktop' };
      render(<OverlayCopy {...props} />);
      // Component should render without errors
      expect(screen.getByText('Test Heading')).toBeInTheDocument();
    });

    it('handles mobile media prop', () => {
      const props = { ...defaultProps, media: 'mobile' };
      render(<OverlayCopy {...props} />);
      // Component should render without errors
      expect(screen.getByText('Test Heading')).toBeInTheDocument();
    });
  });

  describe('Header vs Regular Content', () => {
    it('renders h3 element when isHeader is true', () => {
      const props = { ...defaultProps, isHeader: true };
      render(<OverlayCopy {...props} />);
      
      const headerElement = screen.getByRole('heading', { level: 3 });
      expect(headerElement).toBeInTheDocument();
      expect(headerElement).toHaveTextContent('Test Title');
      expect(headerElement).toHaveClass('mt-[-3rem]');
    });

    it('renders div with hover-map class when isHeader is false', () => {
      render(<OverlayCopy {...defaultProps} />);
      
      const hoverMapDiv = screen.getByText('Test Heading').closest('div');
      expect(hoverMapDiv).toHaveClass('hover-map');
    });
  });

  describe('Text Content Classes', () => {
    it('applies correct classes to main heading text', () => {
      render(<OverlayCopy {...defaultProps} />);
      
      const headingContainer = screen.getByText('Test Heading').closest('.hover-the-map-txt');
      expect(headingContainer).toHaveClass(
        'hover-the-map-txt',
        'text-center',
        'text-4xl',
        'font-bold',
        'md:text-7xl'
      );
    });

    it('applies correct classes to subheading', () => {
      render(<OverlayCopy {...defaultProps} />);
      
      const subheadingElement = screen.getByText('Test Subheading');
      expect(subheadingElement).toHaveClass(
        'main-header',
        'mb-2',
        'text-center',
        'text-xl',
        'md:mb-4',
        'md:text-4xl',
        'text-bold'
      );
    });
  });

  describe('Edge Cases', () => {
    it('handles missing subheading', () => {
      const props = { ...defaultProps, subheading: undefined };
      render(<OverlayCopy {...props} />);
      expect(screen.getByText('Test Heading')).toBeInTheDocument();
    });

    it('handles missing heading', () => {
      const props = { ...defaultProps, heading: undefined };
      render(<OverlayCopy {...props} />);
      expect(screen.getByText('Test Subheading')).toBeInTheDocument();
    });

    it('handles missing title when isHeader is true', () => {
      const props = { ...defaultProps, isHeader: true, title: undefined };
      render(<OverlayCopy {...props} />);
      expect(screen.getByText('Test Subheading')).toBeInTheDocument();
    });

    it('handles missing data object when isCtaButton is true', () => {
      const props = { ...defaultProps, isCtaButton: true, data: undefined };
      expect(() => render(<OverlayCopy {...props} />)).toThrow();
    });

    it('handles missing ctaText in data when isCtaButton is true', () => {
      const props = { 
        ...defaultProps, 
        isCtaButton: true, 
        data: { someOtherProp: 'value' } 
      };
      expect(() => render(<OverlayCopy {...props} />)).toThrow();
    });

    it('handles missing language in ctaText when isCtaButton is true', () => {
      const props = { 
        ...defaultProps, 
        isCtaButton: true, 
        lang: 'fr',
        data: { ctaText: { en: 'Click Here' } }
      };
      render(<OverlayCopy {...props} />);
      // Should render undefined text, which is handled by React
      expect(screen.getByTestId('lightning-button')).toBeInTheDocument();
    });
  });

  describe('Animation Props', () => {
    it('applies framer-motion initial animation props to subheading', () => {
      render(<OverlayCopy {...defaultProps} />);
      
      const subheadingElement = screen.getByText('Test Subheading');
      expect(subheadingElement).toBeInTheDocument();
      // Note: In a real test environment, you might want to test the actual animation values
      // but since we're mocking framer-motion, we just ensure the element renders
    });
  });
});
