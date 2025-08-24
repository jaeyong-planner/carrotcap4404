import React, { useState, useEffect } from 'react';
import { Container, Typography, Button, Card } from '../../components/common';
import { colors, spacing, typography, animations, borderRadius } from '../../styles/design-system';
import dashboardService from '../../services/dashboardService';
import Icon from '../../components/common/Icon';

const Dashboard = () => {
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);
        const res = await dashboardService.getDashboardData();
        setDashboardData(res.data.data);
        setLoading(false);
      } catch (err) {
        setError('대시보드 데이터를 불러오는데 실패했습니다.');
        setLoading(false);
      }
    };
    fetchDashboardData();
  }, []);

  if (loading) return <Container><Typography>로딩 중...</Typography></Container>;
  if (error) return <Container><Typography color="error">{error}</Typography></Container>;
  if (!dashboardData) return <Container><Typography>데이터가 없습니다.</Typography></Container>;

  const { skinScore, latestScan, activityLog } = dashboardData;

  const stats = [
    {
      title: '피부 점수',
      value: skinScore ? skinScore.toFixed(0) : 'N/A',
      change: '+5', // 더미 데이터
      icon: 'chart-line',
      color: colors.status.success,
    },
    {
      title: '수분도',
      value: latestScan && latestScan.results && latestScan.results.moisture ? `${latestScan.results.moisture.toFixed(0)}%` : 'N/A',
      change: '+3%', // 더미 데이터
      icon: 'droplet',
      color: colors.primary.blue,
    },
    {
      title: '민감도',
      value: '낮음', // 더미 데이터
      change: '개선', // 더미 데이터
      icon: 'leaf',
      color: colors.status.success,
    },
    {
      title: '탄력도',
      value: '68%', // 더미 데이터
      change: '+2%', // 더미 데이터
      icon: 'star',
      color: colors.primary.blue,
    },
  ];

  return (
    <div style={{ 
        backgroundColor: colors.ui.background.secondary, 
        minHeight: '100vh',
        position: 'relative',
      }}>
      <Container style={{ 
        padding: `${spacing[8]} ${spacing[4]}`,
        position: 'relative',
        zIndex: 1,
      }}>
        {/* Header */}
        <div style={{ 
          marginBottom: spacing[12],
          background: colors.ui.background.primary,
          padding: spacing[8],
          borderRadius: borderRadius.xl,
          boxShadow: 'lg',
        }}>
          <Typography 
            variant="h3" 
            style={{ 
              marginBottom: spacing[3],
              fontFamily: typography.fontFamily.primary,
              fontSize: typography.fontSize['3xl'],
              fontWeight: typography.fontWeight.bold,
              color: colors.ui.foreground.primary,
              lineHeight: typography.lineHeight.tight,
            }}
          >
            안녕하세요, 서연님 👋
          </Typography>
          <Typography 
            variant="body1" 
            style={{
              color: colors.ui.foreground.secondary,
              fontSize: typography.fontSize.lg,
              lineHeight: typography.lineHeight.relaxed,
              maxWidth: '600px',
            }}
          >
            오늘의 피부 상태와 맞춤 케어 솔루션을 확인해보세요.
          </Typography>
        </div>

        {/* Stats Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
          gap: spacing[6],
          marginBottom: spacing[12],
        }}>
          {stats.map((stat, index) => (
            <Card 
              key={index} 
              style={{
                padding: spacing[6],
                background: colors.ui.background.primary,
                borderRadius: borderRadius.xl,
                boxShadow: 'lg',
                transition: animations.transitions.scale,
                '&:hover': {
                  transform: 'translateY(-4px)',
                }
              }}
            >
              <div style={{
                display: 'flex',
                alignItems: 'center',
                marginBottom: spacing[4],
              }}>
                <div style={{ 
                  width: '48px',
                  height: '48px',
                  borderRadius: borderRadius.lg,
                  background: `${stat.color}15`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginRight: spacing[4],
                }}>
                  <Icon name={stat.icon} size={24} color={stat.color} />
                </div>
                <Typography 
                  variant="h6"
                  style={{
                    fontFamily: typography.fontFamily.primary,
                    fontSize: typography.fontSize.lg,
                    fontWeight: typography.fontWeight.medium,
                    color: colors.ui.foreground.secondary,
                  }}
                >
                  {stat.title}
                </Typography>
              </div>
              <Typography 
                variant="h3" 
                style={{ 
                  color: colors.ui.foreground.primary,
                  marginBottom: spacing[3],
                  fontFamily: typography.fontFamily.primary,
                  fontSize: typography.fontSize['4xl'],
                  fontWeight: typography.fontWeight.bold,
                  lineHeight: typography.lineHeight.none,
                }}
              >
                {stat.value}
              </Typography>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: spacing[2],
              }}>
                <div style={{
                  padding: `${spacing[1]} ${spacing[2]}`,
                  background: `${colors.status.success}15`,
                  borderRadius: borderRadius.full,
                  color: colors.status.success,
                  fontSize: typography.fontSize.sm,
                  fontWeight: typography.fontWeight.medium,
                }}>
                  {stat.change}
                </div>
                <Typography 
                  variant="body2" 
                  style={{ 
                    color: colors.ui.foreground.tertiary,
                    fontSize: typography.fontSize.sm,
                  }}
                >
                  지난주 대비
                </Typography>
              </div>
            </Card>
          ))}
        </div>

        {/* Quick Actions */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: spacing[6],
          marginBottom: spacing[12],
        }}>
          <Card style={{
            padding: spacing[6],
            background: colors.ui.background.primary,
            borderRadius: borderRadius.xl,
            boxShadow: 'lg',
          }}>
            <Typography 
              variant="h5" 
              style={{ 
                marginBottom: spacing[6],
                fontFamily: typography.fontFamily.primary,
                fontSize: typography.fontSize['2xl'],
                fontWeight: typography.fontWeight.bold,
                color: colors.ui.foreground.primary,
              }}
            >
              빠른 실행
            </Typography>
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              gap: spacing[4],
            }}>
              <Button 
                variant="primary" 
                fullWidth
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
                AI 피부 스캔 시작
              </Button>
              <Button 
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
                  transition: animations.transitions.fade,
                  '&:hover': {
                    background: colors.ui.background.secondary,
                  }
                }}
              >
                맞춤 제품 추천받기
              </Button>
              <Button 
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
                  transition: animations.transitions.fade,
                  '&:hover': {
                    background: colors.ui.background.secondary,
                  }
                }}
              >
                피부 일지 작성
              </Button>
            </div>
          </Card>

          <Card style={{
            padding: spacing[6],
            background: colors.ui.background.primary,
            borderRadius: borderRadius.xl,
            boxShadow: 'lg',
          }}>
            <Typography 
              variant="h5" 
              style={{ 
                marginBottom: spacing[6],
                fontFamily: typography.fontFamily.primary,
                fontSize: typography.fontSize['2xl'],
                fontWeight: typography.fontWeight.bold,
                color: colors.ui.foreground.primary,
              }}
            >
              최근 활동
            </Typography>
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              gap: spacing[5],
            }}>
              {activityLog.map((activity, index) => (
                <div key={index}>
                  <Typography 
                    variant="body2" 
                    style={{ 
                      marginBottom: spacing[2],
                      color: colors.ui.foreground.tertiary,
                      fontSize: typography.fontSize.sm,
                      fontWeight: typography.fontWeight.medium,
                    }}
                  >
                    {activity.date}
                  </Typography>
                  <Typography 
                    variant="body1" 
                    style={{ 
                      marginBottom: spacing[1],
                      color: colors.ui.foreground.primary,
                      fontSize: typography.fontSize.base,
                      lineHeight: typography.lineHeight.relaxed,
                    }}
                  >
                    {activity.description}
                  </Typography>
                  {index < activityLog.length - 1 && (
                    <div style={{
                      height: '1px',
                      backgroundColor: colors.ui.border,
                      margin: `${spacing[4]} 0`,
                      opacity: 0.6,
                    }} />
                  )}
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Recommendations */}
        <Card style={{
          padding: spacing[6],
          background: colors.ui.background.primary,
          borderRadius: borderRadius.xl,
          boxShadow: 'lg',
        }}>
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: spacing[8],
          }}>
            <div>
              <Typography 
                variant="h5"
                style={{
                  fontFamily: typography.fontFamily.primary,
                  fontSize: typography.fontSize['2xl'],
                  fontWeight: typography.fontWeight.bold,
                  color: colors.ui.foreground.primary,
                  marginBottom: spacing[2],
                }}
              >
                맞춤 제품 추천
              </Typography>
              <Typography 
                variant="body2"
                style={{
                  color: colors.ui.foreground.secondary,
                  fontSize: typography.fontSize.base,
                }}
              >
                AI가 분석한 당신의 피부에 가장 잘 맞는 제품입니다
              </Typography>
            </div>
            <Button 
              variant="text"
              style={{
                color: colors.accent[100],
                fontSize: typography.fontSize.base,
                fontWeight: typography.fontWeight.medium,
                padding: `${spacing[2]} ${spacing[4]}`,
                borderRadius: borderRadius.lg,
                transition: animations.transitions.fade,
                '&:hover': {
                  background: colors.accent[5],
                }
              }}
            >
              전체보기
            </Button>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
            gap: spacing[6],
          }}>
            {[
              {
                name: '수분 크림',
                brand: 'COSRX',
                match: 98,
                tags: ['수분 공급', '진정'],
              },
              {
                name: '토너',
                brand: 'Roundlab',
                match: 95,
                tags: ['각질 케어', '수분'],
              },
              {
                name: '세럼',
                brand: 'The Ordinary',
                match: 92,
                tags: ['미백', '탄력'],
              },
            ].map((item, index) => (
              <Card 
                key={index}
                style={{ 
                  padding: spacing[4],
                  background: colors.ui.background.secondary,
                  borderRadius: borderRadius.xl,
                  transition: animations.transitions.scale,
                  cursor: 'pointer',
                  '&:hover': {
                    transform: 'translateY(-4px)',
                  }
                }}
              >
                <div style={{
                  width: '100%',
                  height: '160px',
                  backgroundColor: colors.ui.image.background,
                  marginBottom: spacing[4],
                  borderRadius: borderRadius.lg,
                  overflow: 'hidden',
                }} />
                <div style={{ padding: `0 ${spacing[2]}` }}>
                  <Typography 
                    variant="body2" 
                    style={{ 
                      color: colors.ui.foreground.secondary,
                      fontSize: typography.fontSize.sm,
                      marginBottom: spacing[1],
                    }}
                  >
                    {item.brand}
                  </Typography>
                  <Typography 
                    variant="body1" 
                    style={{ 
                      color: colors.ui.foreground.primary,
                      fontSize: typography.fontSize.lg,
                      fontWeight: typography.fontWeight.medium,
                      marginBottom: spacing[3],
                    }}
                  >
                    {item.name}
                  </Typography>
                  <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  }}>
                    <div style={{
                      display: 'flex',
                      gap: spacing[2],
                    }}>
                      {item.tags.map((tag, tagIndex) => (
                        <div 
                          key={tagIndex}
                          style={{
                            padding: `${spacing[1]} ${spacing[2]}`,
                            background: colors.ui.background.primary,
                            borderRadius: borderRadius.full,
                            fontSize: typography.fontSize.xs,
                            color: colors.ui.foreground.secondary,
                          }}
                        >
                          {tag}
                        </div>
                      ))}
                    </div>
                    <div style={{
                      background: `${colors.status.success}15`,
                      color: colors.status.success,
                      padding: `${spacing[1]} ${spacing[2]}`,
                      borderRadius: borderRadius.full,
                      fontSize: typography.fontSize.sm,
                      fontWeight: typography.fontWeight.medium,
                    }}>
                      {item.match}% 매칭
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </Card>
      </Container>
    </div>
  );
};

export default Dashboard;
