<template>
  <div ref="chartRef" class="idea-chart relative w-full isolate">
    <div class="title-bg"></div>

    <!-- Desktop animated dashed lines -->
    <div ref="topLineRef" class="idea-chart__line idea-chart__line-top"></div>
    <div
      ref="bottomLineRef"
      class="idea-chart__line idea-chart__line-bottom"
    ></div>

    <!-- Mobile vertical animated line -->
    <div class="idea-chart__line-dot"></div>
    <div
      ref="verticalLineRef"
      class="idea-chart__line idea-chart__line-vertical"
    ></div>

    <div
      v-for="(step, index) in steps"
      :key="index"
      :ref="
        (el) => {
          if (el) stepRefs[index] = el;
        }
      "
      :class="[
        'idea-chart__step',
        {
          'is-hovered': hoveredStep === index && !isMobile,
          'is-dimmed':
            hoveredStep !== null && hoveredStep !== index && !isMobile,
        },
      ]"
      @mouseenter="!isMobile && onStepHover(index)"
      @mouseleave="!isMobile && onStepLeave()"
    >
      <div class="idea-chart__step-list idea-chart__step-list-upper">
        <h5
          v-for="(item, itemIndex) in step.list_one"
          :key="itemIndex"
          :ref="
            (el) => {
              if (el)
                listItemRefs.push({
                  el,
                  stepIndex: index,
                  listType: 'upper',
                  itemIndex,
                });
            }
          "
          class="list-item"
        >
          {{ item }}
        </h5>
      </div>

      <h2
        class="idea-chart__step-title relative flex items-center justify-center"
      >
        {{ step.title }}
        <Icon
          name="lucide:chevron-right"
          class="chevron-icon chevron-desktop"
        />
        <Icon
          name="lucide:chevron-down"
          class="chevron-icon chevron-mobile"
        />
      </h2>

      <div class="idea-chart__step-list idea-chart__step-list-lower">
        <h5
          v-for="(item, itemIndex) in step.list_two"
          :key="itemIndex"
          :ref="
            (el) => {
              if (el)
                listItemRefs.push({
                  el,
                  stepIndex: index,
                  listType: 'lower',
                  itemIndex,
                });
            }
          "
          class="list-item"
        >
          {{ item }}
        </h5>
      </div>
    </div>

    <div
      ref="answerRef"
      :class="[
        'idea-chart__answer',
        { 'is-dimmed': hoveredStep !== null && !isMobile },
      ]"
      @mouseenter="!isMobile && onCircleHover()"
      @mouseleave="!isMobile && onCircleLeave()"
    >
      <div class="ripple-container">
        <!-- Expanding circle ripples -->
        <div
          v-for="n in 3"
          :key="n"
          :ref="
            (el) => {
              if (el) rippleRefs[n - 1] = el;
            }
          "
          class="ripple-circle"
        ></div>
      </div>
      <h3 ref="circleRef">Big Idea</h3>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount, nextTick } from "vue";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useMediaQuery } from "@vueuse/core";

gsap.registerPlugin(ScrollTrigger);

// Props
const props = defineProps({
  animateOnScroll: {
    type: Boolean,
    default: true,
  },
});

const steps = [
  {
    title: "Understanding",
    list_one: [
      "Vision",
      "Values",
      "Mission",
      "Value Proposition",
      "Culture",
      "Target Market",
      "Segments",
      "Stakeholder Perceptions",
      "Services",
      "Products",
      "Infrastructure",
    ],
    list_two: [
      "Marketing Strategy",
      "Competition",
      "Trends",
      "Pricing",
      "Distribution",
      "Research",
      "Environment",
      "Economics",
      "Strengths/Weaknesses",
      "Opportunities",
      "Threats",
    ],
  },
  {
    title: "Clarifying",
    list_one: ["Core Values", "Brand Attributes"],
    list_two: ["Competitive Advantage", "Brand Strategy"],
  },
  {
    title: "Positioning",
    list_one: ["Differentiation", "Value Proposition"],
    list_two: ["Business Category"],
  },
  {
    title: "Brand Essence",
    list_one: ["Central Idea", "Unifying Concept"],
    list_two: ["Key Messages", "Voice and Tone"],
  },
];

