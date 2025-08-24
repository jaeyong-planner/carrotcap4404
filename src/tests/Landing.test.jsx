import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import LandingPage from '../pages/Landing';

describe('Landing Page', () => {
  const renderWithRouter = (component) => {
    return render(
      <BrowserRouter>
        {component}
      </BrowserRouter>
    );
  };

  beforeEach(() => {
    renderWithRouter(<LandingPage />);
  });

  test('renders main heading', () => {
    const heading = screen.getByText(/피부 고민, 이제 AI로 진단하고 맞춤 추천 받으세요/i);
    expect(heading).toBeInTheDocument();
  });

  test('renders navigation links', () => {
    const links = ['서비스 소개', '제품 추천', '피부 스캔', '고객 지원'];
    links.forEach(link => {
      expect(screen.getByText(link)).toBeInTheDocument();
    });
  });

  test('renders CTA buttons', () => {
    const ctaButtons = screen.getAllByText(/무료 진단 시작하기/i);
    expect(ctaButtons.length).toBeGreaterThan(0);
  });

  test('renders feature cards', () => {
    const features = ['빠른 AI 진단', '개인화 추천', '변화 추적'];
    features.forEach(feature => {
      expect(screen.getByText(feature)).toBeInTheDocument();
    });
  });

  test('renders social proof section', () => {
    expect(screen.getByText(/누적.*명의 사용자가 선택/)).toBeInTheDocument();
  });

  test('renders footer links', () => {
    const footerLinks = ['회사 소개', '개인정보 처리방침', '문의처'];
    footerLinks.forEach(link => {
      expect(screen.getByText(link)).toBeInTheDocument();
    });
  });

  test('navigation links are clickable', () => {
    const link = screen.getByText('서비스 소개');
    fireEvent.click(link);
    // Add navigation assertion based on your routing setup
  });

  test('CTA buttons are clickable', () => {
    const ctaButton = screen.getAllByText(/무료 진단 시작하기/i)[0];
    fireEvent.click(ctaButton);
    // Add navigation assertion based on your routing setup
  });

  // Accessibility tests
  test('images have alt text', () => {
    const images = screen.getAllByRole('img');
    images.forEach(img => {
      expect(img).toHaveAttribute('alt');
    });
  });

  test('buttons are keyboard accessible', () => {
    const buttons = screen.getAllByRole('button');
    buttons.forEach(button => {
      expect(button).toHaveFocus();
      fireEvent.keyPress(button, { key: 'Enter', code: 13 });
    });
  });

  // Responsive tests
  test('renders mobile menu button on small screens', () => {
    global.innerWidth = 480;
    global.dispatchEvent(new Event('resize'));
    const menuButton = screen.getByLabelText('메뉴 열기');
    expect(menuButton).toBeVisible();
  });
});