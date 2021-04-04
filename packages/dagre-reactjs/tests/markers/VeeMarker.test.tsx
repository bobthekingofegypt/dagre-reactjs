import { shallow } from 'enzyme';
import * as React from 'react';

import { VeeMarker } from '../../src/markers/VeeMarker';
import { getEdgeMeta } from '../stubs';

describe('VeeMarker', () => {
  it('renders correctly', () => {
    const wrapper = shallow(
      <VeeMarker
        edgeMeta={getEdgeMeta('1', '2', 'testlabel')}
        markerId="testID"
      />
    );
    expect(wrapper).toMatchSnapshot();
  });

  it('sets correct id to passed id', () => {
    const edgeMeta = getEdgeMeta('1', '2', 'test label');

    const wrapper = shallow(
      <VeeMarker edgeMeta={edgeMeta} markerId="monkey" />
    );
    const path = wrapper.find('marker');
    expect(path.prop('id')).toBe('monkey');
  });

  it('uses marker classname if sent', () => {
    const edgeMeta = getEdgeMeta('1', '2', 'test label');
    edgeMeta.styles.marker.className = 'test-classname';

    const wrapper = shallow(
      <VeeMarker edgeMeta={edgeMeta} markerId="monkey" />
    );
    const path = wrapper.find('path');
    expect(path.hasClass('test-classname')).toBe(true);
  });

  it('uses custom styles if passed', () => {
    const edgeMeta = getEdgeMeta('1', '2', 'test label');
    edgeMeta.styles.marker.styles = {
      fill: '#000',
    };

    const wrapper = shallow(
      <VeeMarker edgeMeta={edgeMeta} markerId="monkey" />
    );
    const path = wrapper.find('path');
    expect(path.prop('style')).toEqual(edgeMeta.styles.marker.styles);
  });
});
