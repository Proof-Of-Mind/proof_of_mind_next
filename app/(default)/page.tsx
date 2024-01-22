export const metadata = {
  title: 'Proof Of Mind',
  description: 'A distribute protocol based on recaptcha.',
}

// import Hero from '@/components/hero'
import Clients from '@/components/clients'
// import Features from '@/components/features'
// import Features02 from '@/components/features-02'
// import Features03 from '@/components/features-03'
// import TestimonialsCarousel from '@/components/testimonials-carousel'
// import Features04 from '@/components/features-04'
// import Pricing from '@/components/pricing'
// import Testimonials from '@/components/testimonials'
// import Cta from '@/components/cta'
import Advance from '@/components/advance'
import Captcha from '@/components/captcha'

export default function Home() {
  return (
    <>
      <Advance />
      <Clients />
      <Captcha />
      {/* <Features02 />
      <Features03 />
      <TestimonialsCarousel />
      <Features04 />
      <Pricing />
      <Testimonials /> */}
      {/* <Cta /> */}
    </>
  )
}
