# 구미호

내맘대로 디자인 시스템

## 특징

- React 기반 UI Kit
- vanilla-extract로 타입 안전한 CSS-in-TS, 제로 런타임
- OKLCH 컬러 토큰 + 시멘틱 테마 변수 (다크 모드 자동 지원)
- Motion 기반 애니메이션
- Radix UI 기반 접근성 컴포넌트
- ESM only 빌드

## 시작

### 패키지 설치

다음 패키지들이 없으면 많이 곤란하다.

- `react`, `react-dom` v19.2 이상
- `motion` v12 이상

```bash
pnpm add react@latest react-dom@latest motion@latest
```

Github Packages에 배포되었기 때문에 레지스트리도 [바꿔줘야 한다](https://docs.github.com/en/packages/working-with-a-github-packages-registry/working-with-the-npm-registry#installing-a-package).

```text
[.npmrc]
@stylelist94:registry=https://npm.pkg.github.com
```

그리고 설치하면 된다.

```bash
pnpm add @stylelist94/nine-beauty-actress
```

### 스타일 적용

엔트리 CSS에서 import하면 된다.

```css
/* app/globals.css (Next.js) 또는 src/styles/global.css */
@import '@stylelist94/nine-beauty-actress/style.css';
```

또는 엔트리 포인트에서 import해도 된다.

```tsx
import '@stylelist94/nine-beauty-actress/style.css';
```

### 토큰 사용

디자인 토큰과 시멘틱 변수를 직접 사용할 수 있다.

```tsx
import { palette, spacing } from '@stylelist94/nine-beauty-actress/tokens';
import { vars } from '@stylelist94/nine-beauty-actress/styles';
```
