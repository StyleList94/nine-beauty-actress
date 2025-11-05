import { Button } from './components/button';
import { FileUploader, FileUploaderProps } from './components/file-uploader';
import { Footer, FooterProps } from './components/footer';
import { Header, HeaderProps } from './components/header';
import { MainContainer, MainContainerProps } from './components/main-container';
import { Switch, SwitchProps } from './components/switch';
import {
  ToggleGroup,
  ToggleGroupItem,
  ToggleGroupProps,
  ToggleGroupItemProps,
  ToggleGroupVariant,
  ToggleGroupSize,
  ToggleGroupSpacing,
} from './components/toggle-group';

import useDebounce from './hooks/use-debounce';
import useMounted from './hooks/use-mounted';
import useVirtualScroll from './hooks/use-virtual-scroll';

export {
  Switch,
  Button,
  FileUploader,
  Footer,
  Header,
  MainContainer,
  ToggleGroup,
  ToggleGroupItem,
  useDebounce,
  useMounted,
  useVirtualScroll,
};

export type {
  SwitchProps,
  FileUploaderProps,
  FooterProps,
  HeaderProps,
  MainContainerProps,
  ToggleGroupProps,
  ToggleGroupItemProps,
  ToggleGroupVariant,
  ToggleGroupSize,
  ToggleGroupSpacing,
};