// Refs
const chartRef = ref(null);
const answerRef = ref(null);
const circleRef = ref(null);
const topLineRef = ref(null);
const bottomLineRef = ref(null);
const verticalLineRef = ref(null);
const stepRefs = ref([]);
const listItemRefs = ref([]);
const rippleRefs = ref([]);
const hoveredStep = ref(null);
const isCircleHovered = ref(false);

// Detect mobile viewport
const isMobile = useMediaQuery("(max-width: 1023px)");

let scrollTriggerInstance = null;
let marchingAntsAnimation = null;
let verticalLineAnimation = null;
let pulseAnimation = null;
let rippleAnimations = [];

// Big Idea circle hover handlers
const onCircleHover = () => {
  isCircleHovered.value = true;

  if (circleRef.value) {
    gsap.to(circleRef.value, {
      scale: 1.3,
      duration: 0.4,
      ease: "back.out(1.5)",
    });
  }
};

const onCircleLeave = () => {
  isCircleHovered.value = false;

  if (circleRef.value) {
    gsap.to(circleRef.value, {
      scale: 1,
      duration: 0.4,
      ease: "power2.out",
    });
  }
};

// Step hover handlers with progressive scaling
const onStepHover = (index) => {
  hoveredStep.value = index;

  if (isCircleHovered.value) return;

  const scaleValues = [1.05, 1.1, 1.15, 1.2];
  const moveAmount = index === 3 ? 40 : 0;
  const lineExtension = index === 3 ? 40 : 0;

  if (circleRef.value) {
    gsap.to(circleRef.value, {
      scale: scaleValues[index],
      duration: 0.4,
      ease: "power2.out",
    });
  }

  if (answerRef.value) {
    gsap.to(answerRef.value, {
      x: moveAmount,
      duration: 0.4,
      ease: "power2.out",
    });
  }

  if (topLineRef.value && bottomLineRef.value) {
    gsap.to([topLineRef.value, bottomLineRef.value], {
      "--line-extension": `${lineExtension}px`,
      duration: 0.4,
      ease: "power2.out",
    });
  }
};

const onStepLeave = () => {
  hoveredStep.value = null;

  if (isCircleHovered.value) return;

  if (circleRef.value) {
    gsap.to(circleRef.value, {
      scale: 1,
      duration: 0.4,
      ease: "power2.out",
    });
  }

  if (answerRef.value) {
    gsap.to(answerRef.value, {
      x: 0,
      duration: 0.4,
      ease: "power2.out",
    });
  }

  if (topLineRef.value && bottomLineRef.value) {
    gsap.to([topLineRef.value, bottomLineRef.value], {
      "--line-extension": "0px",
      duration: 0.4,
      ease: "power2.out",
    });
  }
};

// Start continuous animations (marching ants, pulse, ripples)
const startContinuousAnimations = () => {
  // Desktop marching ants animation on horizontal dashed lines
  if (topLineRef.value && bottomLineRef.value) {
    marchingAntsAnimation = gsap.to([topLineRef.value, bottomLineRef.value], {
      "--dash-animation": "20px",
      duration: 1,
      ease: "none",
      repeat: -1,
    });
  }

  // Mobile vertical line animation
  if (verticalLineRef.value) {
    verticalLineAnimation = gsap.to(verticalLineRef.value, {
      "--dash-animation-vertical": "20px",
      duration: 1,
      ease: "none",
      repeat: -1,
    });
  }

  // Circle pulse animation
  if (circleRef.value) {
    pulseAnimation = gsap.to(circleRef.value, {
      scale: 1.08,
      duration: 2,
      ease: "power1.inOut",
      yoyo: true,
      repeat: -1,
    });
  }

  // Ripple animations
  rippleRefs.value.filter(Boolean).forEach((ripple, index) => {
    const delay = index * 0.6;
    const rippleAnim = gsap.to(ripple, {
      scale: 2.5,
      opacity: 0,
      duration: 2,
      ease: "power2.out",
      repeat: -1,
      delay: delay,
      repeatDelay: 1.2,
    });
    rippleAnimations.push(rippleAnim);
  });
};

