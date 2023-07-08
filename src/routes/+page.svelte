<script>
  import machine_images from "../mock/machine_images.json";
  import customer_feedbacks from "../mock/customer_feedbacks.json";
</script>

<div
  class="bg-[conic-gradient(at_top_right,_var(--tw-gradient-stops))] from-purple-200 via-purple-400 to-purple-800 w-full h-[50vh]"
/>
<div class="px-8 py-4">
  <h1 class="text-2xl font-medium px-2 py-2">Machines We Provide</h1>
  <div class="flex flex-row py-2 space-x-8 overflow-auto no-scrollbar">
    {#each machine_images as {src, alt}, index (index)}
      <img
        {src}
        {alt}
        class="w-[20%] aspect-square rounded-md shadow-[rgba(0,0,0,0.19)_0px_10px_20px,rgba(0,0,0,0.23)_0px_6px_6px] shadow-lg"
      />
    {/each}
  </div>
</div>
<div class="px-8 py-4">
  <h1 class="text-2xl font-medium px-2 py-2">Customer Feedback</h1>
  <div class="flex flex-row py-2 space-x-8 overflow-auto no-scrollbar">
    {#each customer_feedbacks as {feedback, author}, index (index)}
      <div
        class="min-w-[25%] justify-between aspect-[3/1] px-3 py-3 flex flex-col rounded-md border-black shadow-[rgba(0,0,0,0.19)_0px_10px_20px,rgba(0,0,0,0.23)_0px_6px_6px] shadow-lg"
      >
        <h2 class="text-xl">{feedback}</h2>
        <p class="w-full text-right">- {author}</p>
      </div>
    {/each}
  </div>
</div>

<style>
  .no-scrollbar::-webkit-scrollbar {
    display: none;
  }

  /* Hide scrollbar for IE, Edge and Firefox */
  .no-scrollbar {
    -ms-overflow-style: none; /* IE and Edge */
    scrollbar-width: none; /* Firefox */
  }
</style>
