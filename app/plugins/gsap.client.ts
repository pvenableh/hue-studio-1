import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

export default defineNuxtPlugin(() => {
  gsap.registerPlugin(ScrollTrigger)

  // Clean up ScrollTrigger on route change to prevent stale triggers
  const router = useRouter()
  router.beforeEach(() => {
    ScrollTrigger.getAll().forEach((t) => t.kill())
  })
})
