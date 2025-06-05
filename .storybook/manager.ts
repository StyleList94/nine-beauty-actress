import { addons } from 'storybook/manager-api';
import { STORY_RENDERED, DOCS_RENDERED } from 'storybook/internal/core-events';

import theme from './theme';

addons.register('TitleAddon', (api) => {
  const projectName = 'Nine Beauty Actress';

  const setDocumentTitle = () => {
    const storyData = api.getCurrentStoryData();
    if (!storyData) {
      document.title = projectName;
    }
    document.title = `${storyData.title} - ${storyData.name} :: ${projectName}`;
  };

  api.on(DOCS_RENDERED, () => {
    setDocumentTitle();
  });
  api.on(STORY_RENDERED, () => {
    setDocumentTitle();
  });
});

addons.setConfig({
  theme,
});
