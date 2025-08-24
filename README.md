# SKIN concierge

AI 기반 맞춤형 피부 관리 서비스입니다. 피부 분석, 제품 추천, 케어 계획을 한 곳에서 관리할 수 있습니다.

## 🚀 배포

### GitHub Pages
```bash
npm run deploy
```
- URL: https://juniekim.github.io/SKIN-concierge/

### Vercel
```bash
npm run build
vercel --prod
```

## 🛠️ 개발

### 설치
```bash
npm install
```

### 개발 서버 실행
```bash
npm run dev
```

### 빌드
```bash
npm run build
```

### 미리보기
```bash
npm run preview
```

## 📁 디렉토리 구조

```
src/
├── components/     # 재사용 가능한 컴포넌트
├── pages/         # 페이지 컴포넌트
├── router/        # 라우팅 설정
├── services/      # API 서비스
├── styles/        # 스타일 파일
├── utils/         # 유틸리티 함수
├── hooks/         # 커스텀 훅
├── contexts/      # React Context
└── assets/        # 이미지, 폰트 등

public/             # 정적 자산
├── assets/        # 공개 자산
├── manifest.webmanifest
└── robots.txt

dist/               # 빌드 결과물 (자동 생성)
```

## 🎯 주요 기능

- **AI 피부 분석**: 사진을 통한 피부 상태 진단
- **맞춤형 제품 추천**: 개인 피부 타입에 맞는 제품 추천
- **케어 계획 관리**: 개인화된 스킨케어 루틴
- **진행 상황 추적**: 피부 개선 과정 모니터링
- **제품 리뷰**: 사용자 경험 공유

## 🛡️ 보안

- HTTPS 강제 적용
- XSS 방지
- CSRF 보호
- 보안 헤더 설정

## 📱 PWA 지원

- 오프라인 동작
- 홈 화면 추가
- 푸시 알림 (준비 중)

## 🌐 브라우저 지원

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## 📄 라이선스

MIT License

## 👥 기여

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📞 문의

- 이슈: [GitHub Issues](https://github.com/juniekim/SKIN-concierge/issues)
- 이메일: contact@skinconcierge.com
