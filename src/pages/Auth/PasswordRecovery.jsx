import React, { useState } from 'react';
import authService from '../../services/authService';
import { Container, Typography, Button, Card } from '../../components/common';
import { colors, spacing, typography, animations, borderRadius } from '../../styles/design-system';

const PasswordRecovery = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setMessage('');
    setError('');
    setLoading(true);

    authService.forgotPassword(email).then(
      (response) => {
        setLoading(false);
        setMessage(response.data.message);
      },
      (error) => {
        const resMessage =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();

        setLoading(false);
        setError(resMessage);
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
            비밀번호 찾기
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
            가입하신 이메일 주소를 입력하시면<br />
            비밀번호 재설정 링크를 보내드립니다.
          </Typography>

          <form onSubmit={handleSubmit}>
            <div style={{ marginBottom: spacing[6] }}>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="이메일 주소"
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
              인증 메일 보내기
            </Button>

            {message && (
              <div style={{
                marginTop: spacing[4],
                padding: spacing[4],
                background: `${colors.status.success}15`,
                borderRadius: borderRadius.lg,
              }}>
                <Typography 
                  variant="body2" 
                  style={{ 
                    color: colors.status.success,
                    fontSize: typography.fontSize.sm,
                    fontWeight: typography.fontWeight.medium,
                  }}
                >
                  {message}
                </Typography>
              </div>
            )}

            {error && (
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
                  {error}
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
              로그인 페이지로 돌아가기{' '}
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

export default PasswordRecovery;
