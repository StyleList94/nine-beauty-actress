import { Switch, SwitchProps } from './components/switch';
import { Button } from './components/button';
import { FileUploader, FileUploaderProps } from './components/file-uploader';
import { Footer, FooterProps } from './components/footer';
import { Header, HeaderProps } from './components/header';
import { MainContainer, MainContainerProps } from './components/main-container';

import useDebounce from './hooks/use-debounce';
import useEffectEvent from './hooks/use-effect-event';
import useMounted from './hooks/use-mounted';
import useVirtualScroll from './hooks/use-virtual-scroll';

export {
  Switch,
  Button,
  FileUploader,
  Footer,
  Header,
  MainContainer,
  useDebounce,
  // eslint-disable-next-line @typescript-eslint/no-deprecated
  useEffectEvent,
  useMounted,
  useVirtualScroll,
};

export type {
  SwitchProps,
  FileUploaderProps,
  FooterProps,
  HeaderProps,
  MainContainerProps,
};
