import { PropsWithChildren, ReactElement } from 'react';
import { ThemeProvider } from 'styled-components';

import { DeckContext, DeckContextType } from './deck/deck';
import defaultTheme from '../theme/default-theme';
import Progress, { Circle } from './progress';
import { DeepPartial } from '../types/deep-partial';

const mountWithContext = (
  tree: ReactElement,
  context: DeepPartial<DeckContextType>
) => {
  const WrappingThemeProvider = (props: PropsWithChildren<{}>) => (
    <DeckContext.Provider
      value={{
        ...(context as DeckContextType),
        skipTo: jest.fn()
      }}
    >
      <ThemeProvider theme={defaultTheme}>{props.children}</ThemeProvider>
    </DeckContext.Provider>
  );
  return mount(tree, { wrappingComponent: WrappingThemeProvider });
};

describe('<Progress />', () => {
  it('should render the right amount of circles', () => {
    const wrapper = mountWithContext(<Progress />, {
      slideCount: 5,
      activeView: {
        slideIndex: 0
      }
    });
    expect(wrapper.find(Circle).length).toBe(5);
  });

  it('should render the right amount of circles with the current circle in the active state', () => {
    const wrapper = mountWithContext(<Progress />, {
      slideCount: 5,
      activeView: {
        slideIndex: 4
      }
    });
    expect(wrapper.find(Circle).at(4).prop('active')).toBe(true);
  });
});
