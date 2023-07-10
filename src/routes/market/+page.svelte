<script lang="ts">
  import { goto } from "$app/navigation";

  export let data;

  $: filtered_machines = data.machines;
  $: market_options = data.market_options;

  const filters: { Company: string[]; Leaser: string[]; Purpose: string[] } = {
    Company: [],
    Leaser: [],
    Purpose: [],
  };

  function update_filter(category: string, option: string) {
    const index = filters[category as keyof typeof filters].indexOf(option);
    if (index > -1) {
      filters[category as keyof typeof filters].splice(index, 1);
    } else {
      filters[category as keyof typeof filters] = [...filters[category as keyof typeof filters], option];
    }

    let isNotEmpty = false;
    Object.entries(filters).map(([_, value]) => {
      isNotEmpty = isNotEmpty || Boolean(value.length);
    });

    if (!isNotEmpty) {
      filtered_machines = data.machines;
    } else {
      let updated_filtered_machines = data.machines;
      Object.entries(filters).map(([key, value]) => {
        if (value.length) {
          updated_filtered_machines = updated_filtered_machines.filter(
            (machine) => {
              if (Array.isArray(machine[key as keyof typeof machine])) {
                return (
                  value.every((val) =>
                  //@ts-expect-error
                    machine[key as keyof typeof machine].includes(val)
                  ) && machine
                );
              }
              return (
                value.includes(
                  machine.highlight[key as keyof typeof machine.highlight]
                ) && machine
              );
            }
          );
        }
        // filtered_machines = updated_filtered_machines.length ? updated_filtered_machines : data.machines;
      });
      filtered_machines = updated_filtered_machines;
    }
  }

  function to_product(id: string) {
    goto(`/machine/${id}`);
    return null;
  }
</script>

<div class="w-full px-6 py-2 flex flex-col">
  <!-- <div class="py-2">Full width</div> -->
  <div class="flex flex-row py-2">
    <div class="w-[16%]">
      {#each market_options as { Category, Options }}
        <div class="flex flex-col px-2 py-1 space-y-1">
          <div class="font-medium">{Category}</div>
          <div class="flex flex-col pl-2 space-y-0">
            {#each Options as option}
              <div class="flex items-center space-x-2">
                <input
                  id="check1"
                  type="checkbox"
                  on:click={() => update_filter(Category, option)}
                  class="w-3 h-3"
                /><label for="check1">{option}</label>
              </div>
            {/each}
          </div>
        </div>
      {/each}
    </div>
    <div class="w-[84%] px-1 py-1 flex flex-col space-y-1">
      {#each filtered_machines as { id, img: { src, alt }, Model, Year, highlight, Purpose, Rent }, index (index)}
        <div
          class="w-full min-h-min max-h-[220px] flex flex-row px-1 py-1 bg-neutral-100 space-x-2"
        >
          <img
            on:click={to_product(id)}
            on:keypress={to_product(id)}
            {src}
            {alt}
            class="h-full min-h-full aspect-square rounded-md shadow-[rgba(0,0,0,0.19)_0px_10px_20px,rgba(0,0,0,0.23)_0px_6px_6px] shadow-lg"
          />
          <div class="w-full flex flex-col space-y-2 px-2 py-2">
            <div
              on:click={to_product(id)}
              on:keypress={to_product(id)}
              class="flex flex-row items-center"
            >
              <h2 class="min-w-[20%]">{Model}</h2>
              <h2 class="text-slate-400 ml-1">| {Year}</h2>
            </div>
            <div class="w-full h-0.5 border-t-0 bg-slate-200" />
            <div class="h-full text-sm text-slate-800">
              {#each Object.entries(highlight) as [key, val]}
                <div class="w-full flex flex-row items-end">
                  <div class="w-[35%] flex flex-row items-end">
                    <p>{key}</p>
                    <div class="w-full mx-2 h-0.5 border-t-0 bg-slate-200" />
                  </div>
                  <p>{val}</p>
                </div>
              {/each}
              <div class="mt-2 w-full flex flex-row items-center space-x-1">
                {#each Purpose as purpose}
                  <p class="px-4 py-1 rounded-full bg-blue-50 items-center">
                    {purpose}
                  </p>
                {/each}
              </div>
            </div>
            <div class="w-full h-0.5 border-t-0 bg-slate-200" />
            <p>Rent - {Rent}</p>
          </div>
          <div class="w-[20%] flex flex-col justify-evenly">
            <button
              on:click={to_product(id)}
              class="rounded-full bg-slate-200 py-2">Know More</button
            >
            <button class="rounded-full bg-slate-200 py-2">Rent</button>
          </div>
        </div>
      {/each}
    </div>
  </div>
</div>
