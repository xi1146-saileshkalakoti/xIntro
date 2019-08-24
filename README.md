# xInduction
Induction app for new members joining Xebia


> ### Webpack  
> Avoid async loading based on routes  
> Reason
> 1. Need to preload the entire UI since the experience should not show a load (plan to use [prefetch](https://webpack.js.org/guides/code-splitting/#prefetchingpreloading-modules) since the flow is fixed).
> 2. No browser routes since it works as an application and one has to come after another

> ### Optimizations
> 1. image optimizations