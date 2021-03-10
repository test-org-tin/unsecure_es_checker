<script>


  let userInput;
  console.log(userInput);
  async function searchEndpoint() {
    if (userInput == undefined) {
      return;
    }

    let response = await fetch("/search", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        endpoint: userInput,
      }),
    }).catch((e) => (err = e));

    let response_body = await response.json();

    if (response_body.error) {
      throw response_body.error;
    } else {
      return response_body;
    }
  }

  let promise = searchEndpoint();

  //listening for an enter from the input box
  const keyPress = async (e) => {
    if (e.charCode === 13) promise = searchEndpoint();
  };

  const userClick = async () => {
    promise = searchEndpoint();
  };
</script>

<div class="d-flex justify-content-center">
  <img
    src="https://static-www.elastic.co/v3/assets/bltefdd0b53724fa2ce/blt52c29462320a5d1e/5ea8c7efea2a04243200ce24/brand-elastic-horizontal-220x130.svg"
    alt=""
  />
</div>
<div class="input-group mb-3">
  <input
    bind:value={userInput}
    on:keypress={keyPress}
    type="text"
    class="form-control"
    placeholder="https://myesendpoint.exmaple.io:9243"
    aria-label="Elastic Search Endpoint URL"
    aria-describedby="button-addon2"
  />
  <button
    class="btn btn-outline-secondary"
    type="button"
    id="button-addon2"
    on:click={userClick}
  >
    Search
  </button>
</div>

<!-- <hr> -->
{#await promise}
  <div class="d-flex justify-content-center">
    <div class="spinner-border" role="status">
      <span class="visually-hidden">Loading...</span>
    </div>
  </div>
{:then data}
  {#if data == undefined}
    <div class="alert alert" style="text-align: center;" role="alert">
      HI 👋 🙂 Enter the your elasticsearch endpoint URL above to check it's
      security 🚀
    </div>
  {:else}
    {#if data.status == "secure"}
      {#if data.secure_connection}
        <div
          class="alert alert-success"
          style="text-align: center;"
          role="alert"
        >
          🎉 🎉 YAY 🎉 🎉 ! Your elasticsearch cluster seems secure! For more
          information on how to secure your cluster and other best practices
          visit
          <a
            href="https://www.elastic.co/guide/en/elasticsearch/reference/current/secure-cluster.html"
          >
            this page.
          </a>
          You can look at the raw data of the request below.
        </div>
      {:else}
        <div
          class="alert alert-warning"
          style="text-align: center;"
          role="alert"
        >
          😕 😑 Your elasticsearch cluster is not open to the world, but it
          doesn't have a secure connection; consider implementing some TLS
          encryption. For more information on how to secure your cluster and
          other best practices visit
          <a
            href="https://www.elastic.co/guide/en/elasticsearch/reference/current/secure-cluster.html"
          >
            this page.
          </a>
          You can look at the raw data of the request below.
        </div>
      {/if}
    {:else if data.status == "unsecure"}
      <div class="alert alert-danger" style="text-align: center;" role="alert">
        😭 😩 😱 OH NOOOO! Your elasticsearch cluster seems to be open to the
        world. Please take action to secure it to help prevent any loss of data.
        For more information on how to secure your cluster and other best
        practices visit
        <a
          href="https://www.elastic.co/guide/en/elasticsearch/reference/current/secure-cluster.html"
        >
          this page.
        </a>
        You can look at the raw data of the request below.
      </div>
    {:else if data.status == "unknown"}
      <div class="alert alert-warning" style="text-align: center;" role="alert">
        HMMMM 🧐 😕 We weren't able to get any data about your elasticsearch
        cluster. You can look at the raw data of the request below.
      </div>
    {/if}
    <pre>{JSON.stringify(data, null, 2)}</pre>
  {/if}
{:catch data}
  <div class="alert alert-danger" style="text-align: center;" role="alert">
    😩 {data}
  </div>
{/await}

<style>
  pre {
    background: #f4f4f4;
    border: 1px solid #ddd;
    border-left: 3px solid #f2334c;
    color: #666;
    page-break-inside: avoid;
    font-family: monospace;
    font-size: 15px;
    line-height: 1.6;
    margin-bottom: 1.6em;
    max-width: 100%;
    overflow: auto;
    padding: 1em 1.5em;
    display: block;
    word-wrap: break-word;
  }
</style>
