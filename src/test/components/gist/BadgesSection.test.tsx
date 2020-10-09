import React from "react";
import BadgesSection, { IBadgeProps } from "../../../components/gist/BadgesSection";
import { mount } from "enzyme";

jest.mock('../../../assets/logos/js.png', () => "js_file_path");
jest.mock('../../../assets/logos/py.png', () => "py_file_path");
jest.mock('../../../assets/logos/ts.png', () => "ts_file_path");
jest.mock('../../../assets/logos/unknown.png', () => "un_file_path");

describe("Happy flow of BadgesSection rendering", async () => {
  const props: IBadgeProps = {
    files: {
      'mock.js': {},
      "mock.jsx": {},
      "mock.py": {},
      "mock.ts": {},
      "mock.unknown": {},
    },
  };

  it('Should render proper badge/tags', async () => {
    const wrapper = mount(
      <BadgesSection {...props} />
    );

    expect(wrapper.find('td').length).toEqual(1);
    expect(wrapper.find('div').length).toEqual(1);
    const imgs = wrapper.find("img");
    expect(imgs.length).toEqual(Object.keys(props.files).length);
    expect(imgs.at(0).props().src).toEqual("js_file_path");
    expect(imgs.at(1).props().src).toEqual("js_file_path");
    expect(imgs.at(2).props().src).toEqual("py_file_path");
    expect(imgs.at(3).props().src).toEqual("ts_file_path");
    expect(imgs.at(4).props().src).toEqual("un_file_path");
  })
});
