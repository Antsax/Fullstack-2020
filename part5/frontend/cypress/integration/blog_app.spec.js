describe('Blog app', function () {
  beforeEach(function () {
    cy.request('POST', 'http://localhost:3001/api/testing/reset')
    const user = {
      username: 'testman',
      password: 'salasana',
      name: 'Testy Tester',
    }

    cy.request('POST', 'http://localhost:3001/api/users/', user)
    cy.visit('http://localhost:3000')
  })

  it('Login form is shown', function () {
    cy.contains('login').click()
  })

  describe('Login', function () {
    it('succeeds with correct credentials', function () {
      cy.contains('login').click()
      cy.get('#username').type('testman')
      cy.get('#password').type('salasana')
      cy.get('#login-button').click()

      cy.contains('Logged in as Testy Tester')
    })

    it('fails with wrong credentials', function () {
      cy.contains('login').click()
      cy.get('#username').type('testman')
      cy.get('#password').type('wrong')
      cy.get('#login-button').click()

      cy.get('.error')
        .should('contain', 'wrong username or password')
        .and('have.css', 'color', 'rgb(255, 0, 0)')
        .and('have.css', 'border-style', 'solid')
    })
  })

  describe('when logged in', function () {
    beforeEach(function () {
      cy.login({ username: 'testman', password: 'salasana' })
    })

    it('a blog can be created', function () {
      cy.contains('new blog').click()

      cy.get('#author').type('J.R.R. Tolkien')
      cy.get('#title').type('There and Back Again')
      cy.get('#url').type('lotr.com')

      cy.get('#create-blog').click()
      cy.get('.blogs').contains('There and Back Again')
    })

    it('a blog can be liked', function () {
      cy.createBlog({
        author: 'J.R.R. Tolkien',
        title: 'There and Back Again',
        url: 'lotr.com',
      })

      cy.contains('view').click()
      cy.contains('like').click()
    })

    it('a blog can be deleted', function () {
      cy.createBlog({
        author: 'J.R.R. Tolkien',
        title: 'There and Back Again',
        url: 'lotr.com',
      })

      cy.contains('view').click()
      cy.contains('remove').click()
    })

    it.only('list of blogs organized correctly', function () {
      cy.createBlog({
        author: 'John Travolta',
        title: 'My new martial art',
        url: 'somerandom.org',
        likes: 1,
      })
      cy.createBlog({
        author: 'J.R.R. Tolkien',
        title: 'There and Back Again',
        url: 'lotr.com',
        likes: 100,
      })
      cy.createBlog({
        author: 'Chef McChef',
        title: 'Cooking Food',
        url: 'food.com',
        likes: 14,
      })

      cy.get('.blogs').then((blogs) => {
        cy.wrap(blogs[0]).contains('There and Back Again')
        cy.wrap(blogs[1]).contains('Cooking Food')
        cy.wrap(blogs[2]).contains('My new martial art')
      })
    })
  })
})