// Scroll animation setup
onMounted(async () => {
  await nextTick();

  if (!chartRef.value) return;

  // If animateOnScroll is false, set everything to visible immediately
  if (!props.animateOnScroll) {
    gsap.set(stepRefs.value.filter(Boolean), { opacity: 1 });

    const listElements = listItemRefs.value
      .map((item) => item.el)
      .filter(Boolean);
    gsap.set(listElements, { opacity: 1 });

    gsap.set(answerRef.value, { opacity: 1, scale: 1 });
    gsap.set(rippleRefs.value.filter(Boolean), { opacity: 1, scale: 1 });

    gsap.set([topLineRef.value, bottomLineRef.value], {
      "--dash-offset": "100%",
      "--line-extension": "0px",
    });

    gsap.set(verticalLineRef.value, {
      "--dash-offset-vertical": "100%",
    });

    // Start continuous animations immediately
    startContinuousAnimations();
    return;
  }

  // Original scroll-triggered animation setup
  gsap.set(stepRefs.value.filter(Boolean), { opacity: 0 });

  const listElements = listItemRefs.value
    .map((item) => item.el)
    .filter(Boolean);
  gsap.set(listElements, { opacity: 0 });

  gsap.set(answerRef.value, { opacity: 0, scale: 0.8 });
  gsap.set(rippleRefs.value.filter(Boolean), { opacity: 0, scale: 0.5 });

  gsap.set([topLineRef.value, bottomLineRef.value], {
    "--dash-offset": "0%",
    "--line-extension": "0px",
  });

  gsap.set(verticalLineRef.value, {
    "--dash-offset-vertical": "0%",
  });

  const tl = gsap.timeline({
    paused: true,
    onComplete: startContinuousAnimations,
  });

  stepRefs.value.filter(Boolean).forEach((step, stepIndex) => {
    const stepStartTime = stepIndex === 0 ? 0 : `-=0.3`;

    tl.to(
      step,
      {
        opacity: 1,
        duration: 0.25,
        ease: "power2.out",
      },
      stepStartTime,
    );

    const stepListItems = listItemRefs.value.filter(
      (item) => item.stepIndex === stepIndex,
    );

    stepListItems.forEach((item, itemIndex) => {
      tl.to(
        item.el,
        {
          opacity: 1,
          duration: 0.12,
          ease: "power2.out",
        },
        `-=${itemIndex === 0 ? 0.2 : 0.1}`,
      );
    });
  });

  // Desktop horizontal lines
  tl.to(
    [topLineRef.value, bottomLineRef.value],
    {
      "--dash-offset": "100%",
      duration: 0.8,
      ease: "power2.out",
    },
    "-=0.6",
  );

  // Mobile vertical line
  tl.to(
    verticalLineRef.value,
    {
      "--dash-offset-vertical": "100%",
      duration: 0.8,
      ease: "power2.out",
    },
    "-=0.8",
  );

  tl.to(
    answerRef.value,
    {
      opacity: 1,
      scale: 1,
      duration: 0.4,
      ease: "back.out(1.2)",
    },
    "-=0.5",
  );

  rippleRefs.value.filter(Boolean).forEach((ripple, index) => {
    tl.to(
      ripple,
      {
        opacity: 1,
        scale: 1,
        duration: 0.15,
        ease: "power2.out",
      },
      `-=${index === 0 ? 0.3 : 0.08}`,
    );
  });

  scrollTriggerInstance = ScrollTrigger.create({
    trigger: chartRef.value,
    start: "top 95%",
    end: "bottom 20%",
    once: true,
    onEnter: () => {
      tl.play();
    },
  });
});

