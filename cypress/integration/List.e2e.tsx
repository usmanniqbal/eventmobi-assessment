/// <reference types="cypress" />

context('e2e gist list in happy flow', () => {
    const mockUsername = 'eunomie';
    const mockForkUrl = 'https://mockgist.com'
    const mockAvatarUrl = 'https://avatars0.githubusercontent.com/u/253563?v=4';
    const mockForkUser = 'mock-fork-user';
    beforeEach(() => {
        cy.visit('http://localhost:3000/');
        cy.server();
        cy.route({
            method: 'GET',
            url: `https://api.github.com/users/${mockUsername}/gists*`,
            response: [
                {
                    files: {
                        'mock.js': 'mock.js'
                    },
                    forks_url: mockForkUrl,
                    description: 'mock description',
                },
            ]
        });
        cy.route({
            method: 'GET',
            url: mockForkUrl,
            response: [
                {
                    owner: {
                        login: mockForkUser,
                    },
                },
                {
                    owner: {
                        avatar_url: mockAvatarUrl
                    },
                }
            ],
        });
    })

    it(`Open gist list and type sample username e.g. ${mockUsername} and press enter`, () => {
        cy.get('#username')
            .type(mockUsername)
            .should('have.value', mockUsername);

        cy.get('#populate').click();

        cy.get('table')
            .find('tbody tr:last')
            .children()
            .should('have.length', 3)

        cy.get('table tbody tr:last td')
            .each((td, index) => {
                switch (index) {
                    case 0:
                        cy.wrap(td).find('div img').should('have.attr', 'src');
                        break;
                    case 1:
                        cy.wrap(td).find('div b')
                            .should('have.text', mockForkUser);
                        cy.wrap(td).find('div img')
                            .should('have.attr', 'src', mockAvatarUrl)
                        break;
                    case 2:
                        cy.wrap(td).should('have.text', 'mock description');
                        break;
                }
            });
    })
})