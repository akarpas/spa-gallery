const chai = require('chai')
const chaiHttp = require('chai-http')
const server = require('../server.js')
const expect = chai.expect
const should = chai.should()

chai.use(chaiHttp)

const bodyOk = {
  text: 'canada',
  page: 1
}

const bodyError = {
  text: '',
  page: 1
}

describe('/POST to /flickr/search with text and page', () => {
  it('it should return a valid response', done => {
    chai
      .request(server)
      .post('/api/flickr/search')
      .send(bodyOk)
      .end((err, res) => {
        res.status.should.be.equal(200)
        done()
      })
  })
  it('it should return an array of photos with length 20', done => {
    chai
      .request(server)
      .post('/api/flickr/search')
      .send(bodyOk)
      .end((err, res) => {
        res.body.should.have.property('photos').with.lengthOf(20)
        done()
      })
  })
  it('it should have user and photo properties in photos', done => {
    chai
      .request(server)
      .post('/api/flickr/search')
      .send(bodyOk)
      .end((err, res) => {
        const onePhoto = res.body.photos[0]
        expect(onePhoto).to.contain.keys('user','photo')
        done()
      })
  })
  it('it should have a url type', done => {
    chai
      .request(server)
      .post('/api/flickr/search')
      .send(bodyOk)
      .end((err, res) => {
        const url = res.body.photos[0].photo.url
        expect(url).to.be.a('string')
        expect(url).to.include('https://')
        done()
      })
  })
})

describe('/POST to /flickr/search with missing text', () => {
  it('it should return error with status 400', done => {
    chai
      .request(server)
      .post('/api/flickr/search')
      .send(bodyError)
      .end((err, res) => {
        res.status.should.be.equal(400)
        res.body.should.have.property('message').to.be.equal('No Text for Photo search Provided')
        done()
      })
  })
  it('it should have no photos', done => {
    chai
      .request(server)
      .post('/api/flickr/search')
      .send(bodyError)
      .end((err, res) => {
        res.body.should.not.have.property('photos')
        done()
      })
  })
})