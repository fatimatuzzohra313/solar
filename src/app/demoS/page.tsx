import DemoHero from '@/components/Demos/DemoHero'
import JoinCommunity from '@/components/joinCommin'
import LandingLayout from '@/components/Layouts/LandingLayout'
import React from 'react'

function page() {
  return (
    <LandingLayout>
    <DemoHero/>
    <JoinCommunity/>
    </LandingLayout>
  )
}

export default page
