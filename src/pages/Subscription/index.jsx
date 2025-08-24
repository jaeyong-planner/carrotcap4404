import React, { useState, useEffect } from 'react';
import { Container, Typography, Button, Card } from '../../components/common';
import subscriptionService from '../../services/subscriptionService';
import authService from '../../services/authService';

const Subscription = () => {
  const [subscriptions, setSubscriptions] = useState([]);
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Design System Tokens
  const designTokens = {
    colors: {
      white: '#FFFFFF',
      black: '#000000',
      internationalOrange: '#FF3C00',
      baseGray: '#191919',
      ground: {
        100: '#FFFFFF',
        90: 'rgb(255 255 255 / 0.9)',
        80: 'rgb(255 255 255 / 0.8)',
        70: 'rgb(255 255 255 / 0.7)',
        60: 'rgb(255 255 255 / 0.6)',
        50: 'rgb(255 255 255 / 0.5)',
        40: 'rgb(255 255 255 / 0.4)',
        30: 'rgb(255 255 255 / 0.3)',
        20: 'rgb(255 255 255 / 0.2)',
        15: 'rgb(255 255 255 / 0.15)',
        10: 'rgb(255 255 255 / 0.1)',
        5: 'rgb(255 255 255 / 0.05)'
      },
      dark: {
        120: '#1A1A1A',
        100: '#191919',
        90: 'rgb(25 25 25 / 0.9)',
        80: 'rgb(25 25 25 / 0.8)',
        70: 'rgb(25 25 25 / 0.7)',
        60: 'rgb(25 25 25 / 0.6)',
        50: 'rgb(25 25 25 / 0.5)',
        40: 'rgb(25 25 25 / 0.4)',
        30: 'rgb(25 25 25 / 0.3)',
        20: 'rgb(25 25 25 / 0.2)',
        10: 'rgb(25 25 25 / 0.1)',
        5: 'rgb(25 25 25 / 0.05)'
      },
      accent: {
        115: '#E53600',
        100: '#FF3C00',
        90: 'rgb(255 60 0 / 0.9)',
        80: 'rgb(255 60 0 / 0.8)',
        70: 'rgb(255 60 0 / 0.7)',
        60: 'rgb(255 60 0 / 0.6)',
        50: 'rgb(255 60 0 / 0.5)',
        40: 'rgb(255 60 0 / 0.4)',
        30: 'rgb(255 60 0 / 0.3)',
        20: 'rgb(255 60 0 / 0.2)',
        10: 'rgb(255 60 0 / 0.1)',
        5: 'rgb(255 60 0 / 0.05)'
      },
      status: {
        error: '#FF0000',
        warning: '#FFA600',
        success: '#6CCD5D'
      },
      ui: {
        border: 'rgb(25 25 25 / 0.1)',
        background: {
          primary: '#FFFFFF',
          secondary: '#F9FAFB',
          tertiary: '#F2F2F2'
        },
        foreground: {
          primary: '#191919',
          secondary: 'rgb(25 25 25 / 0.7)',
          tertiary: 'rgb(25 25 25 / 0.5)'
        }
      }
    },
    spacing: {
      0: '0',
      px: '1px',
      '0_5': '0.125rem',
      1: '0.25rem',
      '1_5': '0.375rem',
      2: '0.5rem',
      '2_5': '0.625rem',
      3: '0.75rem',
      '3_5': '0.875rem',
      4: '1rem',
      5: '1.25rem',
      6: '1.5rem',
      8: '2rem',
      10: '2.5rem',
      12: '3rem',
      16: '4rem'
    },
    typography: {
      fontFamily: {
        primary: "'Pretendard Variable', -apple-system, BlinkMacSystemFont, system-ui, sans-serif",
        english: "'Lato', -apple-system, BlinkMacSystemFont, system-ui, sans-serif"
      },
      fontSize: {
        xs: '0.8125rem',
        sm: '0.875rem',
        base: '1rem',
        lg: '1.125rem',
        xl: '1.25rem',
        '2xl': '1.5rem',
        '3xl': '2rem',
        '4xl': '2.5rem'
      },
      fontWeight: {
        thin: 100,
        light: 300,
        regular: 400,
        medium: 500,
        semibold: 600,
        bold: 700,
        black: 900
      },
      lineHeight: {
        tight: 1.25,
        snug: 1.375,
        normal: 1.5,
        relaxed: 1.625
      },
      letterSpacing: {
        tight: '-0.025em',
        normal: '0em',
        wide: '0.025em',
        wider: '0.05em'
      }
    },
    animation: {
      duration: {
        base: '0.3s',
        smooth: '0.6s'
      },
      easing: {
        base: 'ease',
        smooth: 'cubic-bezier(0.4, 0, 0.2, 1)'
      }
    },
    radius: {
      none: '0',
      sm: '0.125rem',
      base: '0.25rem',
      md: '0.375rem',
      lg: '0.5rem',
      xl: '0.75rem',
      '2xl': '1rem',
      full: '9999px'
    },
    shadows: {
      sm: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
      base: '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)',
      md: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
      lg: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
      xl: '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)'
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const currentUser = authService.getCurrentUser();
        if (currentUser && currentUser.data && currentUser.data.user) {
          // Assuming backend filters by userId automatically or we pass it
          const subsRes = await subscriptionService.getSubscriptions();
          setSubscriptions(subsRes.data.data.subscriptions);

          const paymentsRes = await subscriptionService.getPayments();
          setPayments(paymentsRes.data.data.payments);
        } else {
          setError('사용자 정보를 불러올 수 없습니다. 로그인 해주세요.');
        }
        setLoading(false);
      } catch (err) {
        setError('구독 및 결제 정보를 불러오는데 실패했습니다.');
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) return <Container><Typography>로딩 중...</Typography></Container>;
  if (error) return <Container><Typography color="error">{error}</Typography></Container>;

  const currentSubscription = subscriptions.find(sub => sub.isActive) || { plan: 'free', price: '0', period: '무제한' };

  const plans = [
    {
      name: '무료',
      price: '0',
      period: '무제한',
      features: [
        'AI 피부 분석 월 1회',
        '기본 제품 추천',
        '피부 변화 트래킹',
      ],
      current: currentSubscription.plan === 'free',
    },
    {
      name: '프리미엄',
      price: '9,900',
      period: '월',
      features: [
        'AI 피부 분석 무제한',
        '맞춤형 제품 추천',
        '상세 피부 리포트',
        '전문가 1:1 상담',
        '프리미엄 컨텐츠 이용',
      ],
      highlight: true,
      current: currentSubscription.plan === 'premium' && currentSubscription.period === '월',
    },
    {
      name: '프리미엄 연간',
      price: '99,000',
      period: '년',
      features: [
        'AI 피부 분석 무제한',
        '맞춤형 제품 추천',
        '상세 피부 리포트',
        '전문가 1:1 상담',
        '프리미엄 컨텐츠 이용',
        '2개월 무료',
      ],
      current: currentSubscription.plan === 'premium' && currentSubscription.period === '년',
    },
  ];

  return (
    <div style={{ 
        backgroundColor: designTokens.colors.ui.background.secondary, 
        minHeight: '100vh',
        fontFamily: designTokens.typography.fontFamily.primary
      }}>
      <Container style={{ 
        padding: `${designTokens.spacing[8]} ${designTokens.spacing[4]}`,
        maxWidth: '1280px',
        margin: '0 auto'
      }}>
        <div style={{ 
          textAlign: 'center', 
          marginBottom: designTokens.spacing[8],
          maxWidth: '800px',
          margin: '0 auto'
        }}>
          <Typography 
            variant="h3" 
            style={{ 
              marginBottom: designTokens.spacing[3],
              fontSize: designTokens.typography.fontSize['4xl'],
              fontWeight: designTokens.typography.fontWeight.bold,
              color: designTokens.colors.ui.foreground.primary,
              lineHeight: designTokens.typography.lineHeight.tight,
              letterSpacing: designTokens.typography.letterSpacing.tight
            }}
          >
            구독 플랜
          </Typography>
          <Typography 
            variant="body1" 
            style={{
              color: designTokens.colors.ui.foreground.secondary,
              fontSize: designTokens.typography.fontSize.lg,
              lineHeight: designTokens.typography.lineHeight.relaxed,
              letterSpacing: designTokens.typography.letterSpacing.wide
            }}
          >
            나에게 맞는 구독 플랜을 선택하세요
          </Typography>
        </div>

        {/* Plans Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: designTokens.spacing[4],
          marginBottom: designTokens.spacing[8],
        }}>
          {plans.map((plan) => (
            <Card
              key={plan.name}
              padding="large"
              style={{
                boxShadow: plan.highlight ? designTokens.shadows.xl : designTokens.shadows.md,
                borderRadius: designTokens.radius['2xl'],
                backgroundColor: designTokens.colors.ui.background.primary,
                border: plan.highlight ? `2px solid ${designTokens.colors.accent[100]}` : undefined,
                transform: plan.highlight ? 'scale(1.05)' : undefined,
                transition: `all ${designTokens.animation.duration.smooth} ${designTokens.animation.easing.smooth}`,
                '&:hover': {
                  transform: plan.highlight ? 'scale(1.07)' : 'scale(1.02)',
                  boxShadow: plan.highlight ? designTokens.shadows.xl : designTokens.shadows.lg
                },
                position: 'relative',
                overflow: 'hidden'
              }}
            >
              {plan.highlight && (
                <div style={{
                  backgroundColor: designTokens.colors.accent[100],
                  color: designTokens.colors.ground[100],
                  padding: `${designTokens.spacing[1]} ${designTokens.spacing[3]}`,
                  borderRadius: designTokens.radius.full,
                  display: 'inline-block',
                  marginBottom: designTokens.spacing[4],
                }}>
                  <Typography variant="body2">
                    인기
                  </Typography>
                </div>
              )}

              <Typography 
                variant="h5" 
                style={{ 
                  marginBottom: designTokens.spacing[3],
                  fontSize: designTokens.typography.fontSize.xl,
                  fontWeight: designTokens.typography.fontWeight.bold,
                  color: designTokens.colors.ui.foreground.primary,
                  letterSpacing: designTokens.typography.letterSpacing.tight
                }}
              >
                {plan.name}
              </Typography>

              <div style={{ 
                marginBottom: designTokens.spacing[6],
                padding: `${designTokens.spacing[4]} 0`,
                borderBottom: `1px solid ${designTokens.colors.ui.border}`
              }}>
                <Typography 
                  variant="h3" 
                  style={{ 
                    marginBottom: designTokens.spacing[1],
                    fontSize: designTokens.typography.fontSize['4xl'],
                    fontWeight: designTokens.typography.fontWeight.bold,
                    color: designTokens.colors.accent[100],
                    background: `linear-gradient(135deg, ${designTokens.colors.accent[100]}, ${designTokens.colors.accent[115]})`,
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                    letterSpacing: designTokens.typography.letterSpacing.wide
                  }}
                >
                  ₩{plan.price}
                  <span style={{ 
                    fontSize: designTokens.typography.fontSize.lg,
                    fontWeight: designTokens.typography.fontWeight.medium,
                    color: designTokens.colors.ui.foreground.secondary,
                    marginLeft: designTokens.spacing[2]
                  }}>
                    /{plan.period}
                  </span>
                </Typography>
              </div>

              <div style={{ marginBottom: designTokens.spacing[6] }}>
                {plan.features.map((feature, index) => (
                  <div
                    key={index}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      marginBottom: designTokens.spacing[3],
                      padding: designTokens.spacing[2],
                      backgroundColor: index % 2 === 0 ? designTokens.colors.ui.background.secondary : 'transparent',
                      borderRadius: designTokens.radius.md
                    }}
                  >
                    <span style={{ 
                      marginRight: designTokens.spacing[3], 
                      color: designTokens.colors.accent[100],
                      fontSize: designTokens.typography.fontSize.lg,
                      fontWeight: designTokens.typography.fontWeight.bold
                    }}>✓</span>
                    <Typography 
                      variant="body1"
                      style={{
                        color: designTokens.colors.ui.foreground.primary,
                        fontSize: designTokens.typography.fontSize.base,
                        fontWeight: designTokens.typography.fontWeight.medium,
                        letterSpacing: designTokens.typography.letterSpacing.wide
                      }}
                    >
                      {feature}
                    </Typography>
                  </div>
                ))}
              </div>

              <Button
                variant={plan.current ? 'outline' : 'primary'}
                fullWidth
                disabled={plan.current}
                style={{
                  padding: `${designTokens.spacing[3]} ${designTokens.spacing[4]}`,
                  fontSize: designTokens.typography.fontSize.base,
                  fontWeight: designTokens.typography.fontWeight.semibold,
                  borderRadius: designTokens.radius.lg,
                  background: plan.current ? 'transparent' : `linear-gradient(135deg, ${designTokens.colors.accent[100]}, ${designTokens.colors.accent[115]})`,
                  border: plan.current ? `2px solid ${designTokens.colors.ui.border}` : 'none',
                  color: plan.current ? designTokens.colors.ui.foreground.secondary : designTokens.colors.ground[100],
                  transition: `all ${designTokens.animation.duration.base} ${designTokens.animation.easing.base}`,
                  letterSpacing: designTokens.typography.letterSpacing.wide,
                  '&:hover': {
                    transform: 'translateY(-2px)',
                    boxShadow: plan.current ? 'none' : `0 4px 12px ${designTokens.colors.accent[100]}30`
                  }
                }}
              >
                {plan.current ? '현재 이용중' : '구독하기'}
              </Button>
            </Card>
          ))}
        </div>

        {/* Payment History */}
        <Card 
          padding="large"
          style={{
            boxShadow: designTokens.shadows.md,
            borderRadius: designTokens.radius['2xl'],
            backgroundColor: designTokens.colors.ui.background.primary
          }}
        >
          <Typography 
            variant="h5" 
            style={{ 
              marginBottom: designTokens.spacing[6],
              fontSize: designTokens.typography.fontSize['2xl'],
              fontWeight: designTokens.typography.fontWeight.bold,
              color: designTokens.colors.ui.foreground.primary,
              letterSpacing: designTokens.typography.letterSpacing.tight,
              lineHeight: designTokens.typography.lineHeight.tight
            }}
          >
            결제 내역
          </Typography>

          <div style={{ 
            display: 'flex', 
            flexDirection: 'column',
            backgroundColor: designTokens.colors.ui.background.secondary,
            borderRadius: designTokens.radius['2xl'],
            overflow: 'hidden'
          }}>
            {payments.map((payment, index) => (
              <div
                key={payment._id}
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  padding: designTokens.spacing[4],
                  backgroundColor: designTokens.colors.ui.background.primary,
                  marginBottom: index < payments.length - 1 ? '1px' : 0,
                  transition: `all ${designTokens.animation.duration.base} ${designTokens.animation.easing.base}`,
                  '&:hover': {
                    backgroundColor: designTokens.colors.ui.background.secondary
                  }
                }}
              >
                <div>
                  <Typography 
                    variant="body1" 
                    style={{ 
                      marginBottom: designTokens.spacing[1],
                      fontSize: designTokens.typography.fontSize.base,
                      fontWeight: designTokens.typography.fontWeight.medium,
                      color: designTokens.colors.ui.foreground.primary,
                      letterSpacing: designTokens.typography.letterSpacing.wide
                    }}
                  >
                    {payment.plan}
                  </Typography>
                  <Typography 
                    variant="body2" 
                    style={{
                      color: designTokens.colors.ui.foreground.secondary,
                      fontSize: designTokens.typography.fontSize.sm,
                      letterSpacing: designTokens.typography.letterSpacing.wide
                    }}
                  >
                    {new Date(payment.paymentDate).toLocaleDateString()}
                  </Typography>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <Typography 
                    variant="body1" 
                    style={{ 
                      marginBottom: designTokens.spacing[1],
                      fontSize: designTokens.typography.fontSize.lg,
                      fontWeight: designTokens.typography.fontWeight.semibold,
                      color: designTokens.colors.ui.foreground.primary,
                      letterSpacing: designTokens.typography.letterSpacing.wide
                    }}
                  >
                    ₩{payment.amount}
                  </Typography>
                  <div style={{
                    display: 'inline-block',
                    padding: `${designTokens.spacing[1]} ${designTokens.spacing[2]}`,
                    borderRadius: designTokens.radius.base,
                    backgroundColor: payment.status === 'completed' 
                      ? designTokens.colors.status.success + '15'
                      : designTokens.colors.status.error + '15',
                    color: payment.status === 'completed'
                      ? designTokens.colors.status.success
                      : designTokens.colors.status.error,
                    fontSize: designTokens.typography.fontSize.sm,
                    fontWeight: designTokens.typography.fontWeight.medium
                  }}>
                    {payment.status === 'completed' ? '결제 완료' : '결제 실패'}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Payment Methods */}
        <Card 
          padding="large" 
          style={{ 
            marginTop: designTokens.spacing[6],
            boxShadow: designTokens.shadows.md,
            borderRadius: designTokens.radius['2xl'],
            backgroundColor: designTokens.colors.ui.background.primary
          }}
        >
          <Typography 
            variant="h5" 
            style={{ 
              marginBottom: designTokens.spacing[6],
              fontSize: designTokens.typography.fontSize['2xl'],
              fontWeight: designTokens.typography.fontWeight.bold,
              color: designTokens.colors.ui.foreground.primary,
              letterSpacing: designTokens.typography.letterSpacing.tight,
              lineHeight: designTokens.typography.lineHeight.tight
            }}
          >
            결제 수단 관리
          </Typography>

          <div style={{ 
            display: 'flex', 
            flexDirection: 'column', 
            gap: designTokens.spacing[4],
            backgroundColor: designTokens.colors.ui.background.secondary,
            borderRadius: designTokens.radius['2xl'],
            padding: designTokens.spacing[4]
          }}>
            {[
              {
                type: '신용카드',
                number: '****-****-****-1234',
                expiry: '12/25',
                primary: true,
              },
              {
                type: '체크카드',
                number: '****-****-****-5678',
                expiry: '06/24',
              },
            ].map((method, index) => (
              <div
                key={index}
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  padding: designTokens.spacing[4],
                  backgroundColor: designTokens.colors.ui.background.primary,
                  borderRadius: designTokens.radius.lg,
                  boxShadow: designTokens.shadows.sm,
                  transition: `all ${designTokens.animation.duration.base} ${designTokens.animation.easing.base}`,
                  '&:hover': {
                    transform: 'translateY(-2px)',
                    boxShadow: designTokens.shadows.md
                  }
                }}
              >
                <div>
                  <Typography 
                    variant="body1" 
                    style={{ 
                      marginBottom: designTokens.spacing[1],
                      fontSize: designTokens.typography.fontSize.base,
                      fontWeight: designTokens.typography.fontWeight.medium,
                      color: designTokens.colors.ui.foreground.primary,
                      letterSpacing: designTokens.typography.letterSpacing.wide
                    }}
                  >
                    {method.type}
                  </Typography>
                  <Typography 
                    variant="body2" 
                    style={{
                      color: designTokens.colors.ui.foreground.secondary,
                      fontSize: designTokens.typography.fontSize.sm,
                      letterSpacing: designTokens.typography.letterSpacing.wide
                    }}
                  >
                    {method.number} • 만료: {method.expiry}
                  </Typography>
                </div>
                <div style={{ display: 'flex', gap: designTokens.spacing[2], alignItems: 'center' }}>
                  {method.primary && (
                    <div style={{
                      padding: `${designTokens.spacing[1]} ${designTokens.spacing[2]}`,
                      backgroundColor: designTokens.colors.accent[10],
                      color: designTokens.colors.accent[100],
                      borderRadius: designTokens.radius.base,
                      fontSize: designTokens.typography.fontSize.sm,
                      fontWeight: designTokens.typography.fontWeight.medium
                    }}>
                      기본
                    </div>
                  )}
                  <Button 
                    variant="outline" 
                    size="sm"
                    style={{
                      borderColor: designTokens.colors.status.error,
                      color: designTokens.colors.status.error,
                      fontSize: designTokens.typography.fontSize.sm,
                      fontWeight: designTokens.typography.fontWeight.medium,
                      padding: `${designTokens.spacing[1]} ${designTokens.spacing[3]}`,
                      '&:hover': {
                        backgroundColor: designTokens.colors.status.error + '10'
                      }
                    }}
                  >
                    삭제
                  </Button>
                </div>
              </div>
            ))}
          </div>

          <Button 
            variant="outline" 
            fullWidth 
            style={{ 
              marginTop: designTokens.spacing[4],
              padding: designTokens.spacing[4],
              fontSize: designTokens.typography.fontSize.base,
              fontWeight: designTokens.typography.fontWeight.semibold,
              borderWidth: '2px',
              borderStyle: 'dashed',
              borderColor: designTokens.colors.ui.border,
              color: designTokens.colors.ui.foreground.secondary,
              borderRadius: designTokens.radius.lg,
              transition: `all ${designTokens.animation.duration.base} ${designTokens.animation.easing.base}`,
              letterSpacing: designTokens.typography.letterSpacing.wide,
              '&:hover': {
                borderColor: designTokens.colors.accent[100],
                color: designTokens.colors.accent[100],
                backgroundColor: designTokens.colors.accent[5]
              }
            }}
          >
            새 결제 수단 추가
          </Button>
        </Card>
      </Container>
    </div>
  );
};

export default Subscription;

