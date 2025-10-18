# 구미호

내맘대로 디자인 시스템

## 특징

- React 기반 UI Kit
- vanilla-extract로 타입 안전한 CSS-in-TS
- 제로 런타임, 번들 최적화
- 유틸리티 컴포넌트를 많이 수집할 예정!

## 시작

### 패키지 설치

다음 패키지들이 없으면 많이 곤란하다.

- `react`, `react-dom` v18 이상
- `motion` v12 이상

```bash
# dependencies
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
// main.tsx
import '@stylelist94/nine-beauty-actress/style.css';
```
