import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import authService from '../../services/authService';
import { Container, Typography, Button, Card } from '../../components/common';
import { colors, spacing, typography, animations, borderRadius } from '../../styles/design-system';
import Icon from '../../components/common/Icon';

const Signup = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setMessage('');

    if (formData.password !== formData.confirmPassword) {
      setMessage('비밀번호가 일치하지 않습니다.');
      return;
    }

    setLoading(true);

    authService.signup(formData.name, formData.email, formData.password).then(
      () => {
        navigate('/login');
        window.location.reload();
      },
      (error) => {
        const resMessage =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();

        setLoading(false);
        setMessage(resMessage);
      }
    );
  };

  return (
    <div style={{ 
      minHeight: '100vh',
      backgroundColor: colors.ui.background.secondary,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: `${spacing[8]} ${spacing[4]}`,
    }}>
      <Container maxWidth="sm">
        <Card style={{ 
          padding: spacing[8],
          background: colors.ui.background.primary,
          borderRadius: borderRadius.xl,
          boxShadow: 'xl',
          textAlign: 'center',
          maxWidth: '480px',
          margin: '0 auto',
        }}>
          <Typography 
            variant="h4" 
            style={{ 
              marginBottom: spacing[3],
              fontFamily: typography.fontFamily.primary,
              fontSize: typography.fontSize['3xl'],
              fontWeight: typography.fontWeight.bold,
              color: colors.ui.foreground.primary,
              lineHeight: typography.lineHeight.tight,
            }}
          >
            회원가입
          </Typography>
          <Typography 
            variant="body1" 
            style={{ 
              marginBottom: spacing[8],
              color: colors.ui.foreground.secondary,
              fontSize: typography.fontSize.lg,
              lineHeight: typography.lineHeight.relaxed,
            }}
          >
            AI 기반 맞춤형 스킨케어 솔루션을<br />
            지금 바로 시작해보세요.
          </Typography>

          <div style={{ 
            marginBottom: spacing[8],
            display: 'flex',
            flexDirection: 'column',
            gap: spacing[3],
          }}>
            {[
              { icon: 'globe', name: '구글로 계속하기' },
              { icon: 'smartphone', name: '애플로 계속하기' },
              { icon: 'message-circle', name: '카카오로 계속하기' },
            ].map((social, index) => (
              <Button 
                key={index}
                variant="outline" 
                fullWidth
                style={{
                  background: colors.ui.background.primary,
                  color: colors.ui.foreground.primary,
                  padding: spacing[4],
                  borderRadius: borderRadius.lg,
                  fontSize: typography.fontSize.base,
                  fontWeight: typography.fontWeight.medium,
                  border: `1px solid ${colors.ui.border}`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: spacing[2],
                  transition: animations.transitions.fade,
                  '&:hover': {
                    background: colors.ui.background.secondary,
                  }
                }}
              >
                <Icon name={social.icon} size={20} color={colors.ui.foreground.secondary} />
                {social.name}
              </Button>
            ))}
          </div>

          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: spacing[4],
            margin: `${spacing[6]} 0`,
          }}>
            <div style={{ flex: 1, height: '1px', background: colors.ui.border }} />
            <Typography 
              variant="body2" 
              style={{ 
                color: colors.ui.foreground.tertiary,
                fontSize: typography.fontSize.sm,
              }}
            >
              또는 이메일로 가입하기
            </Typography>
            <div style={{ flex: 1, height: '1px', background: colors.ui.border }} />
          </div>

          <form onSubmit={handleSubmit}>
            <div style={{ marginBottom: spacing[6] }}>
              <input
                type="text"
                name="name"
                placeholder="이름"
                value={formData.name}
                onChange={handleChange}
                required
                style={{
                  width: '100%',
                  padding: spacing[4],
                  background: colors.ui.background.secondary,
                  border: `1px solid ${colors.ui.border}`,
                  borderRadius: borderRadius.lg,
                  fontSize: typography.fontSize.base,
                  color: colors.ui.foreground.primary,
                  marginBottom: spacing[3],
                  transition: animations.transitions.fade,
                  '&:focus': {
                    outline: 'none',
                    borderColor: colors.accent[100],
                    boxShadow: `0 0 0 2px ${colors.accent[20]}`,
                  },
                  '&::placeholder': {
                    color: colors.ui.placeholder,
                  }
                }}
              />
              <input
                type="email"
                name="email"
                placeholder="이메일 주소"
                value={formData.email}
                onChange={handleChange}
                required
                style={{
                  width: '100%',
                  padding: spacing[4],
                  background: colors.ui.background.secondary,
                  border: `1px solid ${colors.ui.border}`,
                  borderRadius: borderRadius.lg,
                  fontSize: typography.fontSize.base,
                  color: colors.ui.foreground.primary,
                  marginBottom: spacing[3],
                  transition: animations.transitions.fade,
                  '&:focus': {
                    outline: 'none',
                    borderColor: colors.accent[100],
                    boxShadow: `0 0 0 2px ${colors.accent[20]}`,
                  },
                  '&::placeholder': {
                    color: colors.ui.placeholder,
                  }
                }}
              />
              <input
                type="password"
                name="password"
                placeholder="비밀번호 (8자 이상)"
                value={formData.password}
                onChange={handleChange}
                required
                style={{
                  width: '100%',
                  padding: spacing[4],
                  background: colors.ui.background.secondary,
                  border: `1px solid ${colors.ui.border}`,
                  borderRadius: borderRadius.lg,
                  fontSize: typography.fontSize.base,
                  color: colors.ui.foreground.primary,
                  marginBottom: spacing[3],
                  transition: animations.transitions.fade,
                  '&:focus': {
                    outline: 'none',
                    borderColor: colors.accent[100],
                    boxShadow: `0 0 0 2px ${colors.accent[20]}`,
                  },
                  '&::placeholder': {
                    color: colors.ui.placeholder,
                  }
                }}
              />
              <input
                type="password"
                name="confirmPassword"
                placeholder="비밀번호 확인"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
                style={{
                  width: '100%',
                  padding: spacing[4],
                  background: colors.ui.background.secondary,
                  border: `1px solid ${colors.ui.border}`,
                  borderRadius: borderRadius.lg,
                  fontSize: typography.fontSize.base,
                  color: colors.ui.foreground.primary,
                  transition: animations.transitions.fade,
                  '&:focus': {
                    outline: 'none',
                    borderColor: colors.accent[100],
                    boxShadow: `0 0 0 2px ${colors.accent[20]}`,
                  },
                  '&::placeholder': {
                    color: colors.ui.placeholder,
                  }
                }}
              />
            </div>

            <div style={{
              marginBottom: spacing[6],
            }}>
              <label style={{
                display: 'flex',
                alignItems: 'center',
                gap: spacing[2],
                cursor: 'pointer',
              }}>
                <input
                  type="checkbox"
                  required
                  style={{
                    width: '16px',
                    height: '16px',
                    borderRadius: borderRadius.sm,
                    border: `1px solid ${colors.ui.border}`,
                    '&:checked': {
                      backgroundColor: colors.accent[100],
                      borderColor: colors.accent[100],
                    }
                  }}
                />
                <Typography 
                  variant="body2" 
                  style={{ 
                    color: colors.ui.foreground.secondary,
                    fontSize: typography.fontSize.sm,
                  }}
                >
                  <a 
                    href="/terms"
                    style={{
                      color: colors.accent[100],
                      textDecoration: 'none',
                      fontWeight: typography.fontWeight.medium,
                    }}
                  >
                    이용약관
                  </a>
                  {' '}및{' '}
                  <a 
                    href="/privacy"
                    style={{
                      color: colors.accent[100],
                      textDecoration: 'none',
                      fontWeight: typography.fontWeight.medium,
                    }}
                  >
                    개인정보처리방침
                  </a>
                  에 동의합니다
                </Typography>
              </label>
            </div>

            <Button 
              type="submit" 
              variant="primary" 
              fullWidth 
              loading={loading}
              style={{
                background: colors.accent[100],
                color: colors.white,
                padding: spacing[4],
                borderRadius: borderRadius.lg,
                fontSize: typography.fontSize.base,
                fontWeight: typography.fontWeight.semibold,
                transition: animations.transitions.fade,
                '&:hover': {
                  background: colors.accent[115],
                }
              }}
            >
              가입하기
            </Button>

            {message && (
              <div style={{
                marginTop: spacing[4],
                padding: spacing[4],
                background: `${colors.status.error}15`,
                borderRadius: borderRadius.lg,
              }}>
                <Typography 
                  variant="body2" 
                  style={{ 
                    color: colors.status.error,
                    fontSize: typography.fontSize.sm,
                    fontWeight: typography.fontWeight.medium,
                  }}
                >
                  {message}
                </Typography>
              </div>
            )}
          </form>

          <div style={{
            marginTop: spacing[8],
            paddingTop: spacing[8],
            borderTop: `1px solid ${colors.ui.border}`,
          }}>
            <Typography 
              variant="body2" 
              style={{ 
                color: colors.ui.foreground.secondary,
                fontSize: typography.fontSize.base,
              }}
            >
              이미 계정이 있으신가요?{' '}
              <a 
                href="/login"
                style={{
                  color: colors.accent[100],
                  textDecoration: 'none',
                  fontWeight: typography.fontWeight.medium,
                  transition: animations.transitions.fade,
                  '&:hover': {
                    color: colors.accent[115],
                  }
                }}
              >
                로그인
              </a>
            </Typography>
          </div>
        </Card>
      </Container>
    </div>
  );
};

export default Signup;
