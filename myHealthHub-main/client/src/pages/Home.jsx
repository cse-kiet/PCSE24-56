import React from 'react'
import {Header,Middle, Explore, Cards} from '../components'
import Feeds from '../services/newsapi'

const Home = () => {
  return (
    <section className="max-w-6xl mx-auto">
      <div className="flex flex-col ">
      
      <Header />
      <Explore />
      {/* <Feeds /> */}
      <Middle />
      </div>
    </section>
  )
}

export default Home
