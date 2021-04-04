import { shallow } from 'enzyme';
import * as React from 'react';

import { Text } from '../../src/edgelabels/Text';
import { getEdgeMeta } from '../stubs';

describe('Text', () => {
  it('renders correctly', () => {
    const wrapper = shallow(
      <Text edgeMeta={getEdgeMeta('1', '2', 'test label')} />
    );
    expect(wrapper).toMatchSnapshot();
  });

  it('renders the given label', () => {
    const wrapper = shallow(
      <Text edgeMeta={getEdgeMeta('1', '2', 'test label')} />
    );
    const tspanElement = wrapper.find('tspan');
    expect(tspanElement.text()).toBe('test label');
  });

  it('renders the empty string label when label undefined', () => {
    const wrapper = shallow(
      <Text edgeMeta={getEdgeMeta('1', '2', undefined)} />
    );
    const tspanElement = wrapper.find('tspan');
    expect(tspanElement.text()).toBe('');
  });

  it('uses the custom css classname when passed', () => {
    const edgeMeta = getEdgeMeta('1', '2', 'test label');
    edgeMeta.styles.label.className = 'test-classname';

    const wrapper = shallow(<Text edgeMeta={edgeMeta} />);
    const text = wrapper.find('text');
    expect(text.hasClass('test-classname')).toBe(true);
  });
});
