# 구미호

내맘대로 디자인 시스템

## 특징

- React, Tailwind CSS 기반 UI Kit
- 유틸리티 컴포넌트를 많이 수집할 예정!

## 시작

### 패키지 설치

다음 패키지들이 없으면 많이 곤란하다.

- `react`, `react-dom` v18 이상
- `tailwindcss` v4 이상
- `motion` v12 이상

```bash
# dependencies
pnpm add react@latest react-dom@latest motion@latest

# devDependencies
pnpm add -D tailwindcss@latest
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

`tailwindcss`가 이 패키지에 사용된 스타일도 알아차릴 수 있도록 최상위 CSS를 업데이트 해야한다.

```css
/* global.css */

@import 'tailwindcss';

/* 상대경로이니깐 입맛에 맞게 바꾸면 된다. */
@source './node_modules/@stylelist94/nine-beauty-actress';
```