onBeforeUnmount(() => {
  if (scrollTriggerInstance) {
    scrollTriggerInstance.kill();
  }
  if (marchingAntsAnimation) {
    marchingAntsAnimation.kill();
  }
  if (verticalLineAnimation) {
    verticalLineAnimation.kill();
  }
  if (pulseAnimation) {
    pulseAnimation.kill();
  }
  rippleAnimations.forEach((anim) => anim.kill());
});
</script>

<style scoped>
@reference 'tailwindcss';
.idea-chart {
  position: relative;
  height: 60vh;
  min-height: 600px;
  width: 100%;
  @apply flex items-center justify-start px-4 md:px-10 lg:px-0;

  /* Mobile: vertical layout with more compact spacing */
  @media (max-width: theme("screens.lg")) {
    height: auto;
    min-height: auto;
    padding: 2rem 0.5rem;
    @apply flex flex-col items-center justify-start gap-6;
  }

  .title-bg {
    height: 30px;
    width: calc(100% - 8rem);
    top: calc(50% - 15px);
    z-index: 1;
    @apply absolute hidden lg:block;
    background: linear-gradient(to right, transparent, var(--color-bg-alt));
  }

  /* Animated dashed lines */
  .idea-chart__line {
    content: "";
    position: absolute;
    border: none;
    z-index: 5;
    transition: opacity 0.3s ease;
  }

  /* Desktop horizontal lines */
  .idea-chart__line-top,
  .idea-chart__line-bottom {
    background-image: linear-gradient(
      to right,
      var(--color-accent) 50%,
      transparent 50%
    );
    background-size: 10px 1px;
    background-repeat: repeat-x;
    background-position: var(--dash-animation, 0) 0;
    height: 1px;

    @media (max-width: theme("screens.lg")) {
      display: none;
    }
  }

  .idea-chart__line-top {
    top: 40%;
    left: -2rem;
    width: calc(90% - 16rem + var(--line-extension, 0px));
    transform: rotate(82deg);
    transform-origin: right center;

    clip-path: polygon(
      0 0,
      var(--dash-offset, 0%) 0,
      var(--dash-offset, 0%) 100%,
      0 100%
    );

    @media (min-width: theme("screens.lg")) {
      left: auto;
      right: calc(16rem - var(--line-extension, 0px));
      transform: rotate(13deg);
      width: calc(90% - 16rem + var(--line-extension, 0px));
      transform-origin: right center;
      top: calc(50% - 4rem);
    }
    @media (min-width: 1090px) {
      transform: rotate(11deg);
    }
    @media (min-width: 1180px) {
      transform: rotate(9.5deg);
    }
    @media (min-width: theme("screens.xl")) {
      transform: rotate(10.5deg);
    }
  }

  .idea-chart__line-bottom {
    bottom: calc(50%);
    left: -2rem;
    width: calc(90% - 8rem + var(--line-extension, 0px));
    transform: rotate(-82deg);
    transform-origin: right center;

    clip-path: polygon(
      0 0,
      var(--dash-offset, 0%) 0,
      var(--dash-offset, 0%) 100%,
      0 100%
    );

    @media (min-width: theme("screens.lg")) {
      left: auto;
      right: calc(16rem - var(--line-extension, 0px));
      transform: rotate(-13deg);
      width: calc(90% - 16rem + var(--line-extension, 0px));
      transform-origin: right center;
      bottom: calc(50% - 4rem);
    }
    @media (min-width: 1090px) {
      transform: rotate(-11deg);
    }
    @media (min-width: 1180px) {
      transform: rotate(-9.5deg);
    }
    @media (min-width: theme("screens.xl")) {
      transform: rotate(-10.5deg);
    }
  }

  /* Mobile dot at start of vertical line */
  .idea-chart__line-dot {
    display: none;

    @media (max-width: theme("screens.lg")) {
      display: block;
      position: absolute;
      left: 50%;
      top: 0;
      transform: translate(-50%, -50%);
      width: 8px;
      height: 8px;
      border-radius: 50%;
      background: var(--color-accent);
      z-index: 11;
    }
  }

  /* Mobile vertical line down the center */
  .idea-chart__line-vertical {
    display: none;

    @media (max-width: theme("screens.lg")) {
      display: block;
      position: absolute;
      left: 50%;
      top: 0;
      transform: translateX(-50%);
      width: 2px;
      height: calc(100% - 5.5rem);
      background-image: linear-gradient(
        to bottom,
        var(--color-accent) 50%,
        transparent 50%
      );
      background-size: 2px 12px;
      background-repeat: repeat-y;
      background-position: 0 var(--dash-animation-vertical, 0);
      z-index: 10;
      pointer-events: none;

      clip-path: polygon(
        0 0,
        100% 0,
        100% var(--dash-offset-vertical, 0%),
        0 var(--dash-offset-vertical, 0%)
      );
    }
  }

  .idea-chart__step {
    z-index: 15;
    margin: 0 10px;
    @apply relative mb-12 flex h-full w-full flex-col items-center justify-center lg:items-start;
    transition:
      opacity 0.4s ease,
      transform 0.3s ease;

    /* Desktop: add top margin to align with Big Idea */
    @media (min-width: theme("screens.lg")) {
      margin-top: 50px;
    }

    /* Mobile: compact grid layout with side-positioned lists */
    @media (max-width: theme("screens.lg")) {
      margin: 0;
      margin-bottom: 0;
      width: 100%;
      max-width: 100%;
      @apply grid grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] items-center gap-x-4 gap-y-2;
      padding: 0 0.5rem;
    }

    &.is-dimmed {
      @media (min-width: theme("screens.lg")) {
        opacity: 0.25;

        .idea-chart__step-title {
          opacity: 0.3;
        }

        .idea-chart__step-list h5 {
          opacity: 0.15;
        }
      }
    }

    &.is-hovered {
      @media (min-width: theme("screens.lg")) {
        opacity: 1;

        .idea-chart__step-title {
          transform: scale(1.05) translateX(5px);

          .chevron-desktop {
            transform: translateX(5px);
            opacity: 1;
          }
        }

        .idea-chart__step-list h5 {
          opacity: 0.8;
        }
      }
    }

    .idea-chart__step-title {
      font-size: 15px;
      line-height: 30px;
      color: var(--color-text);
      @apply flex w-auto flex-col items-center text-center font-bold tracking-wider whitespace-nowrap uppercase lg:items-start lg:px-2 lg:text-left lg:tracking-wide xl:tracking-wider;
      transition: all 0.3s ease;

      /* Desktop: order 2 to be in the middle */
      @media (min-width: theme("screens.lg")) {
        order: 2;
      }

      /* Mobile: centered in grid and vertically aligned with lists */
      @media (max-width: theme("screens.lg")) {
        order: 2;
        font-size: 13px;
        line-height: 1.3;
        @apply col-start-2 row-span-2 items-center self-center text-center;
        padding: 0.5rem 0.75rem;
        background: var(--color-bg);
        z-index: 20;
        position: relative;
      }

      .chevron-icon {
        @apply absolute;
        color: var(--color-text-muted);
        transition:
          transform 0.3s ease,
          opacity 0.3s ease;
      }

      /* Desktop chevron */
      .chevron-desktop {
        @apply -right-3;
        @media (max-width: theme("screens.lg")) {
          display: none;
        }
      }

      /* Mobile chevron - hidden */
      .chevron-mobile {
        display: none;
      }

      @media (min-width: theme("screens.lg")) {
        font-size: 15px;
      }
      @media (min-width: theme("screens.xl")) {
        font-size: 15px;
      }
    }

    .idea-chart__step-list {
      @apply text-center lg:absolute lg:left-0 lg:px-2 lg:text-left;

      /* Mobile: positioned to sides with smaller text */
      @media (max-width: theme("screens.lg")) {
        position: static;
        @apply flex flex-col gap-0.5;
        font-size: 8px;
        max-width: 100%;
        overflow: hidden;
      }

      h5 {
        font-size: 10px;
        color: var(--color-text-secondary);
        @apply uppercase opacity-40;
        cursor: pointer;
        transform-origin: center;
        list-style: none;
        display: block;
        line-height: 1.4;

        /* Mobile: much smaller and tighter with overflow control */
        @media (max-width: theme("screens.lg")) {
          cursor: default;
          font-size: 7.5px;
          line-height: 1.3;
          letter-spacing: 0.02em;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          max-width: 100%;
        }

        &::marker {
          display: none;
          content: none;
        }
      }

      /* Simple hover scale effect on list items - desktop only */
      .list-item {
        transition:
          transform 0.2s ease,
          opacity 0.2s ease;
        display: block;

        @media (min-width: theme("screens.lg")) {
          &:hover {
            transform: scale(1.08);
            opacity: 0.9 !important;
          }
        }
      }
    }

    .idea-chart__step-list-upper {
      /* Desktop: order 1, positioned above title */
      @media (min-width: theme("screens.lg")) {
        order: 1;
        bottom: calc(50% + 20px);
      }

      /* Mobile: positioned to left side */
      @media (max-width: theme("screens.lg")) {
        order: 1;
        @apply col-start-1 row-span-2 row-start-1 self-center text-right;
        align-items: flex-end;
      }
    }

    .idea-chart__step-list-lower {
      /* Desktop: order 3, positioned below title */
      @media (min-width: theme("screens.lg")) {
        order: 3;
        top: calc(50% + 20px);
      }

      /* Mobile: positioned to right side */
      @media (max-width: theme("screens.lg")) {
        order: 3;
        @apply col-start-3 row-span-2 row-start-1 self-center text-left;
        align-items: flex-start;
      }
    }
  }

  .idea-chart__answer {
    z-index: 50;
    @apply relative flex h-full flex-col items-center justify-center uppercase;
    transition: opacity 0.4s ease;
    position: relative;

    /* Mobile: slightly more compact */
    @media (max-width: theme("screens.lg")) {
      margin-top: 1.5rem;
      height: auto;
      background: var(--color-bg);
    }

    @media (min-width: theme("screens.lg")) {
      cursor: pointer;
    }

    &.is-dimmed {
      @media (min-width: theme("screens.lg")) {
        opacity: 0.3;
      }
    }

    .ripple-container {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: 16rem;
      height: 16rem;
      pointer-events: none;
      z-index: 45;

      /* Mobile: smaller */
      @media (max-width: theme("screens.lg")) {
        width: 11rem;
        height: 11rem;
      }
    }

    .ripple-circle {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: 16rem;
      height: 16rem;
      border-radius: 50%;
      border: 2px solid var(--color-accent);
      opacity: 0;
      pointer-events: none;

      /* Mobile: smaller */
      @media (max-width: theme("screens.lg")) {
        width: 11rem;
        height: 11rem;
        border-width: 1.5px;
      }
    }

    h3 {
      font-size: 18px;
      background: var(--color-accent);
      color: var(--white);
      z-index: 50;
      position: relative;
      @apply flex h-64 w-64 flex-col items-center justify-center rounded-full font-bold tracking-wider;
      transition: box-shadow 0.3s ease;
      transform-origin: center;

      /* Mobile: smaller */
      @media (max-width: theme("screens.lg")) {
        @apply h-44 w-44;
        font-size: 14px;
      }

      &:hover {
        @media (min-width: theme("screens.lg")) {
          box-shadow: var(--shadow-lg);
        }
      }
    }
  }
}
</style>
