<script>
  import "../app.postcss";
</script>

<div class="no-scrollbar flex flex-col h-max">
  <div
    class="sticky top-0 w-full h-full py-6 px-8 flex flex-row items-center justify-between bg-gray-200"
  >
    <a class="ml-0 h-full text-3xl font-bold" href="/">Machine Rental Application</a>
    <div
      class="mr-0 flex h-full
    z flex-row w-[20%]"
    >
      <a class="w-[33%] text-center" href="/">Home</a>|<a
        class="w-[33%] text-center"
        href="/market">Market</a
      >|<a class="w-[33%] text-center" href="/sell">Sell</a>
    </div>
  </div>

  <div class="min-h-[100vh] flex-grow">
    <slot />
  </div>

  <div class="h-full py-6 bg-slate-300 flex flex-col items-center justify-center">
    <p>&#169; 2023</p>
    <p>Developed by Manan Soni</p>
  </div>
</div>
