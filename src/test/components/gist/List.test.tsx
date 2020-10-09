import React from "react";
import { shallow } from "enzyme";
import { Gist } from "../../../components/gist/models/Gist";
import { act } from "react-dom/test-utils";
import List from "../../../components/gist/List";

const mockUser = 'happy_flow_user';
const mockGists: { [key: string]: Gist[] } = {
    'happy_flow_user': [
        {
            files: {

            },
            forks_url: '',
            description: 'mock description',
        } as Gist,
    ]
};
jest.mock("../../../components/gist/GistService.ts", () => {
    return {
        GistService: jest.fn().mockImplementation(() => {
            return {
                getGistDataByUsername: (username: string) => mockGists[username],
            };
        })
    };
});
jest.mock('../../../assets/logos/js.png', () => "js_file_path");
jest.mock('../../../assets/logos/py.png', () => "py_file_path");
jest.mock('../../../assets/logos/ts.png', () => "ts_file_path");
jest.mock('../../../assets/logos/unknown.png', () => "un_file_path");

describe("Rendering of List in happy flow ", async () => {
    it('Should render component', async () => {
        const wrapper = shallow(<List />);
        wrapper.find('input#username').simulate('change', { currentTarget: { name: 'username', value: mockUser }, preventDefault: jest.fn });
        wrapper.find('button#populate').simulate('click');
        await act(async () => {
            await Promise.resolve(wrapper);
            await new Promise(resolve => setImmediate(resolve));
            wrapper.update();
        });

        const tr = wrapper.find('tr');
        expect(tr.length).toEqual(2);
        expect(tr.at(1).children().length).toEqual(3)
        expect(tr.at(1).children().last().text()).toEqual(mockGists[mockUser][0].description);
    })
});


