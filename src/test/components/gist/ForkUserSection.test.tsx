import React from "react";
import { mount } from "enzyme";
import ForkUserSection, { IForkUserProps, } from "../../../components/gist/ForkUserSection";
import { ForkUser, Owner } from "../../../components/gist/models/Gist";
import { act } from "react-dom/test-utils";

const users: { [key: string]: ForkUser[] } = {
    'noUrl': [
        {
            owner: {
                login: "mock_login",
            } as Owner,
        } as ForkUser,
    ],
    'url': [
        {
            owner: {
                avatar_url: 'mock_image'
            } as Owner,
        } as ForkUser,
    ]
};
jest.mock("../../../components/gist/GistService.ts", () => {
    return {
        GistService: jest.fn().mockImplementation(() => {
            return {
                getForkUsersDataByUrl: (forks_url: string) => users[forks_url],
            };
        })
    };
});

describe("Fork user doesn't have any avatar defined", async () => {
    const props: IForkUserProps = {
        forksUrl: "noUrl",
    };

    it('Should render component with login/user name', async () => {
        const wrapper = mount(
            <ForkUserSection {...props} />
        );
        await act(async () => {
            await Promise.resolve(wrapper);
            await new Promise(resolve => setImmediate(resolve));
            wrapper.update();
        });

        expect(wrapper.find('td').length).toEqual(1);
        expect(wrapper.find('div').length).toEqual(1);
        const b = wrapper.find("b");
        expect(b.length).toEqual(users[props.forksUrl].length);
        expect(b.first().text()).toEqual(users[props.forksUrl][0].owner.login);
    })
});

describe("Fork user has avatar defined", async () => {
    const props: IForkUserProps = {
        forksUrl: "url",
    };

    it('Should render component with avatar', async () => {
        const wrapper = mount(
            <ForkUserSection {...props} />
        );
        await act(async () => {
            await Promise.resolve(wrapper);
            await new Promise(resolve => setImmediate(resolve));
            wrapper.update();
        });

        expect(wrapper.find('td').length).toEqual(1);
        expect(wrapper.find('div').length).toEqual(1);
        const b = wrapper.find("img");
        expect(b.length).toEqual(users[props.forksUrl].length);
        expect(b.first().prop('src')).toEqual(users[props.forksUrl][0].owner.avatar_url);
    })
});
