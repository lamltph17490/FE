import React, { ReactElement, useEffect } from 'react'
import Hero from '../component/Hero'
import { ClientLayout } from '../layouts'
import HomePage from '../component/home/home';

type Props = {
  
}

const Home = (props: Props) => {
  return (
    <HomePage/>

  )
}

Home.getLayout = (page: ReactElement) => <ClientLayout>{page}</ClientLayout>
export default Home
